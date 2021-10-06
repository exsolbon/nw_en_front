<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
     <q-header elevated  class="bg-dark q-py-md ">

        <q-toolbar class="flex items-center">
          <q-toolbar-title >
            <router-link style="text-decoration: none;color: #fff" class="flex items-center no-wrap" to="/">

              <img  class="logo  q-mr-xs" src="~assets/logo.png" alt="">

            </router-link>
          </q-toolbar-title>

          <q-tabs  dense v-model="tab" indicator-color="primary" class="gt-sm">

            <q-route-tab name="news" label="News" to="/news"/>
            <q-route-tab name="guilds" label="Companies" to="/companies"/>
            <q-route-tab name="builds" label="Builds" to="/builds"/>
            <q-route-tab name="calc" label="Skills" to="/skills"/>
            <q-route-tab name="guides" label="Guides" to="/guides"/>
            <q-route-tab name="map" label="Map" to="/map"/>
             <q-route-tab name="db" label="Database" to="/database/all"/>
            <q-route-tab name="faq" label="FAQ" to="/faq"/>

          <q-btn @click="feedbackModal = !feedbackModal" color="dark" text-color="primary" label="Feedback"/>

          </q-tabs>
          <q-btn
            flat
            dense
            round
            class="lt-md"

            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
        </q-toolbar>

    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      bordered
      dark
    >
      <q-toolbar class="flex items-center">
        <div class=""></div>
        <q-space/>

        <q-btn
          flat
          dense
          round
          class="lt-md"

          icon="close"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <q-list  dark >
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/news')">
            News
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/companies')">
            Companies
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/guides')">
            Guides
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/faq')">
            FAQ
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/skills')">
            Skills
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/database/all')">
            Database
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section @click="$router.push('/map')">
            Map
          </q-item-section>
        </q-item>
<!--        <q-item clickable v-ripple >-->
<!--          <q-item-section @click="$router.push('/trade')">-->
<!--            Биржа-->
<!--          </q-item-section>-->
<!--        </q-item>-->
         <q-item clickable v-ripple >
          <q-item-section @click="feedbackModal = !feedbackModal">
            Feedback
          </q-item-section>
        </q-item>
        <q-separator/>


      </q-list>

    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
   meta: {
    // sets document title
    title: 'New World Interactive Map',


    // meta tags
    meta: {
      description: {name: 'description', content: 'New World Map | Resources, Crafts, Dungeons Locations '},

      equiv: {'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8'},
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World Interactive Map`
        }
      }
    }
  },

  data () {
    return {
      leftDrawerOpen:false,
      tab:'index',


    }
  },
  methods:{
    ...mapActions('componentState',['changePoiVisible']),
  },
  computed:{
    is_poi_visible:{
      get(){
        return this.$store.state.componentState.is_poi_visible
      },
      set(val){
        return  this.changePoiVisible(val)
      }
    }
  }
}
</script>
<style lang="sass">
.logo
  width: 130px
  height: 30px
  object-fit: contain
.nav-link
  text-decoration: none
  color: #ffffff
  text-transform: uppercase
.form-control
  flex-basis: 49%
</style>
