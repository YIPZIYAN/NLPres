<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const {signIn} = useAuth()
const showPass = ref(false);

const formData = reactive({
  email: '',
  password: '',
})

const login = async (e) => {
  try {
    e.preventDefault()
    let res = await signIn(
        {...formData},
        {callbackUrl: "/project"}
    )

    console.log("res", res);

  } catch (error) {
    console.log("error", error);
    console.log(formData);
  }
}
</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Login
  </h1>
  <form class="space-y-4 md:space-y-6" @submit.prevent="login" method="post">
    <UFormGroup label="Email">
      <UInput placeholder="Enter your email" name="email"
              v-model="formData.email" icon="i-heroicons-envelope"/>
    </UFormGroup>
    <UFormGroup label="Password">
      <UInput placeholder="Enter your password"
              name="password"
              v-model="formData.password"
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
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <UCheckbox name="remember" label="Remember me"/>
      </div>
      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
        password?</a>
    </div>
    <UButton block type="submit">
      Sign in
    </UButton>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet?
      <NuxtLink
          to="register"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500">
        Sign up
      </NuxtLink>
    </p>
  </form>
</template>
