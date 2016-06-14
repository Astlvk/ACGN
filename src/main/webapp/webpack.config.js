var webpack = require('webpack');
module.exports = {
	Plugins : [
	    new webpack.ProvidePlugin({
			//把jquery模块暴露成一些全局变量，这样就不需要require('jquery')了
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			// Asv: 'asv'//这里配置web_modules目录下的依赖，无效。使用路径也无效果。
		}),
		new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    })
	],
	entry : {
		astlvk : './src/main.js'
	},
	output : {
//		publicPath : 'http://localhost:8090/ACGN/dist/',
		publicPath : 'http://localhost:8080/ACGN/dist/',
		path : './dist',
		filename : '[name].js',
		chunkFilename : '[name].js'//可以配置按需加载分块文件的路径和名称
	},
	resolve: {
		extensions: ['', '.vue', '.js']
	},
	externals: {//externals = 外部的
		//引用外部模块，jquery模块来自页面中<script>标签引入的jQuery库暴露的全局变量jQuery
		jquery: 'jQuery',
		// vue: 'Vue'
	},
	module : {
		loaders : [ {
			test : /\.css$/,
			exclude: /node_modules/,
			loader : 'style!css'
		}, {
			test : /\.vue$/,
			exclude: /node_modules/,
			loader : 'vue'
		}, {
			test : /\.js$/,
			exclude: [/node_modules/, /web_modules/],
			loader : 'babel'
		} ]
	},
	babel: {
	 presets: ['es2015']
  },
	devServer : {
		// contentBase: 'index/'
		inline : true,
		host : 'localhost',
		port : '8090'
	}
}