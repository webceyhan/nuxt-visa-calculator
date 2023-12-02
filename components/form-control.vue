<script setup lang="ts">
interface Props {
  label: string;
  type?: "text" | "date";
  min?: string | number;
  max?: string | number;
  modelValue?: string | number;
  disabled?: boolean;
}

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();

const valueProxy = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label :class="['label', { 'opacity-50': disabled }]">
      <span class="label-text">{{ label }}</span>
    </label>

    <input
      class="input input-bordered md:input-lg w-full max-w-xs"
      v-model="valueProxy"
      v-bind="{ type, min, max, disabled }"
    />
  </div>
</template>
