<template>
  <div class="row no-wrap q-py-md q-px-md">
    <div class="column" :class="{'order-last':inverted}" v-if="items">
      <menu-button v-for="item in items" :item="item" :key="item.key"
        class="q-mt-sm" />
    </div>

    <q-separator vertical inset class="q-mx-lg" v-if="items" />

    <div class="items-center col"
      :class="{'order-first':inverted, 'row' : inverted, 'column': !inverted}"
      style="width:100px">
      <user-avatar :user="user" />

      <div class="text-subtitle1 text-center q-ma-sm">{{`${user.firstName}
        ${user.lastName}`}}</div>

    </div>
  </div>
</template>

<script>
import UserAvatar from 'src/components/UserAvatar'
import MenuButton from 'src/components/MenuButton'

export default {
  props: {
    user: Object,
    items: Array,
    inverted: Boolean
  },
  components: {
    UserAvatar,
    MenuButton
  },
  methods: {
    logout () {
      this.$store.dispatch('general/logout')
    },
    showCategorySelector () {
      this.$root.$emit('openCategorySelector')
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
