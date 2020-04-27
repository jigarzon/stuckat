<template>
  <div>
    <q-btn v-if="user && mode !== 'expanded'" flat no-caps rounded>
      <div class="row no-wrap items-center">
        <span class="q-pr-sm text-weight-regular">{{`${user.firstName}
          ${user.lastName}`}}</span>
        <user-avatar :user="user" />
      </div>
      <q-menu max-width="500px">
        <user-settings :user="user" class="q-px-md" :items="items" />
      </q-menu>
    </q-btn>
    <div v-else-if="user && mode == 'expanded'">
      <user-settings :user="user" inverted />
    </div>
    <div v-else class="row no-wrap items-center q-my-sm">
      <q-btn flat no-caps dense class="underline q-mr-md"
        :label="$t('user.initSession')"
        @click="$root.$emit('loginRequested')" />
    </div>
  </div>
</template>

<script>
import UserSettings from 'components/UserSettings'
import UserAvatar from 'components/UserAvatar'
export default {
  props: ['mode', 'items'],
  computed: {
    user: function () {
      return this.$store.state.general.user
    }
  },
  components: {
    UserSettings,
    UserAvatar
  }
}
</script>

<style lang="stylus" scoped>
.underline {
  text-decoration: underline;
}
</style>
