var express = require('express');
var router = express.Router();
const authen=require("../Models/authenticator");
const select_box = require('../Models/display_selectbox');
const display_table=require("../Models/product_display");
var delFunc= require('../Models/Delete');
var addProduct=require('../Models/Insert');
// Tao bien session
var session;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN Shop' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('login', { title: 'Login page',
                        message: 'ATN Shop',
                        notice: '' });
});
// logout
router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/')
})

router.post('/login', async function(req, res, next) {

  const username= req.body.username;
  const password= req.body.password;
  session=req.session;
  let [authenticated, shop_id, role] = await authen(username,password)
  

  if(authenticated==true && role == "shop")
  {
    session.user_id=username;
    session.shop_id=shop_id;
    res.redirect('/users')
  }
  else if (authenticated == true && role == "admin"){     
    session.user_id=username;
    res.redirect('/admin')
    
  }
  else
  {
    res.render('login', { title: 'Login page',
                        message: 'ATN Shop',
                         notice: 'Wrong username and password'});
  }
});




module.exports = router;
