<script setup lang="ts">
import { addDays, differenceInDays } from "date-fns";
import { MAX_DAYS_PER_VISIT } from "~/constants";
import { formatDate, parseDate } from "~/utils";

interface Props {
  enterDate: Date;
  exitDate: Date;
}

const emit = defineEmits(["update:enterDate", "update:exitDate"]);

const props = defineProps<Props>();

const enterDateStrProxy = computed({
  get: () => formatDate(props.enterDate),
  set: (value) => emit("update:enterDate", parseDate(value, props.enterDate)),
});

const exitDateStrProxy = computed({
  get: () => formatDate(props.exitDate),
  set: (value) => emit("update:exitDate", parseDate(value, props.exitDate)),
});

const days = computed(() => differenceInDays(props.exitDate, props.enterDate));

const maxDateStr = computed(() => {
  const date = addDays(props.enterDate, MAX_DAYS_PER_VISIT);

  return formatDate(date);
});
</script>

<template>
  <div
    class="flex flex-row items-end justify-around w-full rounded-box md:bg-base-200 md:p-6 gap-4"
  >
    <!-- suitcase icon -->
    <icon-suitcase class="max-md:hidden w-12 h-12 opacity-50 mb-3 text-info" />

    <!-- enter date -->
    <ui-form-control :label="$t('date.enter')" type="date" v-model="enterDateStrProxy" />

    <!-- exchange icon -->
    <icon-exchange class="max-md:hidden w-8 h-8 opacity-50 mb-3" />

    <!-- exit date -->
    <ui-form-control
      :label="$t('date.exit')"
      type="date"
      :min="enterDateStrProxy"
      :max="maxDateStr"
      v-model="exitDateStrProxy"
    />

    <!-- days -->
    <ui-stat class="max-md:hidden w-12 p-0">
      <ui-countdown :value="days" class="mb-0 p-0" />
      <template #desc>
        {{ $t("days.count") }}
      </template>
    </ui-stat>
  </div>
</template>
