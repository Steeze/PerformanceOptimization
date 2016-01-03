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

'''js
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