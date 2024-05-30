const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	 publicPath: process.env.NODE_ENV === '/https://github.com/hery101-dev/frontend/',
  devServer: {
    proxy: 'http://localhost:8000'
},
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
