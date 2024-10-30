<script lang="ts" setup>

import {useAuth} from "#imports";

definePageMeta({
  layout: 'guest',
})

const {token} = useAuth()

const { data } = await useFetch('api/project/', {
  headers: {
    Authorization: `${token.value}`
  }
})

console.log(data.value)


const users = [{
  id: 1,
  name: "YIP ZI YAN",
  avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
}, {
  id: 1,
  name: "GOH CHUN YEN",
}];

const projects = [{
  id: 1,
  label: 'Code Mixed Twitter',
  description: '202401 ISpark Project',
  user: users.at(0),
  type: "Sequential Labeling",
  created_at: "2024-01-03",
}, {
  id: 2,
  label: 'Facebook Sentiment Analysis',
  description: '202401 ISpark Project',
  user: users.at(1),
  type: "Text Classification",
  created_at: "2024-01-03",
}, {
  id: 3,
  label: 'NLP Assignment',
  description: '202401 ISpark Project',
  user: users.at(0),
  type: "Sequential Labeling",
  created_at: "2024-01-03",
}, {
  id: 4,
  label: 'NER Assignment',
  description: '202401 ISpark Project',
  type: "Sequential Labeling",
  user: users.at(0),
  created_at: "2024-01-03",
}]
</script>

<template>
  <UContainer class="m-4 w-full">
    <div class="flex flex-wrap space-x-2">
      <h2 class=" font-semibold text-xl text-gray-900 dark:text-white ">
        My Projects
      </h2>
      <UButton
          icon="i-material-symbols:add"
          size="sm"
          color="gray"
          square
          :to="{ name: 'project-create' }"
          variant="solid"
      />
    </div>


    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
      <NuxtLink :to="{ name: 'project-id-dashboard', params: { id: project.id }}" v-for="project in projects"
                :key="project.id">
        <UCard>
          <template #header>
            <div class="flex w-full">
              <UAvatar
                  size="xl"
                  :src=project.user?.avatar
                  :alt=project.user?.name
              />
              <div class="flex-1 ml-4 truncate">
                <p class="truncate text-xl">{{ project.label }}</p>
                <p class="truncate text-sm">{{ project.description }}</p>
                <p class="truncate text-sm">{{ project.user?.name }}</p>
                <UBadge class="mt-2" color="white" :label="project.type"/>
              </div>
            </div>
          </template>
          <template #footer>
            <p class="text-sm text-right">{{ project.created_at }}</p>
          </template>
        </UCard>
      </NuxtLink>

    </div>

  </UContainer>

</template>
