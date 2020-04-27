<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal style="min-height: 40px" v-if="!$route.meta.hideHeader">
      <q-toolbar color="primary"
        class="toolbar-main column items-stretch justify-center shadow-5">
        <div class="row items-center">
          <div class="col-auto q-px-xs row items-center">
            <q-btn flat round @click="$router.push('/')"
              icon="img:statics/logo-w.svg" :aria-label="$t('home')"
              class="q-ma-none" size="lg" />
            <div class="column">
              <h1 v-if="$q.screen.gt.xs" style="display:inline"
                class="col-auto">
                <b>{{ $t("brand") }}</b>
              </h1>
              <h2 v-if="!isMobile">{{ $t("general.slogan") }}</h2>
            </div>
            <span
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
    <q-footer>
      <q-toolbar color="primary" class="shadow-5 q-pa-xs">
        {{$t('footer.text1')}}
      </q-toolbar>
    </q-footer>
    <q-dialog v-model="cookiesDialog" seamless position="bottom" full-width>
      <q-card class="full-width bg-green-2">
        <q-card-section class="row items-center no-wrap">
          <div class="col q-ma-sm text-subtitle1" v-html="$t('cookiesText')">
          </div>
          <q-btn icon="check" press color="positive" no-caps
            @click="acceptCookies">{{$t('accept')}}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
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
      showLoginDialog: false,
      cookiesDialog: true
    }
  },
  computed: {
    isMobile: function () {
      return this.$q.screen.lt.sm
    }
  },
  mounted () {
    if (this.$q.localStorage.getItem('acceptedCookies')) {
      this.cookiesDialog = false
    }
  },
  meta () {},
  methods: {
    openURL,
    acceptCookies () {
      this.cookiesDialog = false
      this.$q.localStorage.set('acceptedCookies', true)
    }
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
