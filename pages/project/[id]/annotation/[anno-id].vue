<script setup lang="ts">
import type {Label} from "~/server/api/label";

const route = useRoute();
let id = parseInt(route.params.annoid.toString());

const projects = [{
  id: 1,
  label: 'Code Mixed Twitter',
  description: '202401 ISpark Project',
  type: 0,
  created_at: "2024-01-03",
}, {
  id: 2,
  label: 'Facebook Sentiment Analysis',
  description: '202401 ISpark Project',
  type: 1,
  created_at: "2024-01-03",
}, {
  id: 3,
  label: 'NLP Assignment',
  description: '202401 ISpark Project',
  type: 0,
  created_at: "2024-01-03",
}, {
  id: 4,
  label: 'NER Assignment',
  description: '202401 ISpark Project',
  type: 0,
  created_at: "2024-01-03",
}]
const projectDetails = projects.find((project) => project.id.toString() == route.params.id)


const labels: Array<Label> = [{
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
  'text': "soooooo wish i could, but im in school and myspace is completely blocked",
  'status': false,
  'label': null,
}, {
  'id': 2,
  'text': "My bike was put on hold...should have known that.... argh total bummer",
  'status': true,
  'label': 2,
}, {
  'id': 3,
  'text': "Stupid storm. No river for us tonight",
  'status': true,
  'label': 2,
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

<template ref="layout">
  <UCard>
    <template #header>
      <UButtonGroup size="lg" orientation="horizontal">

        <UTooltip text="Mark As" :popper="{ placement: 'top' }">
          <UButton v-if="data?.status" @click="markAs(true)" icon="i-material-symbols:check"
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

    <div class="grid grid-cols-4 lg:grid-cols-3">
      <div class="col-span-4 sm:col-span-2 lg:col-span-2">
        <TextClassification v-if="projectDetails.type == 1" :labels="labels"
                            :data="data.label"/>
        <p class="w-full pr-4 text-justify"> {{ getCurrent().text }}</p>
      </div>

      <div class="col-span-4 sm:col-span-2 lg:col-span-1 mt-8 sm:mt-0">
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