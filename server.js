const express = require('express');
const path = require('path');

const app = express();

const env = process.env.NODE_ENV;
const port = 3050;

console.log('env:', env);
if (env !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  console.log('inside prod callback');
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});