<script setup lang="ts">
interface Props {
  canAdd: boolean;
  canRemove: boolean;
}

defineEmits(["add", "remove"]);

defineProps<Props>();
</script>

<template>
  <div class="join">
    <!-- remove button -->
    <ui-button
      color="error"
      class="join-item px-10"
      :disabled="!canRemove"
      @click="$emit('remove')"
      outline
    >
      <icon-minus class="w-8 h-8" />
    </ui-button>

    <!-- add button -->
    <ui-button
      color="primary"
      class="join-item px-10"
      :disabled="!canAdd"
      @click="$emit('add')"
      outline
    >
      <icon-plus class="w-8 h-8" />
    </ui-button>
  </div>
</template>
