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
      title: `New World News  | ${this.title}`,
      meta: {
        description: {name: 'description',content:this.description.substring(0,300)},
        ogTitle: {
          name: 'og:title',
          template(ogTitle) {
            return `New World News| ${this.title}`
          }
        }
      }
    }
  },


  data () {

    return {
      slide:'first',
      autoplay:true,
      post:{},
      title: '',
      description: '',
    }
  },
  async beforeMount() {
    const response_post = await this.$api.get(`/api/post/post?slug=${this.$route.params.slug}`)
    this.post = response_post.data
    this.title = this.post.name
    this.description = this.post.description

  },
  methods:{

  },

}
</script>
<style lang="sass">
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
.post-content
  img
    max-width: 100% !important
    height: auto !important
</style>
