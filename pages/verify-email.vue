<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
  },
})

const route = useRouter();
const code = ref('');

// const { data } = await useAsyncData('key', () => useBaseFetch('/auth/verify-email'));

</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Verify your email
  </h1>
  <p>Please enter the code sent to your email.</p>

  <PInputOtp class="justify-center" v-model="code" :length="6"/>

  <div class="flex justify-between items-center">
    <UButton label="Resend Code" color="gray"/>
<!--    <UButton label="Submit" @click="submit()"/>-->
  </div>
</template>

<style scoped>

</style>