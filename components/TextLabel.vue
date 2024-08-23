<script setup lang="ts">

const props = defineProps({
  text: String,
})

const textBlock = computed(() => {
  if (!props.text) return [];

  return props.text
      .split(' ')      // Split text by space
      .filter(word => word.length > 0)
      .map((word,index) => ({
        id:index,
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
  <!-- Loop through textBlock and conditionally render items -->
  <template v-for="text in data" :key="text.id">
    <!-- Conditionally render bold text if it's a label -->
    <UCard v-if="text.label" class="font-bold inline-block mx-2">{{text.text + ' '}}</UCard>
    <!-- Render text normally otherwise -->
    <template v-else>{{ text.text + ' '}}</template>
  </template>
</template>
