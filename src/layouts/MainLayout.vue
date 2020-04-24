<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal style="min-height: 40px" v-if="!$route.meta.hideHeader">
      <q-toolbar color="primary"
        class="toolbar-main column items-stretch justify-center shadow-5">
        <div class="row items-center">
          <div class="col-auto q-px-xs row items-center">
            <q-btn flat round @click="$router.push('/')"
              :aria-label="$t('home')" class="button-logo q-pa-sm">
              <q-icon name="home" />
            </q-btn>
            <div class="column" v-if="!isMobile">
              <h1 style="display:inline" class="col-auto">
                <b>{{ $t("brand") }}</b>
              </h1>
              <h2>{{ $t("general.slogan") }}</h2>
            </div>
            <span v-else
              class="text-subtitle1 text-bold">{{$t($route.meta ? $route.meta.highlightMenu: '')}}</span>
          </div>
          <navigation-menu mode="desktop" class="col nav-menu-desktop"
            v-if="!isMobile" />
          <q-btn flat v-if="isMobile" class="q-ml-auto" dense round
            @click="leftDrawerOpen = !leftDrawerOpen" :aria-label="$t('menu')">
            <q-icon name="menu" />
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" v-if="isMobile">
      <navigation-menu mode="mobile" />
    </q-drawer>

    <q-page-container>
      <transition appear enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut" mode="out-in">
        <router-view>
          Loading
        </router-view>
      </transition>
    </q-page-container>
    <login-dialog v-model="showLoginDialog" />
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import NavigationMenu from 'components/NavigationMenu'
import LoginDialog from 'components/LoginDialog'
export default {
  name: 'Landing',
  async preFetch ({ store, ssrContext }) {},
  created () {
    this.$root.$on('loginRequested', () => {
      this.showLoginDialog = true
    })
  },
  data () {
    return {
      leftDrawerOpen: false,
      mockSearchPhrase: '',
      mockLocation: 'Buenos Aires',
      showLoginDialog: false
    }
  },
  computed: {
    isMobile: function () {
      return this.$q.screen.lt.sm
    }
  },
  mounted () {},
  meta () {},
  methods: {
    openURL
  },
  components: {
    NavigationMenu,
    LoginDialog
  }
}
</script>

<style lang="stylus" scoped>
.toolbar-main {
  h1 {
    font-size: 25px;
    line-height: 100%;
    margin: 0px 10px;
    font-weight: 400;
  }

  h2 {
    font-size: 16px;
    font-weight: 400;
    margin: 4px 0 0 10px;
    line-height: 100%;
  }

  .button-logo {
    // padding: 2px;
    width: 80px;
    height: 80px;

    img {
      width: 100%;
    }
  }

  @media screen and (max-width: $breakpoint-sm) {
    h1 {
      font-size: 16px;
    }

    h2 {
      font-size: 12px;
    }

    .button-logo {
      width: 50px;
      height: 50px;
    }
  }
}

.input-search {
  box-shadow: 0 0 0;
  background: #fff;
  padding: 3px;

  >>> .q-icon {
    order: 2;
  }
}

.nav-menu-desktop {
}
</style>
