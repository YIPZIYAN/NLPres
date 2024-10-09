<script setup lang="ts">
const route = useRoute()

const links = [{
  label: 'Home',
  to: '/',
  icon: 'i-material-symbols:house-rounded'
}, {
  label: 'Project',
  to: '/project',
  icon: 'i-material-symbols:collections-bookmark-rounded',
}]

const isOpen = ref(false);
const mobileLinks = [...links, {
  label: 'Log In',
  to: '/auth-login',
  icon: 'i-material-symbols:login',
}]

const { data, status, getSession } = useAuth()
</script>
<template>
  <h1 class="text-white text-2xl md:text-4xl  mb-5">
    Hello,
    <span v-if="status === 'authenticated'">{{ data?.email  }}</span>
  </h1>

  <!-- ========== HEADER ========== -->
  <header
      class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
    <nav
        class=" px-4 pt-4 pb-4 max-w-[85rem] w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto md:px-4 md:pt-2 md:pb-0 ">
      <!-- Logo w/ Collapse Button -->
      <div class="flex flex-grow items-center justify-between ml-2">
        <img src="/img/nlpres_logo.png" class="w-6 m-4" alt="logo"/>
        <a class="flex-1 font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
           href="/" aria-label="NLPres">
          NLPres
        </a>

        <!-- Collapse Button -->
        <div class="md:hidden">
          <ButtonColorMode class="mr-2"/>

          <UButton
              icon="i-material-symbols:menu-rounded"
              color="gray"
              @click="isOpen = true"/>

          <UModal v-model="isOpen" fullscreen>
            <div class="p-6">
              <div class="flex items-center justify-end">
                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="px-4"
                         @click="isOpen = false"/>
              </div>
              <UVerticalNavigation @click="isOpen = false" :links="mobileLinks"/>
            </div>
          </UModal>
        </div>
        <!-- End Collapse Button -->
      </div>
      <!-- End Logo w/ Collapse Button -->
      <ButtonColorMode class="hidden md:block justify-end"/>
      <UButton
          class="hidden md:flex"
          icon="i-material-symbols:login"
          color="gray"
          variant="solid"
          to="/login"
          label="Log In"
      />
    </nav>
  </header>
  <!--  <nav class="bg-white dark:bg-neutral-900 ml-8">-->
  <!--    &lt;!&ndash; NavBar &ndash;&gt;-->
  <!--    <UHorizontalNavigation-->
  <!--        class="hidden md:flex"-->
  <!--        :links="links"/>-->
  <!--    &lt;!&ndash; End NavBar &ndash;&gt;-->
  <!--  </nav>-->
  <slot/>

</template>
