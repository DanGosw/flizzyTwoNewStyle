<script setup>

import EmptyTable from "@/hooks/components/empty/emptyTable.vue";
import LoadingData from "@/hooks/components/loading/loadingData.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import addCustomer from "@/modules/customer/addCustomer.vue";

const props = defineProps({ filters: { type: Object, default: {}, required: false } });
const toast = useToast();
const data = ref();
const totalLength = ref(0);
const page = ref(1);
const loading = ref(true);
const pageSize = ref(10);

const parametersModal = ref({
    visible: false,
    header: "",
    width: "65vw",
    footer: () => {},
    component: () => {}
});

const closeModal = () => { parametersModal.value.visible = false; };

const componentEditClientModal = h(addCustomer, {
    /**
     * Function to close de modal
     */
    closeModal,
    /**
     * Function to reload data when customer is added
     */
    refreshData: () => {loadCustomer();},
    /**
     * initial data to form
     */
    formData: {
        id: 1,
        docType: "DNI",
        docNumber: "76541515",
        names: "tetalover",
        lastnames: "tetas",
        address: [{ location: "por ai", ubigeo: "A-WO" }],
        email: "tetalover@gmail.com",
        genere: "MACHETE",
        birthday: "07-04-2001",
        phone: "912117645"
    }
});

const editCustomerModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Editar Cliente",
        width: "60vw",
        footer: null,
        component: componentEditClientModal
    };
};

/* Methods */
const deleteClient = (idx) => {
    data.value = data.value.filter((_, ind) => ind !== idx);
    console.log(data.value);
    toast.add({ severity: "error", summary: "Title xd", detail: idx, life: 5000 });
};

/**
 * Carga datos de la API de Pokémon.
 *
 * @async
 * @function loadCustomer
 * @description Realiza una llamada a la API de Pokémon para obtener una lista de Pokémon basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de Pokémon a retornar.
 * @params {number} options. offset - El desplazamiento de inicio para la consulta de Pokémon.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadCustomer = async() => {
    loading.value = true;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`,
        { params: { limit: pageSize.value, offset: (page.value - 1) * pageSize.value } });
    data.value = response.data.results;
    totalLength.value = response.data.count;
    loading.value = false;
};

/**
 * Change the pagination.
 * @params {event} event
 * @returns {Promise<void>} - La promesa que representa el proceso de cambio de paginación.
 */
const onPageChange = async(event) => {
    page.value = event.page + 1;
    pageSize.value = event.rows;
    await loadCustomer();
};

/**
 * Carga la lista de usuarios.
 */
onMounted(() => {
    loadCustomer();
});

defineExpose({ loadCustomer });
</script>

<template>
    <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="65vh"
               :rowsPerPageOptions="[10,20,50]" :total-records="totalLength" lazy scrollable @page="onPageChange" :loading="loading"
               dataKey="code" tableStyle="min-width: 60rem;" paginator :rows="pageSize">
        <template #empty>
            <empty-table/>
        </template>
        <template #loading>
            <loading-data/>
        </template>
        <Column style="width: 10%" field="dni" header="Documento">
            <template #body="{index}">
                {{ index + 1 }} : {{ data.docNumber || "71111459" }}
            </template>
        </Column>
        <Column style="width: 10%" field="name" header="Nombres"/>
        <Column style="width: 10%" field="address" header="Dirección"/>
        <Column style="width: 10%" field="birthday" header="F. Nacimiento"/>
        <Column style="width: 10%" field="phone" header="Teléfono"/>
        <!--        <Column style="width: 10%" field="email" header="Correo"/>-->
        <Column style="width: 10%" field="status" header="Estado"/>
        <Column style="width: 3%" header="Acciones">
            <template #body="{index}">
                <div class="flex items-center justify-start space-x-1">
                    <Button size="small" severity="warn" v-tooltip.top="'Editar Cliente'" @click="editCustomerModal"
                            class="!p-[0.5px]">
                        <template #icon>
                            <i-tabler-user-edit class="mx-0.5"/>
                        </template>
                    </Button>
                    <Button size="small" severity="danger" v-tooltip.top="'Bloquear cliente'" @click="deleteClient(index)"
                            class="!p-[0.5px]">
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
