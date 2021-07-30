<template>
  <q-page >
    <div class="container">
      <div class="flex items-center justify-between">
        <div class="flex items-center q-py-lg">
          <q-icon size="30px" class="q-mr-md" color="primary" name="app_registration" />
          <h1 class="text-h5">New World Builds</h1>
        </div>
        <q-btn to="/skills" icon="add" no-caps color="primary" text-color="dark" label="New build"/>
      </div>

      <q-card dark class="q-mb-lg">
        <q-card-section>
          <p class="q-mb-md text-h6 text-bold text-primary">Filters</p>

          <div class=" row q-mb-md">

             <q-select class="col-6 q-pr-xs" style="flex-basis: 49%" dark v-model="build_purpose" filled :options="build_purposes" label="Purpose" />
            <q-select class="col-6 q-pl-xs"  style="flex-basis: 49%" dark v-model="build_weapon" filled :options="build_weapons"  label="Weapon" >

            </q-select>
          </div>

          <q-btn text-color="dark" color="primary" @click="filterBuilds" label="Filter"/>
        </q-card-section>
      </q-card>


      <q-list dark>

        <div class="" v-for="build in fiter_builds"
             :key="build.id">
          <q-item clickable :to="`/builds/${build.name_slug}`">
            <q-item-section>
              <q-item-label>{{build.name}}</q-item-label>

            </q-item-section>
             <q-item-section>
              <q-item-label >{{build.purpose}} </q-item-label>
            </q-item-section>


            <q-item-section>
              <q-item-label >{{build.weapon1.name}} / {{build.weapon2.name}}</q-item-label>
            </q-item-section>
            <q-item-section class="">
              <div class="flex">
                <p class="q-mb-none  q-mr-sm"> Rating:</p>
                 <q-rating
                v-model="build.rating"
                size="12px"
                color="primary"
                readonly
              />
              </div>


            </q-item-section>

            <q-item-section side >
              <q-item-label >{{new Date(build.created_at).toLocaleString() }}</q-item-label>

            </q-item-section>
          </q-item>

          <q-separator dark   />
        </div>



      </q-list>




    </div>
  </q-page>
</template>

<script>


import NewsCard from "components/NewsCard";
import BuildCard from "components/BuildCard";

export default {
  components: {BuildCard, NewsCard},
  name: 'MainLayout',
  meta: {
    // sets document title
    title: 'New World Builds',


    // meta tags
    meta: {
      description: {name: 'Builds for New World covers an arrangement of character statistics such as skills, feats, specializations, and gear such as weapons and armor that defines a player\'s specific set of playstyle. '},


      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World Builds`
        }
      }
    }
  },

  data () {
    return {
      slide:'first',
      autoplay:true,
      builds:[],
      fiter_builds:[],
      build_purpose:'All',
      build_weapon:'All',
      build_purposes: [
        'All', 'PvP', 'PvE', 'Siege', 'Expedition', 'Universal'
      ],
      build_weapons:[
        'All','Sword','War Hammer','Great Axe','Hatchet','Bow','Musket','Rapier','Spear','Life Staff','Fire Staff','Ice Gauntlet']

    }
  },
  async mounted() {

    const response = await this.$api.get(`/api/skill/build?for=all`)
    this.builds = response.data
    this.fiter_builds = this.builds

  },
  methods:{

    filterBuilds(){
      console.log(this.builds)
      if (this.build_weapon !=='All'){
        this.fiter_builds=[]
        for(let i of this.builds){
          if (i.weapon1.name === this.build_weapon || i.weapon2.name === this.build_weapon){
            this.fiter_builds.push(i)
          }
        }
      }else {
        this.fiter_builds=this.builds
      }

      if (this.build_purpose !=='All'){
        this.fiter_builds = this.fiter_builds.filter(x=> x.purpose === this.build_purpose)
      }


    }
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
