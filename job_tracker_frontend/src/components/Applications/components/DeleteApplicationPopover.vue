<script setup lang="ts">
import {NeoPopover, NeoButton} from 'neo-brutal-vue'
import { Trash,Check } from 'lucide-vue-next';
</script>

<template>
  <NeoPopover title="Delete Application?" effect="dark" placement="left">
    <NeoButton size="sm" class="popover-trigger" type="warning"><Trash /></NeoButton>
    <template #content>
      <NeoButton type="warning" class="popover-trigger">
        <div class="inline-flex items-center justify-center">
          <Trash /> &nbsp; YES
        </div>
      </NeoButton>

    </template>
  </NeoPopover>
</template>

<style scoped>

</style>