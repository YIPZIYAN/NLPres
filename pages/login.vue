<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
  },
})

import {object, string, type InferType} from 'yup'
import type {FormSubmitEvent} from '#ui/types'

const schema = object({
  email: string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
  password: string()
      .required('Please enter your password.'),
})

type Schema = InferType<typeof schema>

const {signIn} = useAuth()
const showPass = ref(false);

const formData = reactive({
  email: '',
  password: '',
})

const error = ref();
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  error.value = undefined

  try {
    await signIn(
        {...event.data},
        {callbackUrl: "/project"}
    )
  } catch (e) {
    error.value = e.response;
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="loading">
    <UProgress animation="carousel" />
  </div>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Login
  </h1>
  <UAlert v-if="error!=undefined"
          title="Please try again."
          color="red"
          variant="solid">
    <template #description>
      <div v-for="(errorMessages, field) in error" :key="field">
        <ul class="list-disc px-4">
          <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
        </ul>
      </div>
    </template>
  </UAlert>

  <UForm :schema="schema"
         :state="formData"
         class="space-y-4 md:space-y-6"
         @submit="onSubmit" method="post">

    <UFormGroup label="Email" name="email">
      <UInput placeholder="Enter your email"
              v-model="formData.email" icon="i-heroicons-envelope"/>
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput placeholder="Enter your password"
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

    <div class="flex items-center justify-end">
      <!--      <div class="flex items-start">-->
      <!--        <UCheckbox name="remember" label="Remember me"/>-->
      <!--      </div>-->
      <a href="#" class=" text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
        password?</a>
    </div>

    <UButton block type="submit" :disabled="loading">
      Sign in
    </UButton>

    <UDivider/>
    <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet?
      <NuxtLink
          to="register"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500">
        Sign up
      </NuxtLink>
    </p>
  </UForm>
</template>
