var pg_conn = require("./pg.config");
async function select_box(id){
    var shop_query = `SELECT shops.name, shops.id FROM\
                     shops JOIN users on users.shop_id = shops.id WHERE users.role = 'shop'`;
    // var shop_query= `select * from shops`;
    var data = await pg_conn.query(shop_query);
    let num_shops = data.rowCount;
    let box_string = 
     `<form action="/admin/select_shop" method="post">
      <label for="shop">Choose a shop:</label>
      <select name="shop_name" id="shop_name">
      <option value="0" selected>All Shops</option>`;     
    for (let i=0; i<num_shops; i++) 
    {
        let shop_name = data.rows[i].name;
        let shop_id = data.rows[i].id;
        if(id==shop_id){
        box_string += `<option value=${shop_id} selected>${shop_name}</option>`}
        else
        {box_string += `<option value=${shop_id}>${shop_name}</option>`}
    }
    box_string += 
    `</select>
    <button type="submit" value="select_shop">View</button>
    </form>`;
    return box_string;
}

module.exports = select_box;