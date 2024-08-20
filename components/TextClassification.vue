<script setup lang="ts">

import type {Label} from "~/server/api/label";

const props=defineProps({
  labels: Array<Label>,
  data: Number,
})

function isSelected(id: number) {
  return id === props.data;
}
</script>

<template>
  <div class="mb-4 flex flex-wrap space-x-2 w-full">
    <UButton
        v-for="label in labels"
        :key="label.id"
        class="px-4"
        :color="label.color"
        :leading-icon="isSelected(label.id)?  'i-material-symbols:check' : ''"
        :ui="{ rounded: 'rounded-full' }">{{ label.name }}
    </UButton>
  </div>

</template>
