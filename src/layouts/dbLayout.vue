<template>
  <q-layout view="lHh Lpr lFf"  class="bg-dark text-grey-2">

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
      <div class="container">
        <div class="flex items-center q-py-lg">
          <q-icon size="30px" class="q-mr-md" color="primary" name="help" />
          <h1 class="text-h5">New World Items Database</h1>
        </div>
        <div class="database-wrapper">
          <div class="side-menu">
            <q-card dark>
              <q-list dark  >
                <q-item exact to="/database/all" clickable v-ripple>
                  <q-item-section class="text-bold text-body1">All items</q-item-section>
                </q-item>
                <q-expansion-item
                  dark
                  group="group"
                  :header-class="$route.params.category_slug===category.name_slug ?
                   'bg-grey-9 text-body1 text-bold text-primary' :
                    'bg-grey-9 text-white text-body1 text-bold' "
                  :label="category.name"
                  :default-opened="$route.params.category_slug===category.name_slug"
                  v-for="(category,index) in item_categories"
                  :expand-icon-class="$route.params.category_slug===category.name_slug ?
                   'text-primary' :
                   'text-white'"
                  :key="index">
                  <q-item clickable v-ripple
                          :to="`/database/${category.name_slug}/${subcat.name_slug}`"
                          v-for="subcat in category.subcategories"
                          :key="subcat.id">
                    <q-item-section>
                      <q-item-label class="text-bold">{{subcat.name}}</q-item-label>

                    </q-item-section>
                    <q-item-section avatar>
                      <q-icon :color="$route.params.subcategory_slug === subcat.name_slug ? 'primary' : 'white'" name="arrow_right" />
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-list>
            </q-card>
          </div>
          <router-view  />
        </div>
      </div>
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[20, 90]">
        <q-btn fab size="md" icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  <footer class="q-pb-lg">
      <q-separator spaced="lg"/>
      <div class="container ">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <router-link style="text-decoration: none;color: #fff" class="flex items-center no-wrap q-mr-md" to="/">

              <img class="q-mr-xs" src="~assets/logo.png" alt="">

            </router-link>
            <p class="q-mb-none">New World is a trademark of Amazon Game Studios.<br> We are not affiliated with or endorsed by Amazon Game Studios</p>
          </div>

          <p class="q-mb-none">
            <router-link to="/about">About</router-link> |
            <router-link to="/privacy">Privacy policy</router-link>
          </p>
        </div>
      </div>
    </footer>
    <q-dialog v-model="feedbackModal"  >
      <q-card  style="width: 700px; max-width: 80vw;">

        <q-card-section >
          <p class="text-dark text-center text-h6 text-bold q-mb-none">Feedback</p>
          <p class="text-caption text-center">All your suggestions for improving the site and comments will be considered</p>
          <q-input
            filled
            :dense="!$q.screen.gt.md"
            class="q-mb-md"
            v-model="fb_user"
            label="E-mail, discord (username#0000) or any way of communication *"/>
          <q-input
            v-model="fb_text"
            filled
            class="q-mb-md"
            label="Message *"
            type="textarea"
          />
          <div class="text-center ">
            <q-btn @click="add_fb" :loading="is_loading" color="primary" :disable="!fb_text || !fb_user" text-color="dark" label="Send"/>
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MainLayout',


  data () {
    return {
      tab:'index',
      showAd:false,
      leftDrawerOpen:false,
      is_loading:false,
      feedbackModal:false,
      fb_text: null,
      fb_user: null,




    }
  },

  methods:{
    async add_fb(){
      this.is_loading = true

      await this.$api.post('/api/add_fb', {
        fb_user: this.fb_user,
        fb_text: this.fb_text
      })
      this.$q.notify({
        message: 'Спасибо! :))',
        position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
        color: 'positive',
        icon: 'announcement'
      })
      this.is_loading = false
      this.feedbackModal = false
    },
  },
  computed:{
    ...mapGetters('data',['item_categories']),
  }

}
</script>
<style lang="sass">
.icon
  display: inline-flex
  border: 2px solid $primary
  align-items: center
  justify-content: center
  padding: 5px
  border-radius: 5px
  img
    width: 30px
    height: 30px
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

.database-wrapper
  display: grid
  grid-template-columns: 1fr 3fr
  grid-gap: 30px
@media (max-width: 768px)
  .database-wrapper
    grid-template-columns: 1fr
</style>
