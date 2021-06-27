<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input v-model="query" 
         :disabled="isLoading == true" 
         :class="{'is-loading': isLoading == true}" 
         class="input is-expanded" 
         @keyup.enter="search()"
         type="text" 
         placeholder="Keyword">
    </div>
    <div class="control">
      <a class="button is-info" 
         @click="search()"
         type="submit">
        Search
      </a>
    </div>
  </div>
  <div class="notification is-danger" v-if="error">
    <button class="delete" @click="error = false"></button>
    There was an error: {{errorMessage}}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['activeBooks'],
  data() {
    return {
      query: "tomate, tomaten, tomates",
      isLoading: false,
      error: false,
      errorMessage: ""
    }
  },
  watch : {
    activeBooks() {
      this.search()
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.isLoading = true
      this.$emit('isLoading', true)

      var base_url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/' : 'https://cookbooks-api.herokuapp.com/'
      axios({
        method: 'GET',
        url: base_url + 'search?ids=' + this.activeBooks.join() + '&q=' + this.query.toLowerCase(), 
        headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        })
        .then(response => {
          // handle success
          this.isLoading = false
          this.$emit('isLoading', false)
          this.$emit('results', response.data)
        })
        .catch(error => {
          // handle error
          this.errorMessage = error
          this.error = true
        })
    }
  }
}

</script>