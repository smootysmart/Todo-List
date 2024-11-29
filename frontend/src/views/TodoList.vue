<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Modal from '../components/Modal.vue';
import TodoForm from '../components/TodoForm.vue';
import TodoTable from '../components/TodoTable.vue';
import { Todo } from '../types/Todo';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoCompleted,
} from '../utils/todoApi';

const todos = ref<Todo[]>([]);
const showModal = ref(false);
const selectedTodo = ref<Todo | null>(null);

const loadTodos = async () => {
  todos.value = await fetchTodos();
};

const handleSubmit = async (todo: Todo) => {
  if (todo.id) {
    await updateTodo(todo);
  } else {
    await createTodo(todo);
  }
  await loadTodos();
  showModal.value = false;
};

const handleDelete = async (id: number) => {
  await deleteTodo(id);
  await loadTodos();
};

const updateCompleted = async (todo: Todo) => {
  await updateTodoCompleted(todo);
  await loadTodos();
};

const handleEdit = (todo: Todo) => {
  selectedTodo.value = todo;
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
  selectedTodo.value = null;
};

onMounted(loadTodos);
</script>

<template>
  <div class="p-4 sm:p-8">
    <h1 class="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Todo List</h1>
    
    <div class="flex justify-center sm:justify-start">
      <button
        @click="showModal = true"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto text-sm sm:text-base"
      >
        Add Todo
      </button>
    </div>

    <Modal v-if="showModal" @close="handleCloseModal">
      <TodoForm @submit="handleSubmit" :selectedTodo="selectedTodo" />
    </Modal>

    <!-- Todo Table -->
    <div class="mt-4 overflow-x-auto">
      <TodoTable
        :todos="todos"
        @edit="handleEdit"
        @delete="handleDelete"
        @update-completed="updateCompleted"
        class="w-full sm:w-auto"
      />
    </div>
  </div>
</template>
