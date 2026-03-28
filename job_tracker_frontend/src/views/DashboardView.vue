<script setup lang="ts">
import OverviewCards from "@/components/Dashboard/components/OverviewCards.vue";
import SecondTierCards from "@/components/Dashboard/components/SecondTierCards.vue";
import {useDashboardStats} from "@/composables/Dashboard/useDashboardStats.ts";
import {onMounted} from "vue";

const {
  onFetchDashboardStats,
} = useDashboardStats()

onMounted(() => {
  onFetchDashboardStats()
})
</script>

<template>
  <OverviewCards/>
  <SecondTierCards/>
</template>
