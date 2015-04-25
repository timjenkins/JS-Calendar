var today = new Date();

var currentDate = new Object();

currentDate.year = today.getFullYear();
currentDate.month = today.getMonth();
currentDate.day = today.getDay();
currentDate.monthDate = new Date(currentDate.year, currentDate.month, 1);


var calendarThing = {

  daysInMonth: function(year,month) {
     return new Date(year, (month + 1), 0).getDate();
  },

  setDate: function(newdate){
    currentDate.year = newdate.getFullYear();
    currentDate.month = newdate.getMonth();
    currentDate.monthDate = new Date(currentDate.year, currentDate.month, 1);
  },



  // Inject currently selected day information into Day View
  buildDay: function(date){
    var selectedDay = date;
    document.getElementById("day").innerHTML = selectedDay.getDate();

    document.getElementById("day-monthname").innerHTML=
      selectedDay.toLocaleString("en-us", {month: "long"})
    ;
  },


  // Build the month view (calendar) based on selected date
  buildMonth: function(date){
    calendarThing.setDate(date);
    monthLength = calendarThing.daysInMonth(currentDate.year, currentDate.month);

    var daysArray = [];
    var calendarHtml = "";
    var firstDay = currentDate.monthDate.getDay();

    document.getElementById("month-monthname").innerHTML=
      date.toLocaleString("en-us", {month: "long"})
    ;

    for (var i = 0; i < firstDay; i++){
      daysArray.push('');
    }

    for (var i = 1; i <= monthLength; i++){
      daysArray.push(i);
    }

    while (daysArray.length < 42){
      daysArray.push('');
    }


    for (var i = 0; i < daysArray.length; i++){
      if ((i + 1) % 7 == 0){
        calendarHtml += '<a href="#" class="month-day">' + daysArray[i] + '</a></div>';
      } else if ((i + 1) % 7 == 1 ){
        calendarHtml += '<div class="week"><a href="#" class="month-day">' + daysArray[i] + '</a>';
      } else {
        calendarHtml += '<a href="#" class="month-day">' + daysArray[i] + '</a>';
      }
    }

    document.getElementById("calendar-body").innerHTML = calendarHtml;
    
  },


  // Set month and month view to next month
  nextMonth: function(){
    currentDate.month += 1;
    nextMonth = new Date(currentDate.year, currentDate.month, currentDate.day);
    calendarThing.buildMonth(nextMonth);
  },

  // Set month and month view to previous month
  prevMonth: function(){
    currentDate.month -= 1;
    nextMonth = new Date(currentDate.year, currentDate.month, currentDate.day);
    calendarThing.buildMonth(nextMonth);
  },

  // Change the selected day and update the day view to reflect change. 
  changeDay: function(e)
  {
      e = e || window.event;
      var target = e.target || e.srcElement;
      if (target.className.match(/month-day/))
      {
          var dayNumber = target.innerHTML;
          console.log("clicked day " + dayNumber);

          today = new Date(currentDate.year, currentDate.month, dayNumber);
          calendarThing.buildDay(today);
      }
  },

  // Bind Calendar Controls to proper functionality
  bindControls: function(){

    // Advance to next month
    document.getElementById("next-month").addEventListener('click', calendarThing.nextMonth, false);

    // Go to previous month
    document.getElementById("prev-month").addEventListener('click', calendarThing.prevMonth, false);

    // Change selected day
    document.getElementById("calendar-body").addEventListener('click',calendarThing.changeDay,false);
  },

  // Build Calendar
  init: function(){
    calendarThing.bindControls();
    calendarThing.buildDay(today);
    calendarThing.buildMonth(today);
  }
}

calendarThing.init();