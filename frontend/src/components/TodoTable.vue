<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Todo } from '../types/Todo';

defineProps<{ todos: Todo[] }>();
const emit = defineEmits(['edit', 'delete', 'update-completed']);

const toggleCompleted = (todo: Todo) => {
  // Toggle the completed state and emit to parent
  todo.completed = !todo.completed;
  emit('update-completed', todo);
};
</script>

<template>
  <table
    class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden"
  >
    <thead class="bg-gray-100">
      <tr>
        <th class="py-2 px-4 text-left">Title</th>
        <th class="py-2 px-4 text-left">Completed</th>
        <th class="py-2 px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="todo in todos"
        :key="todo.id"
        class="border-t border-gray-200 hover:bg-gray-50"
      >
        <td class="py-2 px-4">{{ todo.title }}</td>
        <td class="py-2 px-4">
          <button
            @click="toggleCompleted(todo)"
            :class="todo.completed ? 'bg-green-500' : 'bg-gray-500'"
            class="text-white text-sm py-1 px-3 rounded hover:opacity-90"
          >
            {{ todo.completed ? 'Success' : 'Not Success' }}
          </button>
        </td>
        <td class="py-2 px-4 flex justify-center gap-2">
          <button
            @click="$emit('edit', todo)"
            class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="$emit('delete', todo.id)"
            class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* Optional scoped styles */
</style>
