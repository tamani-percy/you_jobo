<script setup lang="ts">
import {
  NeoButton,
  NeoCheckbox,
  NeoDialog,
  NeoEmpty,
  NeoHoverCard,
  NeoInput,
  NeoProgress,
  NeoSelect,
  NeoSpace,
  NeoUpload
} from 'neo-brutal-vue'
import {Download, FileText, Trash, Upload} from 'lucide-vue-next'
import {computed, ref} from 'vue'
import type {DocumentRequest, DocumentResponse} from '@/api/interfaces/document.interfaces'
import {DocumentTypes} from '@/api/data/DocumentStatuses'
import FieldLabel from '@/components/FieldLabel.vue'
import {DocumentRow, useDocuments} from "@/composables/Documents/useDocument.ts";
import {useCreateDocumentMutation} from "@/composables/Documents/useDocumentsMutation.ts";

export type UpdatedDoc = DocumentResponse & {
  selectedExistingDocumentType: number
}
const props = defineProps<{
  documents?: DocumentRow[]
  jobApplicationId: number
}>()

const emit = defineEmits<{
  (e: 'created', value: DocumentResponse): void,
  (e: 'updated', value: UpdatedDoc): void,
}>()


const {
  jobApplicationDocuments,
  isJobApplicationDocumentsLoading,
  onDeleteDocument,
  deletingId,
  onDownloadDocument
} = useDocuments(props.jobApplicationId)
const {createDocument, isCreating, uploadProgress} = useCreateDocumentMutation(
    props.jobApplicationId
)

const jobDocs = computed(() => jobApplicationDocuments.value.map((doc) => {
  return {
    label: doc.fileKey,
    value: doc.id
  }
}))

const selectedFile = ref<File | null>(null)

const isAddDocumentDialogOpen = ref<boolean>(false)
const replaceDocument = ref<boolean>(false)
const selectedDocumentType = ref<string>('')
const selectedExistingDocumentType = ref<number>(0)
const version = ref('1.0')

const documentCount = computed(() => jobApplicationDocuments.value.length)

const handleFileChange = (payload: any) => {
  if (payload instanceof File) {
    selectedFile.value = payload
    return
  }

  if (Array.isArray(payload) && payload.length > 0 && payload[0] instanceof File) {
    selectedFile.value = payload[0]
    return
  }

  if (payload?.target?.files?.[0]) {
    selectedFile.value = payload.target.files[0]
  }
}

const resetForm = () => {
  selectedFile.value = null
  replaceDocument.value = false
  selectedDocumentType.value = ''
  selectedExistingDocumentType.value = 0
  version.value = '1.0'
}

const onSubmit = async () => {
  if (!selectedFile.value) return
  if (!selectedDocumentType.value) return

  const documentRequest: DocumentRequest = {
    id: replaceDocument.value ? selectedExistingDocumentType.value : null,
    jobApplicationId: props.jobApplicationId,
    version: version.value,
    documentType: selectedDocumentType.value,
  }
  const docRes = await createDocument({
    request: documentRequest,
    file: selectedFile.value,
    replaceDocument: replaceDocument.value,
  })
  emit('updated', {
    ...docRes,
    selectedExistingDocumentType: selectedExistingDocumentType.value
  })

  isAddDocumentDialogOpen.value = false
  resetForm()
}

</script>

<template>
  <div>
    <div class="flex justify-between w-full items-center">
      <h2 class="text-xl font-black inline-flex items-center gap-2">
        <FileText :size="22" class="text-[#f472b6]"/>
        DOCUMENTS
        <span class="text-xs font-normal text-gray-400 ml-1">
          ({{ documentCount }})
        </span>
      </h2>

      <NeoButton @click="isAddDocumentDialogOpen = true">ADD</NeoButton>

      <NeoDialog v-model="isAddDocumentDialogOpen" title="Add Document" width="500px">
        <NeoSpace class="flex flex-col w-full">
          <div class="space-y-1 flex items-center">
            <NeoCheckbox v-model="replaceDocument" class="pe-2"/>
            <FieldLabel label="I want to replace an already added document"/>
          </div>

          <div v-if="replaceDocument" class="space-y-1 w-full">
            <FieldLabel label="Existing Document Type"/>
            <NeoSelect
                :options="jobDocs"
                v-model="selectedExistingDocumentType"
                placeholder="Select document type to replace"
            />
          </div>

          <div class="space-y-1 w-full">
            <FieldLabel label="Document Type"/>
            <NeoSelect
                :options="DocumentTypes"
                v-model="selectedDocumentType"
                placeholder="Select document type"
            />
          </div>

          <div class="space-y-1 w-full">
            <FieldLabel label="Document Version"/>
            <NeoInput v-model="version" placeholder="Document Version" type="number"/>
          </div>

          <div class="space-y-1">
            <FieldLabel label="Document"/>

            <NeoUpload
                class="w-full mt-5"
                action=""
                @change="handleFileChange"
            >
              <div
                  class="border-2 border-dashed border-black w-full p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload :size="24" class="text-gray-400"/>
                <p class="text-sm font-black tracking-widest text-gray-500">
                  UPLOAD DOCUMENT
                </p>

                <p v-if="selectedFile" class="text-xs text-gray-500">
                  {{ selectedFile?.name }}
                </p>
              </div>
            </NeoUpload>

            <NeoProgress
                v-if="isCreating"
                :percentage="uploadProgress"
                :show-text="true"
                text-inside
                class="mt-3"
            />
          </div>

          <NeoButton
              class="w-fit self-end"
              type="success"
              :loading="isCreating"
              @click="onSubmit"
          >
            ADD
          </NeoButton>

        </NeoSpace>
      </NeoDialog>
    </div>

    <div v-if="!isJobApplicationDocumentsLoading && jobApplicationDocuments.length === 0">
      <NeoEmpty description="NO DOCUMENTS"/>
    </div>

    <div v-else class="flex flex-wrap gap-2">
      <NeoHoverCard
          v-for="doc in jobApplicationDocuments"
          :key="doc.id"
          placement="bottom"
          class="p-2"
      >
        <NeoButton type="warning" size="lg">
          <FileText :size="30"/>
        </NeoButton>

        <template #content>
          <div class="flex justify-center flex-col items-center gap-3">
            <h2>{{ doc.fileKey }}</h2>
            <p>v{{ doc.version }}</p>
            <p>{{ doc.createdAtFormatted }}</p>

            <div class="flex justify-between">
              <NeoSpace>
                <NeoButton type="info" size="sm" @click="onDownloadDocument(doc.fileKey)">
                  <Download :size="20"/>
                </NeoButton>
                <NeoButton
                    size="sm"
                    class="w-fit self-end"
                    type="danger"
                    :loading="deletingId === doc.id"
                    @click="onDeleteDocument(doc.id)"
                >
                  <Trash :size="20"/>

                </NeoButton>
              </NeoSpace>
            </div>
          </div>
        </template>
      </NeoHoverCard>
    </div>
  </div>
</template>