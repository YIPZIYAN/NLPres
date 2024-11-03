<script setup lang="ts">
import {type InferType, object, string} from "yup";
import type {FormSubmitEvent} from "#ui/types";

definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
  },
})

const route = useRouter()

type Schema = InferType<typeof schema>

const formData = reactive({
  username: '',
  email: '',
  password: '',
  password1: '',
  password2: '',
})

const schema = object({
  username: string().max(255).required('Please enter your username'),
  email: string().email('Please enter a valid email address.').required('Please enter your email address.'),
  password1: string().required('Please enter your password.'),
  password2: string().required('Please confirm your password.')
      .test('passwords-match', 'Passwords must match.', function (value) {
        return this.parent.password1 === value
      }),
  password: string()
})

const {signUp} = useAuth()

const showPass = ref(false);
const showPassConfirm = ref(false);

const error = ref();
const loading = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = undefined;
  loading.value = true;
  event.data.password = event.data.password1;

  try {
    await signUp(
        {...event.data},
        {callbackUrl: '/', redirect: true}
    )
  } catch (e) {
    error.value = e.response._data;
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    Register
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

  <!--  <UAlert v-if="success"-->
  <!--          title="Thanks for signing up."-->
  <!--          color="primary"-->
  <!--          variant="solid"-->
  <!--          description="An email verification sent. Please check your email to verify."/>-->

  <UForm :schema="schema" :state="formData"
         @submit="onSubmit" method="post" class="space-y-4 md:space-y-6">

    <UFormGroup label="Username" name="username">
      <UInput placeholder="Enter your username"
              v-model="formData.username" icon="i-heroicons-user"/>
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput placeholder="Enter your email"
              v-model="formData.email" icon="i-heroicons-envelope"/>
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
