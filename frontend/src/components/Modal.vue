<script setup lang="ts"></script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <button
        class="text-gray-500 hover:text-gray-800 float-right"
        @click="$emit('close')"
      >
        ✖
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
