<script setup lang="ts">

import type {Label} from "~/types/label";

const props = defineProps({
  labels: Array<Label>,
  data: Number,
})

//should pass whole data, change to interface class when implement server side
function isSelected(id: number) {
  return id === props.data;
}
</script>

<template>
  <div class="mb-4 flex flex-wrap space-x-2 w-full">
    <UTooltip
        v-for="label in labels"
        :text="label.name"
        :shortcuts="['1']"
        :popper="{ placement: 'top' }">
      <UButton
          :key="label.id"
          class="px-4"
          :color="label.color"
          :leading-icon="isSelected(label.id)?  'i-material-symbols:check' : ''"
          :ui="{ rounded: 'rounded-full' }">{{ label.name }}
      </UButton>
    </UTooltip>
  </div>
  <slot/>

</template>
