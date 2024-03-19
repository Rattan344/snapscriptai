const path = require('path');

module.exports = {
  entry: './new.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Don't apply to files residing in node_modules
        use: {
          loader: 'babel-loader', // Use the Babel loader
          options: {
            presets: ['@babel/preset-env'] // Use preset-env for all ES6+ code
          }
        }
      }
    ]
  }
};
