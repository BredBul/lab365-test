<template>
  <main class="person-page">
    <section class="person">
      <div class="person__container _container">
        <template v-if="person">
          <div class="person__content">
            <div class="person__header">
              <h2 class="person__name">{{ person.name }} Details</h2>
              <button @click="toggleFavorites(person)">
                {{ isFavorite(person) ? 'Remove from Favorites' : 'Add to Favorites' }}
              </button>
            </div>
            <template v-for="(value, key) in person" :key="key">
              <div class="person__property" v-if="shouldDisplayProperty(value)">
                <div class="person__label">{{ titleCase(key) }}:</div>
                <div class="person__value" v-if="Array.isArray(value)">
                  <ul>
                    <li v-for="(item, index) in value" :key="index">{{ item }}</li>
                  </ul>
                </div>
                <div class="person__value" v-else>
                  {{ ["created", "edited"].includes(key) ? new Date(value).toUTCString() : value }}
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <p>Loading...</p>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {Person} from "@/store";
import {useStore} from "vuex";

const route = useRoute();
const store = useStore();

const personId = ref<number | null>(null);
const person = ref<Person | null>(null);

onMounted(() => {
  personId.value = parseInt(<string>route.params.id);
  fetchPersonDetails();
});

const fetchPersonDetails = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${personId.value}/`);
    person.value = await response.json();
  } catch (error) {
    console.error("Error fetching person details:", error);
  }
};

const shouldDisplayProperty = (value: any) => {
  return value !== null && value !== undefined && (!Array.isArray(value) || (Array.isArray(value) && value.length > 0));
};

const titleCase = (s: string): string => {
  return s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c);
};

const isFavorite = (person: Person) => {
  return store.state.favorites.some((p: Person) => p.url === person.url);
};

const toggleFavorites = (person: Person) => {
  if (isFavorite(person)) {
    store.commit('removeFromFavorites', person);
  } else {
    store.commit('addToFavorites', person);
  }
};
</script>

<style src="./style.scss"/>