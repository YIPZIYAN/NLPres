<script setup lang="ts">

import type {Label} from "~/server/api/label";
import TextLabel from "~/components/TextLabel.vue";

const props = defineProps({
  rawtext: String,
  labels: Array<Label>
})

const labelseq: Array<Label> = [{
  'id': 1,
  'name': "Verb",
  'color': "blue",
}, {
  'id': 2,
  'name': "Nouns",
  'color': "red",
}]


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
    <TextLabel :text="rawtext" />
  </p>
  <PListbox
      @change="dropdownVisible = false"
      v-if="dropdownVisible" class="z-50" :style="dropdownStyle"
      v-model="selected" :options="labelseq" filter optionLabel="name"/>

</template>