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
</script>
<template>
  <!-- ========== HEADER ========== -->
  <header
      class="bg-white flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
    <nav
        class="relative max-w-[85rem] w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4  py-2">
      <!-- Logo w/ Collapse Button -->
      <div class="flex items-center justify-between">
        <a class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
           href="#" aria-label="Brand">Brand</a>

        <!-- Collapse Button -->
        <div class="md:hidden">
          <UButton
              icon="i-material-symbols:menu-rounded"
              color="gray"
              @click="isOpen = true"/>

          <UModal v-model="isOpen" fullscreen>
            <div class="p-6">
              <UVerticalNavigation @click="isOpen = false" :links="mobileLinks" />
            </div>
          </UModal>
        </div>
        <!-- End Collapse Button -->
      </div>
      <!-- End Logo w/ Collapse Button -->


      <!-- NavBar -->
      <UHorizontalNavigation
          class="hidden md:flex"
          :ui="{wrapper: 'justify-center' }"
          :links="links"/>
      <UButton
          class="hidden md:flex"
          icon="i-material-symbols:login"
          color="gray"
          variant="solid"
          to="/auth/login"
          label="Log In"
      />
      <!-- End NavBar -->
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
  <slot></slot>
</template>
