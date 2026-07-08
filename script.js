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
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };


    transactions.push(transaction);


    saveTransactions();

    alert("Transaction Added!");

    location.reload();
}



// Save data
function saveTransactions(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}



// Update dashboard totals
function updateDashboard(){

    let income = 0;
    let expenses = 0;


    transactions.forEach(transaction => {

        if(transaction.type === "income"){
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



// Show transactions with edit buttons
function showTransactions(){

    let list =
    document.getElementById("list");


    if(!list) return;


    list.innerHTML="";


    transactions.forEach(transaction => {


        let item =
        document.createElement("li");


        item.innerHTML = `

        ${transaction.description}:
        $${transaction.amount}
        (${transaction.type})

        <button onclick="editTransaction(${transaction.id})">
        Edit
        </button>

        <button onclick="deleteTransaction(${transaction.id})">
        Delete
        </button>

        `;


        list.appendChild(item);


    });

}



// Edit transaction
function editTransaction(id){


    let transaction =
    transactions.find(t => t.id === id);



    let newDescription =
    prompt(
    "Change description:",
    transaction.description
    );


    let newAmount =
    prompt(
    "Change amount:",
    transaction.amount
    );


    let newType =
    prompt(
    "Change type (income/expense):",
    transaction.type
    );



    transaction.description =
    newDescription;


    transaction.amount =
    Number(newAmount);


    transaction.type =
    newType;



    saveTransactions();

    location.reload();

}



// Delete transaction
function deleteTransaction(id){


    transactions =
    transactions.filter(
        transaction => transaction.id !== id
    );


    saveTransactions();

    location.reload();

}



// Load pages

if(document.getElementById("balance")){

    updateDashboard();

}


showTransactions();

}


showTransactions();
