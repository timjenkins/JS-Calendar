var Calendar = function(e){
  
  this.contElement = e;

  this.today = new Date(); 
  
  this.currentDate = new Object();
  this.currentDate.year = this.today.getFullYear();
  this.currentDate.month = this.today.getMonth();
  this.currentDate.day = this.today.getDay();
  this.currentDate.monthDate = new Date(this.currentDate.year, this.currentDate.month, 1);
  
  var ca = this;



  // Set date to new one
  this.setDate = function(newdate){
    ca.currentDate.year = newdate.getFullYear();
    ca.currentDate.month = newdate.getMonth();
    ca.currentDate.monthDate = new Date(ca.currentDate.year, ca.currentDate.month, 1);
  };


  // Inject currently selected day information into Day View
  this.buildDay = function(date){
    var selectedDay = date;
    ca.contElement.querySelector("#day").innerHTML = selectedDay.getDate();
    ca.contElement.querySelector("#day-monthname").innerHTML = ca.getMonthName(date);
  };


  // Build the month view (calendar) based on selected date
  this.buildMonth = function(date){
    ca.setDate(date);
    monthLength = ca.daysInMonth(ca.currentDate.year, ca.currentDate.month);

    var daysArray = [];
    var calendarHtml = "";
    var firstDay = ca.currentDate.monthDate.getDay();

    ca.contElement.querySelector("#month-monthname").innerHTML = ca.getMonthName(date);

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
        calendarHtml += '<div href="#" class="month-day">' + daysArray[i] + '</div></div>';
      } else if ((i + 1) % 7 == 1 ){
        calendarHtml += '<div class="week"><div href="#" class="month-day">' + daysArray[i] + '</div>';
      } else {
        calendarHtml += '<div href="#" class="month-day">' + daysArray[i] + '</div>';
      }
    }

    ca.contElement.querySelector("#calendar-body").innerHTML = calendarHtml;
    
  };


  // Set month and month view to next month
  this.nextMonth = function(){
    ca.currentDate.month += 1;
    theNextMonth = new Date(ca.currentDate.year, ca.currentDate.month, ca.currentDate.day);
    ca.buildMonth(theNextMonth);
    return false;
  };


  // Set month and month view to previous month
  this.prevMonth = function(){
    ca.currentDate.month -= 1;
    var thePrevMonth = new Date(ca.currentDate.year, ca.currentDate.month, ca.currentDate.day);
    ca.buildMonth(thePrevMonth);
    return false;
  };


  // Change the selected day and update the day view to reflect change. 
  this.changeDay = function(e)
  {
      e = e || window.event;
      var target = e.target || e.srcElement;
      if (target.className.match(/month-day/))
      {
          var dayNumber = target.innerHTML;
          if (dayNumber != ""){
            
            if (ca.contElement.querySelector("#active-day")){
              ca.contElement.querySelector("#active-day").removeAttribute("id")
            };

            target.id = "active-day";
            ca.today = new Date(ca.currentDate.year, ca.currentDate.month, dayNumber);
            ca.buildDay(ca.today);
          }

      }
      return false;
  };

  // Determine key pressed and change month based on it
  function arrowMonth(e) {
    e = e || window.event;
    if (e.keyCode == '37') {ca.prevMonth();}
    else if (e.keyCode == '39') {ca.nextMonth();}
  };

  // Bind Calendar Controls to proper functionality
  this.bindControls = function(){
    // Advance to next month
    ca.contElement.querySelector("#next-month").addEventListener('click', ca.nextMonth, false);
    // Go to previous month
    ca.contElement.querySelector("#prev-month").addEventListener('click', ca.prevMonth, false);
    // Change selected day
    ca.contElement.querySelector("#calendar-body").addEventListener('click',ca.changeDay,false);
    // Arrow Keys to change month
    document.onkeyup = arrowMonth;
  };

  // Build Calendar
  this.init = function(){
    ca.buildHtml(ca.contElement);
    ca.bindControls();
    ca.buildDay(ca.today);
    ca.buildMonth(ca.today);
  }

  this.init();
}

// insert Calendar HTML into container element
Calendar.prototype.buildHtml = function(el){
  var theHtml =  
    '<!-- day view showing month and giant day number -->\n' +
    '  <div class="day-view">\n' +
    '\n  ' +
    '  <!-- month label for selected day -->\n' +
    '    <div id="day-monthname" class="month-name">Month Name</div>\n' +
    '\n' +
    '    <!-- giant day number -->\n' +
    '    <div class="day" id="day">28</div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '  <!-- month view showing entire month layed out like a classic calendar -->\n' +
    '  <div class="month-view">\n' +
    '\n' +
    '  <!-- month name and controls -->\n' +
    '    <header>\n' +
    '      <div class="left-nav" id="prev-month"></div>\n' +
    '      <span id="month-monthname">Month Name</span>\n' +
    '      <div class="right-nav" id="next-month"></div>\n' +
    '    </header>\n' +
    '\n' +
    '  <!-- labels showing days of the week -->\n' +
    '    <ul class="day-letters">\n' +
    '      <li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li><li>S</li>\n' +
    '    </ul>\n' +
    '\n' +
    '  <!-- days grid dynamically created here -->\n' +
    '    <div id="calendar-body"></div>\n' +
    '\n' +
    '  </div>';

  el.innerHTML = theHtml;
}


// Calculate days in month 
Calendar.prototype.daysInMonth = function(year,month) {
  return new Date(year, (month + 1), 0).getDate();
}


// Takes a date object and returns the Name of the Month
Calendar.prototype.getMonthName = function(date){
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[date.getMonth()];
}

var el = document.getElementById("calendar");
var newCalendar = new Calendar(el);

// var el2 = document.getElementById("calendar2");
// var newCalendar = new Calendar(el2);