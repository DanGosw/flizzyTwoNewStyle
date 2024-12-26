<script setup>

import TableDesign from "@/hooks/components/tableDesign/tableDesign.vue";

const { table } = defineProps({ table: { default: { data: [], index: null }, required: true, type: Object } });

</script>

<template>
    <div class="md:w-3/4 w-full bg-surface-100 dark:bg-surface-800 p-2 rounded-xl border dark:border-slate-700">

        <div class="flex justify-between mb-2 items-center flex-wrap">
            <p> Mesas de {{ table?.description }} </p>
            <Button label="Agregar Mesa">
                <template #icon>
                    <i-tabler-layout-grid-add class="text-lg"/>
                </template>
            </Button>
        </div>
        <div class="grid grid-cols-1 flex-wrap items-center justify-start gap-2 sm:grid-cols-4 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-12">
            <tableDesign v-for="table in table?.tables" :key="table.id" :table="table" :table-click="()=>{}">
                <div class="w-full bottom-0 absolute gap-1 flex p-1">
                    <Button raised class="w-1/2 !p-1" v-tooltip.top="'Editar'">
                        <template #icon>
                            <i-material-symbols-edit-note-rounded class="text-lg"/>
                        </template>
                    </Button>
                    <Button raised severity="danger" class="w-1/2 !p-1" v-tooltip.top="'Eliminar'">
                        <template #icon>
                            <i-material-symbols-light-delete-rounded class="text-lg"/>
                        </template>
                    </Button>
                </div>
            </tableDesign>
        </div>
    </div>
</template>
