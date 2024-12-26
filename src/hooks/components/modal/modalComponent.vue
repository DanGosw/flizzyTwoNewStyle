<script setup>
/**
 * @typedef {Object} ModalParameters
 * @property {boolean} visible - Indicates if the modal is visible.
 * @property {string} header - The title of the modal.
 * @property {string} width - The width of the modal.
 * @property {string} footer - The footer of the modal.
 * @property {Object} component - The component to be rendered in the modal.
 */

/**
 * @type {{ parameters: ModalParameters }}
 */
const { parameters } = defineProps({
    parameters: {
        type: Object,
        required: true,
        default: () => ({
            visible: false, // default value for visibility
            header: "", // default header title
            width: "50vh", // default width
            footer: "", // default footer content
            component: {} // default component
        })
    }
});

const { width } = useWindowSize();

defineExpose({ parameters });
</script>

<template>
    <Dialog :breakpoints="{'960px': '75vw', '640px': '90vw'}"
            v-model:visible="parameters.visible" modal closable
            :style="{'width': width > 960 ? parameters.width : width > 790 ? '80vw' : '95vw'}"
            @keyup.esc="parameters.visible = false">
        <template #closeicon>
            <i-material-symbols-close-rounded class="text-surface-100 text-2xl"/>
        </template>
        <template #header>
            {{ parameters.header }}
        </template>
        <component :is="parameters.component"/>
        <template #footer v-if="parameters.footer">
            {{ parameters.footer }}
        </template>
    </Dialog>
</template>
