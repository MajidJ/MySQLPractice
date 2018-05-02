const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "top5000"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as: " + connection.threadId);
    typeOfSearch();
});


const typeOfSearch = function() {
    inquirer.prompt(
        {
            type: "list",
            message: "What search would you like to make?",
            choices: ["Search an artist", "Get repeat artists", "End Session"],
            name: "searchType"
        }
    ).then(results => {
        switch (results.searchType) {
            case "Search an artist":
                searchQuery();
                break;
            case "Get repeat artists":
                findRepeatArtists();
                break;
            case "End Session":
                console.log("Okay. Bye!");
                connection.end();
                break;
        }
    }).catch(err => {
      if (err) throw err;
    });
};

const searchQuery = function() {
    inquirer.prompt(
        {
            type: "type",
            message: "Search an artist name:",
            name: "artistToSearch"
        }
    ).then(results => {
      getResults(results.artistToSearch);
    }).catch(err => {
      if (err) throw err;
    });
};

const getResults = function(artist) {
    connection.query("SELECT * FROM top5000", function(err, res) {
        if (err) throw err;
        let hitCount = 0;
        res.map(function(elem) {
            if (elem.artist === artist) {
                hitCount++;
                console.log(`${hitCount}. ${elem.title} by ${elem.artist}`);
            }
        });
        console.log(`There were ${hitCount} hits!`);
        typeOfSearch();
    });

}

const findRepeatArtists = function() {
    connection.query("SELECT artist FROM top5000 GROUP BY artist HAVING COUNT( DISTINCT title ) > 1", function(err, res) {
        if (err) throw err;
        let hitCount = 0;
        res.map(function(elem) {
            hitCount++;
            console.log(`${hitCount}. ${elem.artist}`);
        });
        console.log(`There were ${hitCount} hits!`);
        typeOfSearch();
    })
}




