<script setup lang="ts">
import { MAX_DAYS_INTERVAL, MAX_DAYS_PER_VISIT } from "~/constants";

interface Props {
  usedDays: number;
  remainingDays: number;
  expireDateStr: string;
  isExpired: boolean;
}

defineProps<Props>();
</script>

<template>
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
</template>
