['settings', 'save_manager', 'content_file_manager'].forEach(function (path) {
    var module = require('./' + path);
    for (var i in module) {
      exports[i] = module[i];
    }
});
