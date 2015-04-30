/**
 * Created by Devyn on 4/23/2015.
 */
//Global Variables used on client or server.

var dbtools = require('../Utils/dbtools.js');

globalvars = (function (name) {

//Creates a new Database called usuevents.
    var usuevents = dbtools.CreateDatabase('usuevents');

//region ---Custom Constructors---

//UserData Constructor: takes firstname(string), lastname(string), username(string), password(string),confirmpassword(string), phone(string), email(string)
//and represents the data for a new table/date.
    function UserData(firstname, lastname, username, password, confirmpassword, phone, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.confirmpassword = confirmpassword;
        this.phone = phone;
        this.email = email;
        this.id = null;
    }

//EventData Constructor: takes name(string), startDate(string), starteTime(string), endDate(string), endTime(string), location(string), notes(string)
//and represents the data for a new table/data.
    function EventData(name, startDate, startTime, endDate, endTime, location, notes) {
        this.name = name;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.location = location;
        this.notes = notes;
        this.id = null;
    }

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
