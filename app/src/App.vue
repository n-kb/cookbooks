<template>
  <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <div class="block content">
              <h1 class="title">Cookbooks explorer</h1>
              <p>Search word frequencies (case-insensitive) in lots of cookbooks! 
              </p>
              <p>Share any interesting findings on Twitter <a href="https://twitter.com/nicolaskb">@nicolaskb</a> or over e-mail hi@nkb.fr, and <a href="https://github.com/n-kb/cookbooks">do read the methodology.</a></p>
            </div>
            <div class="block">
              <Facets @facetChange='setBooks'
                      @isLoading="setFacetsLoading"></Facets>
            </div>
          </div>
          <div class="column">
            <div class="block">
              <Search :activeBooks='activeBooks' 
                      @results="setResults"
                      @isLoading="setSearchLoading"></Search>
            </div>
            <div class="block">
              <Loader v-if="isLoading" :isLoading="isLoading"></Loader>
              <Viz :results="results" :isLoading="isLoading"></Viz>
            </div>
            <div class="block">
              <DownloadCSV v-if="!isLoading" :results="results"></DownloadCSV>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

import Search from './components/search.vue'
import Viz from './components/viz.vue'
import Facets from './components/facets.vue'
import DownloadCSV from './components/dlcsv.vue'
import Loader from './components/loader.vue'

export default {
  name: 'App',
  data () {
    return {
      results: [],
      activeBooks: [],
      isFacetsLoading: true,
      isSearchLoading: true
    }
  },
  computed: {
    isLoading() {
      if (this.isFacetsLoading || this.isSearchLoading) { return true }
      else { return false }
    }
  },
  methods: {
    setResults(value) {
      this.results = value
    },
    setFacetsLoading(value) {
      this.isFacetsLoading = value
    },
    setSearchLoading(value) {
      this.isSearchLoading = value
    },
    setBooks(value) {
      this.activeBooks = value
    }
  },
  components: {
    Search,
    Viz,
    DownloadCSV,
    Facets,
    Loader
  }
}
</script>

<style>
  @import "~bulma/css/bulma.css"
</style>
