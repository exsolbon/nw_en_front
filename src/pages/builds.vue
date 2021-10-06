<template>
  <q-page >
    <div class="container">
      <div class="flex items-center justify-between q-pt-lg q-mb-lg">
        <div class="flex items-center ">
          <q-icon size="30px" class="q-mr-md" color="primary" name="app_registration" />
         <h1 class="text-h5">New World Builds</h1>
        </div>
        <q-btn to="/skills" :class="$q.screen.lt.sm ? 'full-width q-mb-md' : ''" icon="add" no-caps color="primary" text-color="dark" label="Create build"/>
      </div>

      <q-card dark class="q-mb-lg">
        <q-card-section>
          <p class="q-mb-md text-h6 text-bold text-primary">Build search</p>

          <div class=" row q-mb-md">

            <q-select class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-lg-sm q-pr-md-sm q-pr-sm-sm q-pr-sm-none q-mb-sm-sm q-mb-xs-sm"
                      dark v-model="build_role" filled :options="build_role_options" label="Role" />
            <q-select class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-lg-sm q-pr-md-sm q-pr-sm-sm q-pr-sm-none q-mb-sm-sm q-mb-xs-sm"
                      dark v-model="build_purpose" filled :options="build_purpose_options" label="Purpose" />
            <q-select class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-lg-sm q-pr-md-sm q-pr-sm-sm q-pr-sm-none q-mb-sm-sm q-mb-xs-sm"
                      dark v-model="build_first_weapon" filled :options="build_first_weapon_options"  label="First weapon" />
            <q-select class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-lg-sm q-pr-md-sm q-pr-sm-sm q-pr-sm-none q-mb-sm-sm q-mb-xs-sm"
                      dark v-model="build_second_weapon" filled :options="build_first_weapon_options"  label="Second weapon" />

          </div>
          <div class="flex wrap justify-between">
            <q-btn text-color="dark" :class="$q.screen.lt.sm ? 'full-width q-mb-md' : ''" no-caps color="primary" @click="filterBuilds" label="Find"/>
            <q-btn text-color="dark" :class="$q.screen.lt.sm ? 'full-width' : ''" no-caps color="primary" @click="resetFilters" label="Reset"/>

          </div>

        </q-card-section>
      </q-card>
      <h3 class="text-h5">{{!is_filtered ? 'Popular builds' : 'Results'}}</h3>
      <q-card dark class="">
         <q-list v-if="!is_filtered" dark>
        <div class="" v-for="build in builds"
             :key="build.id">
          <q-item clickable :to="`/builds/${build.name_slug}`">
            <q-item-section class="gt-xs">
              <q-item-label class="text-bold">{{build.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Name</q-item-label>

            </q-item-section>
            <q-item-section class="gt-xs">
              <q-item-label class="text-bold">{{build.role}} </q-item-label>
              <q-item-label caption class="text-grey-9">Role</q-item-label>
            </q-item-section>
            <q-item-section class="gt-xs">
              <q-item-label class="text-bold">{{build.purpose}} </q-item-label>
              <q-item-label caption class="text-grey-9">Purpose</q-item-label>
            </q-item-section>
            <q-item-section  class="gt-xs">
              <q-item-label class="text-bold">{{build.weapon1.name}} / {{build.weapon2.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Weapons</q-item-label>
            </q-item-section>
            <q-item-section class="gt-xs">
              <q-rating
                v-model="build.rating"
                size="12px"
                color="primary"
                readonly
              />
              <q-item-label caption class="text-grey-9">Rating</q-item-label>
            </q-item-section>
            <q-item-section side  class="gt-xs">
              <q-item-label >{{build.created }} ago</q-item-label>
              <q-item-label caption class="text-grey-9">Added</q-item-label>
            </q-item-section>
            <q-item-section  class="lt-sm">
              <q-item-label caption class="text-grey-9">Name</q-item-label>
              <q-item-label class="text-bold">{{build.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Pole</q-item-label>
              <q-item-label class="text-bold">{{build.role}} </q-item-label>
              <q-item-label caption class="text-grey-9">Purpose</q-item-label>
              <q-item-label class="text-bold">{{build.purpose}} </q-item-label>
              <q-item-label caption class="text-grey-9">Weapons</q-item-label>
              <q-item-label class="text-bold">{{build.weapon1.name}} / {{build.weapon2.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Rating</q-item-label>
              <q-rating
                v-model="build.rating"
                size="12px"
                color="primary"
                readonly
              />
              <q-item-label caption class="text-grey-9">Added</q-item-label>
              <q-item-label class="text-bold">{{build.created }} ago</q-item-label>



            </q-item-section>
          </q-item>
          <q-separator dark   />
        </div>
      </q-list>
         <q-list v-else dark>
        <div class="" v-for="build in filtered_builds"
             :key="build.id">
         <q-item clickable :to="`/builds/${build.name_slug}`">
            <q-item-section class="gt-xs">
              <q-item-label class="text-bold">{{build.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Name</q-item-label>

            </q-item-section>
            <q-item-section class="gt-xs">
              <q-item-label class="text-bold">{{build.role}} </q-item-label>
              <q-item-label caption class="text-grey-9">Role</q-item-label>
            </q-item-section>
            <q-item-section class="gt-xs">
              <q-item-label class="text-bold">{{build.purpose}} </q-item-label>
              <q-item-label caption class="text-grey-9">Purpose</q-item-label>
            </q-item-section>
            <q-item-section  class="gt-xs">
              <q-item-label class="text-bold">{{build.weapon1.name}} / {{build.weapon2.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Weapons</q-item-label>
            </q-item-section>
            <q-item-section class="gt-xs">
              <q-rating
                v-model="build.rating"
                size="12px"
                color="primary"
                readonly
              />
              <q-item-label caption class="text-grey-9">Rating</q-item-label>
            </q-item-section>
            <q-item-section side  class="gt-xs">
              <q-item-label >{{build.created }} ago</q-item-label>
              <q-item-label caption class="text-grey-9">Added</q-item-label>
            </q-item-section>
            <q-item-section  class="lt-sm">
              <q-item-label caption class="text-grey-9">Name</q-item-label>
              <q-item-label class="text-bold">{{build.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Pole</q-item-label>
              <q-item-label class="text-bold">{{build.role}} </q-item-label>
              <q-item-label caption class="text-grey-9">Purpose</q-item-label>
              <q-item-label class="text-bold">{{build.purpose}} </q-item-label>
              <q-item-label caption class="text-grey-9">Weapons</q-item-label>
              <q-item-label class="text-bold">{{build.weapon1.name}} / {{build.weapon2.name}}</q-item-label>
              <q-item-label caption class="text-grey-9">Rating</q-item-label>
              <q-rating
                v-model="build.rating"
                size="12px"
                color="primary"
                readonly
              />
              <q-item-label caption class="text-grey-9">Added</q-item-label>
              <q-item-label class="text-bold">{{build.created }} ago</q-item-label>



            </q-item-section>
          </q-item>
          <q-separator dark   />
        </div>
      </q-list>
        <q-inner-loading dark :showing="is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      </q-card>

    </div>
  </q-page>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  async preFetch ({store}) {
    if (store.state.data.builds.length === 0){
      await store.dispatch('data/fetchBuilds')
    }
  },
  meta: {
    // sets document title
    title: 'New World Builds',
    // meta tags
    meta: {
      description: {name: 'description', content: 'Builds for New World covers an arrangement of character statistics such as skills, feats, specializations, and gear such as weapons and armor that defines a player\'s specific set of playstyle. '},

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
      is_filtered:false,
      is_loading:false,
      filtered_builds:[],
      build_purpose:'Universal',
      build_first_weapon:'Any weapon',
      build_second_weapon:'Any weapon',
      build_role:'Not selected',
      build_purpose_options: [
        'PvP', 'PvE', 'Siege', 'Expedition', 'Universal'
      ],
      build_first_weapon_options:[
        'Any weapon','Sword','War Hammer','Great Axe','Hatchet','Bow','Musket','Rapier','Spear','Life Staff','Fire Staff','Ice Gauntlet'
      ],
      build_second_weapon_options:[
        'Any weapon','Sword','War Hammer','Great Axe','Hatchet','Bow','Musket','Rapier','Spear','Life Staff','Fire Staff','Ice Gauntlet'
      ],
      build_role_options:['Not selected','Tank','Heal','DD','RDD']
    }
  },
  methods: {
    async filterBuilds() {
      this.is_loading = true
      const response = await this.$api.post('/api/skill/builds_filter', {
        build_role: this.build_role,
        build_purpose: this.build_purpose,
        build_first_weapon: this.build_first_weapon,
        build_second_weapon: this.build_second_weapon,
      })
      this.filtered_builds = response.data
      this.is_filtered = true
      this.is_loading = false
    },
    resetFilters() {
      this.build_purpose = 'Universal'
      this.build_first_weapon = 'Any weapon'
      this.build_second_weapon = 'Any weapon'
      this.build_role = 'Not selected'
      this.is_filtered = false
    },
  },
    computed:{
      ...mapGetters('data',['builds']),
    }

  }
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

</style>
