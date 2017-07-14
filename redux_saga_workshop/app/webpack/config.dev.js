/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

const makeConfig = require('./config.base');
const localPaths = require('./localPaths');


// The app/ dir
const app_root = path.resolve(__dirname, '..');
const filenameTemplate = 'app/[name]';


const config = makeConfig({
    filenameTemplate: filenameTemplate,

    devtool: 'eval-source-map',

    extractCss: false,
    minifyCss: false,
    profile: true,

    prependSources: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?${localPaths.PUBLIC_PATH}`,
        'webpack/hot/only-dev-server',
    ],

    // This must be same as Django's STATIC_URL setting
    publicPath: `${localPaths.PUBLIC_PATH}/static/`,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
});
console.log("Using DEV config");


module.exports = config;
