<template>
<q-page >
  <div class="container">
    <div class="flex items-center q-py-lg">
            <q-icon size="30px" class="q-mr-md" color="primary" name="help" />
            <h1 class="text-h5">New World FAQs</h1>
          </div>
    <q-list dark padding  class="rounded-borders" style="max-width: 100%">
      <q-expansion-item
        group="somegroup"
        v-for="faq in faqs"
        :key="faq.id"
        :label="faq.question"
        class="text-h6 text-primary"
      >
        <q-card class="bg-grey-9">
          <q-card-section class="text-white" v-html="faq.answer">

          </q-card-section>
        </q-card>
      </q-expansion-item>


    </q-list>
  </div>
</q-page>
</template>

<script>



export default {
  name: 'MainLayout',
  meta: {
    title: 'New World FAQs',
    meta: {
      description: {name: 'description', content: 'FAQs or Frequently Asked Questions in New World covers different questions with its corresponding answer regarding New World. This page covers a list of the frequently asked questions regarding the game.'},

      ogTitle: {
        name: 'og:title',
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `New World FAQs`
        }
      }
    }
  },

  data () {
    return {
      faqs:[]

    }
  },
  async mounted() {
    const response = await this.$api.get('/api/faq')
    this.faqs = response.data

  },
  methods:{

  },

}
</script>
<style lang="sass" scoped>


</style>
