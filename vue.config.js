const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	 publicPath: process.env.NODE_ENV === 'production' ? '/subfolder/' : '/',
  devServer: {
    proxy: 'http://localhost:8000'
},
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
