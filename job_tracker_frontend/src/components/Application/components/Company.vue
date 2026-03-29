<script setup lang="ts">
import { NeoLink } from 'neo-brutal-vue'
import { Building2 } from 'lucide-vue-next'
import type { JobApplicationResponse } from '@/api/interfaces/job.applications.interfaces.ts'

defineProps<{
  company: JobApplicationResponse['company']
}>()
</script>

<template>
  <div>
    <h2 class="text-xl font-black inline-flex items-center gap-2 mb-6">
      <Building2 :size="22" class="text-[#f472b6]" />
      COMPANY DETAILS
    </h2>

    <div class="grid grid-cols-2 gap-y-6 mb-8">
      <div>
        <p class="text-xs font-bold text-gray-500 tracking-widest">INDUSTRY</p>
        <p class="font-bold text-lg">{{ company.industry || 'N/A'}}</p>
      </div>
      <div>
        <p class="text-xs font-bold text-gray-500 tracking-widest">DESCRIPTION</p>
        <p class="font-bold text-lg">{{ company.description }}</p>
      </div>
      <div>
        <p class="text-xs font-bold text-gray-500 tracking-widest">HEADQUARTERS</p>
        <p class="font-bold text-lg">{{ company.location }}</p>
      </div>
      <div>
        <p class="text-xs font-bold text-gray-500 tracking-widest">WEBSITE</p>
        <NeoLink :href="company.website" target="_blank">{{ company.website || 'N/A' }}</NeoLink>
      </div>

    </div>
  </div>
</template>