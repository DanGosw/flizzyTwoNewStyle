<script setup>

import EmptyTable from "@/hooks/components/empty/emptyTable.vue";
import LoadingData from "@/hooks/components/loading/loadingData.vue";
import addBranch from "@/modules/settings/branchs/addBranch.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";

const props = defineProps({ filters: { type: Object, default: {}, required: false } });
const toast = useToast();
const data = ref();
const totalLength = ref(0);
const page = ref(1);
const loading = ref(true);
const pageSize = ref(10);

/**
 * Carga datos de la API de Pokémon.
 *
 * @async
 * @function loadBranchs
 * @description Realiza una llamada a la API de Pokémon para obtener una lista de Pokémon basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de Pokémon a retornar.
 * @params {number} options. offset - El desplazamiento de inicio para la consulta de Pokémon.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadBranchs = async() => {
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
    await loadBranchs();
};

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

const componentAddBranchModal = h(addBranch, {
    closeModal,
    refreshData: () => { loadBranchs();},
    formData: {
        branchName: "Arizona",
        business: 1,
        address: "po yi",
        ubigeo: "A-SY",
        description: "ekizde",
        email: "tetas@gmail.com",
        phone: "912117645",
        legendAsset: "amia pa kchar p",
        legendService: "trikitrakatelas",
        legendReturn: "xd",
        logoMini: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO5ObIgTpTT-aJ_y3YvynL6LyKLKTQRu38Xg&s",
        logoA4: "https://img.wattpad.com/cover/246586078-288-k411216.jpg",
        logoTicket: "data:image/jpeg;base64,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",
        sendAutomatic: false
    }
});

const addParametersBranchModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Editar Sucursal",
        width: "70vw",
        footer: "",
        component: componentAddBranchModal
    };
};

/**
 * Carga la lista de usuarios.
 */
onMounted(() => {
    loadBranchs();
});

defineExpose({ loadBranchs });

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
                    <Button size="small" v-tooltip.top="'Editar Sucursal'" @click="addParametersBranchModal" class="!p-0.5">
                        <template #icon>
                            <i-material-symbols-box-edit-outline-rounded class="mx-0.5"/>
                        </template>
                    </Button>
                    <!--                    <Button size="small" v-tooltip.top="'Editar Cliente'" @click="showMessage" class="!p-1">-->
                    <!--                        <template #icon>-->
                    <!--                            <i-material-symbols-box-edit-outline-rounded class="mx-0.5"/>-->
                    <!--                        </template>-->
                    <!--                    </Button>-->
                </div>
            </template>
        </Column>
    </DataTable>
    <modal-component ref="modal" :parameters="parametersModal"/>
</template>
