<script setup>
/* Imports */
import addUsers from "@/modules/settings/users/addUsers.vue";
import changeSecurityCode from "@/modules/settings/users/changeSecurityCode.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import UsersList from "@/modules/settings/users/usersList.vue";
import router from "@/routes/index.js";

/* Defaults Variables */
const refUserList = ref();

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

const componentAddUserModal = h(addUsers, {
    closeModal,
    refreshData: () => {refUserList.value.loadUserList();},
    formData: {}
});

const addParametersUserModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Nuevo usuario",
        width: "55vw",
        footer: "",
        component: componentAddUserModal
    };
};

const componentCodeModal = h(changeSecurityCode, {
    closeModal
});

const addParametersCodeModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Cambiar clave de seguridad",
        width: "30vw",
        footer: "",
        component: componentCodeModal
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
                            <i-material-symbols-arrow-back-rounded class=""/>
                        </template>
                    </Button>
                    <p>Configuración de Usuarios</p>
                </div>
                <div class="align-header">
                    <Button label="Cambiar Clave de Seguridad" rounded size="small" severity="warn" @click="addParametersCodeModal">
                        <template #icon>
                            <i-ri-lock-password-line class="mx-1"/>
                        </template>
                    </Button>
                    <Button label="Nuevo usuario" rounded size="small" @click="addParametersUserModal">
                        <template #icon>
                            <i-fluent-person-add-32-regular class="mx-1"/>
                        </template>
                    </Button>
                </div>
                <Divider class="!my-0 !mt-2"/>
            </div>
        </template>
        <template #content>
            <users-list ref="refUserList"/>
            <modal-component ref="modal" :parameters="parametersModal"/>
        </template>
    </Card>
</template>
