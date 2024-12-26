<script setup>

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

const tableSchema = ref(
    [
        {
            "id": 1,
            "description": "COCINA",
            "printer_name": "Microsoft Print to PDF",
            "printer_format": "80 mm",
            "active": true,
            "is_main": true
        },
        {
            "id": 2,
            "description": "BARRA",
            "printer_name": "Microsoft Print to PDF",
            "printer_format": "80 mm",
            "active": false,
            "is_main": true
        },
        {
            "id": 3,
            "description": "BAR",
            "printer_name": "Microsoft Print to PDF",
            "printer_format": "80 mm",
            "active": true,
            "is_main": true
        }
    ]
);

const editingRows = ref();

const saveRowEdit = ({ data }) => {
    console.log(data);
};

</script>

<template>
    <div class="align-header">
        <div class="text-xl">
            <p>Editar lugares de preparación</p>
        </div>
        <div class="align-header">
            <Button label="Agregar Zona" rounded size="small" @click="addParametersAreaModal()">
                <template #icon>
                    <i-material-symbols-add-business-outline-rounded class="mx-1"/>
                </template>
            </Button>
        </div>
        <Divider class="!my-0 !mt-2"/>
    </div>
    <DataTable size="small" striped-rows show-gridlines dataKey="code" tableStyle="min-width: 45rem;" :value="tableSchema"
               edit-mode="row" v-model:editing-rows="editingRows" data-key="id" @row-edit-save="saveRowEdit">
        <Column field="description" header="Areas" style="width: 10%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" class="w-full" size="small"/>
            </template>
        </Column>
        <Column field="printer_name" header="N. Impresora" style="width: 10%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" class="w-full" size="small"/>
            </template>
        </Column>
        <Column field="printer_format" header="Formato de impresora" style="width: 10%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" class="w-full" size="small"/>
            </template>
        </Column>
        <Column field="active" header="Estado" style="width: 10%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" class="w-full" size="small"/>
            </template>
            <template #body="{data}">
                <Tag :severity="data.active ? 'success' : 'warn'" rounded :value="data.active ? 'ACTIVO' : 'INACTIVO' "/>
            </template>
        </Column>
        <Column row-editor style="width: 2%" class="xd">
            <template #roweditoriniticon>
                <i-material-symbols-edit class="xd text-[14px]"/>
            </template>
            <template #roweditorsaveicon>
                <i-ic-baseline-save-all class="xd text-[14px]"/>
            </template>
            <template #roweditorcancelicon>
                <i-solar-close-square-bold class="xd text-[14px]"/>
            </template>
        </Column>
    </DataTable>
    <modal-component :parameters="parametersModal"/>
</template>
