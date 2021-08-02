<template>
<q-page >
  <div class="container">

          <div class="flex items-center  q-py-lg">
            <q-icon size="30px" class="q-mr-md" color="primary" name="people_alt" />
            <h1 class="text-h5">New World Guides</h1>
          </div>
    <div class="q-gutter-md">
      <q-btn color="primary" @click="$scrollTo(`#cat_${category.id}`, 200, {offset: -90})" text-color="dark" :label="category.name" v-for="category in guides" :key="category.id"/>
    </div>
    <div :id="`cat_${category.id}`" class="" v-for="category in guides" :key="category.id">
      <h3 class="text-h5 text-primary text-bold">{{category.name}}</h3>
      <q-separator spaced="lg"/>
       <div class="companies-grid">
        <GuideCard
          v-for="guide in category.guides"
          :key="guide.id"
          :item = "guide"
        />
      </div>
    </div>


        </div>

</q-page>
</template>

<script>


import {mapGetters} from "vuex";
import GuideCard from "components/GuideCard";
export default {
  components: {GuideCard},
  async preFetch ({store}) {
    console.log('gides ', store.state.data.guides.length)
    if (store.state.data.guides.length === 0){
       await store.dispatch('data/fetchGuides')
    }
  },
  meta: {
    // sets document title
    title: 'New World Guides',
    // meta tags
    meta: {
      description: {name: 'description', content: 'Guides & Tips for New World is a section to guide both experienced and new players on certain aspects of the game. '},

      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World Guides`
        }
      }
    }
  },

  data () {
    return {


    }
  },
  computed:{
    ...mapGetters('data',['guides']),
   }

}
</script>
<style lang="sass" scoped>
.companies-grid
  display: grid
  grid-template-columns: repeat(auto-fill,minmax(300px,1fr))
  grid-gap: 20px

</style>
