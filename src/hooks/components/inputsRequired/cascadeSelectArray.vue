<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";
import FormItem from "@/hooks/components/formItem/formItem.vue";

const props = defineProps({
    value: { type: [String, Number, Object], default: "" },
    cols: { type: String, default: "" },
    name: { type: String, required: true },
    showMark: { type: Boolean, required: true },
    label: { type: String, default: "" },
    options: { type: Array, default: () => [] },
    optionLabel: { type: String, default: "" },
    optionValue: { type: String, default: "" },
    optionGroupLabel: { type: String, default: "" },
    optionGroupChildren: { type: Array, default: () => [] }
});

const name = toRef(props, "name");
const { value: selectValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, { initialValue: props.value });

</script>
<template>
    <form-item :label="label" :mark="showMark" :for="name" :error="errorMessage" :cols="cols">
        <CascadeSelect v-model="selectValue" :options="options" :optionLabel="optionLabel" :optionGroupLabel="optionGroupLabel" fluid
                       :optionGroupChildren="['states', 'cities']" style="min-width: 14rem" @input="handleChange" :invalid="!!errorMessage"
                       @blur="handleBlur($event, true)" placeholder="Seleccione" :optionValue="optionValue" :input-id="name"/>
    </form-item>
</template>

