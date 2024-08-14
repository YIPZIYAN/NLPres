<script setup lang="js">
import PFileUpload from 'primevue/fileupload';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const onAdvancedUpload = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

</script>

<template>
  <div class="card">
    <Toast />
    <PFileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
      <template #empty>
        <span>Drag and drop files to here to import.</span>
      </template>
    </PFileUpload>
  </div>
</template>

<style scoped>

</style>