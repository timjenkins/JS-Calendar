# JS Calendar
A simple calendar plugin written in Vanilla Javascript

## Installation
Include js-calendar.css on page or into sass project.
```html
<link rel="stylesheet" href="js-calendar.css">
```

Include js-calendar.js just before the </body> (or minify with your own js).
```html
<script src="js-calendar.js"></script>
```

Create an element with a unique ID, and a class of "calendar".
```html
<div class="calendar" id="cal"></div>
```

In your javascript, create new Calendar object on the element you just created.
``` javascript
var el = document.getElementById("cal");
var newCalendar = new Calendar(el);
```
