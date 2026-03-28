<script setup lang="ts">
import {NeoInput} from 'neo-brutal-vue'
import {ref} from 'vue'

import ApplicationsTable from '@/components/Applications/components/ApplicationsTable.vue'
import BoxReveal from '@/components/ui/box-reveal/BoxReveal.vue'
import ApplicationDialog from '@/components/Applications/components/AddApplicationDialog.vue'

const searchCompany = ref('')

</script>

<template>
  <div>
    <div class="flex justify-between w-full flex-col md:flex-row  items-center">
      <BoxReveal color="#E1251B" :duration="0.8">
        <h2 class="text-4xl inline-flex items-center italic">
          MY
          <span class="bg-[#fa3899] p-2 ms-1 text-white">APPLICATIONS</span>
        </h2>
      </BoxReveal>

      <div class="inline-flex md:w-fit gap-5 w-full items-center justify-center flex-col md:flex-row">
        <NeoInput
             class="mt-5 md:mt-0 "
            v-model="searchCompany"
            placeholder="SEARCH TITLE OR COMPANY..."
        />
        <ApplicationDialog/>
      </div>
    </div>
  </div>

  <ApplicationsTable
      :search-term="searchCompany"
  />
</template>