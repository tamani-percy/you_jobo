<template>
  <AppToast/>
  <div class="flex flex-row w-full">
    <div class="w-full">
      <StickyHeader/>
      <div class="my-5 px-10">
        <RouterView/>
      </div>
    </div>
  </div>
  <NeoBacktop :visibility-height="100"/>
</template>

<script setup lang="ts">
import {NeoBacktop} from 'neo-brutal-vue'
import StickyHeader from "@/components/StickyHeader.vue";
import AppToast from "@/components/AppToast.vue";
</script>