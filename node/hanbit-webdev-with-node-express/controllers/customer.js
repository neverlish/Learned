var Customer = require('../models/customer.js');
var customerViewModel = require('../viewModels/customer.js');

exports = {
  registerRoutes: function(app) {
    app.get('/customer/:id', this.home);
    app.get('/customer/:id/preferences', this.preferences);
    app.get('/orders/:id', this.orders);

    app.post('/customer/:id/update', this.ajaxUpdate);
  },

  home: function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if(err) return next(err);
      if(!customer) return next(); // 404 핸들러로 전달
      customer.getOrders(function(err, orders) {
        if(err) return next(err);
        res.render('customer/home', customerViewModel(customer, orders));
      });
    });
  },

  preferences: function(req, res, nexts) {
    Customer.findById(req.params.id, function(err, customer) {
      if(err) return next(err);
      if(!customer) return next(); // 404 핸들러로 전달
      customer.getOrders(function(err, orders) {
        if(err) return next(err);
        res.render('customer/preferences', customerViewModel(customer, orders));
      });
    });
  },

  orders: function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if(err) return next(err);
      if(!customer) return next(); // 404 핸들러로 전달
      customer.getOrders(function(err, orders) {
        if(err) return next(err);
        res.render('customer/preferences', customerViewModel(customer, orders));
      });
    });
  },

  ajaxUpdate: function(req, res, next) {
    Customer.findById(req.params.id, function(err, customer) {
      if(err) return next(err);
      if(!customer) return next(); // 404 핸들러로 전달
      if(req.body.firstName) {
        if(typeof req.body.firstName !== 'string' || req.body.firstName.trim() === '')
          return res.json({error: 'Invalid name.'});
        customer.firstName = req.body.firstName;
      }
      // 기타 등등..
      customer.save(function(err) {
        return err ?
          res.json({ error: 'Unable to update customer.' }) :
          res.json({ success: true });
      });
    });
  },
};
