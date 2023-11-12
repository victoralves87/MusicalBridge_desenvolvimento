const mysql = require("mysql2/promise");

const usuario = mysql.createPool(process.env.CONNECTION_STRING);


 async function selectCustomers(){

    const results = await usuario.query("select * from usuarios");
    return results[0];
}


function selectCustomer(id){

    return customers.find(c => c.id === id);
}


function insertCustomer(customer){

    customers.push(customer);
}


function updateCustomer(id, customerData){
    const customer = customers.find(c => c.id === id);
    if (!customer) return;
    customer.nome = customerData.nome;  // Correção aqui
    customer.idade = customerData.idade;  // Correção aqui
    customer.email = customerData.email;
    customer.senha = customerData.senha;
}


function deleteCustomer(id){

    const index = customers.findIndex(c => c.id ===  id);
    customers.splice(index, 1);
}



module.exports = {
    
    selectCustomers,
    selectCustomer, 
    insertCustomer,
    updateCustomer,
    deleteCustomer
}