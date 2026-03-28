<script setup lang="ts">
import {toRef, watch} from 'vue'
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {NeoButton, NeoPagination, NeoTable, NeoTag} from 'neo-brutal-vue'
import {Eye, Trash} from 'lucide-vue-next'
import router from '@/router'
import EditApplicationDialog from '@/components/Applications/components/EditApplicationDialog.vue'
import {useApplicationsTable} from '@/composables/Applications/useApplicationsTable'

const props = defineProps<{
  searchTerm: string
}>()

const searchTermRef = toRef(props, 'searchTerm')

const {
  paginatedApplications,
  total,
  current,
  pageSize,
  isLoading,
  deletingId,
  columns,
  getStatusType,
  resetToFirstPageOnSearch,
  onDeleteJobApplication,
  refetch,
} = useApplicationsTable(searchTermRef)

watch(searchTermRef, () => {
  resetToFirstPageOnSearch()
})

const goToApplication = async (id: number) => {
  await router.push(`/job-applications/${id}`)
}
</script>

<template>
  <div class="mt-10">
    <NeoTable
        class="overflow-x-auto"
        v-auto-animate
        row-key="id"
        :loading="isLoading"
        :data="paginatedApplications"
        :columns="columns"
        stripe
        border
        highlightCurrentRow
    >
      <template #view="{ row }">
        <NeoButton @click="goToApplication(row.id)" type="neo">
          <div class="inline-flex items-center">
            <Eye/>&nbsp;
            <h2>VIEW</h2>
          </div>
        </NeoButton>
      </template>

      <template #company="{ row }">
        <div class="inline-flex items-center gap-3">
          <NeoTag class="w-fit" type="info" size="lg">
            {{ row.company?.name?.[0] ?? '?' }}
          </NeoTag>
          <h2 class="text-lg italic">{{ row.company?.name }}</h2>
        </div>
      </template>

      <template #title="{ row }">
        <h2 class="text-lg !font-medium">{{ row.title }}</h2>
      </template>

      <template #status="{ row }">
        <NeoTag :type="getStatusType(row.status)" size="lg">
          {{ row.status.replaceAll('_', ' ') }}
        </NeoTag>
      </template>

      <template #dateApplied="{ row }">
        <h2 class="text-lg !font-medium text-gray">
          {{ row.dateAppliedFormatted }}
        </h2>
      </template>

      <template #actions="{ row }">
        <div class="gap-2 inline-flex">
          <EditApplicationDialog
              :jobApplication="row"
              @updatedJobApplication="refetch"
          />

          <NeoButton
              type="warning"
              size="sm"
              :loading="deletingId === row.id"
              @click="onDeleteJobApplication(row.id)"
          >
            <Trash/>
          </NeoButton>
        </div>
      </template>
    </NeoTable>

    <div class="flex justify-end">
      <NeoPagination
          class="mt-4"
          v-model:current="current"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          :pager-count="5"
          layout="prev, pager, next, jumper"
      />
    </div>
  </div>
</template>