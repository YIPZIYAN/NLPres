<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

const modelFormatSelections = [{
  key: '.pickle',
  label: 'PICKLE',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580903.png?ga=GA1.1.139004273.1724320277'
}, {
  key: '.dill',
  label: 'DILL',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580903.png?ga=GA1.1.139004273.1724320277'
}]

const formatSelections = [{
  key: '.txt',
  label: 'TXT',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580874.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.json',
  label: 'JSON',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580838.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.jsonl',
  label: 'JSONL',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580838.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.csv',
  label: 'CSV',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580842.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.xml',
  label: 'XML',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580864.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.conllu',
  label: 'CONLL-U',
  value: 'https://cdn-icons-png.freepik.com/512/16961/16961685.png?ga=GA1.1.1429049260.1723829582'
}]

const isCurrentDataset = ref(false)
</script>

<template>
  <UCard>
    <Stepper value="1" linear class="basis-[50rem]">
      <StepList>
        <Step value="1">Upload First Model</Step>
        <Step value="2">Upload Second Model</Step>
        <Step value="3">Upload Dataset</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <div class="flex flex-col">
            <div class=" rounded bg-surface-50 dark:bg-surface-950  flex  flex-col font-medium">
              <FileUpload :file-formats="modelFormatSelections" :fileLimit="1"/>
            </div>
          </div>
          <div class="flex pt-6 justify-end">
            <UButton icon="material-symbols:arrow-right-alt" @click="activateCallback('2')">Next</UButton>
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          <div class="flex flex-col">
            <div class=" rounded bg-surface-50 dark:bg-surface-950  flex  flex-col font-medium">
              <FileUpload :file-formats="modelFormatSelections" :fileLimit="1"/>
            </div>
          </div>
          <div class="flex pt-6 justify-between">
            <UButton icon="material-symbols:arrow-left-alt" variant="soft" @click="activateCallback('1')">Back</UButton>
            <UButton icon="material-symbols:arrow-right-alt" @click="activateCallback('3')">Next</UButton>
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div class="flex flex-col">
            <div class=" rounded bg-surface-50 dark:bg-surface-950  flex  flex-col font-medium">
              <FileUpload v-if="!isCurrentDataset" :file-formats="formatSelections" :multiple="true"/>
              <UCheckbox class="mt-4" color="blue" label="Use current project's dataset" v-model="isCurrentDataset"/>
            </div>
          </div>
          <div class="flex pt-6 justify-between">
            <UButton icon="material-symbols:arrow-left-alt" variant="soft" @click="activateCallback('2')">Back</UButton>
            <UButton icon="material-symbols:arrow-right-alt">Compare</UButton>
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>

  </UCard>
</template>

<style scoped>

</style>