<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
    useHead({
      title: 'NLPres',
      meta: [
        { name: 'description', content: 'NLP annotation tools for researchers.' }
      ],
    })
</script>