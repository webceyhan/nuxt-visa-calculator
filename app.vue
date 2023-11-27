<script setup lang="ts">
const today = new Date();
const maxDays = 90;
const maxDaysInterval = 180;

// yyyy-mm-dd
const enterDate = ref("2023-05-13");
const exitDate = ref("2023-07-19");

const diffInDays = (start: Date, end: Date) => {
  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

const expireDate = computed(() => {
  const date = new Date(enterDate.value);
  date.setDate(date.getDate() + maxDaysInterval);
  return date.toDateString();
});

const usedDays = computed(() => {
  const entered = new Date(enterDate.value);
  const exited = new Date(exitDate.value);

  return diffInDays(entered, exited);
});

const remainingDays = computed(() => {
  return maxDays - usedDays.value;
});
</script>

<template>
  <div class="container flex flex-col justify-center items-center mx-auto gap-10 p-10">
    <header>
      <h1 class="text-5xl font-bold">Visa Calculator</h1>
    </header>

    <!-- enter date -->
    <form-control label="Enter Date" type="date" v-model="enterDate" />

    <!-- exit date -->
    <form-control label="Exit Date" type="date" v-model="exitDate" />

    <stat-group>
      <stat title="Used Days"> {{ usedDays }} / {{ maxDays }} </stat>

      <stat title="Remaining Days">
        {{ remainingDays }}
      </stat>

      <stat title="Valid Until">
        {{ expireDate }}
      </stat>
    </stat-group>
  </div>
</template>
