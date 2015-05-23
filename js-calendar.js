var timsComponents = (function(){

  var Calendar = function(e){
    
    var contElement = e,
        today = new Date(), 
        currentDate = {
          year: today.getFullYear(),
          month: today.getMonth(),
          day: today.getDay(),
          monthDate: new Date(this.year, this.month, 1)
        }

    var ca = this;

    // Set date to new one
    var setDate = function(newdate){
      currentDate.year = newdate.getFullYear();
      currentDate.month = newdate.getMonth();
      currentDate.monthDate = new Date(currentDate.year, currentDate.month, 1);
    };


    // Inject currently selected day information into Day View
    var buildDay = function(date){
      var selectedDay = date;
      contElement.querySelector("#day").innerHTML = selectedDay.getDate();
      contElement.querySelector("#day-monthname").innerHTML = ca.getMonthName(date);
    };


    // Build the month view (calendar) based on selected date
    var buildMonth = function(date){
      setDate(date);
      monthLength = ca.daysInMonth(currentDate.year, currentDate.month);

      var daysArray = [],
          calendarHtml = "",
          firstDay = currentDate.monthDate.getDay();

      contElement.querySelector("#month-monthname").innerHTML = ca.getMonthName(date);

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

      contElement.querySelector("#calendar-body").innerHTML = calendarHtml;
      
    };


    // Set month and month view to next month
    var nextMonth = function(){
      currentDate.month += 1;
      theNextMonth = new Date(currentDate.year, currentDate.month, currentDate.day);
      buildMonth(theNextMonth);
      return false;
    };


    // Set month and month view to previous month
    var prevMonth = function(){
      currentDate.month -= 1;
      var thePrevMonth = new Date(currentDate.year, currentDate.month, currentDate.day);
      buildMonth(thePrevMonth);
      return false;
    };


    // Change the selected day and update the day view to reflect change. 
    var changeDay = function(e)
    {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.match(/month-day/))
        {
            var dayNumber = target.innerHTML;
            if (dayNumber != ""){
              
              if (contElement.querySelector("#active-day")){
                contElement.querySelector("#active-day").removeAttribute("id")
              };

              target.id = "active-day";
              today = new Date(currentDate.year, currentDate.month, dayNumber);
              buildDay(today);
            }

        }
        return false;
    };

    // Determine key pressed and change month based on it
    function arrowMonth(e) {
      e = e || window.event;
      if (e.keyCode == '37') {prevMonth();}
      else if (e.keyCode == '39') {nextMonth();}
    };

    // Bind Calendar Controls to proper functionality
    var bindControls = function(){
      // Advance to next month
      contElement.querySelector("#next-month").addEventListener('click', nextMonth, false);
      // Go to previous month
      contElement.querySelector("#prev-month").addEventListener('click', prevMonth, false);
      // Change selected day
      contElement.querySelector("#calendar-body").addEventListener('click', changeDay,false);
      // Arrow Keys to change month
      document.onkeyup = arrowMonth;
    };

    // Build Calendar
    var init = function(){
      ca.buildHtml(contElement);
      bindControls();
      buildDay(today);
      buildMonth(today);
    }

    init();
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

  return {
    Calendar: Calendar
  }


}());

var el = document.getElementById("calendar"),
    newCalendar = new timsComponents.Calendar(el);

// var el2 = document.getElementById("calendar2"),
//     newCalendar = new timsComponents.Calendar(el2);