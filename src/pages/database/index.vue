<template>
  <q-page class="relative-position">
    <q-list bordered separator>
      <q-item :to="`/database/${item.category.name_slug}/${item.subcategory.name_slug}/${item.name_slug}`" clickable v-ripple v-for="item in items.results" :key="item.id">
        <q-item-section avatar>
          <q-avatar square :class="`item-rarity-${item.rarity}`">
            <img :src="item.icon">
          </q-avatar>
        </q-item-section>
        <q-item-section >
          <q-item-label class="text-bold" :class="`item-color-rarity-${item.rarity}`">{{item.name}}</q-item-label>
          <q-item-label v-if="item.can_be_crafted" caption class="text-positive">Craftable</q-item-label>
        </q-item-section>
        <q-item-section class="gt-sm">
          <div class="flex items-center q-gutter-sm"  >
            <img :src="perk.icon" class="perk-img" alt="" v-for="perk in item.perks" :key="perk.id">

          </div>
        </q-item-section>
       <q-item-section side class="text-bold gt-sm">{{item.rarity | rarity}}</q-item-section>
        <q-item-section side class="text-bold gt-sm">Tier {{item.tier | tier}}</q-item-section>
        <q-item-section side class="text-bold gt-sm">GS {{item.gearScore}}</q-item-section>
      </q-item>
    </q-list>

    <div class="paginator">
      <q-card dark>
        <q-card-section>
           <q-pagination
      v-model="current"
      color="primary"
      :max="items.page_count"
      outline
      :max-pages="6"
      @click="changePage"

      boundary-numbers
    />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>



import {mapGetters,mapActions} from "vuex";
export default {
  async preFetch ({store,currentRoute}) {
    if (currentRoute.params.subcategory_slug){
       await store.dispatch('data/fetchItems',{
         type:'s',
         cat_slug:currentRoute.params.category_slug,
         subcat_slug:currentRoute.params.subcategory_slug})
    }else {
      await store.dispatch('data/fetchItems',{type:'all'})
    }
  },
    meta() {
    return {
      title : this.title,
      meta: {
        description: {name: 'description', content: this.description},
        ogTitle: {
          name: 'og:title',
          content: this.title
        }
      }
    }
  },
  data () {
    return {
      current:1,
      last_subcat:this.$route.params.subcategory_slug,
    }
  },
  filters:{
    tier(val){
      if (val===1){
        return 'I'
      }
      if (val===2){
        return 'II'
      }
      if (val===3){
        return 'III'
      }
      if (val===4){
        return 'IV'
      }
      if (val===5){
        return 'V'
      }
    },
    rarity(val){
      if (val===0){
        return 'Common'
      }
      if (val===1){
        return 'Uncommon'
      }
      if (val===2){
        return 'Rare'
      }
      if (val===3){
        return 'Epic'
      }
      if (val===4){
        return 'Legendary'
      }
    }
  },
  watch:{
    '$route.path'(val){
      console.log(val)
      this.current=1

    }
  },


  // beforeRouteUpdate(){
  //   console.log('update')
  // },
  methods:{
    ...mapActions('data',['fetchItems']),
    changePage(){
      if (this.$route.params.subcategory_slug){
       this.fetchItems({
         type:'s',
         cat_slug:this.$route.params.category_slug,
         subcat_slug:this.$route.params.subcategory_slug,
         page:this.current})
    }else {
      this.fetchItems({type:'all',page:this.current})
    }

    }

  },
  computed:{
    ...mapGetters('data',['items','title','description']),
   }
}
</script>
<style lang="sass" scoped>


</style>
