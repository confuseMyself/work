function upload (name,content) {

}

class CustomPlugin {
  apply (complier) {
    console.log('\napply\n')
    complier.plugin('emit', (compilation, callback) => {
      for (let filename in compilation.assets) {

        let content = compilation.assets[filename]['_source'].children[0]
        console.log(filename, content)
        upload(filename,content)
      }
    })
  }
}

module.exports = {
  mode: 'development',
  entry: './src2/index.js',
  plugins: [
    new CustomPlugin()
  ]
}
