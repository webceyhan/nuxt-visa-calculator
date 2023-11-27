<script setup lang="ts">
interface Props {
  value: number;
}

defineProps<Props>();
</script>

<template>
  <span class="countdown">
    <span :style="{ '--value': value }" />
  </span>
</template>
