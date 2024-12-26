<script setup>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import Card from "primevue/card";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import { useRouter } from "vue-router";
import AppConfig from "@/hooks/components/app/appConfig.vue";

const schemaValidate = yup.object({
    username: yup.string().required("Ingrese su usuario").label("username").min(5, "Ingresa al menos 5 caracteres"),
    password: yup.string().required("Ingrese su contraseña").label("password").min(5, "Ingresa al menos 5 caracteres")
});

const fields = ref({ username: "", password: "" });
const toast = useToast();
const router = useRouter();
const { handleSubmit, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField("username");
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField("password");

const onSubmit = handleSubmit(async(values) => {
        console.log("Submitted with", values);
        await router.push({ name: "home", force: true });
    }, ({ errors }) => {
        const errorMessages = Object.entries(errors).map(([field, message]) => `${field}: ${message}`).join(", ");
        toast.add({ severity: "error", summary: "Error", detail: `Complete los siguientes campos: ${errorMessages}`, life: 10000 });
    }
);

</script>

<template>
    <div class="flex min-h-screen bg-gradient-to-b from-primary-200 to-primary-600 dark:from-surface-700 dark:to-surface-950">
        <div class="fixed top-2 right-2 z-20">
            <app-config/>
        </div>
        <div class="z-10 m-auto p-2">
            <div class="flex items-center justify-center">
                <img class="h-64" draggable="false" src="../../assets/img/flizzy-color.png" alt="business-logo"/>
            </div>
            <Card>
                <template #content>
                    <p class="text-center text-3xl font-extrabold"> Bienvenido Flizzy 2.0 </p>
                    <p class="my-2 text-center font-semibold text-gray-500 dark:text-gray-300">Inicie sesion para continuar</p>
                    <div class="grid grid-cols-4 gap-2" v-focustrap>
                        <div class="col-span-4">
                            <form-item for="username" label="Usuario" mark :error="usernameError">
                                <InputText v-model="username" class="w-full" placeholder="Ingrese su usuario" id="username" size="small"
                                           @blur="usernameBlur($event, true)" :invalid="!!errors.username" autofocus/>
                            </form-item>
                        </div>
                        <div class="col-span-4">
                            <form-item for="password" label="Contraseña" mark :error="passwordError">
                                <Password class="w-full" inputClass="w-full" :toggleMask="true" :feedback="false" input-id="password"
                                          :invalid="!!errors.password" v-model="password" @blur="passwordBlur($event,true)"
                                          placeholder="Ingrese su contraseña"/>
                            </form-item>
                        </div>
                    </div>
                    <Button class="mt-2 w-full" label="Iniciar Sesión" @click="onSubmit()">
                        <span>Iniciar Sesión </span>
                        <i-mingcute-fire-fill class="absolute order-1 h-7 w-7 right-2"/>
                    </Button>
                </template>
            </Card>
            <div class="mt-1 flex items-center justify-center gap-2">
                <span class="text-gray-300">Powered by DevRunner</span>
                <i-bi-github class="text-surface-900 dark:text-surface-200"/>
            </div>
        </div>

        <div class="fixed right-0 bottom-0 left-0 z-0 waves-container">
            <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" class="fill-primary-400/80 dark:fill-surface-600/80"/>
                    <use xlink:href="#gentle-wave" x="48" y="5" class="fill-primary-500/60 dark:fill-surface-700/60"/>
                    <use xlink:href="#gentle-wave" x="48" y="8" class="fill-primary-600/40 dark:fill-surface-800/40"/>
                    <use xlink:href="#gentle-wave" x="48" y="10" class="fill-primary-700/70 dark:fill-surface-900/70"/>
                </g>
            </svg>
        </div>
    </div>
</template>
<style>

.waves {
    @apply relative w-full h-44 min-h-24 max-h-72
}

.parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }
    100% {
        transform: translate3d(85px, 0, 0);
    }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
    .waves {
        height: 100px;
        min-height: 100px;
    }
}
</style>
