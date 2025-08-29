<template>
  <div class="home">
    <h1>텍스트 CRUD</h1>
    <TextForm @text-added="fetchTexts" />
    <div v-if="texts.length === 0">데이터가 없습니다.</div>
    <TextItem
      v-for="item in texts"
      :key="item._id"
      :text="item"
      @text-deleted="fetchTexts"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TextForm from "../components/TextForm.vue";
import TextItem from "../components/TextItem.vue";
import { getTexts } from "../api/textService";

const texts = ref([]);

const fetchTexts = async () => {
  texts.value = await getTexts();
};

onMounted(fetchTexts);
</script>
