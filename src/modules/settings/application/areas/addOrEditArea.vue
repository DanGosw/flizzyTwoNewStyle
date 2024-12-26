<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import Button from "primevue/button";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import toastErrorMessageForm from "@/hooks/composables/toastServer/toastEvent.js";

const toast = useToast();

const props = defineProps({
    closeModal: { type: Function, default: () => { }, required: true },
    refreshData: { type: Function, default: () => { }, required: true },
    formData: { type: Object, default: () => {}, required: false }
});

const schemaValidate = ref(yup.object().shape({
    areaName: yup.string().trim().required("Ingrese el nombre de area").label("Area"),
    tableQuantity: yup.number().required("Ingrese un numero").label("Cantidad"),
    tableCode: yup.string().trim().required("Codigo requerido").min(3, "Ingresa al menos 8 caracteres").label("Codigo"),
    tableName: yup.string().trim().required("Nombre de mesa requerido").min(3, "Ingresa al menos 8 caracteres").label("Mesa")
}));

const fields = ref({
    areaName: "",
    tableQuantity: 1,
    tableCode: "",
    tableName: ""
});

const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: areaName, handleBlur: areaNameBlur } = useField("areaName");
const { value: tableQuantity, handleBlur: tableQuantityBlur } = useField("tableQuantity");
const { value: tableCode, handleBlur: tableCodeBlur } = useField("tableCode");
const { value: tableName, handleBlur: tableNameBlur } = useField("tableName");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    onReset();
    toast.add({ severity: "info", summary: "Title xd", detail: values, life: 10000 });
    toast.add({ severity: "success", detail: "Area agregada correctamente", life: 10000 });
}, ({ errors }) => {
    const errorMessages = Object.entries(errors).map(([field, message]) => `${field}: ${message}`).join(", ");
    toastErrorMessageForm(`Complete los siguientes campos: ${errorMessages}`);
});

const onReset = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

</script>

<template>
    <div class="align-items-form">
        <form-item for="docNumber" label="Nombre de Area" mark :error="errors.areaName" cols="6">
            <InputText v-model="areaName" id="docNumber" :invalid="!!errors.areaName" size="small" @blur="areaNameBlur($event, true)"/>
        </form-item>
        <form-item for="denomination" label="Cantidad de Mesas" mark :error="errors.tableQuantity" cols="6">
            <InputNumber v-model="tableQuantity" id="denomination" size="small" :invalid="!!errors.tableQuantity" show-buttons :min="1"
                         button-layout="horizontal" @blur="tableQuantityBlur($event, true)" fluid input-class="w-full"/>
        </form-item>
        <form-item for="legalRep" label="Cod. de Mesa" mark :error="errors.tableCode" cols="6">
            <InputText v-model="tableCode" id="legalRep" size="small" :invalid="!!errors.tableCode" @blur="tableCodeBlur($event, true)"
                       class="w-full"/>
        </form-item>
        <form-item for="token" label="Nombre de Mesas" mark :error="errors.tableName" cols="6">
            <InputText v-model="tableName" id="token" size="small" :invalid="!!errors.tableName" @blur="tableNameBlur($event, true)"/>
        </form-item>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
        <Button label="Cancelar" severity="secondary" outlined raised class="w-full" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Crear Empresa" class="w-full" @click="onSubmit">
            <template #icon>
                <i-material-symbols-add-business-outline-rounded class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
