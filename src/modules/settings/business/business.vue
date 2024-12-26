<script setup>

import BusinessList from "@/modules/settings/business/businessList.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import addBusiness from "@/modules/settings/business/addBusiness.vue";
import router from "@/routes/index.js";

/* Defaults Variables */
const refBusinessList = ref();

/**
 * @params {Function} closeModal - Function that returns visible of the modal.
 * @returns {void} - Change the visibility of the modal
 */
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

const componentAddUBusinessModal = h(addBusiness, {
    closeModal,
    refreshData: () => {refBusinessList.value.loadBusiness();}
});

const addParametersBusinessModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Nueva Empresa",
        width: "55vw",
        footer: "",
        component: componentAddUBusinessModal
    };
};
</script>

<template>
    <Card>
        <template #title>
            <div class="align-header">
                <div class="flex gap-2 items-center">
                    <Button severity="secondary" size="small" class="!px-2" rounded @click="router.push({name: 'settings', force: true})">
                        <template #icon>
                            <i-material-symbols-arrow-back-rounded/>
                        </template>
                    </Button>
                    <p>Lista de Empresas</p>
                </div>
                <div class="align-header">
                    <Button label="Agregar Empresa" rounded size="small" @click="addParametersBusinessModal()">
                        <template #icon>
                            <i-material-symbols-add-business-outline-rounded class="mx-1"/>
                        </template>
                    </Button>
                </div>
                <Divider class="!my-0 !mt-2"/>
            </div>
        </template>
        <template #content>
            <business-list ref="refBusinessList"/>
            <modal-component ref="modal" :parameters="parametersModal"/>
        </template>
    </Card>
</template>
