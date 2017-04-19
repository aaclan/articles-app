var KeyGenerator = require('./key-generator')

module.exports = new function(){

  function checkCount(coauthorsMap, author1, author2){
    var keyGen = new KeyGenerator();
    var key = keyGen.getKey(author1, author2);
    var val = coauthorsMap[key] || 0;
    val = val.toString()
    return val
  }

  function getHeaderName(author){
    return [ author.forename, author.lastname].join(' ')
  }

  this.build = function(authors, coauthorsMap) {
    var header = []
    var values = [];

    for(var row=0; row<authors.length; row++){
      header.push(getHeaderName(authors[row]))
      
      var rowValues = []
      
      for(var col=0; col<authors.length; col++){
        rowValues.push(checkCount(coauthorsMap, authors[row], authors[col]))
      }
      
      values.push(rowValues)
    }

    return {
      rowHeader: header,
      columnHeader: header,
      values:values
    }
  }

}