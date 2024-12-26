<script setup>
// import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import { useNumericInput } from "@/hooks/composables/inputMethods/inputMethods.js";

const toast = useToast();

const props = defineProps({
    closeModal: { type: Function, default: () => {}, required: true },
    refreshData: { type: Function, default: () => {}, required: true },
    formData: { type: Object, default: () => {}, required: false }
});
const businessOptions = ref([
    { label: "Arizona", value: 1 },
    { label: "Arizona Moyos", value: 2 },
    { label: "Arizona Food", value: 3 }
]);

const schemaValidate = ref(yup.object().shape({
    business: yup.number().required("Seleccione una empresa valida").label("Empresa"),
    branchName: yup.string().trim().required("Ingrese una denominación").label("Nombre Comercial"),
    description: yup.string().trim().required("Ingrese una descripción").label("Descripción"),
    ubigeo: yup.string().trim().required("Seleccione su ubigeo").label("Ubigeo"),
    address: yup.string().trim().required("Ingrese una dirección").label("Dirección")
}));

const formFields = ref({
    branchName: "",
    business: undefined,
    address: "",
    ubigeo: "",
    description: "",
    email: "",
    phone: "",
    legendAsset: "",
    legendService: "",
    legendReturn: "",
    logoMini: [{ objectURL: "" }],
    logoA4: [{ objectURL: "" }],
    logoTicket: [{ objectURL: "" }],
    sendAutomatic: true
});

const { handleSubmit, resetForm, errors, setValues } = useForm({ validationSchema: schemaValidate, initialValues: formFields.value });

onMounted(async() => {
    if(props.formData?.business) {
        // Establecer valores iniciales en todos los campos del formulario
        setValues(props.formData);

        // // Actualizar imágenes con las funciones personalizadas
        await setDefaultImages(props.formData?.logoA4, fileUploadA4.value, logoA4, "a4");
        await setDefaultImages(props.formData?.logoTicket, fileUploadTicket.value, logoTicket, "ticket");
        await setDefaultImages(props.formData?.logoMini, fileUploadMini.value, logoMini, "mini");
    }
});

const { value: business, handleBlur: businessBlur } = useField("business");
const { value: ubigeo, handleBlur: ubigeoBlur } = useField("ubigeo");
const { value: address, handleBlur: addressBlur } = useField("address");
const { value: description, handleBlur: descriptionBlur } = useField("description");
const { value: branchName, handleBlur: branchNameBlur } = useField("branchName");
const { value: email } = useField("email");
const { value: phone } = useField("phone");
const { value: legendAsset } = useField("legendAsset");
const { value: legendService } = useField("legendService");
const { value: legendReturn } = useField("legendReturn");
const { value: logoMini } = useField("logoMini");
const { value: logoA4 } = useField("logoA4");
const { value: logoTicket } = useField("logoTicket");
const { value: sendAutomatic } = useField("sendAutomatic");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    onReset();
    toast.add({ severity: "info", summary: "Title xd", detail: values, life: 10000 });
});

const { handleInputReactive: handleInputPhone } = useNumericInput(phone);

/**
 * Handle file selection and update the corresponding model
 * @param {Event} event - File selection event
 * @param imageFile
 */
const onFileSelect = async(event, imageFile) => {
    if(event?.["files"].length) {
        const file = event?.["files"][0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);

        reader.onloadend = function() {
            switch(imageFile) {
                case "tick":
                    logoTicket.value = reader.result;
                    console.log(logoTicket.value);
                    break;
                case "a4":
                    logoA4.value = reader.result;
                    break;
                case "mini":
                    logoMini.value = reader.result;
                    break;
            }
        };
        toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
    }
};

const onReset = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

