var redis = require('redis'),
    config = require('../config'),
    client = redis.createClient(config.redisPort, config.redisHost);

exports.client = client;
