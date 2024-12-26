<script setup>
import { useNumericInput } from "@/hooks/composables/inputMethods/inputMethods.js";
import Button from "primevue/button";
import { ref } from "vue";
import * as yup from "yup";
import { configure, useField, useFieldArray, useForm } from "vee-validate";
import CascadeSelectArray from "@/hooks/components/inputsRequired/cascadeSelectArray.vue";
import InputValidateArray from "@/hooks/components/inputsRequired/inputValidateArray.vue";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import toastErrorMessageForm from "@/hooks/composables/toastServer/toastEvent.js";

configure({
    validateOnBlur: true
});

const toast = useToast();

const props = defineProps({
    closeModal: { type: Function, default: () => { }, required: true },
    refreshData: { type: Function, default: () => { }, required: true },
    formData: { type: Object, default: () => { }, required: true }
});

const optionsDocument = ref([
    { name: "DNI", value: "DNI" },
    { name: "RUC", value: "RUC" },
    { name: "PASAPORTE", value: "PASAPORTE" }
]);

const optionsGenere = ref([
    { name: "SIN GENERO", value: "SIN" },
    { name: "MASCULINO", value: "MASCULINO" },
    { name: "FEMENINO", value: "FEMENINO" },
    { name: "MACHETE", value: "MACHETE" },
    { name: "SEMI AUTOMÁTICO", value: "SEMI AUTOMÁTICO" }
]);

const schemaValidate = ref(yup.object().shape({
    address: yup.array().of(
        yup.object().shape({
            location: yup.string().trim("No se permiten espacios en blanco").required("Ingrese una dirección").label("Dirección"),
            ubigeo: yup.string().trim("No se permiten espacios en blanco").required("Seleccione un ubigeo").label("Ubigeo")
        })
    ).required("Ingrese al menos una dirección").label("Dirección").strict(),
    docType: yup.string().required("Seleccione un documento").label("Documento"),
    docNumber: yup.string().trim().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    // add this when validate sales in the future
    // docNumber: yup.string().trim().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI").
    //     when(["docType", "names"], {
    //         is: (docType, names) => docType === "DNI" && names === "tetas",
    //         then: () => yup.string().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    //         otherwise: () => yup.string().trim().label("DNI")
    //     }),
    names: yup.string().trim().required("Ingrese un nombre").label("Nombre"),
    lastnames: yup.string().trim().required("Ingrese su apellido").label("Apellidos"),
    genere: yup.string().required("Seleccione un genero").label("Dirección")
}));

const fields = ref({
    docType: undefined,
    docNumber: "",
    names: "",
    lastnames: "",
    address: [{ location: null, ubigeo: null }],
    email: "",
    genere: "",
    birthday: "",
    phone: ""
});

onMounted(() => {
    if(props.formData?.id) {
        setValues(props.formData);
    }
});

const { handleSubmit, resetForm, errors, setValues } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: names, handleBlur: namesBlur } = useField("names");
const { value: lastnames, handleBlur: lastnamesBlur } = useField("lastnames");
const { value: genere, handleBlur: genereBlur } = useField("genere");
const { value: docType, handleBlur: docTypeBlur } = useField("docType");
const { value: birthday } = useField("birthday");
const { value: phone } = useField("phone");
const { value: email } = useField("email");
const { fields: valueFields, push: addDirection, remove: removeAddress } = useFieldArray("address");

const { handleInputReactive: handleInputDocNumber } = useNumericInput(docNumber);
const { handleInputReactive: handleInputPhone } = useNumericInput(phone);

