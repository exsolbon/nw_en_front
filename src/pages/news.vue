<template>
<q-page >
 <div class="container">

          <div class="flex items-center q-py-lg">
            <q-icon size="30px" class="q-mr-md" color="primary" name="campaign" />
            <h1 class="text-h5">New World news</h1>
          </div>

          <NewsCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />


    </div>
</q-page>
</template>

<script>


import NewsCard from "components/NewsCard";
export default {
  components: {NewsCard},
  name: 'MainLayout',
  meta: {
    // sets document title
    title: 'New World news',


    // meta tags
    meta: {
      description: {name: 'New world game latest news'},


      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World news`
        }
      }
    }
  },

  data () {
    return {
      slide:'first',
      autoplay:true,
      posts:[]

    }
  },
  async mounted() {
    const response_posts = await this.$api.get('/api/post/posts?for=all')
    this.posts = response_posts.data

  },
  methods:{

  },

}
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

</style>
