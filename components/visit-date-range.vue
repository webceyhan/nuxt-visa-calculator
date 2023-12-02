<script setup lang="ts">
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
</script>

<template>
  <div class="flex flex-col md:flex-row w-full items-center justify-center gap-10">
    <!-- enter date -->
    <form-control :label="$t('date.enter')" type="date" v-model="enterDateStrProxy" />

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
      :label="$t('date.exit')"
      type="date"
      :min="enterDateStrProxy"
      v-model="exitDateStrProxy"
    />
  </div>
</template>
