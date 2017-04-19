module.exports = function(res, filename){
	
  function render(obj){
    res.render(filename, obj)
  }

  return {
    render : render
  }
}