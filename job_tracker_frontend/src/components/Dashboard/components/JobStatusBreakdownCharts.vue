<script setup lang="ts">
import {NeoLoading} from "neo-brutal-vue";
import VueApexCharts from "vue3-apexcharts";
import {useDashboardStats} from "@/composables/Dashboard/useDashboardStats.ts";
import {computed, onMounted} from "vue";
import {useTheme} from "@/composables/useTheme.ts";
import type {ApexOptions} from "apexcharts";

const {isDark} = useTheme();
const {onFetchDashboardStats, jobApplicationJobStatusCount, isDashboardStatsLoading} = useDashboardStats()

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      distributed: true,
    }
  },
  grid: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    categories: Object.keys(jobApplicationJobStatusCount.value),
  },
  colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
  theme: {
    mode: isDark.value ? "dark" : "light",
    palette: 'palette2'
  },
}))

const series = computed(() => [
  {
    name: "Applications",
    data: Object.values(jobApplicationJobStatusCount.value),
  },
]);

onMounted(() => {
  onFetchDashboardStats()
})
</script>

<template>
  <NeoLoading v-if="isDashboardStatsLoading"/>

  <VueApexCharts
      v-else
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
  />
</template>