export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'celpj',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p',
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome',
    
  ],

  googleFonts: {
    families: {
      'M PLUS 1p': [300], /*'Kosugi Maru': [400],*/ 
      download: true,
      inject: true
    }
  },

  fontawesome: {
    component: 'fa', // vueのtemplateで呼び出すときの名前
    icons: {
      solid: ['faEye', 'faEyeSlash', 'faCalendarDays', 'faPen', 'faList', 'faCheck'],
    }
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  auth: {
    /*redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
    },*/
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://localhost',
        token: {
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },

        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh', method: 'post', propertyName: 'access_token' },
          user: { url: '/me', method: 'get', propertyName: false },
        }
      },
    },
  },

  router: {
    //mode: "hash",
     base: process.env.BASE_URL,
    //middleware: ['user_auth']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308

    //baseURL: "path/to/api_base/",
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ]
  },
  
  store: ['~/store/reservation.js'], // ストアモジュールのパスを指定
  // ...
}
