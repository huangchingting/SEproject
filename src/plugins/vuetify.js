import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

// See https://vuetifyjs.com/en/styles/colors/#material-colors for all colors
export default new Vuetify({
    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        themes: {
            light: {
                primary: colors.teal.base,
                secondary: colors.blueGrey.lighten1,
                accent: colors.cyan.darken1,
                error: colors.red.darken2,
                warning: colors.amber.lighten2,
                info: colors.indigo.lighten2,
                success: colors.lightGreen.base
            }
        }
    }
})