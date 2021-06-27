<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{title}}
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon" 
                v-if="facetOpen == false" 
                @click="facetOpen = true">
            <i class="fas fa-angle-down" 
               aria-hidden="true"></i>
           </span>
           <span class="icon" 
                v-if="facetOpen == true" 
                @click="facetOpen = false">
            <i class="fas fa-angle-up" 
               aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content" v-if="facetOpen == true">
        <div class="content">
          <div v-for="(item, index) in items" :key="index">
            <div class="columns" v-if="item.name.length > 0">
                <div class="column">
                  <a @click="activateFacet(title, item.ids, index)"
                     :class="{ 'active': activeFacet === index }">
                    {{item.name}} 
                    <span class="is-size-7">
                      ({{intersection(item.ids, activeBooks).length}}/{{item.ids.length}})
                    </span>
                  </a>
              </div>
              <div class="column is-one-quarter has-text-right"
                   v-if="activeFacet === index">
                  <a @click="resetFacet()">
                   <span class="tag is-info is-size-7">
                     reset
                   </span>
               </a>
           </div>
       </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'items', 'activeBooks', 'defaultOpen'],
  data() {
    return {
      activeFacet: undefined,
      facetOpen: this.defaultOpen
    }
  },
  computed:{
    allIds() {
      var allIds = []
      Object.values(this.items).forEach((item)=>{
          allIds.push(...item.ids)
      })
      return allIds
    }
  },
  methods: {
    activateFacet(name, ids, index) {
      this.activeFacet = index;
      this.$emit('setFacets', name, ids)
    },
    resetFacet(){
      this.activateFacet(this.title, this.allIds, undefined)
    },
    intersection(arr1, arr2) {
       const res = []
       for(let i = 0; i < arr1.length; i++){
          if(!arr2.includes(arr1[i])){
             continue
          }
          res.push(arr1[i])
       }
       return res
    }
  }
}
</script>

<style>
.active {
  font-weight: bold;
}
</style>