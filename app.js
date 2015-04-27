var Calendar = function(){
  
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
    document.getElementById("day").innerHTML = selectedDay.getDate();
    document.getElementById("day-monthname").innerHTML = ca.getMonthName(date);
  };


  // Build the month view (calendar) based on selected date
  this.buildMonth = function(date){
    ca.setDate(date);
    monthLength = ca.daysInMonth(ca.currentDate.year, ca.currentDate.month);

    var daysArray = [];
    var calendarHtml = "";
    var firstDay = ca.currentDate.monthDate.getDay();

    document.getElementById("month-monthname").innerHTML = ca.getMonthName(date);

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
    
  };


  // Set month and month view to next month
  this.nextMonth = function(){
    
    ca.currentDate.month += 1;
    theNextMonth = new Date(ca.currentDate.year, ca.currentDate.month, ca.currentDate.day);
    ca.buildMonth(theNextMonth);
    console.log(theNextMonth);
  };


  // Set month and month view to previous month
  this.prevMonth = function(){
    ca.currentDate.month -= 1;
    var thePrevMonth = new Date(ca.currentDate.year, ca.currentDate.month, ca.currentDate.day);
    ca.buildMonth(thePrevMonth);
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
            
            if (document.getElementById("active-day")){
              document.getElementById("active-day").removeAttribute("id")
            };

            target.id = "active-day";
            ca.today = new Date(ca.currentDate.year, ca.currentDate.month, dayNumber);
            ca.buildDay(ca.today);
          }

      }
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
    document.getElementById("next-month").addEventListener('click', ca.nextMonth, false);
    // Go to previous month
    document.getElementById("prev-month").addEventListener('click', ca.prevMonth, false);
    // Change selected day
    document.getElementById("calendar-body").addEventListener('click',ca.changeDay,false);
    // Arrow Keys to change month
    document.onkeyup = arrowMonth;
  };

  // Build Calendar
  this.init = function(){
    ca.bindControls();
    ca.buildDay(ca.today);
    ca.buildMonth(ca.today);
  }

  this.init();
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

var newCalendar = new Calendar();