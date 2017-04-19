module.exports = function(){
  
  var NAME_DELIM = "_"
  var NAMES_DELIM = "|"

  function joinName(obj){
    return [
      obj.lastname,
      obj.forename,
      obj.initials
    ].join(NAME_DELIM)
  }

  this.getKey = function(name1, name2){
    return [ 
      joinName(name1),
      joinName(name2)
    ].sort().join(NAMES_DELIM)
  }
  
}
