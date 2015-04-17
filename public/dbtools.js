
dbtools = (function () {
  var InsertData = function(data){
    database.serialize(function(){
      var dataArray = [];
      var objArray = Object.keys(data);
      var valueString = "", typeString = "";
      for(var i = 1; i < objArray.length; i++){
        if(i < objArray.length-1){
          valueString += "?, ";
          typeString = objArray[i] + ", ";
        }else{
          valueString += "?";
          typeString = objArray[i];
        }
        dataArray[dataArray.length] = data[objArray[i]];

      }
      console.log(typeString);
      console.log(valueString);
      console.log(dataArray);
      //Broken
      database.all("INSERT into event ("+typeString+") values("+valueString+" )", objArray);
    });
  };

  // CountTable Function: Takes a table (EventTable || UserLoginTable) and counts how many rows are in it.
  var CountTable = function(table){
    return db.all("SELECT count(*) FROM ?",table.type);
  }
  return {
    InsertData: InsertData,
    CountTable: CountTable
  };
})();

module.exports = dbtools;
