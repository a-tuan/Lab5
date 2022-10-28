var shop=require('./shopdata');
var product=require('./productdata');

async function table_string(shop_id){
    let shopData=await shop(shop_id)
    let productData= await product(shop_id)
    var table_row='';
    productData.forEach(product=>{
        table_row +=`
        <tr>
            td>${product.id}</td>
            td>${product.name}</td>
            td>${product.price}</td>
            td>${product.quantity}</td>
        </tr>`
    })

    var table_string=`
    <h1>Shop id: ${shopData.id}, Name: ${shopData.name}, Address: ${shopData.address}, Contact: ${shopData.contact}</h1>
    <h2> Product </h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
        ${table_row}
    </table>`

    return table_string

}
module.exports= table_string;