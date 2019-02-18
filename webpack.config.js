const path = require('path');

module.exports = {
    entry: './directory.js',
    output: {
        filename: 'directory-dist.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }]
        },
        {
            test: /\.(scss)$/,
            use: [
                {
                    // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                },
                {
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                },
                {
                    // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};