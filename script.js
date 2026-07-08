let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];


// Add transaction

function addTransaction(){

    let description =
    document.getElementById("description").value;


    let amount =
    Number(document.getElementById("amount").value);


    let type =
    document.getElementById("type").value;



    let transaction = {

        description: description,
        amount: amount,
        type: type

    };


    transactions.push(transaction);


    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


    alert("Transaction Added!");

    location.reload();

}



// Calculate totals

function updateDashboard(){

    let income = 0;
    let expenses = 0;


    transactions.forEach(transaction=>{


        if(transaction.type==="income"){

            income += transaction.amount;

        }

        else{

            expenses += transaction.amount;

        }


    });



    let balance = income - expenses;



    document.getElementById("income").innerHTML =
    "$" + income.toFixed(2);


    document.getElementById("expenses").innerHTML =
    "$" + expenses.toFixed(2);


    document.getElementById("balance").innerHTML =
    "$" + balance.toFixed(2);

}



// Display transaction history

function showTransactions(){


let list =
document.getElementById("list");


if(!list) return;



list.innerHTML="";


transactions.forEach(transaction=>{


let item =
document.createElement("li");


item.innerHTML =
`${transaction.description}: $${transaction.amount} (${transaction.type})`;


list.appendChild(item);



});


}



// Automatically update pages

if(document.getElementById("balance")){

updateDashboard();

}


showTransactions();