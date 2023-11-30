<template>
  <main class="people-page">
    <section class="people">
      <div class="people__container _container">
        <div class="people__content">
          <SearchPeople/>
          <PeopleList :people="people"/>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import PeopleList from "@/components/PeopleList/PeopleList.vue";
import SearchPeople from "./partials/SearchPeople.vue";

import {ref, onMounted} from "vue";
import {useStore} from "vuex";
import {Person} from "@/store"

const store = useStore();
const people = ref<Person[]>([]);

onMounted(async () => {
  await store.dispatch("fetchPeople");
  people.value = store.state.people;
});
</script>

<style src="./style.scss"/>