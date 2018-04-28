let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "musicDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
//   afterConnection();
//   connection.end();
    createSong();
});

const createSong = function() {
    console.log("Creating some shit. Wait for it...")
    let query = connection.query(
        "INSERT INTO music_info SET ?", 
        {
            title: "Basic",
            artist: "The Bros",
            genre: "Pop"
        }, 
        function(err, res) {
            if (err) throw res;
            console.log(res.affectedRows + " got made!");

            updateRow();
        }
    )
}


const updateRow = function() {
    console.log("Updating that old shit. Hold up...")
    let query = connection.query(
        "UPDATE music_info SET ? WHERE ?",
        [
            {
                genre: "Rave"
            }, 
            {
                title: "Hate"
            }
        ], 
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " got updated!");

            deleteRow();
        }

    )
}

const deleteRow = function() {
    console.log("Out of here!");
    let query = connection.query(
        "DELETE FROM music_info WHERE ?",
        {
            title: "Pancakes"
        }, 
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " rows are gone!");

            afterConnection();
        }
    )
}


// READ
const afterConnection = function() {
    connection.query("SELECT * FROM music_info", function(err, res) {
        if (err) throw err;
        console.log(res);
    })
    connection.end();
}




