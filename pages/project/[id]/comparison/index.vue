<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

</script>

<template>
  <UCard>
    <Stepper value="1" linear class="basis-[50rem]">
      <StepList>
        <Step value="1">Upload Model</Step>
        <Step value="2">Upload Dataset</Step>
        <Step value="3">Header III</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <div class="flex flex-col">
            <div class=" rounded bg-surface-50 dark:bg-surface-950  flex  flex-col font-medium">
              <FileUpload/>
            </div>
          </div>
          <div class="flex pt-6 justify-end">
            <UButton icon="material-symbols:arrow-right-alt" @click="activateCallback('2')">Next</UButton>
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          <div class="flex flex-col h-48">
            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
          </div>
          <div class="flex pt-6 justify-between">
            <UButton severity="secondary" icon="material-symbols:arrow-left-alt" variant="soft" @click="activateCallback('1')" >Back</UButton>
            <UButton icon="material-symbols:arrow-right-alt" iconPos="right" @click="activateCallback('3')" >Next</UButton>
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div class="flex flex-col h-48">
            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
          </div>
          <div class="pt-6">
            <UButton severity="secondary" icon="material-symbols:arrow-left-alt" variant="soft" @click="activateCallback('2')" >Back</UButton>
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>

  </UCard>
</template>

<style scoped>

</style>