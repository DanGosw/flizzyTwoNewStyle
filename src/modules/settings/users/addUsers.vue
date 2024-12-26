<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import { useNumericInput } from "@/hooks/composables/inputMethods/inputMethods.js";

const props = defineProps({
    closeModal: { type: Function, default: () => {}, required: true },
    refreshData: { type: Function, default: () => {}, required: true },
    formData: { type: Object, default: () => {}, required: true }
});

const dropdownItems = ref([
    { name: "Option 1", value: "1" },
    { name: "Option 2", value: "2" },
    { name: "Option 3", value: "3" }
]);

const schemaValidate = ref(yup.object({
    docNumber: yup.string().trim().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    names: yup.string().trim().required("Ingrese un nombre").label("Nombre"),
    lastnames: yup.string().trim().required("Ingrese su apellido").label("Apellidos"),
    address: yup.string().trim().required("Ingrese su dirección").label("Dirección"),
    company: yup.string().trim().required("Seleccione una empresa").label("Empresa"),
    branch: yup.string().trim().required("Seleccione una sucursal").label("Sucursal"),
    profile: yup.string().trim().required("Seleccione un perfil").label("Perfil"),
    username: yup.string().trim().required("Ingrese su usuario").label("Usuario").min(5, "Ingresa al menos 5 caracteres"),
    password: yup.string().trim().required("Ingrese su contraseña").label("Contraseña").min(5, "Ingresa al menos 5 caracteres"),
    passwordConfirm: yup.string().trim().required("La confirmación es requerida").
        oneOf([yup?.ref("password")], "La contraseña no coincide").
        label("Confirm. Contraseña").min(5, "Ingresa al menos 5 caracteres")
}));

const fields = ref({
    docNumber: "",
    names: "",
    lastnames: "",
    address: "",
    company: "",
    branch: "",
    email: "",
    profile: "",
    username: "",
    password: "",
    passwordConfirm: ""
});

// Watch for changes in formData prop
watch(() => props.formData, () => {
    fields.value = props.formData;
}, { immediate: true });

/**
 * add initial values to form, get methods to validate form
 */
const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: names, handleBlur: namesBlur } = useField("names");
const { value: lastnames, handleBlur: lastnamesBlur } = useField("lastnames");
const { value: address, handleBlur: addressBlur } = useField("address");
const { value: company, handleBlur: companyBlur } = useField("company");
const { value: branch, handleBlur: branchBlur } = useField("branch");
const { value: email } = useField("email");
const { value: profile, handleBlur: profileBlur } = useField("profile");
const { value: username, handleBlur: usernameBlur } = useField("username");
const { value: password, handleBlur: passwordBlur } = useField("password");
const { value: passwordConfirm, handleBlur: passwordConfirmBlur } = useField("passwordConfirm");
/**
 * validation input
 */
const { handleInputReactive: handleInputDocNumber } = useNumericInput(docNumber);

const onSubmit = handleSubmit((values) => {
    /**
     * Send Values to Api
     */
    reloadData();
    console.log("Submitted with", values);
}, ({ errors }) => {
    console.log(errors);
});

const reloadData = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

</script>

<template>
    <div class="align-items-form">
        <form-item for="docNumber" label="DNI" mark :error="errors.docNumber" cols="4">
            <InputGroup class="w-full">
                <InputText v-model.trim="docNumber" id="docNumber" maxlength="8" :invalid="!!errors.docNumber" size="small"
                           @blur="docNumberBlur($event, true)" @input="handleInputDocNumber"/>
                <Button size="small">
                    <template #icon>
                        <i-material-symbols-manage-search-rounded class="!mx-1"/>
                    </template>
                </Button>
            </InputGroup>
        </form-item>
        <form-item for="names" label="Nombres" mark :error="errors.names" cols="4">
            <InputText v-model="names" id="names" :invalid="!!errors.names" size="small" @blur="namesBlur($event, true)"/>
        </form-item>
        <form-item for="lastnames" label="Apellidos" mark :error="errors.lastnames" cols="4">
            <InputText v-model="lastnames" id="lastnames" :invalid="!!errors.lastnames" size="small"
                       @blur="lastnamesBlur($event, true)"/>
        </form-item>
        <form-item for="email" label="Correo" cols="6">
            <InputText v-model="email" id="email" size="small"/>
        </form-item>
        <form-item for="address" label="Dirección" mark :error="errors.address" cols="6">
            <InputText v-model="address" id="address" :invalid="!!errors.address" size="small" class="w-full"
                       @blur="addressBlur($event, true)"/>
        </form-item>
        <form-item for="company" label="Empresa / Sucursal" mark :error="`${errors.company || ''} ${errors.branch || ''}`.trim()" cols="6">
            <InputGroup>
                <InputText v-model="company" id="company" :invalid="!!errors.company" size="small" @blur="companyBlur($event, true)"/>
                <InputText v-model="branch" id="branch" :invalid="!!errors.branch" size="small" @blur="branchBlur($event, true)"/>
            </InputGroup>
        </form-item>
        <form-item for="profile" label="Perfil" mark :error="errors.profile" cols="6">
            <Select v-model="profile" id="profile" :invalid="!!errors.profile" size="small" :options="dropdownItems"
                    optionLabel="name" optionValue="value" @blur="profileBlur($event, true)" class="w-full"/>
        </form-item>
        <form-item for="username" label="Usuario" mark :error="errors.username" cols="4">
            <InputText v-model="username" id="username" :invalid="!!errors.username" size="small" @blur="usernameBlur($event, true)"/>
        </form-item>
        <form-item for="password" label="Contraseña" mark :error="errors.password" cols="4">
            <Password v-model="password" input-id="password" :invalid="!!errors.password" class="w-full" :toggleMask="true"
                      :feedback="false" @blur="passwordBlur($event, true)" input-class="w-full !py-1.5"/>
        </form-item>
        <form-item for="confirm" label="Confirmar Contraseña" mark :error="errors.passwordConfirm" cols="4">
            <Password v-model="passwordConfirm" input-id="confirm" :invalid="!!errors.passwordConfirm" class="w-full" :toggleMask="true"
                      :feedback="false" @blur="passwordConfirmBlur($event, true)" input-class="w-full !py-1.5"/>
        </form-item>
        <Divider class="col-span-1 md:col-span-12 !my-2"/>
    </div>
    <div class="mt-4 flex items-center justify-center space-x-2">
        <Button label="Cancelar" severity="secondary" outlined raised class="w-full border border-surface-300" @click="reloadData">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button :label="`${!props.formData?.id ? 'Crear' : 'Editar'} Usuario`" class="w-full" @click="onSubmit">
            <template #icon>
                <i-ri-user-add-line class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
