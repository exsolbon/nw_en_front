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


}

const actions = {

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
    console.log(response.data)
  },
  async fetchGuide({commit},slug){
    const response = await api.get(`/api/guide/guide?slug=${slug}`)
    commit('updateGuide', response.data)
  },




}

export const getters = {
  guilds: (state) => state.guilds,
  guild: (state) => state.guild,
  posts: (state) => state.posts,
  post: (state) => state.post,
  guides: (state) => state.guides,
  guide: (state) => state.guide


}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
