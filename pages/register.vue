<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth:false,
})

const showPass = ref(false);
const showPassConfirm = ref(false);

const password = '';
const password_confirmation = '';

</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Register
  </h1>
  <form class="space-y-4 md:space-y-6" action="#">
    <UFormGroup label="Email">
      <UInput placeholder="Enter your email" icon="i-heroicons-envelope"/>
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput placeholder="Enter your password"
              v-model="password"
              :ui="{ icon: { trailing: { pointer: '' } } }"
              :type="showPass ? 'text' : 'password'"
              icon="i-heroicons-lock-closed">
        <template #trailing>
          <UButton
              color="gray"
              variant="link"
              icon="i-heroicons-eye"
              :padded="false"
              @click="showPass = !showPass"
          />
        </template>
      </UInput>
    </UFormGroup>
    <UFormGroup label="Confirm password" name="password_confirmation">
      <UInput placeholder="Re-enter your password"
              v-model="password_confirmation"
              :ui="{ icon: { trailing: { pointer: '' } } }"
              :type="showPassConfirm ? 'text' : 'password'"
              icon="i-heroicons-lock-closed">
        <template #trailing>
          <UButton
              color="gray"
              variant="link"
              icon="i-heroicons-eye"
              :padded="false"
              @click="showPassConfirm = !showPassConfirm"
          />
        </template>
      </UInput>    </UFormGroup>

    <UButton block type="submit">
      Create an account
    </UButton>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Already have an account?
      <NuxtLink
          to="login"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500">
        Sign in
      </NuxtLink>
    </p>
  </form>
</template>
