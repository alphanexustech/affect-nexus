const express = require('express')
const app = express()
const path = require('path')

app.get('*/:theRest', function(req, res) {
  var theRest = (req.params.theRest), // theRest is likely a file
      fileParts = theRest.split('.'),
      fileType = fileParts[fileParts.length - 1];
  switch (fileType) {
    case 'js':
      res.sendFile(path.resolve(__dirname, 'dist/' + theRest))
      break;
    case 'gif':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'png':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'jpeg':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'svg':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'mp4':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'ico':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'json':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    case 'xml':
      res.sendFile(path.resolve(__dirname, 'dist/assets/' + theRest))
      break;
    default:
      console.log('There is no filetype for the resouce: ' + theRest)
      console.log('Resolving to - index.html');
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
      break;
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});


app.listen(2000, () => console.log('Example app listening on port 2000!'))
