<script setup>

import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import Button from "primevue/button";

const toast = useToast();
const props = defineProps({
    // defaultOptions: { type: Object, default: () => {} },
    closeModal: { type: Function, default: () => {} }
});
/**
 * Validations objects for the form and fields
 *
 */
const schemaValidate = yup.object({
    code: yup.string().required("Ingrese la clave").label("Nombre"),
    newCode: yup.string().required("Ingrese su nueva clave").label("Clave").min(4, "Ingresa al menos 4 caracteres"),
    codeConfirm: yup.string().required("La confirmación es requerida").oneOf([yup?.ref("newCode")], "La clave no coincide").
        label("Confirm. clave").min(4, "Ingresa al menos 4 caracteres")
});

const fields = ref({
    code: "",
    newCode: "",
    codeConfirm: ""
});

const { handleSubmit, resetForm, errors, values } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: code, handleBlur: codeBlur } = useField("code");
const { value: newCode, handleBlur: newCodeBlur } = useField("newCode");
const { value: codeConfirm, handleBlur: codeConfirmBlur } = useField("codeConfirm");

const onSubmit = handleSubmit(() => {
    onReset();
    console.log("Submitted with", { ...values });
}, ({ errors }) => {
    console.log(errors);
    toast.add({ severity: "error", detail: "Complete todos los campos", life: 5000 });
});

const onReset = () => {
    resetForm();
    props.closeModal();
};

</script>

<template>
    <div class="align-items-form">
        <form-item for="code" label="Clave Actual" mark :error="errors.code" cols="12">
            <InputText v-model="code" id="code" @blur="codeBlur($event, true)" maxlength="10" :invalid="!!errors.code" class="w-full"/>
        </form-item>
        <form-item for="newCode" label="Nueva Clave" mark :error="errors.newCode" cols="12">
            <InputText v-model="newCode" id="newCode" @blur="newCodeBlur($event, true)" :invalid="!!errors.newCode" class="w-full"/>
        </form-item>
        <form-item for="confirm" label="Confirmar Clave" mark :error="errors.codeConfirm" cols="12">
            <InputText v-model="codeConfirm" id="confirm" @blur="codeConfirmBlur($event, true)" :invalid="!!errors.codeConfirm"
                       class="w-full"/>
        </form-item>
    </div>
    <div class="mt-2 flex items-center justify-center space-x-2">
        <Button label="Cancelar" severity="secondary" outlined raised class="w-full border border-surface-300" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Modificar" class="w-full" @click="onSubmit">
            <template #icon>
                <i-fluent-save-24-regular class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
