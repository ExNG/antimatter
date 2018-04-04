// IMPORTS
var sass = require('node-sass')
var path = require('path')
var fs = require('fs')

// VARIABLES
var inPath = path.join(__dirname, '..', 'src', 'antimatter.scss')
var outPath = path.join(__dirname, '..', 'dist', 'antimatter.css')

// HELPER
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

// BUILD
console.log('# Building css')
var result = sass.render({
  file: inPath,
  outFile: outPath
}, function (err, out) {
  if (err) throw err

  mkdirSync(path.join(outPath, '..'))

  fs.writeFileSync(outPath, out.css)

  console.log('--> Build Done.')
})
