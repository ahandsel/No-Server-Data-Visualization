(function () {
  'use strict';

  var url = "https://xkcd.com/327/info.0.json";

  kintone.events.on('app.record.index.show', function (event) {
    kintone.proxy(url, 'GET', {}, {}, function (success) {
      var jsonResponse = JSON.parse(success);
      console.log(jsonResponse);
      window.open(jsonResponse.img, "", "width=800, height=200, top=200");
    }, function (error) {
      console.log(error);
    });
    return event;
  });
})();