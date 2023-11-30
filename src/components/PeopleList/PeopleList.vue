<template>
  <div class="people__list">
    <div class="people__header people__item">
      <div class="people__key"><span>name</span></div>
      <div class="people__key"><span>height</span></div>
      <div class="people__key"><span>mass</span></div>
      <div class="people__key"><span>hair_color</span></div>
      <div class="people__title">
        <span> {{ isFavoritesPage ? 'Remove' : 'Add/remove' }} favorite</span>
      </div>
    </div>
    <div class="people__item" v-for="person in people" :key="person.url">
      <div>{{ person.name }}</div>
      <div>{{ person.height }}</div>
      <div>{{ person.mass }}</div>
      <div>{{ person.hair_color }}</div>
      <div>
        <button @click="toggleFavorites(person)">
          {{
            isFavorite(person) ? 'Remove from Favorites' : 'Add to Favorites'
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { Person } from '@/store'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps<{
  people: Person[]
  isFavoritesPage?: boolean
}>()

const { people } = toRefs(props)

const isFavorite = (person: Person) => {
  return store.state.favorites.some((p: Person) => p.url === person.url)
}

const toggleFavorites = (person: Person) => {
  if (isFavorite(person)) {
    store.commit('removeFromFavorites', person)
  } else {
    store.commit('addToFavorites', person)
  }
}
</script>

<style src="./style.scss" />
