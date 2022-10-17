<template>
  <v-app-bar app class='px-2' color='teal lighten-4'>
    <div class='d-flex align-center shop-logo' @click='goToHome()'>
      <v-img
          alt='Shop logo'
          class='shrink mr-4'
          contain
          src='@/assets/logo.png'
          transition='scale-transition'
          width='35'
      />
      <span class='shrink hidden-sm-and-down'>
        百分百文具網
      </span>
    </div>

    <v-spacer/>

    <span v-if='isLogin'>
      <v-btn fab color='teal lighten-4' elevation='0'>
        <v-icon class='mr-1'>{{ LoginIcon }}</v-icon>
        {{ username }}
      </v-btn>
    </span>

    <span v-else>
      <v-btn to='/login' fab color='teal lighten-4' elevation='0'>
        <v-icon>{{ LoginIcon }}</v-icon>
      </v-btn>

      <v-btn to='/cart' fab color='teal lighten-4' elevation='0'>
        <v-icon>{{ cartIcon }}</v-icon>
      </v-btn>
    </span>

  </v-app-bar>
</template>
<script>
import { mdiAccount, mdiCart } from '@mdi/js'
import { mapState } from 'vuex';

export default {
  name: 'nav-bar',
  data: () => ({
    LoginIcon: mdiAccount,
    cartIcon: mdiCart,
  }),
  computed: {
    ...mapState( 'user', ['isLogin', 'username'] ),
  },
  methods: {
    goToHome() {
      if (this.$route.name !== 'home') {
        this.$router.push(`/`)
      }
    },
  }
}
</script>
<style lang="scss">
.shop-logo {
  cursor: pointer;
  user-select: none;
  font-size: 1.5rem;
}

.nav-icon {}
</style>
