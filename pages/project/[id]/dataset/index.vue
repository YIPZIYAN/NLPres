<script setup lang="ts">
const formatSelections = [{
  key: '.txt',
  label: 'TXT',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580874.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.json',
  label: 'JSON',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580838.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.jsonl',
  label: 'JSONL',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580838.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.csv',
  label: 'CSV',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580842.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.xml',
  label: 'XML',
  value: 'https://cdn-icons-png.freepik.com/512/11580/11580864.png?ga=GA1.1.1429049260.1723829582'
}, {
  key: '.conllu',
  label: 'CONLL-U',
  value: 'https://cdn-icons-png.freepik.com/512/16961/16961685.png?ga=GA1.1.1429049260.1723829582'
}]
</script>

<template>
  <FileUpload importable :file-formats="formatSelections" :multiple="true"/>
</template>

<style scoped>

</style>