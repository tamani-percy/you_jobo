<script setup lang="ts">
import BoxReveal from '@/components/ui/box-reveal/BoxReveal.vue'
import ContactPersonsTable from "@/components/ContactPersons/ContactPersonsTable.vue";
</script>

<template>
  <div>
    <div class="flex justify-between w-full">
      <BoxReveal color="#E1251B" :duration="0.8">
        <h2 class="text-4xl inline-flex items-center italic">
          MY
          <span class="bg-[#fa3899] p-2 ms-1 text-white">CONTACT PERSONS</span>
        </h2>
      </BoxReveal>
    </div>
  </div>
  <ContactPersonsTable/>
</template>