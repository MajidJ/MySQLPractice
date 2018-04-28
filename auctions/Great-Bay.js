const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "greatBay_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as: " + connection.threadId);
  firstAsk();
});


const addNewItem = function(newItemName, newItemCategory, newItemBidPrice) {
  console.log("Adding some shit. Wait for it...")
  let query = connection.query(
      "INSERT INTO auctions SET ?", 
      {
        item_name: newItemName,
        category: newItemCategory,
        starting_bid: newItemBidPrice
      }, 
      function(err, res) {
          if (err) throw res;
          console.log(res.affectedRows + " got made!");
          connection.end();
      }
  )
};


const newItemInfo = function() {
  inquirer.prompt([
    {
      type: "type",
      message: "What's the name of the item?",
      name: "itemName"
    },
    {
      type: "type",
      message: "What's the category of the item?",
      name: "itemCategory"
    },
    {
      type: "type",
      message: "What's the starting bid price?",
      name: "startBidPrice"
    }]
  ).then(results => {
    addNewItem(results.itemName, results.itemCategory, results.startBidPrice);
  }).catch(err => {
    if (err) throw err;
  });
};

const showAllItems = function() {
  console.log("Here are all available items to bid on: ");
  connection.query(
    "SELECT * FROM auctions", function(err, res) {
      if (err) throw err;
      inquirer.prompt(
        {
          type: "list",
          message: "Choose from the available items to bid on:",
          choices: function() {
            let itemsArray = [];
            for (let i = 0; i < res.length; i++) {
              itemsArray.push(res[i].item_name);
            }
            return itemsArray;
          },
          name: "itemToBid"
        }
      ).then(results => {
        console.log(results.itemToBid);
      })
      connection.end();
    }
  )
};

const firstAsk = function() {
  inquirer.prompt(
    {
      type: "list",
      message: "'POST AN ITEM' or 'BID ON AN ITEM'",
      choices: ["Post", "Bid"],
      name: "postOrBid"
    }
  ).then(results => {
    if (results.postOrBid === "Post") {
      newItemInfo();
    } else {
      showAllItems();
    }
  }).catch(err => {
    if (err) throw err;
  });
};

