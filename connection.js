const mysql = require("mysql");
var inquirer = require("inquirer");

//---------------create the connection information for the sql database---------------------
const connection = mysql.createConnection({
  host: "",
  port: 3306,
  user: "OnTheRocks",
  password: "OnTheRocks",
  database: "hammer"
})

//--------------------connect to the mysql server and sql database--------------------------------------
connection.connect(function(err) {
  if(err) {
    console.error("Error Connecting: " + err.stack);
    return;
  }
    console.log("Connected as id " + connection.threadId);

      //---------------run the start function after the connection is made to prompt the user-------------------------------
    start();

});

//-------------------Intial prompt to user----------------------------------
start = () => {
  inquirer
    .prompt({
      name: "Main",
      type: "list",
      message: "Make a selection.",
      choices: [
        "Customers",
        "Tickets",
        "Materials",
        "Add new customer",
        "Add new ticket",
        "Exit"
      ]
    })

    .then(function(answer) {
      switch (answer.Main) {
        case "Customers":
          customers();
          // queryAllCustomers();
          break;
        
        case "Tickets":
          queryAllTickets();
          break;
        
        case "Materials":
          queryAllMaterials();
          break;

        case "Add new customer":
          queryAddCustomer();
          break;

        case "Add new ticket":
          queryAddTicket();
          break;

        case "Exit":

          console.log("Have a nice day.");
          connection.end();
          process.exit
      }
    });
};

//----------------------------------------Customers----------------------------------
customers = () => {
  inquirer
  .prompt({
    name: "customer",
    type: "list",
    message: "Make a selection.",
    choices: [
      "List existing customers",
      "Select existing customer",
      "Add new customer",
      "Main menu",
      "Exit"
    ]
  })

  .then(function(answer) {
    switch (answer.customer) {
      case "List existing customers":
        queryAllCustomers();
        break;
      
      case "Select existing customer":
        querySelectCustomer();
        break;
      
      case "Add new customer":
        queryAddCustomer();
        break;

      case "Main menu":
        start();
        break;

      case "Exit":

        console.log("Have a nice day.");
        connection.end();
        process.exit
    }
  });
};

//----------------------------------------List all Customers----------------------------------
queryAllCustomers = () => {
  connection.query("SELECT * FROM customers", function(err, res) {
    if(err) throw err;
    const names = res.map(a => a.custName);
    console.log(names);
    console.log(names[1]);
    console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>") 
    customers();   
  });
};



//----------------------------------------Select Customer ----------------------------------
querySelectCustomer = () => {
  connection.query("SELECT * FROM customers", function(err, res) {
    if(err) throw err;
    const data = res;
    const names = res.map(a => a.custName);

    inquirer
    .prompt({
      name: "selectCustomer",
      type: "list",
      message: "Make a selection.",
      choices: names
    })

 
    .then(function(answer) {

        for (i = 0; i < names.length; i++) {

          switch (answer.selectCustomer) {
          case names[i]:
            console.log(data[i]);

            inquirer
            .prompt({
              name: "custOptions",
              type: "list",
              message: "Make a selection.",
              choices: [
                "Edit customer",
                "Delete customer",
                "Main Menu",
                "Exit"
              ]
            })

            .then(function(answer) {
              switch (answer.custOptions) {
                case "Edit customer":
                  queryAllCustomers();
                  break;
                
                case "Delete customer":
                  queryDeleteCustomer();
                  break;

                case "Main Menu":
                  start();
                  break;
          
                case "Exit":
          
                  console.log("Have a nice day.");
                  connection.end();
                  process.exit
              }
            });

            queryDeleteCustomer = () => {
              
              connection.query("DELETE FROM customers WHERE custName = @names", function(err, res) {
                if(err) throw err;
                console.log(names[i], "has been deleted from the database.");
                console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>") 
                start();   
              });
            };
            
          }}
        });
        
      });
    }


  


//----------------------------------------List all Tickets----------------------------------
queryAllTickets = () => {
  connection.query("SELECT t.ticketNo, t.submission_date date, c.custName, t.locationName, t.materialId, t.grossWeight, t.emptyWeight tareWeight, t.grossWeight-t.emptyWeight netWeight FROM customers c INNER JOIN tickets t ON c.custID = t.custId;", function(err, res) {
    if(err) throw err;
    console.log(res);
    console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>") 
    start();   
  });
};

//----------------------------------------List all Materials----------------------------------
queryAllMaterials = () => {
  connection.query("SELECT * FROM materials", function(err, res) {
    if(err) throw err;
    console.log(res);
    console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>") 
    start();   
  });
};

//----------------------------------------Add Customer----------------------------------
queryAddCustomer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "custName",
        message: "Customer's name?",
      },
      {
        type: "input",
        name: "custStreet",
        message: "Customer's address?",
      },
      {
        type: "input",
        name: "custCity",
        message: "Customer's city?",
      },
      {
        type: "input",
        name: "custState",
        message: "Customer's state?",
      },
      {
        type: "input",
        name: "custZip",
        message: "Customer's zipcode?",
      },
      {
        type: "input",
        name: "custNotes",
        message: "Notes?",
      },
      
    ])
    .then(function(answer) {
    connection.query("INSERT INTO customers set ?", 
      {
        custName: answer.custName,
        custStreet: answer.custStreet,
        custCity: answer.custCity,
        custState: answer.custState,
        custZip: answer.custZip,
        custNotes: answer.custNotes,
      },

      function(err, res) {
        console.log("------------------------------------------------------------------------------------------------");
      if(err) throw err;
      console.log("------------------------------------------------------------------------------------------------");
      console.log(res);
      console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>") 
      start();   
    });
})}

//----------------------------------------Add Ticket----------------------------------
queryAddTicket = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "ticketNo",
        message: "Ticket #?",
      },
      {
        type: "input",
        name: "custId",
        message: "Customer ID?",
      },
      {
        type: "input",
        name: "locationName",
        message: "Location?",
      },
      {
        type: "input",
        name: "deliverStreet",
        message: "Delivery Street?",
      },
      {
        type: "input",
        name: "deliverCity",
        message: "Delivery City?",
      },
      {
        type: "input",
        name: "deliverState",
        message: "Delivery State?",
      },
      {
        type: "input",
        name: "deliverZip",
        message: "Delivery zipcode?",
      },
      {
        type: "input",
        name: "materialId",
        message: "Material ID?",
      },
      {
        type: "input",
        name: "grossWeight",
        message: "Gross Weight?",
      },
      {
        type: "input",
        name: "emptyWeight",
        message: "Tare Weight?",
      },
      {
        type: "input",
        name: "deliverNotes",
        message: "Notes?",
      },
      
    ])
    .then(function(answer) {
    connection.query("INSERT INTO tickets set ?", 
      {
        ticketNo: answer.ticketNo,
        custId: answer.custId,
        locationName: answer.locationName,
        deliverStreet: answer.deliverStreet,
        deliverCity: answer.deliverCity,
        deliverState: answer.deliverState,
        deliverZip: answer.deliverZip,
        materialId: answer.materialId,
        grossWeight: answer.grossWeight,
        emptyWeight: answer.emptyWeight,
        deliverNotes: answer.deliverNotes,
      },
      function(err, res) {
      if(err) throw err;
      console.log(res);
      console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>") 
      start();   
    });
})}

endConnection = () => {
  connection.end();
}

module.exports = connection;