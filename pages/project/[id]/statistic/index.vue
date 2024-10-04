<script setup lang="ts">
import Chart from 'primevue/chart';

import {ref, onMounted} from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1-score', 'Micro Avg', 'Macro Avg', 'Weighted Avg'],
    datasets: [
      {
        label: 'Model 1',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: [76, 74, 75, 73, 75, 74, 74]
      },
      {
        label: 'Model 2',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: [87, 85, 86, 84, 86, 85, 85]
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 100
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  };
}
//-------------------------
const columns = [{
  key: 'id',
  label: 'Model'
}, {
  key: 'accuracy',
  label: 'Accuracy'
}, {
  key: 'precision',
  label: 'Precision'
}, {
  key: 'recall',
  label: 'Recall'
}, {
  key: 'f1Score',
  label: 'F1-score'
}, {
  key: 'microAvg',
  label: 'Micro Avg'
}, {
  key: 'macroAvg',
  label: 'Macro Avg'
}, {
  key: 'weightedAvg',
  label: 'Weighted Avg'
}]


const model = [{
  id: 1,
  accuracy: { value: '0.76' },
  precision: { value: '0.74' },
  recall: { value: '0.75'},
  f1Score: { value: '0.73' },
  microAvg: { value: '0.75'},
  macroAvg: { value: '0.74' },
  weightedAvg: { value: '0.74' }
}, {
  id: 2,
  accuracy: { value: '0.87', class: 'bg-green-500/50 dark:bg-green-400/50' },
  precision: { value: '0.85', class: 'bg-green-500/50 dark:bg-green-400/50' },
  recall: { value: '0.86', class: 'bg-green-500/50 dark:bg-green-400/50' },
  f1Score: { value: '0.84', class: 'bg-green-500/50 dark:bg-green-400/50' },
  microAvg: { value: '0.86', class: 'bg-green-500/50 dark:bg-green-400/50' },
  macroAvg: { value: '0.85', class: 'bg-green-500/50 dark:bg-green-400/50' },
  weightedAvg: { value: '0.85', class: 'bg-green-500/50 dark:bg-green-400/50' }
}]

</script>

<template>
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"/>
  </div>

  <div>
    <UTable :rows="model" :columns="columns">
      <template #accuracy-data="{ row }">
        {{ row.accuracy.value }}
      </template>
      <template #precision-data="{ row }">
       {{ row.precision.value }}
      </template>
      <template #recall-data="{ row }">
        {{ row.recall.value }}
      </template>
      <template #f1Score-data="{ row }">
       {{ row.f1Score.value }}
      </template>
      <template #microAvg-data="{ row }">
        {{ row.microAvg.value }}
      </template>
      <template #macroAvg-data="{ row }">
        {{ row.macroAvg.value }}
      </template>
      <template #weightedAvg-data="{ row }">
       {{ row.weightedAvg.value }}
      </template>
    </UTable>
  </div>

  <UButton
      color="blue"
      variant="solid"
      label="Export"

  />
</template>