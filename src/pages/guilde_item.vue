<template>
<q-page >
   <q-parallax :height="300" :speed="1" class="q-mb-lg">
      <template v-slot:media>
        <img :src="post.image" :alt="post.name">
      </template>

      <h1 class="text-white text-h3">{{post.name}}</h1>
    </q-parallax>
  <div class="container">
    <div class="post-content" v-html="post.description"></div>
  </div>
</q-page>
</template>

<script>



export default {
  name: 'MainLayout',
  meta() {
    return{
      title: `New World Guides  | ${this.title}`,
      meta: {
        description: {name: 'description',content:this.description.substring(0,300)},
        ogTitle: {
          name: 'og:title',
          template(ogTitle) {
            return `New World Guides | ${this.title}`
          }
        }
      }
    }
  },

  data () {
    return {
      title: '',
      description: '',
      post:{}

    }
  },
  async mounted() {
    const response_post = await this.$api.get(`/api/guide/guide?slug=${this.$route.params.slug}`)
    this.post = response_post.data
    this.title = this.post.name
    this.description = this.post.description

  },
  methods:{

  },

}
</script>
<style lang="sass">
.post-content
  img
    max-width: 100% !important
    height: auto !important
</style>
