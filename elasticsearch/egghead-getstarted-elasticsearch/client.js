const ELASTICSEARCH = require('elasticsearch');

const ESCLUSTER = 'http://localhost:9200';

const CLIENT = new ELASTICSEARCH.Client({
  host: ESCLUSTER,
  apiVersion: '5.0'
});

CLIENT.get({
  index: 'simpsons',
  type: 'episode',
  id: 1,
  _sourceExclude: [
    'video_url',
    'number_in_season',
    'views'
  ]
})
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err);
  })