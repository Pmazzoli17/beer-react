module.exports = {
  
  // This is the entry point or start of the react applicaton
  entry: "./app/app.js",

  // The plain compiled JavaScript will be output into this file
  output: {
    filename: "public/bundle.js"
  },

  // This section describes what we will do
  module: {
    loaders: [
      {
        // Only working with files that are in a .js or .jsx extension
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          // These are the specific transformations we'll be using. 
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are just coming from bundle.js
  devtool: "eval-source-map"
};
