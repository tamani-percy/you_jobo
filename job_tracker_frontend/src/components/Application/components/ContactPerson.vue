<script setup lang="ts">
import {
  NeoAvatar,
  NeoButton,
  NeoDialog,
  NeoDivider,
  NeoEmpty,
  NeoHoverCard,
  NeoInput,
  NeoLink,
  NeoSelect,
  NeoSpace,
  NeoTextarea
} from 'neo-brutal-vue'
import {Trash, User2} from 'lucide-vue-next'
import type {ContactPersonRequest, ContactPersonResponse} from '@/api/interfaces/contact.person.interfaces.ts'
import type {Ref} from 'vue'
import {computed, ref} from 'vue'
import {ContactPersonRoles} from '@/api/data/ContactPersonRoles.ts'
import FieldLabel from '@/components/FieldLabel.vue'
import {useContactPerson} from "@/composables/ContactPersons/useContactPerson.ts";

const {
  isCreateContactPersonLoading,
  deletingId,
  onDeleteContactPerson,
  createContactPersonMutation
} = useContactPerson()

const props = defineProps<{
  contactPersons: ContactPersonResponse[]
  jobApplicationId: number
}>()

const isAddContactPersonDialogOpen: Ref<boolean> = ref(false)
const showErrors: Ref<boolean> = ref(false)

const selectedContactPersonRole: Ref<string> = ref('')
const fullName: Ref<string> = ref('')
const email: Ref<string> = ref('')
const phone: Ref<string> = ref('')
const notes: Ref<string> = ref('')
const linkedinUrl: Ref<string> = ref('')

const roleError = computed(() => {
  if (!showErrors.value) return ''
  return selectedContactPersonRole.value.trim() ? '' : 'Role is required'
})

const fullNameError = computed(() => {
  if (!showErrors.value) return ''
  return fullName.value.trim() ? '' : 'Full name is required'
})

const notesError = computed(() => {
  if (!showErrors.value) return ''
  return notes.value.trim() ? '' : 'Notes are required'
})

const isFormValid = computed(() => {
  return (
      selectedContactPersonRole.value.trim() !== '' &&
      fullName.value.trim() !== '' &&
      notes.value.trim() !== ''
  )
})

const resetForm = () => {
  selectedContactPersonRole.value = ''
  fullName.value = ''
  email.value = ''
  phone.value = ''
  notes.value = ''
  linkedinUrl.value = ''
  showErrors.value = false
}

const onCreateContactPerson = async () => {
  showErrors.value = true

  if (!isFormValid.value) return

  const contactPersonRequest: ContactPersonRequest = {
    jobApplicationId: props.jobApplicationId,
    role: selectedContactPersonRole.value,
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    notes: notes.value.trim(),
    linkedinUrl: linkedinUrl.value.trim()
  }

  await createContactPersonMutation.mutateAsync(contactPersonRequest)
  isAddContactPersonDialogOpen.value = false
  resetForm()
}

</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-black inline-flex items-center gap-2 mb-4">
        <User2 :size="22" class="text-[#f472b6]"/>
        CONTACT PERSON
        <span class="text-xs font-normal text-gray-400 ml-1">({{ contactPersons.length }})</span>
      </h2>

      <div>
        <NeoButton @click="isAddContactPersonDialogOpen = true">Add</NeoButton>

        <NeoDialog v-model="isAddContactPersonDialogOpen" title="Add Contact Person" width="500px">
          <div class="w-full">
            <NeoSpace>
              <div class="space-y-1 w-full">
                <FieldLabel label="Full Name" required/>
                <NeoInput v-model="fullName" placeholder="Full Name"/>
                <p v-if="fullNameError" class="text-sm text-red-500">{{ fullNameError }}</p>
              </div>

              <div class="space-y-1 w-full">
                <FieldLabel label="Email"/>
                <NeoInput v-model="email" placeholder="Email"/>
              </div>

              <div class="space-y-1 w-full">
                <FieldLabel label="Phone"/>
                <NeoInput v-model="phone" placeholder="Phone"/>
              </div>

              <div class="space-y-1 w-full">
                <FieldLabel label="LinkedIn"/>
                <NeoInput v-model="linkedinUrl" placeholder="LinkedIn"/>
              </div>

              <div class="space-y-1 w-full">
                <FieldLabel label="Notes" required/>
                <NeoTextarea v-model="notes" placeholder="Notes"/>
                <p v-if="notesError" class="text-sm text-red-500">{{ notesError }}</p>
              </div>
            </NeoSpace>

            <div class="space-y-1 w-full">
              <FieldLabel label="Role" required/>
              <NeoSelect
                  v-model="selectedContactPersonRole"
                  placeholder="Select contact person role"
                  :options="ContactPersonRoles"
              />
              <p v-if="roleError" class="text-sm text-red-500">{{ roleError }}</p>
            </div>
          </div>

          <div class="flex justify-end mt-5">
            <NeoButton
                @click="onCreateContactPerson"
                :loading="isCreateContactPersonLoading"
                :disabled="!isFormValid || isCreateContactPersonLoading"
            >
              ADD
            </NeoButton>
          </div>
        </NeoDialog>
      </div>
    </div>

    <div class="flex">
      <NeoEmpty v-if="contactPersons.length == 0" description="NO CONTACTS"/>
      <NeoHoverCard
          v-for="contact in contactPersons"
          :key="contact.id"
          placement="bottom"
          class="p-2"
      >
        <NeoButton type="warning" size="lg">
          <User2 :size="30"/>
        </NeoButton>

        <template #content>
          <NeoAvatar src="/svgs/avatar.svg"/>
          <NeoDivider type="secondary">{{ contact.role }}</NeoDivider>
          <div class="my-1">
            <p>{{ contact.fullName }}</p>
            <p>{{ contact.email }}</p>
            <p>{{ contact.phone }}</p>
            <NeoLink :to="contact.linkedinUrl" v-if="contact.linkedinUrl" underline>{{ contact.linkedinUrl }}</NeoLink>
            <NeoDivider type="secondary">Notes</NeoDivider>
            <p class="text-justify">{{ contact.notes }}</p>
          </div>
          <div class="flex justify-end">
            <NeoButton
                size="sm"
                class="w-fit"
                type="danger"
                :loading="deletingId === contact.id"
                @click="onDeleteContactPerson(contact.id)"
            >
              <Trash :size="20"/>

            </NeoButton>
          </div>
        </template>
      </NeoHoverCard>
    </div>
  </div>
</template>