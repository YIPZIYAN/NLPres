<script setup lang="ts">

const route = useRoute();
let id = parseInt(route.params.annoid.toString());

const labels = [{
  'id': 1,
  'name': "Positive",
  'color': "blue",
}, {
  'id': 2,
  'name': "Negative",
  'color': "red",
}]

const list = [{
  'id': 1,
  'text': "BAd Services.",
  'status': false
}, {
  'id': 2,
  'text': "this is text 2",
  'status': true
}, {
  'id': 3,
  'text': "this is text 3",
  'status': true
}];

function getCurrent() {
  let data = list.find(value => value.id === id);
  return data ?? list.at(0);
}

function next() {
  let i = list.findIndex(value => value.id === id);
  if (i == list.length - 1) {
    return null;
  }
  return list.at(i + 1);
}

function prev() {
  let i = list.findIndex(value => value.id === id);
  if (i == 0) {
    return null;
  }
  return list.at(i - 1);
}

const data = getCurrent();
const percentage = list.filter(value => value.status).length / list.length * 100;

function markAs(isDone) {
  data.status = isDone;
}

// const {data: count} = await useFetch(`https://jsonplaceholder.typicode.com/todos/${route.params.annoid}`)

//progress
const columns = [{
  key: 'completed',
  label: 'Completed'
}, {
  key: 'pending',
  label: 'Pending'
}, {
  key: 'total',
  label: 'Total'
}];

const people = [{
  completed: list.filter(value => value.status).length,
  pending: list.filter(value => !value.status).length,
  total: list.length
}];
</script>

<template>
  <UCard>
    <template #header>
      <UButtonGroup size="lg" orientation="horizontal">

        <UTooltip text="Mark As" :popper="{ placement: 'top' }">
          <UButton v-if="data?.status" @click="markAs(true)" icon="i-material-symbols:download-done-rounded"
                   color="gray"/>
          <UButton v-else @click="markAs(false)" icon="i-material-symbols:close-rounded" color="gray"/>
        </UTooltip>

        <UTooltip text="Add Comment" :popper="{ placement: 'top' }">
          <UButton icon="i-material-symbols:add-comment" color="gray"/>
        </UTooltip>

        <UTooltip text="Delete Labels" :popper="{ placement: 'top' }">
          <UButton icon="i-material-symbols:delete" color="gray"/>
        </UTooltip>
      </UButtonGroup>
    </template>

    <div class="grid grid-cols-3">
      <div class="col-span-3 md:col-span-2">
        <div class="mb-4 flex flex-wrap space-x-2 w-full">
          <UButton
              v-for="label in labels"
              :key="label.id"
              class="px-4"
              :color=label.color
              :ui="{ rounded: 'rounded-full' }">{{ label.name }}
          </UButton>
        </div>

        {{ getCurrent().text }}

      </div>

      <div class="col-span-3 md:col-span-1 mt-8 sm:mt-0">
        <UCard>
          <template #header>
            <h2 class="font-semibold text-center text-xl text-gray-900 dark:text-white leading-tight">
              Progress
            </h2>
          </template>
          <UTable class="table-fixed text-center"
                  :ui="{th: { base: 'text-center'}}"
                  :rows="people" :columns="columns">
          </UTable>
          <template #footer>
            <UProgress size="lg" class="px-4 pb-6" :value=percentage indicator/>
          </template>
        </UCard>

      </div>
    </div>


    <template #footer>

      <div class="flex flex-wrap space-x-2">
        <UButton v-if="prev() != null"
                 :to="`${prev().id}`" label="Previous" color="gray">
          <template #leading>
            <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5"/>
          </template>
        </UButton>

        <UButton v-if="next() != null"
                 :to="`${next().id}`" label="Next" color="gray">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
          </template>
        </UButton>


        <UButton v-else :to="`../annotation`" label="Done" color="gray">
        </UButton>
      </div>

    </template>
  </UCard>

</template>

<style scoped>

</style>