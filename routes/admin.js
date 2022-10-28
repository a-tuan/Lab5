var express = require('express');
var router = express.Router();
const select_box = require('../Models/display_selectbox');
const display_table=require("../Models/admin_table");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let session=req.session;
  if(session.user_id) {
  var select_box_string= await select_box();
  let table_string= await display_table(0);
  res.render('admin', { title: 'ADMIN PAGE', name: req.body.username,
                        name: 'Director',
                        box: select_box_string, 
                        table: table_string })
  }
  else{
    res.render('login', { title: 'Login page',
                          message: 'ATN Shop',
                          notice: 'Please sign in!'})
  }

});

router.post('/select_shop',async function(req,res,next){
  let shop_id=req.body.shop_name;
  var select_box_string= await select_box(shop_id);
  let table_string2= await display_table(shop_id)
  res.render('admin', { title: 'ADMIN PAGE', 
                        name: 'Director',
                        box: select_box_string,
                        table: table_string2  })
})

module.exports = router;