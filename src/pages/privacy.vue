<template>
<q-page >
  <div class="container">
    <div class="flex items-center q-py-lg">
            <q-icon size="30px" class="q-mr-md" color="primary" name="help" />
            <h1 class="text-h5">Privacy policy</h1>
          </div>
    <div class="" v v-html="texts.policy_text"></div>

  </div>
</q-page>
</template>

<script>



export default {
  name: 'MainLayout',
  meta: {
    title: 'Privacy policy',
    // meta tags
    meta: {
      description: {name: 'description', content: 'Privacy policy'},
      ogTitle: {
        name: 'og:title',
        template(ogTitle) {
          return `Privacy policy`
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
