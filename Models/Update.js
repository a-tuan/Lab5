var pg_conn=require("./pg.config")
async function update(id,name,price,quantity,shop_id){
    var update_query = 
        {
            text: `UPDATE products SET id=$1, name= $2, price= $3, quantity= $4, shop_id= $5 WHERE id = $1`,
            values: [id, name, price, quantity, shop_id]
        }; 
    try{
    var update_data = await pg_conn.query(update_query);
    console.log(update_data)
    }catch(err){

    }
    
}
module.exports = update;