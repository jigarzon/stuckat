<template>
  <q-btn :flat="flat" class="menu-button"
    :color="itemColor"
    no-caps :aria-label="$t(item.key)"
    @click="item.action ? item.action(): null" :class="item.clazz"
    :to="item.route ? item.route : undefined" :icon="item.icon"
    :icon-right="item.subitems ? (item.expanded ? 'arro _drop_up' : 'arrow_drop_down') : undefined">
    {{ $t(item.key) }}
    <q-menu v-if="item.subitems" v-model="item.expanded">
      <q-list>
        <q-item v-for="subitem in item.subitems" :key="subitem.key" link
          :to="subitem.route">
          <q-item-section>{{$t(subitem.key)}}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
    item: Object,
    flat: Boolean
  },
  computed: {
    itemColor () {
      var highlight = 'yellow-6'
      var normal = this.item.asUserSetting ? 'accent' : 'white'
      if (this.$route.meta && this.$route.meta.highlightMenu === this.item.key) {
        return highlight
      } else {
        return normal
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-button {
  >>>.q-icon {
    margin-right: 10px;
  }
}
</style>
