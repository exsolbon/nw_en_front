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
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
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
    <q-dialog v-model="is_authModal_visible">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{is_register ? 'Register' : 'Login'}}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form
            v-if="is_register"
            @submit="onSubmit"
            style="width: 320px"
            class="q-gutter-sm form">

            <q-input
              filled
              :dense="!$q.screen.gt.md"
              v-model="userData.email"
              label="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Need Email',
              val => email_re.test(String(val)) || 'Enter correct Email'
              ]"/>

            <q-input
              filled
              :dense="!$q.screen.gt.md"
              v-model="userData.nickname"
              label="Nickname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Need nickname'
              ]"/>


            <q-input
              filled
              :dense="!$q.screen.gt.md"
              v-model="userData.password1"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[ val => val && val.length >= 6|| 'Password must be 6 letters or long']">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              filled
              :dense="!$q.screen.gt.md"
              v-model="userData.password2"
              :type="isPwd ? 'password' : 'text'"
              label="Repeat password"
              lazy-rules
              :rules="[ val => val && val===this.userData.password1 || 'Passwords not match']">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!--      <q-toggle v-model="accept" label="I accept the license and terms" />-->

            <div>
              <div class="text-center">
                <q-btn label="Регистрация"  type="submit" class="q-px-xl q-mb-md" color="primary "/>
                <p>Have account? <a href="#" @click.prevent="is_register=false">Login</a></p>
              </div>


            </div>
          </q-form>
          <q-form v-else @submit="userLoginAction" class=" q-gutter-sd q-mb-lg">
            <q-input
              filled
              :dense="!$q.screen.gt.md"
              v-model="userLogin.email"
              label="Email *"

              style="width: 320px"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Введите email']"
            />
            <q-input
              :dense="!$q.screen.gt.md"
              filled
              :type="isPwd ? 'password' : 'text'"
              v-model="userLogin.password"
              label="Password *"
              lazy-rules
              :rules="[val => val !== null && val !== '' || 'Введите пароль' ]">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="text-center">
              <q-btn size="md" label="Login" type="submit" color="primary" class="q-px-xl q-mb-md"/>
              <p>No account? <a class="text-primary" href="#" @click.prevent="is_register=true">Register</a></p>


            </div>

          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="is_guildCreateModal_visible">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add your company</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="createGuild"

            class="flex-lg flex-md flex-sm justify-between">

            <q-input
              filled
              :dense="!$q.screen.gt.md"
              v-model="guildData.name"
              label="Name *"
              class="form-control "
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Enter a name'
              ]"/>

            <q-select class="form-control" :dense="!$q.screen.gt.md" filled v-model="guildData.fraction" :options="fraction_options" label="Faction" />
            <q-select class="form-control" :dense="!$q.screen.gt.md" filled v-model="guildData.size" :options="size_options" label="Size" />
            <q-select class="form-control q-mb-md" :dense="!$q.screen.gt.md" filled v-model="guildData.style" :options="style_options" label="Style" />
            <q-input class="form-control q-mb-md" filled v-model="guildData.server" label="Server" />
            <q-input class="form-control q-mb-md" filled v-model="guildData.discord_link" label="Discord link" />
            <q-file class="form-control" :dense="!$q.screen.gt.md" filled v-model="guildData.image" label="Image" />

            <p class="text-h6 q-mt-md full-width">Description</p>
            <div style="overflow-y: auto">
              <q-editor
                v-model="guildData.description"

                :dense="$q.screen.lt.md"
                class="q-mb-md"
                :toolbar="[

        ['bold', 'italic', 'strike','hr', 'underline', 'subscript', 'superscript'],


        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],


      ]"
                :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
              />
            </div>

            <!--      <q-toggle v-model="accept" label="I accept the license and terms" />-->

            <div>
              <div class="text-center flex items-center justify-between">
                <q-btn label="Add company" :loading="is_loading" text-color="dark" no-caps type="submit" class="q-px-xl q-mb-md" color="primary "/>
                <p class="no-margin text-center text-bold">To edit the information in the future, please contact the discord <span class="text-negative">greshnik#9579</span></p>
              </div>


            </div>
          </q-form>

        </q-card-section>
      </q-card>
    </q-dialog>
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
      leftDrawerOpen:false,
      is_loading:false,
      feedbackModal:false,
      name: null,
      age: null,
      fb_text: null,
      fb_user: null,
      accept: false,
      is_register:false,
      email_re:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      isPwd: true,
      userLogin:{
        email:'',
        password:'',
      },
      fraction_options:[
        'Undecided', 'Covenant','Marauders','Syndicate'
      ],
      size_options:[
        '1-10', '11-25','26-50','51-100','+101'
      ],
      style_options:[
        'PvE', 'PvP','Pvp PvE','Craft','RP'
      ],
      userData:{
        password1:null,
        password2:null,
        email:null,
        age:null,
        sex:'Male',
        nickname:null,
      },
      guildData:{
        name:null,
        fraction:'Undecided',
        server:null,
        size:'1-10',
        style:'PvE',
        image:null,
        description:null,
        discord_link:null,

      }



    }
  },
  methods:{
    ...mapActions('componentState',['changeauthModalVisible',"changeguildCreateModalVisible"]),
    ... mapActions('auth',['loginUser','logoutUser']),
    userLoginAction() {
      this.loginUser(this.userLogin)

    },
    async add_fb(){
      this.is_loading = true

      await this.$api.post('/api/add_fb', {
          fb_user: this.fb_user,
          fb_text: this.fb_text
        })
      this.$q.notify({
          message: 'Thanks! :))',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
      this.is_loading = false
      this.feedbackModal = false
    },
    onSubmit () {
      console.log('submit')
      this.completeRegistration()
    },
    async completeRegistration() {
      try {
        let response = await this.$api.post('/auth/users/', {
          email: this.userData.email,
          password: this.userData.password2,
          nickname: this.userData.nickname,
          discord: null,
          is_guild_member: false
        })
        this.$q.notify({
          message: 'Account created',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
        this.loading = false
        this.is_register = false
      } catch (e) {
        this.$q.notify({
          message: 'Check the data you entered',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'red',
          icon: 'announcement'
        })
      }
    },
    async createGuild(){
      this.is_loading = true
      let formData = new FormData()
      formData.set('data', JSON.stringify(this.guildData))
      if (this.guildData.image){
        formData.set('img',this.guildData.image)
      }
      const response = await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/guild/create',
        data: formData
      })
      this.$q.notify({
        message: 'Thank you, the company is put on moderation',
        position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
        color: 'positive',
        icon: 'announcement'
      })
      this.is_loading = false
      this.changeguildCreateModalVisible(false)
      this.guildData.name=null
      this.guildData.fraction='Undecided'
      this.guildData.server=null
      this.guildData.size='1-10'
      this.guildData.style='PvE'
      this.guildData.image=null
      this.guildData.description=null
      this.guildData.discord_link=null


    },
  },
  computed:{
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
