var Website = require('../models/Website.model');

exports.create = function(req, res) {
  var newWebsite = new Website();

  newWebsite.title = req.body.title;
  newWebsite.url = req.body.url;
  newWebsite.description = req.body.description;

  newWebsite.save(function(err, result) {
    if(err) {
      console.log('Error saving website')
    } else {
      console.log(result);
      res.status(200).end();
    }
  });
}

exports.searchResults = function(req, res) {
  var searchText = req.body.searchText;

  Website.search(searchText, {
    title: 1,
    description: 1,
    url: 1
  }, {
    conditions: {
      title: {
        $exists: true
      },
      description: {
        $exists: true
      },
      url: {
        $exists: true
      }
    },
    sort: {
      title: 1
    },
    limit: 10
  }, function(err, data) {
    if(err) {
      console.log('cant fetch results');
    } else {
      console.log(data.results);
      res.send(data.results);
    }
  });
}
