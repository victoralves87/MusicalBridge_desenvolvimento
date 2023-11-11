const customers = [{

    id: 1,
    nome: "victor",
    idade:19,
    email:"victoralves",
    senha:123456

}];


function selectCustomers(){

    return customers;
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