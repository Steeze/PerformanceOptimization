# Website Optimization

######How to get started with this project
1. Install Nodejs if not already installed: http://nodejs.org/
2. Run the command "npm install"
3. After the node_modules install, type "gulp prod" this will generate a 'dist' folder and copy needed files, then it will open your default browser to the portfolio page.

##File Structure

######src/

Contains development files for the application.

######dist/

This dist folder is created after the 'gulp prod' task is run. This folder will contain the production ready minified CSS, JavaScript and HTML

##The Portfolio page.

The following improvements were made:

######CSS
In order to optimize the critical rendering path all of the CSS needed for the page was moved to be in-lined. The media tag print was utilized for the print CSS, this will allow the browser to ignore this resource when
rendering for desktop or mobile.

######JavaScript.
The JavaScript was also moved from a external resource to in-lined. It was also added to the botton of the page and the async tag was used for loading the google analytic library so the call would not be content blocking.

######Images.
The images where compressed using the online resource compress jpeg.

######Result
I used ngork to test the changes I made on PageSpeed Insights.
The end result is 96/100 for Mobile and 97/100 for Desktop.

##The Pizza Shop page.

The following improvements were made:

######Gulp task runner
I put together a gulp task runner to minify the HTML, CSS and JavaScript. I also leveraged NodeJs to conditionally add either the development or minified version of the JavaScript in order to test locally
with the un-minified version of the JavaScript.

######JavaScript
Discovered there wasn't really a reason to generate 200 pizza elements on the DOMContentLoaded event listener, so I updated that number down to 35, which still renders enough to fill the screen.

```js
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8, s = 256;

  for (var i = 0; i < 35; i++) {

    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "img/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.style.left = (i % cols) * s + 'px';
    elem.style.top = (Math.floor(i / cols) * s) + 'px';

    document.querySelector("#movingPizzas1").appendChild(elem);
  }
```

Since the '.mover' elements are needed in multiple elements, I moved the element parsing to be a global varible.
```js
items = document.querySelectorAll('.mover');
```

Debouncing the scroll event. This decouples the animation from the input that affects it. The main issue here is that we are triggering a reflow and repaint whenever we a scroll event.
What we needed to do was decouple the scroll event from the updatePosition function, this is where requestAnimationFrame steps in to help

```js
var locked;
window.addEventListener('scroll', runOnScroll);

function runOnScroll() {
  if (!locked) {
    window.requestAnimationFrame(updatePositions);
    locked = true;
  }
}
```
From researching parallax performance I came across https://medium.com/@dhg/parallax-done-right-82ced812e61c#.5fndudbac and made the recommended updates
Updated to translate3d because its a property that is cheap for the browser to animate.

```js
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var topOfPage = (document.body.scrollTop / 1250);

  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(topOfPage + (i % 5));
    items[i].style.transform =  'translate3d(' + (100 * phase) + 'px, 0, 0)'; //items[i].style.left + 100 * phase + 'px';
  }
  locked = false;
```

From researching nested functions, I cam across  http://code.tutsplus.com/tutorials/stop-nesting-functions-but-not-all-of-them--net-22315
I then separated functions out to individual functions.
Also from using the F12 developer tools I noticed the DOM querySelectorAll was spiking the memory usage and moving these actions outside of the for loop made a noticeable difference.

```js

function changePizzaSizes(size) {
  var numberOfPizzas, dx, newwidth;
  numberOfPizzas = document.querySelectorAll('.randomPizzaContainer').length;
  dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[0], size);
  newwidth = (document.querySelectorAll(".randomPizzaContainer")[0].offsetWidth + dx) + 'px';

  for (var i = 0; i < numberOfPizzas; i++) {
    document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
  }
}

```