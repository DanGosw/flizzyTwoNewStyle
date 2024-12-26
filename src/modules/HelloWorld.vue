<script setup>
import { ref } from "vue";
import EmptyTable from "@/hooks/components/empty/emptyTable.vue";
import LoadingData from "@/hooks/components/loading/loadingData.vue";

const data = ref();
const loading = ref(false);

// const isSticky = ref(false);
// const stickyStyle = ref(null);
//
// const handleScroll = () => {
//     if(stickyStyle.value) {
//         // getBoundingClientRect().top nos da la posición del elemento
//         // en relación a la ventana del navegador.
//         const rect = stickyStyle.value.getBoundingClientRect();
//         // Si top es menor o igual a 0, significa que el elemento
//         // ha alcanzado o pasado la parte superior de la ventana.
//         isSticky.value = rect.top <= 0;
//     }
// };
//
// watchEffect(() => {
//     window.addEventListener("scroll", handleScroll);
// });
//
// onUnmounted(() => {
//     window.removeEventListener("scroll", handleScroll);
// });

const getData = async() => {
    loading.value = true;
    return await axios.get("https://retoolapi.dev/5boF6b/data").then(results => {
        data.value = results.data;
        loading.value = false;
    });
};

getData();
const count = ref(0);

const selectedCity = ref();

const countries = ref([
    { name: "Australia", code: "AU" },
    { name: "Canada", code: "CA" },
    { name: "United States", code: "US" }
]);
</script>

<template>
    <Card>
        <template #content>
            <div class="flex flex-wrap gap-2 card">
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="secondary"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="success"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="info"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="warn"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="help"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="danger"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="contrast"
                        @click="count++"/>

                <div class="flex card justify-content-center">
                    <Select v-model="selectedCity" :options="countries" optionLabel="name" class="w-full" filter show-clear
                            @update:model-value="()=>console.log(selectedCity?.name)" placeholder="Select"/>
                </div>
            </div>
            <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="65vh"
                       :row-class="()=>{'text-center'}" lazy scrollable :rowsPerPageOptions="[10,20,50]" dataKey="code" :loading="loading"
                       tableStyle="min-width: 118rem;" class="mt-4">
                <template #empty>
                    <empty-table/>
                </template>
                <template #loading>
                    <loading-data/>
                </template>
                <Column style="width: 1%" field="id" header="ID"/>
                <Column style="width: 10%" field="Names" header="Names"/>
                <Column style="width: 10%" field="mail" header="E-Mail"/>
                <Column style="width: 15%" field="ubication" header="Location"/>
                <Column style="width: 5%" field="ip" header="IP Address"/>
                <Column style="width: 10%" field="industry" header="Industry"/>
                <Column style="width: 10%" field="interests" header="Interests"/>
                <Column style="width: 10%" field="url" header="URL"/>
                <Column style="width: 10%" field="job" header="Job"/>
                <!--                <Column class="border border-[#474751]" style="width: 4%" header="Date">-->
                <!--                    <template #body>-->
                <!--                        <div class="flex justify-center">-->
                <!--                            <Button size="small" severity="info" class="!p-0">-->
                <!--                                <template #icon>-->
                <!--                                    <i-ic-sharp-access-time class="!m-0.5"/>-->
                <!--                                </template>-->
                <!--                            </Button>-->
                <!--                        </div>-->
                <!--                    </template>-->
                <!--                </Column>-->
            </DataTable>
        </template>
    </Card>
</template>