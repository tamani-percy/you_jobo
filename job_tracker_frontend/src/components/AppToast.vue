<template>
  <NeoToast
      v-if="visible"
      :type="type"
      :title="title"
      :message="message"
      @close="closeToast"
  />
</template>

<script setup lang="ts">
import { NeoToast } from 'neo-brutal-vue'
import { useToast } from '@/composables/useToast'

const { visible, type, title, message, closeToast } = useToast()
</script>