<script setup lang="ts">
import { addDays, differenceInDays, lightFormat, isAfter, isValid } from "date-fns";

const TODAY = new Date();
const MAX_DAYS = 90;
const MAX_DAYS_INTERVAL = 180;

// yyyy-mm-dd
const enterDate = ref("");
const exitDate = ref("");

const expireDate = computed<Date>(() => {
  const entered = new Date(enterDate.value);

  return isValid(entered) ? addDays(entered, MAX_DAYS_INTERVAL) : TODAY;
});

const usedDays = computed<number>(() => {
  const entered = new Date(enterDate.value);
  const exited = new Date(exitDate.value);
  const days = differenceInDays(exited, entered);

  return days > 0 ? days : 0;
});

const remainingDays = computed<number>(() => {
  return MAX_DAYS - usedDays.value;
});

const isExpired = computed<boolean>(() => {
  return isAfter(TODAY, expireDate.value);
});
</script>

<template>
  <div class="container flex flex-col justify-center items-center mx-auto gap-10 p-10">
    <header>
      <h1 class="text-5xl font-bold text-center">Visa Calculator</h1>
    </header>

    <!-- enter date -->
    <form-control label="Enter Date" type="date" v-model="enterDate" />

    <!-- exit date -->
    <form-control label="Exit Date" type="date" v-model="exitDate" />

    <stat-group class="max-md:stats-vertical md:my-10">
      <stat title="Used Days"> {{ usedDays }} / {{ MAX_DAYS }} </stat>

      <stat title="Remaining Days">
        <span :class="{ 'line-through': isExpired }">
          {{ remainingDays }}
        </span>
      </stat>

      <stat title="Valid Until">
        <span
          :class="{
            'text-success': !isExpired,
            'text-error': isExpired,
          }"
        >
          {{ lightFormat(expireDate, "dd / MMM / yyyy") }}
        </span>

        <template #desc> Max {{ MAX_DAYS_INTERVAL }} days from enter date </template>
      </stat>
    </stat-group>
  </div>
</template>
