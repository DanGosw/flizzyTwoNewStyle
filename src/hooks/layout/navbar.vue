<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useFullscreen } from "@vueuse/core";
import AppConfig from "@/hooks/components/app/appConfig.vue";

const route = useRoute();
const router = useRouter();
optionsMenuStore.createOptionsMenu();

const menuOptions = computed(() => optionsMenuStore.options);

const isParentActive = (parentRoute) => {
    return route?.matched.some((matchedRoute) => {
        return matchedRoute.path === parentRoute || matchedRoute.name === parentRoute;
    });
};

const isChildActive = (childrenRoutes) => {
    return childrenRoutes.some((child) => {
        return route.matched.some((matchedRoute) => matchedRoute.path === child.route);
    });
};

const handleNavigation = (route) => {
    if(typeof route === "string") {
        router.push(route); // Si `route` es un string, usa el path directamente
    } else if(route?.name) {
        router.push({ name: route.name }); // Si `route` es un objeto, usa `name`
    } else {
        console.warn("Invalid route:", route);
    }
};

const { toggle, isFullscreen } = useFullscreen();
</script>
<template>
    <Menubar :model="menuOptions" class="text-[12px]">
        <template #start>
            <div class="mr-1 flex h-9 w-14 items-center justify-center rounded-md">
                <img src="../../assets/img/flizzyLogo.png" alt="system logo" class="h-full w-auto p-0.5">
            </div>
        </template>
        <template #item="{ item, props }">
            <div v-if="item.route && !item.items">
                <div @click="handleNavigation(item.route)" class="cursor-pointer" v-bind="props.action"
                     :class="`select-none ${isParentActive(item.route) ? 'bg-primary-500/80 rounded' : ''}`" v-ripple>
                    <component :is="item.icon" :class="`${isParentActive(item.route) ? 'text-white' : 'text-primary-500'} text-[15px]`"/>
                    <span :class="`${isParentActive(item.route) ? 'text-white' : 'text-surface-900 dark:text-surface-200'} ml-1`">
                        {{ item.label }}
                    </span>
                </div>
            </div>
            <div v-else class="flex cursor-pointer select-none items-center pl-1 py-1.5"
                 :class="isChildActive(item.items) ? 'bg-primary-500/40 rounded' :''" v-ripple>
                <component :is="item.icon" class="text-primary-500 text-[15px]"/>
                <span class="ml-1.5">{{ item.label }}</span>
                <i-material-symbols-keyboard-arrow-down-rounded class="text-[16px] text-primary-500 mx-0.5"/>
            </div>
        </template>

        <template #submenuicon>
            <i-solar-hamburger-menu-broken/>
        </template>

        <template #end>
            <div class="flex space-x-1">
                <Button size="small" severity="secondary" class="!w-8 !h-8" @click="toggle">
                    <template #icon>
                        <i-material-symbols-fullscreen v-if="isFullscreen"/>
                        <i-material-symbols-fullscreen-exit v-else/>
                    </template>
                </Button>
                <Button size="small" severity="secondary" class="!w-8 !h-8" @click="router.push({ name: 'login' })">
                    <template #icon>
                        <i-material-symbols-person-outline-rounded/>
                    </template>
                </Button>
                <app-config/>
            </div>
        </template>
    </Menubar>
</template>
