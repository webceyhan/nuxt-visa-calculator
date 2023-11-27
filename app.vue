<script setup lang="ts">
import { MAX_DAYS, MAX_DAYS_INTERVAL } from "~/constants";
const {
  enterDate,
  exitDate,
  usedDays,
  remainingDays,
  isExpired,
  expireDateFormatted,
} = useDateFormula();
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
      <stat title="Used Days">
        <countdown :value="usedDays" />
        / {{ MAX_DAYS }}
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
