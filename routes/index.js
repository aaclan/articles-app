module.exports = function(db, renderer, errorRenderer){

  function handleRequest(params){
    renderer.render({title: 'Articles API'});
  }
  
  return {
    handleRequest: handleRequest
  }
  
}