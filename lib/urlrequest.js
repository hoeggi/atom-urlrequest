(function() {
  var url = require('url');
  var request = require('request') ;


  module.exports = {
    activate: function() {
      return atom.workspaceView.command('urlrequest:get', (function(_this) {
        return function() {
          var editor = atom.workspace.getActiveEditor();
          if( !editor )return ;
          link = editor.getSelectedText() ;
          if (link == null || link === "") {
            editor.selectLine() ;
            link = editor.getSelectedText() ;
          }

          console.log(link) ;

          protocol = url.parse(link).protocol;
          if (protocol === 'http:' || protocol === 'https:') {
            request.get(link, function(err, res, body){
              editor.deleteToEndOfWord() ;
              editor.backspaceToBeginningOfWord() ;
              if(err) {
                editor.insertText("ERROR: ") ;
                editor.insertText(err.message) ;
                return ;
              }
              editor.insertText(body) ;
            }) ;
            return true ;
          }
        };
      })(this));
    }
  };
}).call(this);
