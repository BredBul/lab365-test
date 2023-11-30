<template>
  <div class="search">
    <input v-model="search" placeholder="Search by name" />
    <div v-if="isLoading">Loading...</div>
    <ul v-else-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.url">
        <router-link
          :to="{ name: 'person', params: { id: extractIdFromUrl(result.url) } }"
        >
          {{ result.name }}
        </router-link>
      </li>
    </ul>
    <div v-else>
      <p v-if="search">No result found</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Person } from '@/store'

const search = ref('')
const searchTimeout = ref<number | null>(null)
const searchResults = ref<Person[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

watch(search, (query) => {
  if (searchTimeout.value) {
    clearInterval(searchTimeout.value)
  }
  isLoading.value = true
  errorMessage.value = ''

  searchTimeout.value = setTimeout(async () => {
    if (query) {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${query}`,
        )
        const data = await response.json()

        if (query === search.value) {
          searchResults.value = data.results
        }
      } catch (error) {
        console.error('Error:', error)
        errorMessage.value = 'An error occurred while fetching data'
      } finally {
        isLoading.value = false
      }
    } else {
      searchResults.value = []
      isLoading.value = false
    }
  }, 300)
})

const extractIdFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)\/$/)
  return match ? parseInt(match[1], 10) : null
}
</script>

<style scoped>
.search {
  margin-top: 20px;
}

span {
  color: #888;
}

.error {
  color: red;
}
</style>