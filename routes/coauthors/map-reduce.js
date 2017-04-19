module.exports = new function(){
  
  this.map = function() {

    var KeyGenerator = function(){
      var NAME_DELIM = '_'
      var NAMES_DELIM = '|'

      function joinName(obj){
        return [obj.lastname, obj.forename, obj.initials ].join(NAME_DELIM)
      }

      this.getKey = function(name1, name2){
        return [ joinName(name1), joinName(name2)].sort().join(NAMES_DELIM)
      }
    }

    var keyGen = new KeyGenerator();

    var authors = this.authors;
    
    for(var i = 0 ; i < authors.length; i++){
      for(var j = i; j < authors.length; j++){
          var key = keyGen.getKey(authors[i], authors[j])
          emit(key, this._id.toString())
      }
    }
  }

  this.reduce = function(key, titles) {
    var TITLE_DELIM = '-----'
    
    return titles.join(TITLE_DELIM)
  }

  this.finalize = function (key, reducedVal) {
    var TITLE_DELIM = '-----'
    
    var titles = reducedVal.split(TITLE_DELIM)
    return titles.length
  }

  this.convertResult = function(coauthors){
    var map = {};
        
    for(var i=0; i<coauthors.length; i++){
      var coauthor = coauthors[i];
      map[coauthor['_id']] = coauthor['value']
    }
    return map;
  }

  this.out = 'coauthors'

}()