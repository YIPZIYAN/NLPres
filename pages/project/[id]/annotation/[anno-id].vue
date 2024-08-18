<script setup lang="ts">
const route = useRoute();
let id = parseInt(route.params.annoid.toString());

const data = [{
  'id': 1,
  'text': "this is text 1",
}, {
  'id': 2,
  'text': "this is text 2",
}, {
  'id': 3,
  'text': "this is text 3",
}];

function getCurrent() {
  return data.find(value => value.id === id);
}

function next() {
  let i = data.findIndex(value => value.id === id);
  if (i == data.length - 1) {
    return null;
  }
  return data.at(i + 1);
}

// const {data: count} = await useFetch(`https://jsonplaceholder.typicode.com/todos/${route.params.annoid}`)
</script>

<template>
  {{ getCurrent() }}
  <UCard>
    <template #header>
      <Placeholder class="h-8"/>
    </template>

    <Placeholder class="h-32"/>

    <template #footer>
      <UButton v-if="next() != null"
               :to="`${next().id}`" label="Button" color="gray">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
        </template>
      </UButton>

      <UButton v-else :to="`../annotation`" label="Done" color="gray">
      </UButton>
    </template>
  </UCard>

</template>

<style scoped>

</style>