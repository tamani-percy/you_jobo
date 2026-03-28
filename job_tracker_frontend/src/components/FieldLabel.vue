<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  required?: boolean
  forId?: string
}>(), {
  required: false,
  forId: ''
})
</script>

<template>
  <label
      :for="forId || undefined"
      class="text-sm font-bold inline-block"
  >
    {{ label }}
    <span v-if="required" class="text-red-500">&nbsp;*</span>
  </label>
</template>