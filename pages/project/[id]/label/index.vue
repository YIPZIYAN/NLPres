<script setup lang="ts">
// Action Dropdown
const items = [
  [{
    label: 'Import Label',
    icon: 'material-symbols:upload-2-rounded',
    to: '/dataset'
  }, {
    label: 'Export Label',
    icon: 'material-symbols:download-2-rounded'
  }]
]

// Table
const columns = [{
  key: 'id',
  label: 'ID',
  sortable: true
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'color',
  label: 'Color',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false
}]

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref([])

function select(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}


const search = ref('')
const selectedStatus = ref([])
const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return ''
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
  }

  return `?completed=${selectedStatus.value[0].value}`
})


// Pagination
const sort = ref({column: 'id', direction: 'asc' as const})
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Data
const data =[{
  'id': 1,
  'name' : "Happy",
  'color' : "red"
},{
  'id': 2,
  'name' : "Sad",
  'color' : "blue"
}]

</script>

<template>
  <div class="flex">
    <UDropdown class="flex-1" :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton color="white" label="Actions" trailing-icon="i-heroicons-chevron-down-20-solid"/>
    </UDropdown>

    <UButton
        class="justify-end"
        trailing
        color="red"
        size="sm"
    >
      Delete All
    </UButton>
  </div>


  <UCard
      class="w-full"
      :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
    }"
  >

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..."/>
    </div>

    <!-- Header and Action buttons -->
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Rows per page:</span>

        <USelect
            v-model="pageCount"
            :options="[3, 5, 10, 20, 30, 40]"
            class="me-2 w-20"
            size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <UButton v-if="selectedRows.length >= 1"
                 trailing
                 color="red"
                 size="xs"
        >
          Delete
        </UButton>




      </div>
    </div>

    <!-- Table -->
    <UTable
        v-model="selectedRows"
        v-model:sort="sort"
        :rows="data"
        :columns="columnsTable"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        sort-mode="manual"
        class="w-full"
        :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' } } }"
        @select="select"
    >
      <template #color-data="{ row }">
        <UBadge size="xs"
                :label="row.name"
                :color="row.color" variant="subtle"/>
      </template>

      <template #actions-data="{ row }">
        <UButton size="xs" color="blue" variant="solid" class="mr-4">Edit</UButton>
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ pageTotal }}</span>
            results
          </span>
        </div>

        <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="pageTotal"
            :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }"
        />
      </div>
    </template>
  </UCard>
</template>

<style scoped>

</style>