<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { Todo } from '../types/Todo';

const props = defineProps<{ selectedTodo: Todo | null }>();
const emit = defineEmits(['submit']);

const todo = ref<Todo>({
  id: 0,
  title: '',
  completed: false,
});

watch(
  () => props.selectedTodo,
  (newVal) => {
    if (newVal) {
      todo.value = { ...newVal };
    } else {
      todo.value = { id: 0, title: '', completed: false };
    }
  },
  { immediate: true }
);

const submit = () => {
  emit('submit', { ...todo.value });
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4 p-4 sm:p-6">
    <div>
      <label class="block font-medium text-gray-700">Title</label>
      <input
        type="text"
        v-model="todo.title"
        class="border rounded w-full py-2 px-3 text-sm sm:text-base"
        required
      />
    </div>

    <div>
      <label for="status" class="block font-medium text-gray-700">Status</label>
      <select
        id="status"
        v-model="todo.completed"
        class="border rounded w-full py-2 px-3 text-sm sm:text-base"
      >
        <option :value="false">Not Success</option>
        <option :value="true">Success</option>
      </select>
    </div>

    <button
      type="submit"
      class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto"
    >
      Submit
    </button>
  </form>
</template>

<style scoped>
</style>
