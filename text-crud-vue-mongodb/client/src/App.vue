<template>
  <div :class="['container', theme]">
    <button class="theme-toggle" @click="toggleTheme">
      {{ theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드' }}
    </button>

    <h1>📋 텍스트 메모</h1>

    <TextForm @text-added="fetchTexts" />
    <div class="text-list">
      <TextItem
        v-for="item in texts"
        :key="item._id"
        :text="item"
        @text-deleted="fetchTexts"
        @text-updated="fetchTexts"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TextForm from "./components/TextForm.vue";
import TextItem from "./components/TextItem.vue";
import { getTexts } from "./api/textService";

const texts = ref([]);
const theme = ref("light" ? "light" : "dark");

const fetchTexts = async () => {
  texts.value = await getTexts();
};

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};

onMounted(fetchTexts);
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 2rem;
  transition: background 0.3s, color 0.3s;
}

/* 테마 */
.light {
  background: #f4f4f4;
  color: #222;
}

.dark {
  background: #222;
  color: #f4f4f4;
}

/* 테마 버튼 */
.theme-toggle {
  align-self: flex-end;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #f4f4f4;
  color: #222;
  border: 1px solid currentColor;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}
/* 라이트 테마일 때 hover */
.light .theme-toggle:hover {
  background: #222;
  color: #f4f4f4;
}

/* 다크 테마일 때 hover */
.dark .theme-toggle:hover {
  background: #222;
  color: #f4f4f4;
}


/* 텍스트 카드 */
.text-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
