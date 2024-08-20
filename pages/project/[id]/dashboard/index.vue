<script setup lang="ts">
</script>

<template>
  <UCard>
    <template #header>
      Welcome to NLPre!
    </template>

    <PStepper value="1">
      <PStepItem value="1">
        <PStep>Get Started</PStep>
        <PStepPanel v-slot="{ activateCallback }">
          <div class="flex flex-col h-48">
            <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">

            </div>
          </div>
          <div class="py-6">
            <UButton label="Next" @click="activateCallback('2')"/>
          </div>
        </PStepPanel>
      </PStepItem>
      <PStepItem value="2">
        <PStep>Import Dataset</PStep>
        <PStepPanel v-slot="{ activateCallback }">
          <div class="flex flex-col h-48">
            <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              Content II
            </div>
          </div>
          <div class="flex py-6 gap-2">
            <UButton label="Back" color="gray" @click="activateCallback('1')"/>
            <UButton label="Next" @click="activateCallback('3')"/>
          </div>
        </PStepPanel>
      </PStepItem>

      <PStepItem value="3">
        <PStep>Create Labels</PStep>
        <PStepPanel v-slot="{ activateCallback }">
          <div class="flex flex-col h-48">
            <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              Content II
            </div>
          </div>
          <div class="flex py-6 gap-2">
            <UButton label="Back" color="gray" @click="activateCallback('1')"/>
            <UButton label="Next" @click="activateCallback('3')"/>
          </div>
        </PStepPanel>
      </PStepItem>

      <PStepItem value="4">
        <PStep>Invite Collaborators</PStep>
        <PStepPanel v-slot="{ activateCallback }">
          <div class="flex flex-col h-48">
            <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              Content II
            </div>
          </div>
          <div class="flex py-6 gap-2">
            <UButton label="Back" color="gray" @click="activateCallback('1')"/>
            <UButton label="Next" @click="activateCallback('3')"/>
          </div>
        </PStepPanel>
      </PStepItem>


      <PStepItem value="5">
        <PStep>Annotate</PStep>
        <PStepPanel v-slot="{ activateCallback }">
          <div class="flex flex-col h-48">
            <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              Content II
            </div>
          </div>
          <div class="flex py-6 gap-2">
            <UButton label="Back" color="gray" @click="activateCallback('1')"/>
            <UButton label="Next" @click="activateCallback('3')"/>
          </div>
        </PStepPanel>
      </PStepItem>

      <PStepItem value="6">
        <PStep>Evaluate</PStep>
        <PStepPanel v-slot="{ activateCallback }">
          <div class="flex flex-col h-48">
            <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              Content III
            </div>
          </div>
          <div class="py-6">
            <UButton label="Back" color="gray" @click="activateCallback('2')"/>
          </div>
        </PStepPanel>
      </PStepItem>
    </PStepper>
  </UCard>
</template>
