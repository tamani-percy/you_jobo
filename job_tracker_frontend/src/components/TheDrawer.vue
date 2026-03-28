<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import {type MenuItem, NeoButton, NeoDrawer, NeoMenu, NeoMenuItem, NeoSpace} from "neo-brutal-vue";
import router from "@/router";
import {CircleUserRound, FileText, Folder, Gauge, Megaphone, Menu, NotebookPen} from "lucide-vue-next";

const route = useRoute()

const openDrawer = ref(false)

const menuItems = ref<MenuItem[]>([
  //@ts-ignore
  {title: "Dashboard", index: "/", icon: Gauge},
  //@ts-ignore
  {title: "Applications", index: "/job-applications", icon: FileText},
  //@ts-ignore
  {title: "Interviews", index: "/interviews", icon: Megaphone},
  //@ts-ignore
  {title: "Contact Persons", index: "/contact-persons", icon: CircleUserRound},
  //@ts-ignore
  {title: "Notes", index: "/notes", icon: NotebookPen},
  //@ts-ignore
  {title: "Documents", index: "/documents", icon: Folder},
])

const activeMenu = computed(() => {
  const found = menuItems.value.find(item => item.index === route.path)
  return found?.index ?? ""
})

const handleSelect = (index: string) => {
  const item = menuItems.value.find(item => item.index === index)
  if (!item) return
  router.push(item?.index)
  openDrawer.value = false
}
</script>


<template>
  <NeoButton size="sm" @click="openDrawer = true" class="">
    <Menu :size="20"/>
  </NeoButton>
  <NeoDrawer size="100" v-model="openDrawer" direction="ltr" modal >
    <template #header="{}">
        <NeoSpace class="flex-col flex">
          <img src="/gifs/you_jobo.gif" alt="No GIF" class="rounded-full w-20 h-20 shadow-lg">
        </NeoSpace>
    </template>
    <NeoMenu
        :key="route.path"
        :default-active="activeMenu"
        mode="vertical"
        class="w-full"
    >
      <NeoMenuItem
          v-for="item in menuItems"
          :key="item.index"
          :index="item.index"
          @click="handleSelect(item.index)"
      >
        <div v-if="item.icon">
          <component :is="item.icon"></component>
        </div>
        {{ item.title }}

      </NeoMenuItem>
    </NeoMenu>
  </NeoDrawer>
</template>

<style scoped>

</style>