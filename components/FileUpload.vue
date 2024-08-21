<script setup lang="js">
import PFileUpload from 'primevue/fileupload';

import {useToast} from "primevue/usetoast";

const toast = useToast();

const onAdvancedUpload = () => {
  toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
};

const formatSelections = [{
  key: '.txt',
  label: 'TXT',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580874.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.json',
  label: 'JSON',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580838.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.jsonl',
  label: 'JSONL',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580838.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.csv',
  label: 'CSV',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580842.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.xml',
  label: 'XML',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580864.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.conllu',
  label: 'CONLL-U',
  value: 'https://cdn-icons-png.freepik.com/512/16961/16961685.png?ga=GA1.1.1429049260.1723829582'
}]

const selectedFormat = ref('')
const fileUploadKey = ref(0);
watch(selectedFormat, () => {
  fileUploadKey.value += 1; // Key-Changing Technique to Rerender PFileUpload
});
</script>

<template>
  <UFormGroup label="Select File Format">
  <USelectMenu
    size="xl"
    placeholder="File Format"
    color="blue"
    variant="outline"
    :options="formatSelections"
    v-model="selectedFormat"
    class="mt-2"
  />
  </UFormGroup>
  <Toast />
  <div class="card mt-6" v-if="selectedFormat">
    <PFileUpload
      :key="fileUploadKey"
      :pt="{
        fileThumbnail: { class: '', src: selectedFormat.valueOf().value },
      }"
      name="demo[]"
      url="/api/upload"
      @upload="onAdvancedUpload()"
      :multiple="true"
      :accept="selectedFormat.valueOf().key"
      :maxFileSize="1000000"
    >
      <template
        #header="{
          chooseCallback,
          uploadCallback,
          clearCallback,
          files,
          uploadedFiles,
        }"
        class="pb-2"
      >
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-3">
            <UButton @click="chooseCallback()" icon="material-symbols:add"
              >Choose</UButton
            >

            <UButton
              @click="uploadCallback()"
              icon="material-symbols:upload-sharp"
              variant="solid"
              color="gray"
              :disabled="!files || files.length === 0"
              >Upload
            </UButton>

            <UButton
              @click="clearCallback()"
              icon="material-symbols:close"
              variant="solid"
              color="gray"
              :disabled="!files || files.length === 0"
              >Cancel
            </UButton>
          </div>
          <div class="flex justify-end flex-1">
            <NuxtLink :to="`/project/${useRoute().params.id}/annotation`">
              <UButton
                :disabled="!uploadedFiles || uploadedFiles.length === 0"
                color="blue"
                variant="solid"
                label="Import"
                :trailing="true"
                icon="material-symbols:arrow-right-alt"

              />
            </NuxtLink>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <i
            class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-7 4v-5h2v3h12v-3h2v5z"
              />
            </svg>
          </i>
          <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </PFileUpload>
  </div>
</template>

<style scoped></style>
