<script setup lang="ts">
import { MAX_DAYS, MAX_DAYS_INTERVAL } from "~/constants";
const {
  enterDate,
  exitDate,
  usedDays,
  remainingDays,
  isExpired,
  expireDateFormatted,
  canExit,
} = useDateFormula();
</script>

<template>
  <div class="container flex flex-col justify-center items-center mx-auto gap-10 p-10">
    <header>
      <h1 class="text-5xl font-bold text-center my-10">Visa Calculator</h1>
    </header>

    <div class="flex flex-col md:flex-row w-full items-center justify-center gap-10">
      <!-- enter date -->
      <form-control label="Enter Date" type="date" v-model="enterDate" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="max-md:hidden w-8 h-8 opacity-50 mt-8"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"
        />
      </svg>

      <!-- exit date -->
      <form-control
        label="Exit Date"
        type="date"
        v-model="exitDate"
        :disabled="!canExit"
      />
    </div>

    <stat-group class="max-md:stats-vertical md:my-10 max-sm:w-full">
      <stat title="Used Days">
        <countdown :value="usedDays" />
        <span class="opacity-50"> / {{ MAX_DAYS }} </span>
      </stat>

      <stat title="Remaining Days">
        <countdown :value="remainingDays" :class="{ 'line-through': isExpired }" />
      </stat>

      <stat title="Valid Until">
        <span
          :class="{
            'text-success': !isExpired,
            'text-error': isExpired,
          }"
        >
          {{ expireDateFormatted }}
        </span>

        <template #desc> Max {{ MAX_DAYS_INTERVAL }} days from enter date </template>
      </stat>
    </stat-group>
  </div>
</template>
