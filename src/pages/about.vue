<template>
<q-page >
  <div class="container">
    <div class="flex items-center q-py-lg">
            <q-icon size="30px" class="q-mr-md" color="primary" name="help" />
            <h1 class="text-h5">About</h1>
          </div>
     <div class="" v v-html="texts.about_text"></div>

  </div>
</q-page>
</template>

<script>



export default {
  name: 'MainLayout',
  meta: {
    // sets document title
    title: 'About',


    // meta tags
    meta: {
      description: {name: 'FAQs or Frequently Asked Questions in New World covers different questions with its corresponding answer regarding New World. This page covers a list of the frequently asked questions regarding the game.'},


      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World FAQs`
        }
      }
    }
  },

  data () {
    return {
      texts:[]

    }
  },
  async mounted() {
    const response = await this.$api.get('/api/texts')
    this.texts = response.data


  },
  methods:{

  },

}
</script>
<style lang="sass" scoped>


</style>
