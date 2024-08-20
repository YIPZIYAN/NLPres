<script setup lang="ts">

import type {Label} from "~/server/api/label";

const props = defineProps({
  rawtext: String,
  labels: Array<Label>
})

const textBlock = computed(() => {
  if (!props.rawtext) return [];

  return props.rawtext
      .split(' ')      // Split text by space
      .filter(word => word.length > 0);
})

function getSelected() {
  const selection = window.getSelection();
  console.log(selection.toString());

  dropdownVisible.value = false

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    dropdownStyle.value = {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
    };
    dropdownVisible.value = true
  }
}

const selected = ref()

const dropdownVisible = ref(false);
const dropdownStyle = ref<Record<string, string>>({});

</script>

<template>
  <p v-on:mouseup="getSelected()">
    {{ rawtext }}
    <!--    <p class="inline-block px-2" v-for="text in textBlock">{{ text }}</p>-->
  </p>
  <PListbox
      @change="dropdownVisible = false"
      v-if="dropdownVisible" class="z-50" :style="dropdownStyle"
      v-model="selected" :options="labels" filter optionLabel="name"/>

</template>