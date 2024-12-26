<script setup>

import EmptyTable from "@/hooks/components/empty/emptyTable.vue";
import LoadingData from "@/hooks/components/loading/loadingData.vue";
import { io } from "socket.io-client";

const socket = io("http://192.168.18.111:5180");
// Define eventos del socket

const props = defineProps({ filters: { type: Object, default: {}, required: false } });
const toast = useToast();
const data = ref();
const totalLength = ref(0);
const page = ref(1);
const loading = ref(true);
const pageSize = ref(10);

/* Methods */
const showMessage = (info) => {
    console.log(info);
    /* Toast  @params {severity: 'success|info|warn|error', summary: 'string', detail: 'string', life: 'number'}*/
    toast.add({ severity: "info", summary: "Title xd", detail: info.type, life: 5000 });
    toast.add({ severity: "success", summary: "Title xd", detail: info.type, life: 5000 });
    toast.add({ severity: "contrast", summary: "Title xd", detail: info.type, life: 5000 });
    toast.add({ severity: "error", summary: "Title xd", detail: info.type, life: 5000 });
    toast.add({ severity: "secondary", summary: "Title xd", detail: info.type, life: 5000 });
    toast.add({ severity: "warn", summary: "Title xd", detail: info.type, life: 5000 });
};

/**
 * Carga datos de la API de Pokémon.
 *
 * @async
 * @function loadBusiness
 * @description Realiza una llamada a la API de Pokémon para obtener una lista de Pokémon basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de Pokémon a retornar.
 * @params {number} options. offset - El desplazamiento de inicio para la consulta de Pokémon.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadBusiness = () => {
    loading.value = true;
    socket.emit("getPokemonData", { limit: pageSize.value, offset: (page.value - 1) * pageSize.value });
};

socket.on("pokemonData", (response) => {
    console.log("Received pokemonData event with response:", response);
    data.value = response.results;
    totalLength.value = response.count;
    loading.value = false;
});

socket.on("pokemonDataError", (error) => {
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
    await loadBusiness();
};

/**
 * Carga la lista de usuarios.
 */
onMounted(() => {
    socket.on("connect", () => {
        console.log("Connected to WebSocket server with id:", socket.id);
        loadBusiness(); // Ejecuta la consulta al conectarse
    });
});

defineExpose({ loadBusiness });
</script>

<template>
    <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="65vh"
               :rowsPerPageOptions="[10,20,50]" :total-records="totalLength" lazy scrollable @page="onPageChange" :loading="loading"
               dataKey="code" tableStyle="min-width: 70rem;" paginator :rows="pageSize">
        <template #empty>
            <empty-table/>
        </template>
        <template #loading>
            <loading-data/>
        </template>
        <Column style="width: 10%" field="dni" header="RUC">
            <template #body="{data}">
                {{ data.docType || "DNI" }}: {{ data.docNumber || "71111459" }}
            </template>
        </Column>
        <Column style="width: 10%" field="name" header="Denominación"/>
        <Column style="width: 10%" field="address" header="Representante Legal"/>
        <Column style="width: 10%" field="birthday" header="Sitio Web"/>
        <Column style="width: 10%" field="phone" header="URL Sistema"/>
        <Column style="width: 10%" field="email" header="CPE"/>
        <Column style="width: 2%" header="Acciones">
            <template #body>
                <div class="flex items-center justify-center space-x-1">
                    <Button size="small" v-tooltip.top="'Editar Cliente'" @click="showMessage" class="!p-0.5">
                        <template #icon>
                            <i-material-symbols-box-edit-outline-rounded class="mx-0.5"/>
                        </template>
                    </Button>
                    <!--                    <Button size="small" severity="danger" v-tooltip.top="'Bloquear cliente'" @click="showMessage" class="!p-0.5">-->
                    <!--                        <template #icon>-->
                    <!--                            <i-solar-user-block-outline class="mx-0.5"/>-->
                    <!--                        </template>-->
                    <!--                    </Button>-->
                </div>
            </template>
        </Column>
    </DataTable>
</template>
