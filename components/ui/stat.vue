<script setup lang="ts">
interface Props {
  title?: string;
  value?: any;
}

defineProps<Props>();
</script>

<template>
  <div class="stat">
    <div v-if="$slots.figure" class="stat-figure text-secondary">
      <slot name="figure" />
    </div>

    <div v-if="title" class="stat-title">
      {{ title }}
    </div>

    <div class="stat-value">
      <slot>{{ value }}</slot>
    </div>

    <div v-if="$slots.desc" class="stat-desc">
      <slot name="desc" />
    </div>
  </div>
</template>
