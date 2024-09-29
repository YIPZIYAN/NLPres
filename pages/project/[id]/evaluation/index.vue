<script setup lang="ts">
import type {Avatar} from "#ui/types";

const iaaMetrics = ['Cohen Kappa','Fleiss\' kappa']


const users = ['YIP ZI YAN', 'GOH CHUN YEN']
const profiles = [{
  id: 1,
  name: "YIP ZI YAN",
  avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
}, {
  id: 1,
  name: "GOH CHUN YEN",
}];

const selectedMetric = ref()
const selectedUsers = ref([])

</script>

<template>

  <div class="space-y-4">
    <UFormGroup label="Select annotators">
      <USelectMenu
          v-model="selectedUsers"
          :options="users"
          multiple
          searchable
          searchable-placeholder="Search a person..."
          size="xl"
          variant="outline"
          placeholder="Select annotators">
      </USelectMenu>
    </UFormGroup>
    <UFormGroup label="Select an Inter-annotator Agreement (IAA) Metric">
      <USelectMenu
          size="xl"
          placeholder="Select an IAA Metric"
          variant="outline"
          :options="iaaMetrics"
          v-model="selectedMetric"
      />
    </UFormGroup>
  </div>
  <div class="flex justify-end">
    <UButton
        color="blue"
        variant="solid"
        label="Evaluate"
    />
  </div>
  <div>
    <h1 class="my-4">Result: 0.88 <UBadge class="ml-2" label="Almost Perfect Agreement" color="green" /> </h1>
    <div>
      <UCard v-for="user in profiles" :key="user.id">
        <template #header>
          <div class="flex items-center">
            <UAvatar
                size="lg"
                :src=user?.avatar
                :alt=user?.name
            />
            <div class="ml-4 truncate">
              <p class="truncate">{{ user.name }}</p>
            </div>
          </div>
        </template>
      </UCard>
    </div>

  </div>


</template>
