var pg_conn=require("./pg.config");


async function display_table(shop_id){
    if(shop_id==0){
        var product_query='SELECT * FROM products ORDER BY id'
    }
    else{
        var product_query=
        {
            text: 'SELECT * FROM products WHERE shop_id=$1 ORDER BY id',
            values: [shop_id]
        };
    }
    var data= await pg_conn.query(product_query);
    var table_string=`
    <h2> Product of shop ${shop_id}</h2>
        <table style="width: 100%;" border="1">
        <tr>`
    let num_fields=data.fields.length;
    let num_rows=data.rowCount;
    const list_fields= [];
    // Display table header(list of fields name)
    for(let i=0; i<num_fields;i++)
    {
        let fields_name=data.fields[i].name;
        list_fields.push(fields_name);
        table_string += `<th>${fields_name}</th>`
    }
    table_string +=`<th>function</th></tr>`
    // display all row
    for(let i=0;i<num_rows;i++)
    {
        table_string +=`<tr>
                        <form action="/users/functions" method="post">`;
        // display all cell
        for(let j=0; j<num_fields;j++)
        {
            let cell=data.rows[i][list_fields[j]]
            let fields_name=data.fields[j].name
            table_string+=`<td><input name=${fields_name} value=${cell}></td>`
        }
        table_string +=`
        <td style="display:flex">
        <button name="btt" type="submit" value="delete">Delete</button>
        <button name="btt" type="submit" value"update">Update</button>
        </td>
        </form>
        </tr>`
    }
    // thêm dòng insert
    table_string +=`<form action="/users/addProduct" method="post">
        <tr>`
    for(let j=0; j<num_fields;j++)
        {
            let fields_name=data.fields[j].name
            table_string += `<td><input name=${fields_name} id=${fields_name}></td>`;
        }
    table_string +=`
        <td>
        <button type="submit" value="addProduct">Insert</button>
        </td>
        </tr>
        </form>
        </table>`;
    
    return table_string;
}

module.exports=display_table
