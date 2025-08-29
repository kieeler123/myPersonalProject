<template>
  <div class="text-item">
    <span>{{ text.text }}</span>
    <div class="actions">
      <button @click="handleEdit">✏️</button>
      <button @click="handleDelete">🗑️</button>
    </div>
  </div>
</template>

<script setup>
import { deleteText, updateText } from "../api/textService";
const props = defineProps({ text: Object });
const emit = defineEmits(["text-deleted", "text-updated"]);

const handleDelete = async () => {
  await deleteText(props.text._id);
  emit("text-deleted");
};

const handleEdit = async () => {
  const newText = prompt("수정할 텍스트를 입력하세요:", props.text.text);
  if (!newText || newText.trim() === props.text.text) return;

  props.text.text = newText.trim();
  await updateText(props.text);
  emit("text-updated", props.text);
};
</script>

<style scoped>
.text-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.dark .text-item {
  background: rgba(50, 50, 50, 0.6);
}

.actions button {
  margin-left: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.1rem;
}
.actions button:hover {
  transform: scale(1.1);
}
</style>
