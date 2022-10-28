var pg_conn=require("./pg.config");

async function productData(shop_id){
    const acc_query=
    {
        text: 'SELECT * FROM products WHERE shop_id=$1',
        values: [shop_id]
    };
    var query_data = await pg_conn.query(acc_query);
    return [authenticated,shop_id];
}


module.exports = productData;