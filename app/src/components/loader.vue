<template>
  <div class="columns">
    <div class="content column is-half is-offset-one-quarter">
      <h1>Loading...</h1>
      <article class="message is-info" v-if="showDidyouknow">
        <div class="message-body">
          <p><b>Did you know...</b></p>
          <p>{{didyouknowText}}</p>
          <p class="is-size-6">Source: {{didyouknowSource}}.</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['isLoading'],
    data() {
      return {
        didyouknow: [
          { "text" : "that Anna Barnekow, chef in Lübeck, always mixed béchamel sauce in her mayonnaise?",
            "source": "Norddeutsches Kochbuch (1902), p. 25"},
          { "text" : "that Augustin Carême, a jingoist French chef, called Vienna the second-best city for cooking after Paris?",
            "source": "Le maitre-d'hôtel français (1842), p. 215"},
          { "text" : "that David Amman, a neo neo-Zoroastrian, recommended using coconut milk to replace mother milk?",
            "source": "Mazdaznan (1909), p. 71"}
        ],
        showDidyouknow: false,
        didyouknowText: "",
        didyouknowSource: ""
      }
    },
    mounted() {
        this.showDidyouknow = false
        setTimeout(() => {
          var item = Math.floor(Math.random() * this.didyouknow.length)
          this.didyouknowText = this.didyouknow[item].text
          this.didyouknowSource = this.didyouknow[item].source
          this.showDidyouknow = true
        }, 5500)
      
    }
  }
</script>