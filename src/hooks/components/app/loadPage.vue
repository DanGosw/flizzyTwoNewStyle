<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useDark } from "@vueuse/core";
import LoadingData from "@/hooks/components/loading/loadingData.vue";

const loadingPage = ref(true);
const isDark = useDark({ disableTransition: false, initialValue: "auto" });

onBeforeMount(() => {
    window.addEventListener("load", () => {
        loadingPage.value = true;
    });
});

onMounted(() => {
    window.addEventListener("load", () => {
        setTimeout(() => { loadingPage.value = false; }, 1000);
    });
});

</script>
<template>
    <div v-if="loadingPage" :class="`flex h-screen w-full items-center justify-center ${isDark ? 'bg-surface-900' : 'bg-primary-300'}`">
        <div>
            <LoadingData/>
        </div>
    </div>
    <div v-else>
        <router-view v-slot="{ Component }">
            <transition mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
        <toast/>
    </div>
</template>
