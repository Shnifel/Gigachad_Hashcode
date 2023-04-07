module.exports = {
    presets: ['@babel/preset-react',

      ['@babel/preset-env', { targets: { node: 'current' } }],
      
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-jsx'
      
    ],
    ignore: [/node_modules/, /\.scss$/],
    exclude: [/node_modules/, /\.mp4$/],
  };
  
  