let { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
let nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
     return {
        ...options,
        entry:['webpack/hot/poll?100', options.entry],
        externals: [
            nodeExternals:['webpack/hot/poll?100'],
        ],
        plugin:[
            ...options.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths:[/\.js$/,/\.d\.ts$/]
            }),
            new RunScriptWebpackPlugin({
                name: options.out.filname,
                autoRestart: false
            })
        ]
     }
};

