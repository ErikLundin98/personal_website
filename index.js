/**
 * Terminal stuff
 */

howTo = "\
Big thanks to Jakub T. Jankiewicz for creating this tool and providing a helpful guide on how to create this website: https://itnext.io/how-to-create-interactive-terminal-like-website-888bb0972288 \
";

const greeting = "[[gb;yellow;black]\n\n\
.--._       _ .-.     .-.                  .-. _       \n\
: .--'     :_;: :.-.  : :                  : ::_;      \n\
: `;  .--. .-.: `'.'  : :   .-..-.,-.,-. .-' :.-.,-.,-.\n\
: :__ : ..': :: . `.  : :__ : :; :: ,. :' .; :: :: ,. :\n\
`.__.':_;  :_;:_;:_;  :___.'`.__.':_;:_;`.__.':_;:_;:_;\n\
\n\n\n\n\n\n\
Welcome to my personal website! For a list of available commands, type \"help\" and press enter\n\
-----------------------------------------------------------------------------------------------]";

const whoami_str = "My name is Erik Lundin.\nI am a M.Sc student in machine learning and quantitative finance.\
\nI am very passionate about data science and programming, and enjoy spending time on hobby projects (like this website) in my spare time\
\nIf you would like to learn more about my projects or get in touch with me, try the command \"socials\"";

const linkedin = $('<a href="https://www.linkedin.com/in/erik-lundin-331157156">\
  <span class="linkedin">\
    <i class="fa fa-linkedin" aria-hidden="true"> LinkedIn</i>\
  </span>\
</a>');
const github = $('<a href="https://www.github.com/eriklundin98">\
  <span class="github">\
    <i class="fa fa-github" aria-hidden="true"> GitHub</i>\
  </span>\
</a>');
const email = $('<a href="mailto:c.erik.lundin@gmail.com">\
  <span class="email">\
    <i class="fa fa-envelope" aria-hidden="true"> c.erik.lundin@gmail.com</i>\
  </span>\
</a>');

const help = "-- Available commands --\n\
help     :  get help\n\
who      :  learn more about me\n\
socials  :  links to my social pages\n\
how      :  how was this site created?\n\
projects :  a sorted list of my GitHub projects\n\
resume   :  download my resume\n\
hello    :  see initial display\n\
clear    :  clear display\n\
";

$.terminal.defaults.allowedAttributes.push('style');

function get_github() {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "https://api.github.com/users/ErikLundin98/repos", false);
    xhReq.send(null);
    var projects = JSON.parse(xhReq.responseText);
    projects = projects.sort(function(first, second) {
        return new Date(first.created_at).getTime() - new Date(second.created_at).getTime();
       });
    var response = "-- List of projects, sorted by creation date --\n"
    for (var i = 0; i < projects.length; i++) { 
        response += "\n";
        response += "|\tProject name : " + projects[i].name + "\n";
        response += "|\tDescription : " + projects[i].description + "\n";
        response += "|\tCreated : " + projects[i].created_at + "\n";
        response += "|\tLast update : " + projects[i].updated_at + "\n";
        response += "|\tLanguage : " + projects[i].language + "\n";
        response += "|\tLink : " + projects[i].html_url + "\n";
        response += "|\t---"
    }
    response += "----"
    return response;
}

$('body').terminal({
    hello: function() {
      this.echo(greeting);
    },
    how: function() {
        this.echo(howTo);
    },
    help: function() {
        this.echo(help);
    },
    who: function(width=100, height=150) {
        const whoami = $('<img src="resources/portrait.jpg" width=' + width +' height=' + height +'>');
        this.echo(whoami);
        this.echo(whoami_str);
    },
    socials: function() {
        this.echo(linkedin)
        this.echo(github)
        this.echo(email)
    },
    projects: function() {
        this.echo(get_github());
    },
    resume: function() {
        var link = document.createElement('a');
        link.href = "resources/Resume-1.pdf";
        link.target="_blank";
        link.download = "url";
        link.dispatchEvent(new MouseEvent('click'));
    },
    python: function() {
      return $('<iframe src="https://trinket.io/embed/python/3d8d7ce66b?runOption=console" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
    },
    color: function(color) {
      this.echo("changing color to " + color, {
        finalize: function(div) {
            div.css("color", color);
        }
    });
    }

}, {
    greetings: function () {
        return greeting;
    }
});
