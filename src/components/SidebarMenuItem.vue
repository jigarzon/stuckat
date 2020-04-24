<template>
  <div>
    <q-item v-if="!item.subitems" v-ripple class="relative-position" clickable
      @click="executeAction">
      <q-item-section avatar v-if="item.icon">
        <q-icon color="primary" :name="item.icon" />
      </q-item-section>
      <q-item-section :class="'text-' + color">
        {{ $t(item.key) }}
      </q-item-section>
    </q-item>
    <q-expansion-item v-else :label="$t(item.key)">
      <sidebar-menu-item v-for="child in item.subitems" :key="child.key"
        :color="color" :item="child" :itemlist="itemlist" />
    </q-expansion-item>
  </div>
</template>
<script>
export default {
  name: 'SidebarMenuItem',
  props: {
    item: {
      required: true,
      type: Object
    },
    itemlist: {
      required: true,
      type: Array
    },
    color: String
  },
  watch: {
    'item.expanded' (val) {
      if (!val && this.item.subitems) {
        this.collapse(this.item.subitems)
      }
    }
  },
  methods: {
    executeAction () {
      if (this.item.action) {
        this.item.action()
      } else if (this.item.route) {
        this.$router.push(this.item.route)
      }
    },
    toggle () {
      this.item.expanded = !this.item.expanded
      return this.item.expanded
    },
    collapse (items) {
      items.forEach(item => {
        item.expanded = false
        if (item.subitems) {
          this.collapse(item.subitems)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-item {
  user-select: none;
}
</style>
