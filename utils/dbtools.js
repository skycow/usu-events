var sqlite3 = require('sqlite3').verbose();

dbtools = (function () {

  //CreateDatabase function: takes name(string) and returns a new database.
  //Usage: dbtools.CreateDatabase('thisName');
  function CreateDatabase(name){
    return new sqlite3.Database(name+'.db');
  }

  //CreateTable function: Takes dbData(DBData) and adds a new table to the database specified.
  //Usage: bdtools.CreateTable(thisEmptyData);
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
  //Usage: dbtools.InsertData(thisData);
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

  //SelectData function: Takes id(number), database(sqlite3.database), table(string), and a callback function to pull data from the specified table/database at the specified id.
  //Usage: dbtools.SelectData(1, thisDatabase, thisTable, function(object) { use 'object' here ];
  function SelectData(id, database, table, callback) {
    var rowData = [];
    database.get("SELECT * FROM "+table+" WHERE ID = "+id+"", function(err, row){
      if(!err) {
        var rowKeys = Object.keys(row);
        for (var keys in rowKeys) {
          rowData[rowData.length] = row[rowKeys[keys]];
        }
        callback(rowData);
      }
    });
  }

  //SetData function: takes dbData(DBData) and sets the data located at its id to this new set.
  //Usage: dbtools.setData(thisData);
  function SetData(dbData){
    var valueArray = [], dataArray = [], finalArray = [];
    var values = Object.keys(dbData);
    for(var key in values){
      valueArray[valueArray.length] = values[key];
      dataArray[dataArray.length] = dbData[values[key]];
    }
    for(var key in dataArray){
      finalArray[finalArray.length] = valueArray[key] +'= '+ JSON.stringify(dataArray[key]).replace(/^\[|]$/g, '');
    }
    console.log(finalArray.toString());
    dbData.database.serialize(function(){
      dbData.database.run("UPDATE "+dbData.table+" SET "+finalArray.toString()+" WHERE ID = "+dbData.id+"");
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
    SelectData: SelectData,
    SetData: SetData,
    DBData: DBData
  };
})();

module.exports = dbtools;
