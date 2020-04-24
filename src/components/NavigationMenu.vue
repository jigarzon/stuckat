<template>
  <div>
    <div v-if="mode === 'desktop'" class="row justify-end items-center">
      <menu-button :item="item" v-for="item in topItems" :key="item.key" flat />
      <current-user-section class="q-pl-lg" :items="userSettingsItems" />
    </div>
    <div v-else>
      <current-user-section class="q-pl-lg" mode='expanded' />
      <sidebar-menu-item
        :color="$route.meta && $route.meta.highlightMenu == item.key ? 'secondary' : 'primary'"
        v-for="item in userItems" :key="item.key" :item="item"
        :itemlist="userItems" />
    </div>
  </div>
</template>

<script>
import { rolesOk } from 'src/classes/utils'
import SidebarMenuItem from 'src/components/SidebarMenuItem'
import MenuButton from 'src/components/MenuButton'
import CurrentUserSection from 'src/components/CurrentUserSection'
export default {
  computed: {
    userItems () {
      return this.mockItems.filter(i => {
        var valid = rolesOk(this.roles, i.roles)
        valid = valid && (!i.loggedIn || this.user)
        return valid
      })
    },
    userSettingsItems () {
      return this.mockItems.filter(i => {
        var valid = rolesOk(this.roles, i.roles)
        valid = valid && i.asUserSetting && (!i.loggedIn || this.user)
        return valid
      })
    },
    roles: function () {
      return []
    },
    user: function () {
      return this.$store.state.general.user
    },
    topItems () {
      return this.mockItems.filter(i => {
        var valid = rolesOk(this.roles, i.roles)

        valid = valid && !i.asUserSetting && (!i.loggedIn || this.user)
        return valid
      })
    }
  },
  data () {
    return {
      mockItems: [
        {
          key: 'admin.title',
          loggedIn: true,
          roles: ['admin'],
          subitems: [

          ]
        },
        {
          key: 'searchNearby.label',
          route: '/cases',
          loggedIn: true,
          clazz: '',
          icon: 'person_pin'
        },
        {
          key: 'cases.myCases',
          route: '/cases',
          loggedIn: true,
          clazz: '',
          icon: 'map',
          asUserSetting: true
        },

        {
          key: 'user.closeSession',
          asUserSetting: true,
          loggedIn: true,
          clazz: 'text-primary',
          action: () => this.$store.dispatch('general/logout'),
          icon: 'exit_to_app'
        }

      ]
    }
  },
  props: ['mode'],
  components: {
    SidebarMenuItem,
    CurrentUserSection,
    MenuButton
  }
}
</script>
