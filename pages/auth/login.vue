<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Login
  </h1>
  <form class="space-y-4 md:space-y-6" action="#">
    <UFormGroup label="Email">
      <UInput placeholder="Enter your email" icon="i-heroicons-envelope" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput placeholder="Enter your password" type="password" icon="i-heroicons-lock-closed" />
    </UFormGroup>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <UCheckbox name="remember" label="Remember me" />
      </div>
      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
        password?</a>
    </div>
    <UButton block type="submit">
      Sign in
    </UButton>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet? <a href="#"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
      up</a>
    </p>
  </form>
</template>
