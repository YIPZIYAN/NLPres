<script setup lang="ts">
import {object, string, ref as yupRef, type InferType} from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import PToast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from "vue"

const toast = useToast();
const { data, token } = useAuth()

definePageMeta({
  layout: 'guest',
})

const showPassCurrent = ref(false)
const showPassNew = ref(false)
const showPassConfirm = ref(false)

type Schema1 = InferType<typeof changePasswordSchema>

const changePasswordForm = reactive({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const changePasswordSchema = object({
  current_password: string()
      .required('Please enter your password.'),
  new_password: string()
      .min(8, 'Password must be at least 8 characters.')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .matches(/[0-9]/, 'Password must contain at least one number.')
      .matches(/[@$!%*?&#_-]/, 'Password must contain at least one symbol from @$!%*?&#_-'),
  confirm_password: string()
      .oneOf([yupRef('new_password')], 'Confirm password must be same as new password.')
})

const changePwdLoading = ref(false)

async function onChangePasswordSubmit(event: FormSubmitEvent<Schema1>) {
  changePwdLoading.value = true

  try {
    await $fetch(useRuntimeConfig().public.baseUrl + 'profile/change-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token.value}`,
      },
      body: {
        ...event.data
      }
    })

    toast.add({
      severity: 'success',
      summary: 'Change Password Successful!',
      detail: 'Your password has been changed.',
      life: 5000
    })

    changePasswordForm.current_password = ''
    changePasswordForm.new_password = ''
    changePasswordForm.confirm_password = ''

  } catch (e) {
    for (const field in e.response._data) {
      if (e.response._data.hasOwnProperty(field)) {
        const errorMessages = e.response._data[field]
        errorMessages.forEach((message) => {
          toast.add({
            severity: 'error',
            summary: 'Change Password Failed.',
            detail: message,
            life: 5000
          })
        })
      }
    }

  } finally {
    changePwdLoading.value = false
  }
}

const src = ref(data.value?.avatar || '/img/null_avatar.png');

interface FileUploadSelectEvent {
  files: File[];
}

function onFileSelect(event: FileUploadSelectEvent) {
  const file = event.files[0];
  generalInfoForm.avatar = file
  console.log(file)
  const reader = new FileReader();
  reader.onload = async (e) => {
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

type Schema2 = InferType<typeof generalInfoSchema>

const generalInfoForm = reactive({
  avatar: null as File | null
})

const generalInfoSchema = object({
  avatar: string()
      .required('Please select an image.'),
})

const generalInfoLoading = ref(false)

async function onGeneralInfoSubmit(event: FormSubmitEvent<Schema2>) {
  generalInfoLoading.value = true
  const formData = new FormData();
  formData.append('avatar', generalInfoForm.avatar as File);

  try {
    await $fetch(useRuntimeConfig().public.baseUrl + 'profile/update/', {
      method: 'PUT',
      headers: {
        'Authorization': `${token.value}`,
      },
      body: formData,
    })

    generalInfoForm.avatar = null

    toast.add({
      severity: 'success',
      summary: 'Profile Update Successful!',
      detail: 'Your profile information has been updated.',
      life: 5000
    })

  } catch (e) {
    for (const field in e.response._data) {
      if (e.response._data.hasOwnProperty(field)) {
        const errorMessages = e.response._data[field]
        errorMessages.forEach((message) => {
          toast.add({
            severity: 'error',
            summary: 'Profile Update Failed.',
            detail: message,
            life: 5000
          })
        })
      }
    }

  } finally {
    generalInfoLoading.value = false
  }

}

</script>

<template>

  <PToast />

  <UContainer class="m-4 max-w-full">
    <div class="flex flex-wrap space-x-2">
      <h2 class=" font-semibold text-xl text-gray-900 dark:text-white ">
        Profile
      </h2>
    </div>


    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">

      <div class="col-span-full">
        <div class="p-4 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div v-if="generalInfoLoading" class="mt-2 mb-4">
            <UProgress animation="carousel" />
          </div>
          <h3 class="mb-4 text-xl font-semibold dark:text-white">General information</h3>
          <UForm :schema="generalInfoSchema" :state="generalInfoForm" class="space-y-4" @submit.prevent="onGeneralInfoSubmit">

            <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <UFormGroup name="avatar" label="Avatar">

                <div class="flex items-center space-x-4">
                  <UAvatar
                      class="mt-2"
                      size="2xl"
                      :src="src"
                      alt="Avatar"
                  />
                  <PFileUpload size="small" mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" accept="image/*" :maxFileSize="1000000" />
                </div>
              </UFormGroup>
            </div>

            <div class="grid grid-cols-6 gap-6">
              <UFormGroup label="Email" name="email" class="col-span-6 sm:col-span-3">
                <UInput disabled size="lg" v-model="data.email" />
              </UFormGroup>

              <div class="col-span-6 sm:col-full">
                <UButton
                    :disabled="generalInfoLoading"
                    class="px-5 py-2.5"
                    type="submit"
                    size="lg"
                    label="Save"
                />
              </div>

            </div>

          </UForm>
        </div>
        <div class="p-4 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div v-if="changePwdLoading" class="mt-2 mb-4">
            <UProgress animation="carousel" />
          </div>
          <h3 class="mb-4 text-xl font-semibold dark:text-white">Password information</h3>
          <UForm :schema="changePasswordSchema" :state="changePasswordForm" class="space-y-4" @submit="onChangePasswordSubmit">
            <div class="grid grid-cols-6 gap-6">

              <UFormGroup label="Current Password" name="current_password" class="col-span-6 sm:col-span-3">
                <UInput placeholder="Enter current password"
                        v-model="changePasswordForm.current_password"
                        :ui="{ icon: { trailing: { pointer: '' } } }"
                        :type="showPassCurrent ? 'text' : 'password'"
                        size="lg"
                        >
                  <template #trailing>
                    <UButton
                        color="gray"
                        variant="link"
                        icon="i-heroicons-eye"
                        :padded="false"
                        @click="showPassCurrent = !showPassCurrent"
                    />
                  </template>
                </UInput>
              </UFormGroup>

              <UFormGroup label="New Password" name="new_password" class="col-span-6 sm:col-span-3">
                <UInput placeholder="Enter new password"
                        v-model="changePasswordForm.new_password"
                        :ui="{ icon: { trailing: { pointer: '' } } }"
                        :type="showPassNew ? 'text' : 'password'"
                        size="lg"
                        >
                  <template #trailing>
                    <UButton
                        color="gray"
                        variant="link"
                        icon="i-heroicons-eye"
                        :padded="false"
                        @click="showPassNew = !showPassNew"
                    />
                  </template>
                </UInput>
              </UFormGroup>

              <UFormGroup label="Confirm Password" name="confirm_password" class="col-span-6 sm:col-span-3">
                <UInput placeholder="Confirm your new password"
                        v-model="changePasswordForm.confirm_password"
                        :ui="{ icon: { trailing: { pointer: '' } } }"
                        :type="showPassConfirm ? 'text' : 'password'"
                        size="lg"
                        >
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

              <div class="col-span-6 sm:col-full">
                <UButton
                    :disabled="changePwdLoading"
                    class="px-5 py-2.5"
                    type="submit"
                    size="lg"
                    label="Change Password"
                />
              </div>

            </div>

          </UForm>


        </div>
      </div>
    </div>

  </UContainer>

</template>

<style scoped>

</style>