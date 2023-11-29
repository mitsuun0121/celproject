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
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@mdi/font/css/materialdesignicons.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js', },
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
      /*'M PLUS 1p': [300],*/ 'Kosugi Maru': [400], 
      download: true,
      inject: true
    },
  },

  fontawesome: {
    component: 'fa', // vueのtemplateで呼び出すときの名前
    icons: {
      solid: ['faEye', 'faEyeSlash', 'faCalendarDays', 'faPen', 'faList', 'faCheck'],
    },
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/vuetify',
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
    },
    strategies: {
      'laravelUser': {
        provider: 'laravel/jwt', // Laravel JWTトークンプロバイダーを指定
        url: 'http://localhost',
        
        endpoints: {
          login: { url: '/api/user/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/api/user/logout', method: 'post' },
          refresh: { url: '/api/user/refresh', method: 'post', propertyName: 'access_token' },
          user: { url: '/api/user/user', method: 'get' },
        },

        token: {
          property: 'access_token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          property: 'refresh_token', 
          maxAge: 20160 * 60, 
        },
      },

      'laravelAdmin': {
        provider: 'laravel/jwt', // Laravel JWTトークンプロバイダーを指定
        url: 'http://localhost',

        endpoints: {
          login: { url: '/api/admin/login', method: 'post' },
          logout: { url: '/api/admin/logout', method: 'post' },
          refresh: { url: '/api/admin/refresh', method: 'post' },
          user: { url: '/api/admin/user', method: 'get' },
        },

        token: {
          property: 'access_token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 20160 * 60,
        },
      },
    },
  },

  router: {
    base: process.env.BASE_URL,
    middleware: ['auth'],
  },
  

  
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308

    baseURL: 'http://localhost/api',
    
    // credentials: true,
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
  },
  
  store: {
    strict: process.env.NODE_ENV !== 'production',
  },

  
  vuetify: {
    customVariables: { src: '@/assets/variables.scss', },
    treeShake: true,
  },
  
    
}
