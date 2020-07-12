const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const shouldUseSourceMap = true;

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        },
      );
    }
    return loaders;
  };
  return {
    entry: './server/index.js',
    output: {
      path: __dirname,
      filename: 'serverBundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          }),
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction && shouldUseSourceMap,
            },
            'sass-loader',
          ),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction && shouldUseSourceMap,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
            'sass-loader',
          ),
        },

        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction && shouldUseSourceMap,
            },
            'less-loader',
          ),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: lessModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction && shouldUseSourceMap,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
            'less-loader',
          ),
        },

        // "file" loader makes sure those assets get served by WebpackDevServer.
        // When you `import` an asset, you get its (virtual) filename.
        // In production, they would get copied to the `build` folder.
        // This loader doesn't use a "test" so it will catch all modules
        // that fall through the other loaders.
        {
          loader: require.resolve('file-loader'),
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise be processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(config|overrides|variables)$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
  };
};
