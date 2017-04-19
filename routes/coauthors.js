var coauthorsMapReduce = require('./coauthors/map-reduce')
var coauthorsMatrixBuilder = require('./coauthors/matrix-builder')

module.exports = function(db, renderer, errorRenderer){

  function handleRequest(params){
    db.articles.mapReduce(
      coauthorsMapReduce.map,
      coauthorsMapReduce.reduce,
      { 
        out: coauthorsMapReduce.out,
        finalize: coauthorsMapReduce.finalize
      },
      function(err){
          renderAnyError(err)
          findCoauthors()
      }
    )
  }

  function findCoauthors(){
    db[coauthorsMapReduce.out].find( function(err, coauthors){
      renderAnyError(err)
      findAuthors(coauthors)
    })
  }

  function findAuthors(coauthors){
    db.articles.distinct( 'authors', {}, function(err, authors){
      renderAnyError(err)
      var coauthorsMap = coauthorsMapReduce.convertResult(coauthors)
      var matrix = coauthorsMatrixBuilder.build(authors, coauthorsMap)
      renderer.render(matrix)
    })
  }

  function renderAnyError(err){
    if(err){
      errorRenderer.render({
        error : err
      })
    }  
  }

  return {
    handleRequest : handleRequest
  }

}