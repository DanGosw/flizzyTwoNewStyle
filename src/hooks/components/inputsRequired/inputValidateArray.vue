<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
    type: { type: String, default: "text" },
    cols: { type: String, default: "" },
    value: { type: [String, Number], default: "" },
    name: { type: String, required: true },
    label: { type: String, default: "" },
    showMark: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    showLabel: { type: Boolean, default: false },
    showError: { type: Boolean, default: false }
});

const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, { initialValue: props.value });
</script>

<template>
    <form-item :label="label" :mark="showMark" :for="name" :error="errorMessage" :hide-label="showLabel" :hide-error="showError"
               :cols="cols">
        <InputText :name="name" :id="name" :type="type" v-model="inputValue" @input="handleChange" @blur="handleBlur($event, true)"
                   size="small" :invalid="!!errorMessage"/>
    </form-item>
</template>
