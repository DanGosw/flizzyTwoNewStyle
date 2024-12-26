<script setup>

import defaultImage from "@/assets/img/animatedFood.gif";

const props = defineProps({
    table: { type: Object, required: true },
    image: { type: String, required: false, default: defaultImage },
    tableClick: { type: Function, required: false, default: {} }
});

</script>
<template>
    <div @click="tableClick"
         class="relative z-10 col-span-2 flex h-48 max-h-48 cursor-pointer flex-col justify-between rounded-lg font-semibold shadow-md transition sm:col-span-2 md:col-span-3 lg:col-span-2">
        <div :class="`${table?.['status'] === '3' ? 'bg-primary-400/60 dark:bg-primary-400/70' : 'bg-surface-400/70 dark:bg-surface-800/60'} border border-surface-400 dark:border-surface-600 rounded-lg h-full flex flex-col`">
            <!-- Primer bloque: Lista de órdenes o descripción -->
            <div class="flex h-32 w-full select-none flex-wrap gap-1 overflow-y p-1.5" v-if="table?.['orders'].length > 0">
                <div v-for="moreTable in table?.['orders']" :key="moreTable.code" v-tooltip.top="moreTable.description"
                     class="flex w-auto flex-grow items-center justify-center rounded-lg border text-white px-1.5 p-1.5 bg-primary-600/80 dark:bg-primary-800/60">
                    {{ moreTable.description }}
                </div>
            </div>
            <div class="flex h-32 w-full items-center justify-center rounded-lg text-xl" v-else>
                {{ table?.["description"] }}
            </div>

            <!-- Segundo bloque: Monto -->
            <div class="flex h-10 w-full items-center justify-center text-xl" v-if="table?.['status'] === '3'">
                S/. {{ table?.["order_amount"].toFixed(2) }}
            </div>

            <!-- Tercer bloque: Fecha modificada (div rojo) -->
            <div class="flex h-auto w-full flex-grow items-center justify-center rounded-b-lg bg-red-400/60 text-sm font-bold"
                 v-if="table?.['status'] === '3'">
                <p class="animate-pulse">
                    {{ table?.["modified"] }}
                </p>
            </div>
        </div>
        <slot/>
        <!-- Imagen de fondo -->
        <img draggable="false" :src="image" alt="image of table's" class="absolute -z-10 h-full w-full rounded-lg opacity-50"/>
    </div>
</template>

