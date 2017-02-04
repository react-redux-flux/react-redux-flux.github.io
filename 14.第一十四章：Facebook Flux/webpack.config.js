var htmlWebpackPlugin =  require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry:{
        reduceStore_build:"./6.container_test.js",
    },
    output:{
        path:"./",
        filename:"[name].js"
    },
    devtool: 'source-map',
    module:{
        loaders:[
            {
                test:/.css$/,
                loaders:["style","css"],
                exclude:"/node_modules/"
            },
            // {
            //   test:/.jsx?$/,
            //   loaders:["react-hot","babel?presets[]=es2015&presets[]=react"],
            //   exclude:"/node_modules/",
            //   include:path.resolve(__dirname,'react')
            // },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2)$/,
                loader: "file-loader"
            }
        ]
    },
    resolve:{
        extensions:['','.js','.css','.jsx']  //自动补全识别后缀
    },
    // plugins:[
    //     new htmlWebpackPlugin({
    //         title:'flux'
    //     }),
    //     new webpack.ProvidePlugin({
    //         '$':'jquery',
    //         'jQuery':'jquery',
    //         'window.jQuery':'jquery',
    //         'React':'react',
    //         'ReactDOM':'react-dom',
    //     })
    // ]
}
