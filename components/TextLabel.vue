<script setup lang="ts">

const props = defineProps({
  text: String,
})

const textBlock = computed(() => {
  if (!props.text) return [];

  return props.text
      .split(' ')      // Split text by space
      .filter(word => word.length > 0)
      .map((word, index) => ({
        id: index,
        text: word,
        label: isLabel(word) // Adjust the label as needed
      }));
})

const data = textBlock.value;

console.log(data)

function isLabel(text: string): boolean {
  return text === "wish";
}
</script>

<template>
  <template v-for="text in data" :key="text.id">
    <div v-if="text.label" class="rounded-full bg-blue-200 font-bold inline-block mr-1">
      <div class="flex flex-wrap items-center justify-between p-2">
        <div class="rounded-full p-2 bg-white mx-2">VERB</div>
        {{ text.text + ' ' }}
      </div>
    </div>
    <template v-else>{{ text.text + ' ' }}</template>
  </template>
</template>
