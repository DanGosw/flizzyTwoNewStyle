<script setup>

import ViewListTable from "@/modules/settings/application/areas/viewListTable.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import addOrEditArea from "@/modules/settings/application/areas/addOrEditArea.vue";

const closeModal = () => {
    parametersModal.value.visible = false;
};

const parametersModal = ref({
    visible: false,
    header: "",
    width: "30vw",
    footer: () => {},
    component: () => {}
});

const componentAddUBusinessModal = h(addOrEditArea, {
    closeModal,
    refreshData: () => {}
});

const addParametersAreaModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Agregar Area y mesas",
        width: "60vw",
        footer: "",
        component: componentAddUBusinessModal
    };
};

const tableSchema = ref([
    {
        id: 1,
        description: "PRINCIPAL",
        branch: 1,
        is_disabled: false,
        tables: [
            {
                id: 1,
                modified: "26/06/2024 11:18:56",
                code: "ME-01",
                description: "MESA 1",
                area: 1,
                is_disabled: false,
                order_amount: 60,
                orders: []
            },
            {
                id: 2,
                modified: "28/06/2024 09:44:57",
                code: "ME-02",
                description: "MESA 2",
                area: 1,
                is_disabled: false,
                order_amount: 66,
                orders: []
            },
            {
                id: 3,
                modified: "19/06/2024 22:58:19",
                code: "ME-03",
                description: "MESA 3",
                area: 1,
                is_disabled: false,
                order_amount: 52,
                orders: []
            },
            {
                id: 4,
                modified: "19/06/2024 23:27:19",
                code: "ME-04",
                description: "MESA 4",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 5,
                modified: "19/06/2024 21:49:38",
                code: "ME-05",
                description: "MESA 5",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 6,
                modified: "19/06/2024 23:36:33",
                code: "ME-06",
                description: "MESA 6",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            }

        ]
    },
    {
        id: 2,
        description: "SECUNDARIA",
        branch: 1,
        is_disabled: false,
        tables: [
            {
                id: 10,
                modified: "19/06/2024 22:47:26",
                code: "ME-10",
                description: "MESA 10",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 11,
                modified: "19/06/2024 23:00:38",
                code: "ME-11",
                description: "MESA 11",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 12,
                modified: "20/06/2024 00:12:57",
                code: "ME-12",
                description: "MESA 12",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 13,
                modified: "20/06/2024 00:01:24",
                code: "ME-13",
                description: "MESA 13",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 14,
                modified: "19/06/2024 21:54:45",
                code: "ME-14",
                description: "MESA 14",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 15,
                modified: "20/06/2024 00:09:58",
                code: "ME-15",
                description: "MESA 15",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            }
        ]
    }
]);

const arrayTable = ref(tableSchema.value[0]);
const editingRows = ref([]);

const saveRowEdit = ({ data }) => {
    console.log(data);
};

/**
 * @description Evaluates if the row is being edited or if it contains a class where the edit function is being called
 * @params {data, originalEvent, index}
 */
const addDataOnRowClick = ({ data, originalEvent }) => {
    if(!originalEvent.target.closest(".xd") && !originalEvent.target.closest("[data-p-cell-editing='true']")) {
        if(arrayTable.value?.id === data.id) {
            arrayTable.value = null;
        } else {
            arrayTable.value = data;
        }
    }
};

</script>

<template>
    <div class="flex flex-wrap gap-2 md:flex-nowrap">
        <div class="w-full md:w-1/4">
            <DataTable size="small" striped-rows show-gridlines dataKey="code" tableStyle="min-width: 10rem;" :value="tableSchema"
                       @row-click="addDataOnRowClick" edit-mode="row" v-model:editing-rows="editingRows" data-key="id"
                       @row-edit-save="saveRowEdit"
                       :row-class="({id})=>({'!bg-primary-300/80 dark:!bg-surface-600/80': id === arrayTable?.id})">
                <Column field="description" header="Areas" class="cursor-pointer hover:!bg-opacity-0" style="width: 10%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" class="w-full"/>
                    </template>
                </Column>
                <Column row-editor style="width: 1%" class="xd">
                    <template #header>
                        <Button raised size="small" @click="addParametersAreaModal" v-tooltip.top="'Agregar nueva area'">
                            <template #icon>
                                <i-fluent-table-offset-add-24-filled/>
                            </template>
                        </Button>
                    </template>
                    <template #roweditoriniticon>
                        <i-material-symbols-edit class="text-lg xd"/>
                    </template>
                    <template #roweditorsaveicon>
                        <i-ic-baseline-save-all class="text-lg xd"/>
                    </template>
                    <template #roweditorcancelicon>
                        <i-solar-close-square-bold class="text-lg xd"/>
                    </template>
                </Column>
            </DataTable>
        </div>
        <view-list-table :table="arrayTable" v-if="arrayTable?.id !== undefined"/>
        <div v-else
             class="flex w-full items-center justify-center rounded-xl border min-h-36 bg-surface-100 dark:bg-surface-800 dark:border-slate-700 md:w-3/4">
            <i-ic-round-hourglass-empty class="mx-1 animate-spin text-3xl"/>
            <span class="text-xl"> Seleccione una area para modificar </span>
        </div>
        <modal-component :parameters="parametersModal"/>
    </div>
</template>
