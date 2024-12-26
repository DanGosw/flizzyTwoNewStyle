<script setup>


const router = useRouter();

const classContent = "h-72 flex flex-col cursor-pointer items-center justify-center w-72 rounded-xl border border-[#dadaea] dark:border-[#474751] hover:shadow-lg dark:hover:shadow-surface-700";

</script>

<template>
    <Card>
        <template #title>
            <p>Configuración</p>
        </template>
        <template #content>
            <div class="flex flex-wrap items-center justify-center gap-2">
                <div :class="classContent" @click="router.push({ name: 'business', force: true })">
                    <i-ion-business-outline class="text-9xl text-surface-900 dark:text-white"/>
                    <p class="text-xl font-semibold dark:text-white">Empresa</p>
                </div>
                <div :class="classContent" @click="router.push({ name:'branch', force: true })">
                    <i-fluent-branch-20-regular class="text-9xl text-surface-900 dark:text-white"/>
                    <p class="text-xl font-semibold text-surface-900 dark:text-white">Sucursales</p>
                </div>
                <div :class="classContent" @click="router.push({ name: 'application', force: true })">
                    <i-material-symbols-light-food-bank-outline-rounded class="text-9xl text-surface-900 dark:text-white"/>
                    <p class="text-xl font-semibold text-surface-900 dark:text-white">Aplicación</p>
                </div>
                <div :class="classContent">
                    <i-oui-app-advanced-settings class="text-9xl text-surface-900 dark:text-white"/>
                    <p class="text-xl font-semibold text-surface-900 dark:text-white">Avanzado</p>
                </div>
                <div :class="classContent" @click="router.push({ name: 'users', force: true })">
                    <i-solar-users-group-rounded-broken class="text-9xl text-surface-900 dark:text-white"/>
                    <p class="text-xl font-semibold text-surface-900 dark:text-white">Usuarios</p>
                </div>
                <div :class="classContent">
                    <i-carbon-parameter class="text-9xl text-surface-900 dark:text-white"/>
                    <p class="text-xl font-semibold text-surface-900 dark:text-white">Parametros</p>
                </div>
            </div>
        </template>
    </Card>
</template>
