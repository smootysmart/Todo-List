<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Todo } from "../types/Todo";

const prop = defineProps<{ todos: Todo[] }>();
const emit = defineEmits(["edit", "delete", "update-completed"]);
console.log(prop.todos);

</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Title</th>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Completed</th>
          <th class="py-2 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="todo in todos"
          :key="todo.id"
          class="border-t border-gray-200 hover:bg-gray-50"
        >
          <td class="py-2 px-4 text-sm text-gray-800">{{ todo.title }}</td>

            <td class="py-2 px-4">
            <button
              @click="() => { todo.completed = !todo.completed; $emit('update-completed', todo); }"
              :class="todo.completed ? 'bg-green-500' : 'bg-gray-500'"
              class="text-white text-sm py-1 px-3 rounded hover:opacity-90"
            >
              {{ todo.completed ? 'Success' : 'Not Success' }}
            </button>
            </td>
            <td>
              {{ todo.completed }}
            </td>

          <td class="py-2 px-4 flex justify-center gap-2">
            <button
              @click="$emit('edit', todo)"
              class="bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', todo.id)"
              class="bg-red-500 text-white text-sm py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
