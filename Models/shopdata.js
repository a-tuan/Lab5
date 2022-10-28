var pg_conn=require("./pg.config");

async function shopData(shop_id){
    var authenticated = false;
    const acc_query=
    {
        text: 'SELECT * FROM shops WHERE id=$1',
        values: [shop_id]
    };
    var query_data = await pg_conn.query(acc_query);
    console.log(query_data.rows[0]);
    return [authenticated,shop_id];
}


module.exports = shopData;