<script setup lang="ts">
import {object, string, ref as yupRef, type InferType} from 'yup'
import type {FormSubmitEvent} from '#ui/types'

definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
  },
})

type Schema = InferType<typeof schema>

const formData = reactive({
  email: '',
  password1: '',
  password2: ''
})

const schema = object({
  email: string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
  password1: string()
      .min(8, 'Password must be at least 8 characters.')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .matches(/[0-9]/, 'Password must contain at least one number.')
      .matches(/[@$!%*?&#_-]/, 'Password must contain at least one symbol from @$!%*?&#_-'),
  password2: string()
      .oneOf([yupRef('password1')], 'Confirm password must be same as password.')
})

const {signUp} = useAuth()

const showPass = ref(false);
const showPassConfirm = ref(false);

const error = ref()
const success = ref(false)
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = undefined
  loading.value = true
  success.value = false

  try {
    await signUp(
        {...event.data},
        { undefined },
        { preventLoginFlow: true }
    )

    success.value = true
    formData.email = ''
    formData.password1 = ''
    formData.password2 = ''

  } catch (e) {
    success.value = false
    error.value = e.response
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
    Register
  </h1>

  <UAlert v-if="error"
          color="red"
          variant="solid"
          title="Opps.."
          description="This email is already registered."/>

  <UAlert v-if="success"
          color="green"
          variant="solid"
          title="Registration Successful!"
          description="Your account has been created successfully. Please log in to continue."/>

  <UForm
      :schema="schema"
      :state="formData"
      class="space-y-4 md:space-y-6"
      @submit="onSubmit" method="post">
    <UFormGroup label="Email" name="email">
      <UInput placeholder="Enter your email"
              v-model="formData.email"
              icon="i-heroicons-envelope"/>
    </UFormGroup>

    <UFormGroup label="Password" name="password1">
      <UInput placeholder="Enter your password"
              v-model="formData.password1"
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
    
    <UFormGroup label="Confirm password" name="password2">
      <UInput placeholder="Re-enter your password"
              v-model="formData.password2"
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
      </UInput>
    </UFormGroup>

    <UButton block type="submit" :disabled="loading">
      Create an account
    </UButton>

    <UDivider/>

    <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
      Already have an account?
      <NuxtLink
          to="login"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500">
        Sign in
      </NuxtLink>
    </p>
  </UForm>
</template>
