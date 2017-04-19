module.exports = function(res){
	
  function render(obj){
    res.json(obj)
  }
  
  return {
    render : render
  }
}