const ubigeoOptions = ref([
    {
        name: "Australia",
        code: "AU",
        states: [
            {
                name: "New South Wales",
                cities: [
                    { cname: "Sydney", code: "A-SY" },
                    { cname: "Newcastle", code: "A-NE" },
                    { cname: "Wollongong", code: "A-WO" }
                ]
            },
            {
                name: "Queensland",
                cities: [
                    { cname: "Brisbane", code: "A-BR" },
                    { cname: "Townsville", code: "A-TO" }
                ]
            }
        ]
    },
    {
        name: "Canada",
        code: "CA",
        states: [
            {
                name: "Quebec",
                cities: [
                    { cname: "Montreal", code: "C-MO" },
                    { cname: "Quebec City", code: "C-QU" }
                ]
            },
            {
                name: "Ontario",
                cities: [
                    { cname: "Ottawa", code: "C-OT" },
                    { cname: "Toronto", code: "C-TO" }
                ]
            }
        ]
    },
    {
        name: "United States",
        code: "US",
        states: [
            {
                name: "California",
                cities: [
                    { cname: "Los Angeles", code: "US-LA" },
                    { cname: "San Diego", code: "US-SD" },
                    { cname: "San Francisco", code: "US-SF" }
                ]
            },
            {
                name: "Florida",
                cities: [
                    { cname: "Jacksonville", code: "US-JA" },
                    { cname: "Miami", code: "US-MI" },
                    { cname: "Tampa", code: "US-TA" },
                    { cname: "Orlando", code: "US-OR" }
                ]
            },
            {
                name: "Texas",
                cities: [
                    { cname: "Austin", code: "US-AU" },
                    { cname: "Dallas", code: "US-DA" },
                    { cname: "Houston", code: "US-HO" }
                ]
            }
        ]
    }
]);

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    onReset();
    toast.add({ severity: "info", summary: "Title xd", detail: values, life: 10000 });
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
        <form-item for="documentType" label="Documento" mark :error="errors.docType" cols="4">
            <Select v-model="docType" input-id="documentType" size="small" :options="optionsDocument" optionLabel="name" show-clear
                    :invalid="!!errors.docType" optionValue="value" @blur="docTypeBlur($event, true)" class="w-full"/>
        </form-item>

        <form-item for="dni" label="DNI" mark :error="errors.docNumber" cols="4">
            <InputGroup class="w-full">
                <InputText v-model.number="docNumber" id="dni" maxlength="8" :invalid="!!errors.docNumber"
                           size="small" @blur="docNumberBlur($event, true)" @input="handleInputDocNumber"/>
                <Button size="small" raised>
                    <template #icon>
                        <i-material-symbols-manage-search-rounded class="!mx-1 text-lg"/>
                    </template>
                </Button>
            </InputGroup>
        </form-item>

        <form-item for="genere" label="Genero" mark :error="errors.genere" cols="4">
            <Select v-model="genere" input-id="genere" size="small" :options="optionsGenere" optionLabel="name"
                    :invalid="!!errors.genere" optionValue="value" @blur="genereBlur($event, true)" class="w-full"/>
        </form-item>

        <form-item for="names" label="Nombres" mark :error="errors.names" cols="6">
            <InputText v-model="names" id="names" size="small" :invalid="!!errors.names" @blur="namesBlur($event, true)"/>
        </form-item>

        <form-item for="lastnames" label="Apellidos" mark :error="errors.lastnames" cols="6">
            <InputText v-model="lastnames" id="lastnames" size="small" :invalid="!!errors.lastnames" @blur="lastnamesBlur($event, true)"/>
        </form-item>

        <form-item for="birthday" label="F. Nacimiento" hide-error cols="4">
            <DatePicker v-model="birthday" class="!w-full" size="small" input-id="birthday" date-format="dd-mm-yy" show-icon/>
        </form-item>

        <form-item for="cellphone" label="Teléfono" hide-error cols="4">
            <InputText v-model="phone" id="cellphone" size="small" maxlength="9" @input="handleInputPhone"/>
        </form-item>

        <form-item for="email" label="Correo" hide-error cols="4">
            <InputText v-model="email" id="email" size="small"/>
        </form-item>

    </div>
    <div class="my-2 flex flex-wrap items-center justify-center space-x-0 space-y-2 sm:space-x-2 sm:space-y-0">
        <div class="">
            Direcciones
        </div>
        <div class="flex-grow">
            <Divider class="w-full !my-1" align="right">
                <Button label="Agregar Dirección" size="small" class="w-full" @click="addDirection(fields.address[0])"
                        :disabled="valueFields.length ===6">
                    <template #icon>
                        <i-material-symbols-add-location-alt-outline-rounded/>
                    </template>
                </Button>
            </Divider>
        </div>
    </div>
    <div class="align-items-form" v-for="(data, index) in valueFields" :key="data.key">
        <cascade-select-array :options="ubigeoOptions" :name="`address[${index}].ubigeo`" label="Ubigeo"
                              option-value="code"
                              :value="data.value.ubigeo" option-group-label="name" option-label="cname" showMark
                              cols="4" :option-group-children="['states', 'cities']"/>
        <input-validate-array :name="`address[${index}].location`" label="Dirección" :value="data.value.location"
                              show-mark :cols="`${index !== 0 ? '7' : '8'}`"/>

        <div class="col-span-1 flex items-center justify-center">
            <Button severity="danger" @click="removeAddress(index)" v-if="index !== 0" size="small" class="mt-6 w-full">
                <template #icon>
                    <i-mdi-delete-empty-outline/>
                </template>
            </Button>
        </div>
    </div>

    <div class="mt-2 flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
        <Button label="Cancelar" severity="secondary" outlined raised class="w-full" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Crear Usuario" class="w-full" @click="onSubmit">
            <template #icon>
                <i-ri-user-add-line class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
