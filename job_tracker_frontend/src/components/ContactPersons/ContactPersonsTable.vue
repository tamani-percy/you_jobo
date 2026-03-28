<script setup lang="ts">
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {NeoButton, NeoLink, NeoTable, NeoTag, NeoTooltip} from "neo-brutal-vue";
import {useContactPerson} from "@/composables/ContactPersons/useContactPerson.ts";
import {onMounted} from "vue";
import {Trash} from "lucide-vue-next";
import {formatLocalDateTime} from "@/utils/DateUtils.ts";

const {contactPersons, columns, isContactPersonsLoading} = useContactPerson()

</script>

<template>
  <div class="mt-10">
    <NeoTable
        :loading="isContactPersonsLoading"
        v-auto-animate
        row-key="id"
        :data="contactPersons"
        :columns="columns"
        stripe
        border
        highlightCurrentRow
    >

      <template #fullName="{ row }">
        <div class="flex flex-col text-center">
          <p class="text-lg">{{ row.fullName }}</p>
          <p class="text-lg !font-medium">{{ row.email }}</p>
          <p class="text-lg !font-medium">{{ row.phone }}</p>
          <NeoLink v-if="row.linkedinUrl" :to="row.linkedinUrl">{{ row.linkedinUrl }}</NeoLink>
        </div>
      </template>
      <template #role="{ row }">
        <NeoTag>{{ row.role }}</NeoTag>
      </template>
      <template #notes="{ row }">
        <p class="text-lg !font-medium">{{ row.notes }}</p>
      </template>
      <template #createdAt="{ row }">
        <p class="text-lg !font-medium">{{ formatLocalDateTime(row.createdAt) }}</p>
      </template>
      <template #updatedAt="{ row }">
        <p class="text-lg !font-medium">{{ formatLocalDateTime(row.updatedAt) || 'N/A' }}</p>
      </template>
    </NeoTable>

  </div>
</template>

<style scoped>

</style>