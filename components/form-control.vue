<script setup lang="ts">
interface Props {
  label: string;
  type?: "text" | "date";
  modelValue: string;
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
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>

    <input
      class="input input-bordered w-full max-w-xs"
      :type="type"
      v-model="valueProxy"
    />
  </div>
</template>
