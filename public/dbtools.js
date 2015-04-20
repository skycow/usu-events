var sqlite3 = require('sqlite3').verbose();

//region ReadMe/HowTo
// HowTO: Coming soon...
//endregion

dbtools = (function (name) {
  // NOTE: pending removal
  function CreateDatabaseee(){
    // Create database if it doesn't exist.
    // NOTE: This is only a SQLite3 Database, we may want to
    // change to PostgreSQL at a later time.
    name = new sqlite3.Database(name+'.db');
    database.serialize(function() {

      //database.run("CREATE TABLE if not exists user_login (UserID INTEGER PRIMARY KEY,Username TEXT,Password TEXT,Interests TEXT)");
      //database.run("CREATE TABLE if not exists event (EventID INTEGER PRIMARY KEY,Name BLOB,Start_Date BLOB,Start_Time BLOB,End_Date BLOB,End_Time BLOB,Location BLOB,Notes BLOB)");
      //database.run("CREATE TABLE if not exists event_owner (EventID INTEGER, Owner INTEGER, FOREIGN KEY(EventID) REFERENCES event(EventID),FOREIGN KEY(Owner) REFERENCES user(UserID))");

    });
  }

  //CreateDatabase function: takes name(string) and returns a new database.
  function CreateDatabase(name){
    return new sqlite3.Database(name+'.db');
  }

  //CreateTable function: Takes dbData(DBData) and adds a new table to the database specified.
  function CreateTable(dbData){
    var valueString = "";
    var values = Object.keys(dbData);
    for(var key in values){
      if(key == values.length-1){
        valueString += values[key]+" "+dbData[values[key]];
      }else{
        valueString += values[key]+" "+dbData[values[key]]+", ";
      }
    }
    dbData.database.serialize(function() {
      dbData.database.run("CREATE TABLE if not exists "+dbData.table+" (ID INTEGER PRIMARY KEY, "+valueString+")");
    });
  }

  //InsertData function: Takes dbData(DBData) and inserts it into the specified table.
  function InsertData(dbData){
    var valueArray = [], dataArray = [];
    var values = Object.keys(dbData);
    for(var key in values){
      valueArray[valueArray.length] = values[key];
      dataArray[dataArray.length] = dbData[values[key]];
    }
    dbData.database.serialize(function(){
      dbData.database.run("INSERT INTO "+dbData.table+" ("+valueArray+") VALUES ("+JSON.stringify(dataArray).replace(/^\[|]$/g, '')+")");
    });
  }

  //DBData Constructor: takes database(sqlite3.Database) and table(string)
  //Parent class for Data constructors.
  DBData = function(database, table){
    this.database = database;
    this.table = table;
  };

  return {
    CreateDatabase: CreateDatabase,
    CreateTable: CreateTable,
    InsertData: InsertData,
    DBData: DBData
  };
})();

module.exports = dbtools;