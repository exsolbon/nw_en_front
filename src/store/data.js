import { api } from 'boot/axios'

const state = () => ({
  guilds:[],
  guild:{},
  posts:[],
  post:{},
  guides:[],
  guide:{},
  builds:[],
  build:{},
  poi:[],
  resourses:[],
  faq:[],
  item_categories:[],
  items:[],
  item:{},
  title:'',
  description:''


})

const mutations = {
  updateGuilds(state,data){
    state.guilds = data
  },
  updateGuild(state,data){
    state.guild = data
  },
  updatePosts(state,data){
    state.posts = data
  },
  updatePost(state,data){
    state.post = data
  },
  updateGuides(state,data){
    state.guides = data
  },
  updateGuide(state,data){
    state.guide = data
  },
  updateBuilds(state,data){
    state.builds = data
  },
  updateBuild(state,data){
    state.build = data
  },
  setBuild(state,data){
    //{weapon:1,tree:0,skill_id})
    //this.build.weapon1.trees[0].skills.find(x=>x.id===skill_id).is_checked = true
    if (data.weapon===1){
      state.build.weapon1.trees[data.tree].skills.find(x=>x.id===data.skill_id).is_checked = true
    }
    if (data.weapon===2){
      state.build.weapon2.trees[data.tree].skills.find(x=>x.id===data.skill_id).is_checked = true
    }
  },
  updatePoi(state,data){
    state.poi = data
  },
  updateResourses(state,data){
    state.resourses = data
  },
  updateCategoryType(state,data){
    if (data.type === 'typeChange'){
      if(!state.resourses[data.index].is_visible){
        for (let  x of this.categoryTypes[data.index].category){
          x.is_visible = false
        }
      }
    }
    if (data.type === 'categoryChange'){
      state.resourses[data.index].is_visible = true
    }



      //state.resourses = data
    },
  updateFaq(state,data){
    state.faq = data
  },
  updateItemCategories(state,data){
    state.item_categories = data
  },
  updateItems(state,data){
    state.items = data.items
    state.title = data.title
    state.description = data.description
  },
  updateItem(state,data){
    state.item = data.item
    state.title = data.title
    state.description = data.description
  },

}

const actions = {
  async fetchItems({commit,getters},data){
    if (data.type==='all'){
      const response = await api.get(`api/item/items?type=a${data.page?'&page='+data.page :''}`)
      let title = 'New World all items'
      let description = 'See an overview of all items in New World at NWData. All kinds of weapons, information about crafting, legendary. Come in!'
      commit('updateItems', {items:response.data,title,description})
    }
    if (data.type==='s'){
      const response = await api.get(`api/item/items?type=s&s=${data.subcat_slug}${data.page?'&page='+data.page :''}`)
      let cat = getters.item_categories.find(x=>x.name_slug === data.cat_slug)
      let subcat = cat.subcategories.find(x=>x.name_slug===data.subcat_slug)
      let title = `New World ${cat.name.toLowerCase()} ${subcat.name.toLowerCase()}`
      let description = `See an overview ${cat.name.toLowerCase()} ${subcat.name.toLowerCase()} in New World at NWData. All kinds of ${cat.name.toLowerCase()}, information about crafting, legendary. Come in!`
      commit('updateItems', {items:response.data,title,description})
    }

  },
  async fetchItem({commit},data){
    const response = await api.get(`/api/item/item?slug=${data}`)
    let item = response.data
    let title=`${item.name} ${item.subcategory.name} New World Data`
    let description=item.description.replace('"','')
    commit('updateItem', {item,title,description})
  },
  async fetchFaq({commit}){
    const response = await api.get('/api/faq')
    commit('updateFaq', response.data)
  },
  async fetchItemCategories({commit}){
    const response = await api.get('/api/item/category')
    commit('updateItemCategories', response.data)
  },

  async fetchGuilds({commit}){
    const response = await api.get('/api/guild/guilds?for=all')
    commit('updateGuilds', response.data)
  },
  async fetchGuild({commit},slug){
    const response = await api.get(`/api/guild/guild?slug=${slug}`)
    commit('updateGuild', response.data)
  },
  async fetchPosts({commit}){
    const response = await api.get('/api/post/posts?for=all')
    commit('updatePosts', response.data)
  },
  async fetchPost({commit},slug){
    const response = await api.get(`/api/post/post?slug=${slug}`)
    commit('updatePost', response.data)
  },
  async fetchGuides({commit}){
    const response = await api.get('/api/guide/guides')
    commit('updateGuides', response.data)
  },
  async fetchGuide({commit},slug){
    const response = await api.get(`/api/guide/guide?slug=${slug}`)
    commit('updateGuide', response.data)
  },
  async fetchBuilds({commit}){
    const response = await api.get('/api/skill/build?for=all')
    commit('updateBuilds', response.data)
  },
  async fetchBuild({commit},slug){
    const response = await api.get(`/api/skill/build?slug=${slug}&for=build`)
    commit('updateBuild', response.data)
  },
  updateBuild({commit},data){
    commit('setBuild', data)
  },
  async fetchPoi({commit},slug){
    const response = await api.get(`/api/map/poi`)
    commit('updatePoi', response.data)
  },
  async fetchResourses({commit},slug){
    const response = await api.get(`/api/map/resourse`)
    commit('updateResourses', response.data)
  },
  updateCategoryType({commit},data){
    commit('updateCategoryType', data)
  },




}

export const getters = {
  guilds: (state) => state.guilds,
  guild: (state) => state.guild,
  posts: (state) => state.posts,
  post: (state) => state.post,
  guides: (state) => state.guides,
  guide: (state) => state.guide,
  builds: (state) => state.builds,
  build: (state) => state.build,
  pois: (state) => state.poi,
  categoryTypes: (state) => state.resourses,
  faq: (state) => state.faq,
  item_categories: (state) => state.item_categories,
  items: (state) => state.items,
  item: (state) => state.item,
  title: (state) => state.title,
  description: (state) => state.description,


}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
