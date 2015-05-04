/* Purpose: This is a module that provides all of the constructors/variables used within the project
 *
 * Special Notes: N/A
 *
 * Author: Devyn Cyphers; Devcon
 */
var dbtools = require('../Utils/dbtools');

globalvars = (function () {

//Creates a new Database called usuevents.
    var usuevents = dbtools.CreateDatabase('usuevents');

//region ---Custom Constructors---

//UserData Constructor: takes firstname(string), lastname(string), username(string), password(string),confirmpassword(string), phone(string), email(string)
//and represents the data for a new table/date.
    var UserData = function(firstname, lastname, username, password, confirmpassword, phone, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.confirmpassword = confirmpassword;
        this.phone = phone;
        this.email = email;
        //this.id = null; -- this id is created automatically by the database
    };

//EventData Constructor: takes title(string), startDate(string), starteTime(string), endDate(string), endTime(string), location(string), notes(string)
//and represents the data for a new table/data.
    var EventData = function(title, startDate, startTime, endDate, endTime, location, notes) {
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.location = location;
        this.notes = notes;
        //this.id = null; -- this id is created automatically by the database
    };

//Inherit DBData for UserData/EventData.
    UserData.prototype = new dbtools.DBData(usuevents, 'userLogin');
    EventData.prototype = new dbtools.DBData(usuevents, 'event');

//endregion

    return {
        usuevents: usuevents,
        UserData: UserData,
        EventData: EventData
    };
})();

module.exports = globalvars;
