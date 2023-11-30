<template>
  <main class="people-page">
    <section class="people">
      <div class="people__container _container">
        <div class="people__content">
          <SearchPeople />
          <PeopleList v-if="!isLoading" :people="people" />
          <p v-else>Loading...</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import PeopleList from '@/components/PeopleList/PeopleList.vue'
import SearchPeople from './partials/SearchPeople.vue'

import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Person } from '@/store'

const store = useStore()
const people = ref<Person[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await store.dispatch('fetchPeople')
  people.value = store.state.people
  isLoading.value = false
})
</script>

<style src="./style.scss" />
