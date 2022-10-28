const { cache } = require('ejs');
var pg_conn= require('./pg.config')
async function addProduct(id, name, price, quantity, shop_id){
    const ins_query=
    {
        text: 'INSERT INTO products (id,name,price, quantity, shop_id) VALUES($1, $2, $3, $4, $5)',
        values: [id, name, price, quantity, shop_id]
    }
    try{
    var query_data=await pg_conn.query(ins_query)
    } catch(err){
        console.error(err);
    }
}
module.exports=addProduct;