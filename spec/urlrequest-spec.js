(function() {

  var WorkspaceView = require('atom').WorkspaceView;

  var request = require('request');

  describe("urlrequest package", function() {
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-gfm');
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-javascript');
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-hyperlink');
      });
      atom.workspaceView = new WorkspaceView;
      atom.workspace = atom.workspaceView.model;
      return waitsForPromise(function() {
        return atom.packages.activatePackage('urlrequest');
      });
    });
    return describe("when the cursor is on a link", function() {
      it("perform a get request on the link using the 'get' command", function() {
        var editor, editorView;
        atom.workspaceView.openSync('sample.js');
        editorView = atom.workspaceView.getActiveView();
        editor = editorView.editor;
        editor.setText("http://notyce.net/urlrequest.html");
        spyOn(request, 'get');
        editorView.trigger('urlrequest:get');
        expect(request.get).toHaveBeenCalled();
        expect(request.get.argsForCall[0][0]).toBe('http://notyce.net/urlrequest.html');
        return
      });
      return it("does not open non http/https links", function() {
        var editor, editorView;
        atom.workspaceView.openSync('sample.js');
        editorView = atom.workspaceView.getActiveView();
        editor = editorView.editor;
        editor.setText("// ftp://github.com\n");
        spyOn(request, 'get');
        editorView.trigger('urlrequest:get');
        expect(request.get).not.toHaveBeenCalled();
        editor.setCursorBufferPosition([0, 5]);
        editorView.trigger('urlrequest:get');
        return expect(request.get).not.toHaveBeenCalled();
      });
    });
  });


}).call(this);
