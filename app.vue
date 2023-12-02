<script setup lang="ts">
import { MAX_DAYS_PER_VISIT, MAX_DAYS_INTERVAL } from "~/constants";
const {
  visits,
  usedDays,
  remainingDays,
  expireDateStr,
  isExpired,
  addNextVisit,
  removeLastVisit,
  canAddVisit,
  canRemoveVisit,
} = useDateFormula();
</script>

<template>
  <div class="container flex flex-col justify-center items-center mx-auto gap-10 p-10">
    <header class="text-6xl font-bold text-center my-5 md:my-20">
      <h1 class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {{ $t("welcome") }}
      </h1>
    </header>

    <visit-date-range
      v-for="visit in visits"
      v-model:enter-date="visit.enterDate"
      v-model:exit-date="visit.exitDate"
    />

    <div class="flex items-center justify-between md:my-10 gap-4 md:gap-10">
      <visit-remove-button :disabled="!canRemoveVisit" @click="removeLastVisit()" />
      <visit-add-button :disabled="!canAddVisit" @click="addNextVisit()" />
    </div>

    <stat-group class="max-md:stats-vertical md:my-10 max-sm:w-full">
      <stat :title="$t('days.used')">
        <countdown :value="usedDays" />
        <span class="opacity-50"> / {{ MAX_DAYS_PER_VISIT }} </span>
      </stat>

      <stat :title="$t('days.remaining')">
        <countdown :value="remainingDays" :class="{ 'line-through': isExpired }" />
      </stat>

      <stat :title="$t('date.validUntil')">
        <span
          :class="{
            'text-success': !isExpired,
            'text-error': isExpired,
          }"
        >
          {{ expireDateStr }}
        </span>

        <template #desc>
          {{ $t("days.maxAllowed", { days: MAX_DAYS_INTERVAL }) }}
        </template>
      </stat>
    </stat-group>
  </div>
</template>
