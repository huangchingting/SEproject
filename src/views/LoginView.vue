<template>
  <v-container class='login-cntr'>
    <v-alert
      type='error'
      :value='isShowError'
    >
      {{ errorMessage }}
    </v-alert>
    <form>
      <v-text-field v-model='username' placeholder='帳號' />
      <v-text-field v-model='password' placeholder='密碼' type='password' />
      <v-btn @click='login'>
        登入
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import { userLogin } from '@/services/user.service'

export default {
  name: 'loginView',
  data() {
    return {
      username: '',
      password: '',
      isShowError: false,
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      this.isShowError = false
      this.errorMessage = ''

      let result = await userLogin(this.username, this.password)

      if (result) {
        await this.$store.dispatch('user/getIsLogin')
        await this.$store.commit('user/setUsername', this.username)
        await this.$router.push('/')
      } else {
        this.isShowError = true
        this.errorMessage = '帳號或密碼錯誤'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.login-cntr {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
