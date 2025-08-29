<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="inputText" placeholder="텍스트 입력" required />
    <button type="submit">추가</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { createText } from '../api/textService';

const emit = defineEmits(['text-added']);
const inputText = ref('');

const handleSubmit = async () => {
  if (!inputText.value.trim()) return;
  await createText(inputText.value);
  inputText.value = '';
  emit('text-added');
};
</script>