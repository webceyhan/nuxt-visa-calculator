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

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="bi bi-suitcase-fill max-md:hidden w-12 h-12 opacity-50 mb-3 text-info"
      viewBox="0 0 16 16"
    >
      <path
        d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3h1.5A1.5 1.5 0 0 1 13 4.5v9a1.5 1.5 0 0 1-1.004 1.416A1 1 0 1 1 10 15H6a1 1 0 1 1-1.997-.084A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3H6zM9 1H7v2h2zM6 5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0z"
      />
    </svg>

    <!-- enter date -->
    <form-control :label="$t('date.enter')" type="date" v-model="enterDateStrProxy" />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="max-md:hidden w-8 h-8 opacity-50 mb-3"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"
      />
    </svg>

    <!-- exit date -->
    <form-control
      :label="$t('date.exit')"
      type="date"
      :min="enterDateStrProxy"
      :max="maxDateStr"
      v-model="exitDateStrProxy"
    />

    <stat class="max-md:hidden w-12 p-0">
      <countdown :value="days" class="mb-0 p-0" />
      <template #desc>
        {{ $t("days.count") }}
      </template>
    </stat>
  </div>
</template>
