<template>
  <q-page>

    <div class="container">

          <div class="flex items-center justify-between q-py-lg">
            <div class="flex items-center">
               <q-icon size="30px" class="q-mr-md" color="primary" name="people_alt" />
            <h1 class="text-h5">New World Companies [Guilds] List</h1>
            </div>

               <q-btn v-if="!$user.loggedIn" @click="changeauthModalVisible(true)" icon="add" no-caps color="primary" text-color="dark" label="Add company"/>
            <q-btn v-else @click="changeguildCreateModalVisible(true)" icon="add" no-caps color="primary" text-color="dark" label="Add company"/>

          </div>
      <div class="companies-grid">
        <CompanyCard
            v-for="guild in guilds"
            :key="guild.id"
            :item="guild"
           />
      </div>

        </div>

  </q-page>
</template>

<script>



import NewsCard from "components/NewsCard";
import CompanyCard from "components/CompanyCard";
import { mapActions, mapGetters } from 'vuex'
export default {
  async preFetch ({store, ssrContext}) {
    if (store.state.data.guilds.length === 0){
       await store.dispatch('data/fetchGuilds')
    }
  },
  components: {CompanyCard, NewsCard},
  meta: {
    // sets document title
    title: 'New World Company & Guild list',
    // meta tags
    meta: {
      description: {name: 'description', content: 'Here you can find a list of the New World Companies [Guilds] created by players. If you are a clan leader you can also add your guild. If you are a player, use our real-time filters to find the company you want to join.'},

      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World Company & Guild list`
        }
      }
    }
  },

  data () {
    return {

    }
  },

  methods:{
    ...mapActions('componentState',['changeauthModalVisible','changeguildCreateModalVisible']),
  },
  computed:{
    ...mapGetters('data',['guilds']),
    is_authModal_visible:{
      get(){
        return this.$store.state.componentState.is_authModal_visible
      },
      set(val){
        return  this.changeauthModalVisible(val)
      }
    },
    is_guildCreateModal_visible:{
      get(){
        return this.$store.state.componentState.is_guildCreateModal_visible
      },
      set(val){
        return  this.changeguildCreateModalVisible(val)
      }
    },

  }

}
</script>

