<script setup lang="ts">
/**
 * Colors
 * - btn-primary
 * - btn-secondary
 * - btn-accent
 * - btn-neutral
 * - btn-info
 * - btn-success
 * - btn-warning
 * - btn-error
 */
interface Props {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error";
  outline?: boolean;
}

defineProps<Props>();
</script>

<template>
  <button
    type="button"
    :class="[
      'btn rounded-full md:btn-wide',
      {
        [`btn-${color}`]: color,
        'btn-outline': outline,
      },
    ]"
  >
    <slot />
  </button>
</template>
