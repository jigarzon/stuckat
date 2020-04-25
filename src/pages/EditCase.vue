<template>
  <q-page padding>
    <edit-case :type="$route.query.type" />
  </q-page>
</template>

<script>
import EditCase from 'components/EditCase'
export default {
  components: {
    EditCase
  }
}
</script>
