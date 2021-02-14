import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: process.env.PORT || 8000, // default: 3000
    //host: '0.0.0.0' // default: localhost
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  serverMiddleware: [
    //{ path:'/server', handler: '~/server/web-socket' },
    { path: '/server', handler: '~/server/management' },
    { path: '/server', handler: '~/server/user-info' },
    { path: '/server', handler: '~/server/delete-img' }
  ],
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    //titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    //{ src: '@/plugins/socket', ssr: false }
    //'~/plugins/auth0'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/bootstrap-vue',
    '@nuxt/http',
    '@nuxtjs/proxy'
  ],
  
  axios: {
    //baseURL: process.env.BASE_URL
    //browserBaseURL: process.env.BROWSER_BASE_URL,
    //proxy: true,
    //https: true
    //prefix: '/api/'
    /*headers: {
      post: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
      }
    }*/
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BASE_URL,
      //managementURL: '/server/management'
    }
  },
  
  /*privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },*/

  http: {
    proxy: true
  },
  
  proxy: {
    '/api/': { target: 'https://dev-p69g86kq.us.auth0.com', pathRewrite: {'^/api/': ''} },
    //'/api1/': { target: 'https://metyellowe.github.io', pathRewrite: {'^/api1/': ''} }
  },
  auth: {
    strategies: {
      auth0: {
        domain: 'dev-p69g86kq.us.auth0.com',
        client_id: '3waBNUoS0juK0IDLtRLFMHTt5wwDcHcQ'
      }
    },
    plugins: [
      '~/plugins/appmetadata'
    ]
  },

  router: {
    middleware: ['auth'],
    //base: '/metyellowe.github.io/'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  /*env: {
    clientId: process.env.AUTH0_CLIENT_ID || "",
    clientSecret: process.env.AUTH0_CLIENT_SECRET || ""
  },*/
  /*render: {
    static: {
      setHeaders(res) {
        //res.setHeader('X-Frame-Options', 'ALLOWALL')
        res.setHeader('Access-Control-Allow-Origin', '*')
        //res.setHeader('Access-Control-Allow-Methods', 'GET')
        //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      }
    }
  }*/
  /*privateRuntimeConfig: {
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || ""
  }*/
}