const ubigeoOptions = ref([
    {
        name: "Australia",
        code: "AU",
        states: [
            {
                name: "New South Wales",
                cities: [
                    { cname: "Sydney", code: "A-SY" },
                    { cname: "Newcastle", code: "A-NE" }
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
                    { cname: "San Francisco", code: "US-SF" }
                ]
            },
            {
                name: "Florida",
                cities: [
                    { cname: "Miami", code: "US-MI" },
                    { cname: "Orlando", code: "US-OR" }
                ]
            },
            {
                name: "Texas",
                cities: [
                    { cname: "Austin", code: "US-AU" },
                    { cname: "Houston", code: "US-HO" }
                ]
            }
        ]
    }
]);

const fileUploadMini = ref("");
const fileUploadA4 = ref("");
const fileUploadTicket = ref("");

/**
 * Converts an image URL to a File object
 * @async {function} return async function
 * @param {String} url - Image URL
 * @param {String} filename - Name of the resulting file
 * @param {String} mimeType - MIME type of the file (e.g. "image/jpeg")
 * @returns {Promise<File>} File object with objectURL property for preview
 */
const urlToFile = async(url, filename, mimeType) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const file = new File([buffer], filename, { type: mimeType });
    file.objectURL = URL.createObjectURL(file);
    return file;
};

/**
 * Set default images on page load
 * @param {String} url - expects an url sent via props
 * @param {ref} refFile - reactive variable to reference in html
 * @param {ref | ArrayBuffer} value - reactive variable to reference model
 * @param {String} name -name to image
 */
const setDefaultImages = async(url, refFile, value, name) => {
    const file = await urlToFile(url, name, "image/jpeg");
    // Convert to Base64
    value.value = await fileToBase64(file); // Assign the Base64 value to the reactive variable
    await nextTick(() => {
        forceFileUploadUpdate(refFile, [file]);
    });
};
/**
 * Converts a file to a Base64 string
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 string representation of the file
 */
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Force the FileUpload component to refresh to display the selected image
 * @param {ref} fileUploadRef - FileUpload component reference name
 * @param {File[]} files - Array of files to show in the FileUpload
 */
const forceFileUploadUpdate = async(fileUploadRef, files) => {
    if(fileUploadRef && fileUploadRef?.$el) {
        const dataTransfer = new DataTransfer();
        for(const file of files) { dataTransfer.items.add(file); }

        const input = fileUploadRef.$el.querySelector("input[type=\"file\"]");
        if(input) {
            input.files = dataTransfer.files;
            fileUploadRef.files = Array.from(dataTransfer.files);
            updateFilePreview(fileUploadRef.$el, files);
        }
    }
};

/**
 * Updates the image preview in the FileUpload
 * @param {HTMLElement} fileUploadEl - FileUpload component DOM element
 * @param {File[]} files - Array of files to show in preview
 */
const updateFilePreview = (fileUploadEl, files) => {
    const img = fileUploadEl.querySelector("img");
    if(img && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    }
};

</script>

