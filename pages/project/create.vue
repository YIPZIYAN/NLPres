<script setup lang="ts">
definePageMeta({
  layout: 'guest',
})

const category = ref();
</script>

<template>
  <form>

  <UCard class="mx-24 my-8">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-900 dark:text-white ">
        Create Project
      </h2>
    </template>
    <div class="flex flex-col space-y-4">
    <UFormGroup size="xl" label="Title" required>
      <UInput placeholder="MyProject1"/>
    </UFormGroup>

    <UFormGroup size="xl" label="Description" required>
      <UTextarea
          autoresize
          placeholder="Enter project description"/>
    </UFormGroup>

    <UFormGroup size="xl" label="Category" required>
        <USelect  class="flex-1"
            v-model="category"
                 placeholder="Select a category."
                 :options="['Text Classification', 'Sequential Labeling']" />
    </UFormGroup>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-4">
        <UButton type="reset" label="Reset" color="gray" />
        <UButton label="Create Project" />
      </div>
    </template>
  </UCard>
  </form>
    
</template>
