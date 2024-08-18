<script lang="ts" setup>

definePageMeta({
  layout: 'guest',
})

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
  created_at: "2024-01-03",
}, {
  id: 2,
  label: 'Facebook Sentiment Analysis',
  description: '202401 ISpark Project',
  user: users.at(1),
  created_at: "2024-01-03",
}, {
  id: 3,
  label: 'NLP Assignment',
  description: '202401 ISpark Project',
  user: users.at(0),

  created_at: "2024-01-03",
}, {
  id: 4,
  label: 'NER Assignment',
  description: '202401 ISpark Project',
  user: users.at(0),
  created_at: "2024-01-03",
}]
</script>

<template>
  <UContainer class="m-4 w-full">
    <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
      My Projects
    </h2>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
      <NuxtLink :to="`/project/${project.id}/dashboard`" v-for="project in projects"
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
