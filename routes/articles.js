module.exports = function(db, renderer, errorRenderer){
  
  function handleRequest(params){
    if(params && params.articleId){
      findOne(params.articleId)
    } else {
      findAll()
    }    
  }

  function findAll(){
    db.articles.find(function(err, articles){
      if(err){
        errorRenderer.render(err)
      }
      renderer.render(articles)
    })
  }

  function findOne(articleId){
    db.articles.findOne({_id: articleId}, function(err, articles){
      if(err){
        errorRenderer.render(err)
      }
      renderer.render(articles)
    });
  }

  return {
    handleRequest: handleRequest
  }
}