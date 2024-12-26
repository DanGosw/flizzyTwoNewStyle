<script setup>

/* Imports */
import addUsers from "@/modules/settings/users/addUsers.vue";
import EmptyTable from "@/hooks/components/empty/emptyTable.vue";
import LoadingData from "@/hooks/components/loading/loadingData.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import { io } from "socket.io-client";

/* Defaults Variables */
const socket = io("http://192.168.18.111:5180");
const data = ref();
const totalLength = ref(0);
const page = ref(1);
const loading = ref(true);
const pageSize = ref(10);

/**
 * @params {Function} closeModal - Function that returns visible of the modal.
 * @returns {void} - Change the visibility of the modal
 */
const closeModal = () => {
    parametersModal.value.visible = false;
};

/**
 * Carga datos de la API de usuarios.
 *
 * @async
 * @function loadUserList
 * @description Realiza una llamada a la API de usuarios para obtener una lista de usuarios basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de usuarios a retornar.
 * @params {number} options. Offset - El desplazamiento de inicio para la consulta de usuarios.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadUserList = () => {
    loading.value = true;
    socket.emit("getAnyData", { limit: 10, offset: 0 });
};

socket.on("anyData", (response) => {
    console.log("Received pokemonData event with response:", response);
    data.value = response;
    totalLength.value = response.length;
    loading.value = false;
});

socket.on("anyDataError", (error) => {
    console.error("Error received from server:", error);
    loading.value = false;
});

/**
 * Change the pagination.
 * @params {event} event
 * @returns {Promise<void>} - La promesa que representa el proceso de cambio de paginación.
 */
const onPageChange = async(event) => {
    page.value = event.page + 1;
    pageSize.value = event.rows;
    await loadUserList();
};

const parametersModal = ref({
    /**
     * @params {boolean} false - default value.
     * @description Visible of the modal.
     */
    visible: false,
    /**
     *  @params {string} - default value.
     *  @description Title of the modal.
     */
    header: "",
    /**
     *  @params {string} - default value.
     *  @default default width is 50vh.
     *  @description Width of the modal.
     */
    width: "30vw",
    /**
     *  @params {Component} - Returns a component in footer modal.
     *  @description Footer of the modal.
     */
    footer: () => {},
    /**
     * @params {Component} - Function that returns a component
     * @description Component of the modal.
     */
    component: () => {}
});

const componentAddUserModal = h(addUsers, {
    closeModal,
    refreshData: () => {loadUserList();},
    formData: {
        docNumber: "71151",
        names: "f",
        lastnames: "sds",
        address: "sdfsd",
        company: "sdfsdf",
        branch: "vvff",
        email: "",
        profile: "",
        username: "",
        code: "",
        id: 1,
        codeConfirm: ""
    }
});

const addParametersUserModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Editar usuario",
        width: "55vw",
        footer: "",
        component: componentAddUserModal
    };
};

/**
 * Carga la lista de usuarios.
 */
onMounted(() => {
    socket.on("connect", () => {
        console.log("Connected to WebSocket server with id:", socket.id);
        loadUserList(); // Ejecuta la consulta al conectarse
    });

    // Escuchar el evento de actualización de datos
    socket.on("dataUpdated", (updatedData) => {
        console.log("Data updated:", updatedData);
        loadUserList(); // Recargar los datos después de una actualización
    });
});

const deleteUSER = async(id) => {
    const response = await axios.delete(`https://api-generator.retool.com/2KgZIV/data/${id}`);
    console.log(response);
    await loadUserList();
};

defineExpose({ loadUserList });
</script>

<template>
    <div class="relative">
        <i-ri-search-line class="absolute top-2/4 left-3 -mt-2.5 text-surface-400 dark:text-surface-600"/>
        <InputText placeholder="Buscar usuario" class="pl-10 !rounded-full !max-w-96" size="small"/>
    </div>
    <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="65vh" scrollable
               :row-class="()=>{'text-center'}" :rowsPerPageOptions="[10,20,50]" :total-records="totalLength" lazy :loading="loading"
               @page="onPageChange" dataKey="code" tableStyle="min-width: 80rem;" class="mt-4" paginator :rows="pageSize">
        <template #empty>
            <empty-table/>
        </template>
        <template #loading>
            <loading-data/>
        </template>
        <Column style="width: 5%" field="dni" header="DNI"/>
        <Column style="width: 10%" field="name" header="Nombres"/>
        <Column style="width: 10%" field="url" header="Correo"/>
        <Column style="width: 10%" field="id" header="Perfil"/>
        <Column style="width: 10%" field="id" header="Sucursal"/>
        <Column style="width: 10%" field="id" header="Estado"/>
        <Column style="width: 5%" header="Acciones">
            <template #body="{data}">
                <div class="flex items-center justify-center space-x-1">
                    <Button size="small" severity="warn" v-tooltip.top="'Editar Usuario'" @click="addParametersUserModal"
                            class="!p-0.5">
                        <template #icon>
                            <i-tabler-user-edit class="mx-0.5"/>
                        </template>
                    </Button>
                    <Button size="small" v-tooltip.top="'Editar Permisos'" @click="deleteUSER(data.id)" class="!p-0.5">
                        <template #icon>
                            <i-material-symbols-list-alt-add-outline class="mx-0.5"/>
                        </template>
                    </Button>
                    <Button size="small" severity="info" v-tooltip.top="'Cambiar Contraseña'" @click="addParametersUserModal"
                            class="!p-0.5">
                        <template #icon>
                            <i-material-symbols-lock class="mx-0.5"/>
                        </template>
                    </Button>
                    <Button size="small" severity="danger" v-tooltip.top="'Bloquear usuario'" @click="addParametersUserModal"
                            class="!p-0.5">
                        <template #icon>
                            <i-solar-user-block-outline class="mx-0.5"/>
                        </template>
                    </Button>
                </div>
            </template>
        </Column>
    </DataTable>
    <modal-component ref="modal" :parameters="parametersModal"/>
</template>
