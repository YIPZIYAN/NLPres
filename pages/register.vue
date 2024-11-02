<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
  },
})

const showPass = ref(false);
const showPassConfirm = ref(false);

import {object, string, ref as yupRef, type InferType} from 'yup'
import type {FormSubmitEvent} from '#ui/types'

const schema = object({
  email: string().email('Please enter a valid email address.').required('Please enter your email address.'),
  password1: string().required('Please enter your password.'),
  password2: string().oneOf([yupRef('password1')], 'Confirm password must be same as password.')
})

type Schema = InferType<typeof schema>

const {signUp} = useAuth()

const formData = reactive({
  email: '',
  password1: '',
  password2: ''
})

const error = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await signUp(
        {...event.data},
        { callbackUrl: '/', redirect: true},
        { preventLoginFlow: true }
    )
  } catch (e) {
    error.value = e.response;
  }
}

</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Register
  </h1>
  <UAlert v-if="error"
          color="red"
          variant="solid"
          title="Opps.."
          description="This email is already registered."/>

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
  </UForm>
</template>
