<template>
  <q-page style="overflow: hidden">
    <q-page-sticky style="z-index: 1000" position="top-left" :offset="[18, 18]">
      <q-btn @click="leftDrawerOpen = !leftDrawerOpen" fab :icon="leftDrawerOpen ? 'west': 'east'" color="primary" />
    </q-page-sticky>



    <q-drawer
      v-model="leftDrawerOpen"

      bordered
      dark
    >
      <q-list  dark >
        <q-item >
          <q-item-section>
            <h1 class="q-mb-none text-h6 text-bold text-center">New world map</h1>
          </q-item-section>
        </q-item>
         <q-item clickable v-ripple >
          <q-item-section>
            <q-toggle
              v-model="is_poi_visible"
              label="Show points of interest"
            />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple v-for="(type,index) in categoryTypes" :key="type.id">
          <q-item-section>
            <q-toggle
              v-model="type.is_visible"
              @input="typeChange(index)"
              :style="{color: type.marker_color}"
              class="q-mb-sm"
              :label="`Toggle group ${type.name.toLowerCase()}`"
            />
            <q-toggle
              dense
              class="q-mb-sm q-px-md"
              :style="{color: type.marker_color}"
              @input="categoryChange(index)"
              v-for="(category,cat_index) in type.category"
              :key="category.id"
              v-model="category.is_visible"
              :label="category.name_en"
            />
          </q-item-section>


        </q-item>

        <q-separator/>


      </q-list>

    </q-drawer>


    <q-no-ssr>
      <l-map
        @click="addMarker"
        ref="map"
        :bounds="bounds"
        :zoom="10"
        :crs="crs"
        :attributionControl = "attributionControl"
        :zoomControl="!1"
        preferCanvas
        style="height: 100vh; width: 100vw;background: #000">
        <l-tile-layer
          :url="url"
          :tileSize='tileSize'
          :noWrap="noWrap"
          :min-zoom="minZoom"
          :max-zoom="maxZoom"

          :bounds="bounds"
        />
        <div class="">
             <l-marker
            v-if="is_poi_visible"
            :lat-lng="[poi.lat, poi.lng]"
            v-for="poi in pois"
            :key="poi.id"
          >
            <l-icon
              :icon-size="iconSize"
              :icon-url="poi.image"
            />
            <l-popup :content="`<b>${poi.name_en }</b><br><br>${poi.description_en}<br><br>Level ${poi.level ? poi.level : '--'}`" />
          </l-marker>
          </div>

        <div v-if="type.is_visible" class="" v-for="type in categoryTypes" :key="type.id">
          <div v-if="category.is_visible" v-for="category in type.category" :key="category.id">
<!--            <l-marker-->
<!--              :lat-lng="[res.lat, res.lng]"-->
<!--              v-for="(res,index) in category.resourses"-->
<!--              :key="index">-->
<!--              <l-icon-->
<!--                :icon-size="iconSize"-->
<!--                :icon-url="category.image"/>-->
<!--              <l-popup :content="`<b>${category.name_en }</b><br>(${category.name }) <br>${res.description}`" />-->
<!--            </l-marker>-->
            <v-marker-cluster :options="{maxClusterRadius:30,zoomToBoundsOnClick:false}">
                             <l-circle-marker
                          :lat-lng="[res.lat, res.lng]"
                            v-for="(res,index) in category.resourses"
                            :key="index"
                          :color="type.marker_color"
                          :radius="5"
                          >
                            <l-popup :content="`<b>${category.name_en }</b><br>${res.name}<br>${res.description}`" />
                          </l-circle-marker>
<!--              <l-marker v-for="(res,index) in category.resourses" :key="index" :lat-lng="[res.lat, res.lng]" >-->
<!--                <l-icon-->
<!--                :icon-size="iconSize"-->
<!--               :icon-url="category.image"/>-->
<!--                <l-popup :content="`<b>${category.name_en }</b><br>(${category.name }) <br>${res.description_en}`"></l-popup>-->
<!--              </l-marker>-->
            </v-marker-cluster>
            <!--              <l-circle-marker-->
            <!--              :lat-lng="[res.lat, res.lng]"-->
            <!--                v-for="(res,index) in category.resourses"-->
            <!--                :key="index"-->
            <!--              :color="type.marker_color"-->
            <!--              :radius="6"-->
            <!--              >-->
            <!--                <l-popup :content="`${category.name }<br>(${category.name_en }) ${category.image}<br>${res.description}`" />-->
            <!--              </l-circle-marker>-->
          </div>

        </div>

      </l-map>
    </q-no-ssr>



  </q-page>


</template>

<script>

// import { LMap, LImageOverlay, LMarker, LPopup, LPolyline } from "vue2-leaflet";
import {mapActions, mapGetters} from "vuex";

let Vue2Leaflet = {}
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
let Vu2Cluster ={}

if (!process.env.SERVER) {
  //Vu2Cluster = require('vue2-leaflet-markercluster')
  Vue2Leaflet = require('vue2-leaflet')
}
export default {
  meta: {
    title: 'New world interactive map',
    // meta tags
    meta: {
      description: {name: 'description', content: 'New world interactive map'},
      ogTitle: {
        name: 'og:title',
        template(ogTitle) {
          return `New world interactive map`
        }
      }
    }
  },
  components: {
    'l-tile-layer':Vue2Leaflet.LTileLayer,
    'l-marker':Vue2Leaflet.LMarker,
    'l-circle-marker':Vue2Leaflet.LCircleMarker,
    'l-popup':Vue2Leaflet.LPopup,
    'l-icon':Vue2Leaflet.LIcon,
    //'v-marker-cluster': Vu2Cluster.Vue2LeafletMarkerCluster

  },

  data() {
    return {
      tab:'map',
      is_poi_visible:true,
      leftDrawerOpen: true,
      iconSize: [54, 54],
      iconAnchor: [16, 37],
      pois:[{
        "id": 5,
        "name": null,
        "name_en": "The Abberation",
        "name_slug": "the-abberation",
        "description": "Level 35 Named",
        "image": "http://localhost:8000/media/images/poi/claim_compass.png",
        "level": 4,
        "x_game": null,
        "x_map": "353.40625000",
        "y_game": null,
        "y_map": "674.37500000",
        "lat": "5654.50000000",
        "lng": "10790.00000000"
      },],
      categoryTypes:[

      ],
      url: `${process.env.API}/media/map/{z}/map_y{y}_x{x}.jpg`,

      zoom:{ position: "center" },
      minZoom:1,
      maxZoom:5,
      attributionControl: !1,
      zoomControl: !1,
      preferCanvas: !0,
      noWrap:!0,
      tileSize:1024,


      bounds: [[-5000,7000],[14336,14336]],
      //crs: !process.env.SERVER ? this.$crs.Simple : null,
      crs:
        !process.env.SERVER ?
          this.$extend({},this.$crs.Simple, { transformation: new this.$Transformation(1 / 16, 0, -1 / 16, 0) })
          :
          null,


    };
  },
  async mounted() {
    const response = await this.$api.get('/api/map/poi')
    this.pois = response.data
    const response_types = await this.$api.get('/api/map/resourse')
    this.categoryTypes = response_types.data



  },
  methods:{
    addMarker(event){
      console.log('add',event.latlng)
    },
    typeChange(index){
      if(!this.categoryTypes[index].is_visible){
        for (let  x of this.categoryTypes[index].category){
          x.is_visible = false
        }
      }

    },
    categoryChange(index){
      this.categoryTypes[index].is_visible = true
    }
  },
  // computed:{
  //   ...mapGetters('componentState',['is_poi_visible']),
  // }

};
</script>
