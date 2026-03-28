<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {NeoBreadcrumb, NeoBreadcrumbItem, NeoButton} from "neo-brutal-vue";
import {useRoute} from "vue-router";
import {useTheme} from "@/composables/useTheme.ts";
import {Moon, Sun} from "lucide-vue-next";
import TheDrawer from "@/components/TheDrawer.vue";
import TheAppInfo from "@/components/TheAppInfo.vue";

const route = useRoute();
const {isDark, toggleTheme} = useTheme();

const breadcrumbs = computed(() => {
  const segments = route.path.split("/").filter(Boolean);

  const crumbs = [{label: "Dashboard", to: "/"}];

  let cumulativePath = "";
  segments.forEach((segment) => {
    cumulativePath += `/${segment}`;
    crumbs.push({
      label: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      to: cumulativePath,
    });
  });

  return crumbs;
});

const currentDate = ref("");
const value = ref("");

const getCurrentDate = () => {
  const date = new Date();
  currentDate.value = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

onMounted(() => {
  getCurrentDate();
});
</script>

<template>
  <div class="sticky top-0 z-40 w-full h-35
            bg-white/30 dark:bg-neutral-900/30
            backdrop-blur-md
            border-b border-white/20 dark:border-white/10
            shadow-sm">
    <div class="flex items-center justify-between px-10 w-full">
      <div class="flex items-center w-full">
        <TheDrawer />
        <h1 class="ps-10 !text-[1.7rem] md:text-2xl">{{ currentDate.toUpperCase() }}</h1>
      </div>
      <div class="inline-flex gap-5">
        <TheAppInfo/>
        <NeoButton circle @click="toggleTheme">
          <Sun v-if="isDark"/>
          <Moon v-else/>
        </NeoButton>
      </div>
    </div>

    <NeoBreadcrumb class="px-10">
      <NeoBreadcrumbItem
          v-for="(crumb, index) in breadcrumbs"
          :key="crumb.to"
          :to="index < breadcrumbs.length - 1 ? crumb.to : undefined"
      >
        {{ crumb.label }}
      </NeoBreadcrumbItem>
    </NeoBreadcrumb>
  </div>
</template>