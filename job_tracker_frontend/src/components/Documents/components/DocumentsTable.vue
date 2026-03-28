<script setup lang="ts">
import {NeoButton, NeoSpace, NeoTable, NeoTooltip} from "neo-brutal-vue";
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {useDocuments} from "@/composables/Documents/useDocument.ts";
import {Download, Eye, Trash} from "lucide-vue-next";
import router from "@/router";

const {columns, isDocumentsLoading, documents, onDownloadDocument, deletingId, onDeleteDocument} = useDocuments()

const onViewJobApplication = async (id: number) => {
  await router.push(`job-applications/${id}`)
}
</script>

<template>
  <div class="mt-10">
    <NeoTable
        :loading="isDocumentsLoading"
        v-auto-animate
        row-key="id"
        :data="documents"
        :columns="columns"
        stripe
        border
        highlightCurrentRow
    >
      <template #view="{ row }">
        <div class="flex justify-center">
          <NeoTooltip content="View Job Application">
            <NeoButton type="neo" @click="onViewJobApplication(row.jobApplicationId)">
              <div class="inline-flex items-center">
                <Eye/> &nbsp;
              </div>
            </NeoButton>
          </NeoTooltip>
        </div>
      </template>
      <template #actions="{ row }">
        <div class="flex justify-center">
          <NeoSpace>
            <NeoTooltip content="Download Document">
              <NeoButton type="info" @click="onDownloadDocument(row.fileKey)">
                <div class="inline-flex items-center">
                  <Download/> &nbsp;
                </div>
              </NeoButton>
            </NeoTooltip>
            <NeoTooltip content="Delete Document">
              <NeoButton type="danger" :loading="deletingId === row.id"
                         @click="onDeleteDocument(row.id)">
                <div class="inline-flex items-center">
                  <Trash/> &nbsp;
                </div>
              </NeoButton>
            </NeoTooltip>
          </NeoSpace>
        </div>
      </template>
    </NeoTable>
  </div>
</template>

<style scoped>

</style>