/* eslint-disable */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config.dev');
var localPaths = require('./localPaths');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    stats: {
        colors: true,
        progress: true,
    },
}).listen(localPaths.PORT, localPaths.HOST, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`Listening at ${localPaths.HOST}:${localPaths.PORT}`);
    console.log(`Exposed at ${localPaths.PUBLIC_PATH}`);
});