<template>
    <div class="align-items-form">
        <form-item for="business" label="Empresa" mark :error="errors.business" cols="6">
            <Select v-model="business" input-id="business" :options="businessOptions" optionLabel="label" optionValue="value"
                    class="w-full" :invalid="!!errors.business" @blur="businessBlur($event, true)"/>
        </form-item>
        <form-item for="branchName" label="Nombre Comercial" mark :error="errors.branchName" cols="6">
            <InputText v-model="branchName" id="branchName" size="small" :invalid="!!errors.branchName"
                       @blur="branchNameBlur($event, true)" class="w-full"/>
        </form-item>
        <form-item for="description" label="Descripción" mark :error="errors.description" cols="4">
            <InputText v-model="description" id="description" size="small" :invalid="!!errors.description"
                       @blur="descriptionBlur($event, true)" class="w-full"/>
        </form-item>
        <form-item for="ubigeo" label="Ubigeo" mark :error="errors.ubigeo" cols="4">
            <CascadeSelect :options="ubigeoOptions" name="ubigeo" label="Ubigeo" option-value="code" option-group-label="name" fluid
                           option-label="cname" :option-group-children="['states', 'cities']" v-model="ubigeo" input-id="ubigeo"
                           :invalid="!!errors.ubigeo" @blur="ubigeoBlur($event, true)" placeholder="Seleccione su ubigeo"/>
        </form-item>
        <form-item for="address" label="Dirección" mark :error="errors.address" cols="4">
            <InputText v-model="address" id="address" size="small" :invalid="!!errors.address" @blur="addressBlur($event, true)"/>
        </form-item>
        <form-item for="email" label="Correo" cols="4">
            <InputText v-model="email" size="small" id="email"/>
        </form-item>
        <form-item for="phone" label="Teléfono" cols="4">
            <InputText v-model="phone" id="phone" size="small" @input="handleInputPhone"/>
        </form-item>
        <form-item for="sendAutomatic" label="Activar envío automático" cols="4">
            <Checkbox v-model="sendAutomatic" binary input-id="sendAutomatic"/>
        </form-item>
        <form-item for="legendAsset" label="Leyenda Bienes" cols="4">
            <Textarea v-model="legendAsset" id="legendAsset" auto-resize rows="3" cols="30" class="w-full"/>
        </form-item>
        <form-item for="legendService" label="Leyenda Servicio" cols="4">
            <Textarea v-model="legendService" id="legendService" auto-resize rows="3" cols="30" class="w-full"/>
        </form-item>
        <form-item for="legendReturn" label="Leyenda Retorno" cols="4">
            <Textarea v-model="legendReturn" id="legendReturn" auto-resize rows="3" cols="30" class="w-full"/>
        </form-item>
        <form-item for="logoMini" label="Mini Logo" cols="4">
            <FileUpload name="logoMini[0]" accept="image/png, image/jpeg, image/jpg" :multiple="false" :max-file-size="1000000"
                        :file-limit="1" @select="onFileSelect($event, 'mini')" input-id="logoMini" class="w-full"
                        @remove="logoMini = []" v-model="logoMini" choose-label="Seleccione su logo" ref="fileUploadMini"
                        invalid-file-size-message="La imagen supera el tamaño permitido" :show-upload-button="false"
                        :show-cancel-button="false" invalid-file-limit-message="Solo puedes subir una imagen...">
                <template #empty>
                    <span>Arrastre su logo aquí...</span>
                </template>
            </FileUpload>
        </form-item>
        <form-item for="logoA4" label="Logo A4" cols="4">
            <FileUpload name="logoA4[0]" accept="image/png, image/jpeg, image/jpg" :multiple="false" :max-file-size="1000000"
                        :file-limit="1" input-id="logoA4" @select="onFileSelect($event, 'a4')" class="w-full"
                        @remove="logoA4 = []" v-model="logoA4" choose-label="Seleccione su logo" ref="fileUploadA4"
                        invalid-file-size-message="La imagen supera el tamaño permitido" :show-upload-button="false"
                        :show-cancel-button="false" invalid-file-limit-message="Solo puedes subir una imagen...">
                <template #empty>
                    <span>Arrastre su logo aquí...</span>
                </template>
            </FileUpload>
        </form-item>
        <form-item for="logoTicket" label="Logo Ticket" cols="4">
            <FileUpload name="logoTicket[0]" accept="image/png, image/jpeg, image/jpg" :multiple="false" :max-file-size="1000000"
                        :file-limit="1" @select="onFileSelect($event, 'tick')" input-id="logoTicket" class="w-full"
                        @remove="logoTicket = []" v-model="logoTicket" choose-label="Seleccione su logo" ref="fileUploadTicket"
                        invalid-file-size-message="La imagen supera el tamaño permitido" :show-upload-button="false"
                        :show-cancel-button="false" invalid-file-limit-message="Solo puedes subir una imagen...">
                <template #empty>
                    <span>Arrastre su logo aquí...</span>
                </template>
            </FileUpload>
        </form-item>
    </div>
    <div class="mt-4 flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
        <Button label="Cancelar" severity="secondary" outlined raised class="w-full" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Crear Sucursal" class="w-full" @click="onSubmit">
            <template #icon>
                <i-material-symbols-add-business-outline-rounded class="mx-1"/>
            </template>
        </Button>
    </div>
    {{ props }}
    <pre>{{ props }}</pre>
</template>
