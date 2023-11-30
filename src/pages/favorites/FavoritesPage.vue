<template>
  <main class="favorites-page">
    <section class="favorites">
      <div class="favorites__container _container">
        <div class="favorites__content">
          <PeopleList :people="favorites" is-favorites-page />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import PeopleList from "@/components/PeopleList/PeopleList.vue";
import {ref, onMounted} from 'vue';
import {useStore} from "vuex";

const store = useStore();
const favorites = ref(store.getters.getFavorites);

onMounted(() => {
  store.watch(() => store.getters.getFavorites, (newFavorites) => {
    favorites.value = newFavorites;
  });
});
</script>

<style src="./style.scss" />