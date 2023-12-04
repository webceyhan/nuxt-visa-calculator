<script setup lang="ts">
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

    <visit-stats
      :used-days="usedDays"
      :remaining-days="remainingDays"
      :expire-date-str="expireDateStr"
      :is-expired="isExpired"
    />
  </div>
</template>
