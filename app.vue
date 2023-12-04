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
} = useVisits();
</script>

<template>
  <div class="container flex flex-col justify-center items-center mx-auto gap-y-20 p-10">
    <header class="text-6xl font-bold text-center mt-5 md:mt-20">
      <h1 class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {{ $t("welcome") }}
      </h1>
    </header>

    <div class="w-full max-w-5xl space-y-5">
      <visit-date-range
        v-for="visit in visits"
        :min-date="visit.minDate"
        :max-date="visit.maxDate"
        v-model:enter-date="visit.enterDate"
        v-model:exit-date="visit.exitDate"
      />
    </div>

    <visit-list-actions
      :can-add="canAddVisit"
      :can-remove="canRemoveVisit"
      @add="addNextVisit()"
      @remove="removeLastVisit()"
    />

    <ui-stat-group class="max-md:stats-vertical w-full md:justify-between md:max-w-3xl">
      <ui-stat :title="$t('days.used')">
        <ui-countdown :value="usedDays" />
        <span class="opacity-50"> / {{ MAX_DAYS_PER_VISIT }} </span>
      </ui-stat>

      <ui-stat :title="$t('days.remaining')">
        <ui-countdown :value="remainingDays" :class="{ 'line-through': isExpired }" />
      </ui-stat>

      <ui-stat :title="$t('date.validUntil')">
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
      </ui-stat>
    </ui-stat-group>
  </div>
</template>
