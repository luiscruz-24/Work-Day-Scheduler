///

// "hour-9" is the key.

// var hourString = "hour-9"; //Loop "hour-"+i

// var fromStorage = localStorage.getItem("hour-9");

// console.log(fromStorage);

// $("#" + hourString).text(fromStorage);

//WHEN I open the planner THEN the current day is displayed at the top of the calendar

var today = moment();

$("#currentDay").text(today.format('dddd, MMMM Do'))

// Actual hour

var currentHr = moment().format('HH');

//Beginning Scheduler

var container = $('#scheduler')

// WHEN I scroll down THEN I am presented with timeblocks for standard business hours
for (var i = 9; i < 18; i++) {

    var task = $('<div>');
    task.attr('id', 'hour-' + i);
    task.addClass('row time-block');

    //WHEN I view the timeblocks for that day THEN each timeblock is color coded to indicate whether it is in the past, present, or future

    if (i < currentHr) {
        task.addClass('past')
    } else if (i > currentHr) {
        task.addClass('future')
    } else {
        task.addClass('present')
    }
    container.append(task);

    //Hours Format
    var hourFormat = $('<div>');
    hourFormat.text(moment(i, "H HH").format("hA"));
    hourFormat.addClass(' col-md-1 hour ');
    task.append(hourFormat);

    //WHEN I click into a timeblock THEN I can enter an event
    var text = $('<textarea>');
    text.addClass('col-md-10 col-11 description');
    var previousTask = JSON.parse(localStorage.getItem('hour-' + i));

    //WHEN I refresh the page THEN the saved events persist
    
    if (previousTask == null) {
        text.val("");
    } else {
        text.val(previousTask.task);
    }
    task.append(text);


    //Button

    var buttonSave = $('<button>');
    buttonSave.addClass('btn saveBtn col-md-1 col-1 fas fa-save');
    buttonSave.attr('id', 'btn-' + i);
    task.append(buttonSave);
}

//End Scheduler

//WHEN I click the save button for that timeblock THEN the text for that event is saved in local storage.

for (var i = 9; i < 18; i++) {
    $("#btn-" + i).click(function (event) {
        event.preventDefault();
        var div = $(this).parent().get(0).id
        var hr = $(this).attr('id');
        var textArea = $("#" + div).children("textarea").val();
        var hourTask = {
            hour: hr,
            task: textArea
        }
        localStorage.setItem(div, JSON.stringify(hourTask));

    });
};