var express = require('express');
var router = express.Router();
var delFunc= require('../Models/Delete');
var update=require('../Models/Update')
var addProduct=require('../Models/Insert');
const display_table = require('../Models/product_display');
const { response } = require('express');
var session
/* GET users listing. */
router.get('/', async function(req, res, next) {
   session=req.session;
  if(session.user_id){
  let username=session.user_id
  let shop_id=session.shop_id
  let table_string= await display_table(shop_id)
    res.render('users', { title: 'USER PAGE', 
                        name: username,
                        table: table_string,
                       })
  }
  else{
    res.render('login', { title: 'Login page',
                        message: 'ATN Shop',
                         notice: 'Please sign in!'});
  }
});

router.post('/functions', async function(req, res, next){
  let id = req.body.id;
  let name=req.body.name
  let price=req.body.price
  let quantity=req.body.quantity
  let shop_id=req.body.shop_id
  if(req.body.btt=="delete") delFunc(id)
  else if(req.body.btt="update") update(id, name, price, quantity, shop_id)
  res.redirect('/users')
});

router.post('/addProduct', async function(req, res, next){
  let product_id=req.body.id
  let name=req.body.name
  let price=req.body.price
  let quantity=req.body.quantity
  let shop_id=req.body.shop_id
  addProduct(product_id, name, price, quantity, shop_id)
  let username=session.req.user_id
  res.redirect('/users')
});
module.exports = router;
