<template>
  <facet
   :title='"Language"'
   :items='languages'
   :activeBooks='activeBooks'
   :defaultOpen='true'
   @setFacets='setFacets'
   ></facet>
   <facet
   :title='"Type"'
   :items='types'
   :activeBooks='activeBooks'
   :defaultOpen='true'
   @setFacets='setFacets'
   ></facet>
  <facet
   :title='"Publication country"'
   :items='countries'
   :activeBooks='activeBooks'
   :defaultOpen='false'
   @setFacets='setFacets'
   ></facet>
   <facet
   :title='"Series"'
   :items='series'
   :activeBooks='activeBooks'
   :defaultOpen='false'
   @setFacets='setFacets'
   ></facet>
   <facet
   :title='"Publication city"'
   :items='cities'
   :activeBooks='activeBooks'
   :defaultOpen='false'
   @setFacets='setFacets'
   ></facet>
</template>

<script>
import axios from 'axios';
import Facet from './facet.vue'

export default {
  components: {
    Facet
  },
  data() {
      return {
        books: [],
        activeBooks: [],
        activeFacets: {},
        countries: {},
        cities: {},
        types: {},
        languages: {},
        series: {}
      }
    },
  methods: {
    setFacets(facetName, ids) {
      this.activeFacets[facetName] = ids
      this.setBooks()
      this.$emit('facetChange', this.activeBooks)
    },
    setBooks() {
      const intersection = (arr1, arr2) => {
         const res = [];
         for(let i = 0; i < arr1.length; i++){
            if(!arr2.includes(arr1[i])){
               continue;
            }
            res.push(arr1[i]);
         }
         return res;
      };
      const intersectMany = (...arrs) => {
         let res = arrs[0].slice();
         for(let i = 1; i < arrs.length; i++){
            res = intersection(res, arrs[i]);
         }
         return res;
      };
      // Active books are at the intersection of active facets
      var allActiveFacets = []
      Object.values(this.activeFacets).forEach((ids)=>{
          allActiveFacets.push(ids)
      })
      this.activeBooks = intersectMany(...allActiveFacets)

    }
  },
  mounted() {
    var base_url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/' : 'https://cookbooks-api.herokuapp.com/'
    axios({
        method: 'GET',
        url: base_url + '/list', 
        headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        })
        .then(response => {
          // handle success
          this.$emit('isLoading', false)
          this.books = response.data
          this.books.forEach((book) => {
            this.activeBooks.push(book.id)

            var parseBooks = function (attribute, storage) {
              // a book can have multiple countries
              book[attribute].split(", ").forEach((attribute) => {
                if (storage[attribute] == undefined){
                  storage[attribute] = {
                    'name': attribute,
                    'ids': []
                  }
                }
                storage[attribute]["ids"].push(book.id)
              })
            }

            parseBooks("country", this.countries)
            parseBooks("pub_city", this.cities)
            parseBooks("language", this.languages)
            parseBooks("series", this.series)
            parseBooks("type", this.types)

            
          })
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
        .finally(() => {            
        })
  }
}

</script>