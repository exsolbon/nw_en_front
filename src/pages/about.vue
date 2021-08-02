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

   meta: {
    title: 'About us',
    // meta tags
    meta: {
      description: {name: 'description', content: 'About us'},
      ogTitle: {
        name: 'og:title',
        template(ogTitle) {
          return `About us`
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
