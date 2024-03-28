document.addEventListener('DOMContentLoaded', function() {
    const pageTitle = "JS Single Page Application Router";
    // create an object that maps the url to the template, title, and description
    const routes = {
        lost: {
            template: "/View/lost.html",
            title: "404 | " + pageTitle,
            description: "Page not found",
        },
        home: {
            template: "/View/home.html",
            title: "Home | " + pageTitle,
            description: "This is the home page",
        },
        loginOrRegister: {
            template: "/View/loginOrRegister.html",
            title: "Login or register | " + pageTitle,
            description: "This is the login or register page",
        },
        profile: {
            template: "/View/profile.html",
            title: "Profile | " + pageTitle,
            description: "This is the profile page",
        },
    };

    // create a function that watches the url and calls the urlLocationHandler
    const locationHandler = async () => {
        // get the url path, replace hash with empty string
        var hash = window.location.hash.replace("#", "");
        // if the path length is 0, set it to primary page route
        if (hash.length == 0) {
            if(localStorage.getItem('logged') == "true") {
                window.location.hash = "#home";
            } else {
                window.location.hash = "#loginOrRegister";
            }
        }

        //check if the user is logged in and handle redirection
        if (localStorage.getItem('logged') == "true") { // if the user is logged in
            switch(hash) {
                case 'loginOrRegister': // when the hash is 'loginOrRegister'
                    window.location.hash = "#home";
                    break;
                case 'home': // when the hash is 'home'
                    document.getElementById('dropdownMenu').style.display = "block"; //show dropdownMenu
                    break;
                case 'settings': // when the hash is 'settings'
                    document.getElementById('dropdownMenu').style.display = "block"; //show dropdownMenu
                    break;
                default:
                    window.location.hash = "#home";
                    break;
            }
        } else { // if there is no user logged in
            switch(hash) {
                case 'loginOrRegister': // when the hash is 'loginOrRegister'
                    document.getElementById('dropdownMenu').style.display = "none"; // hide dropdownMenu
                    break;
                default:
                    window.location.hash = "#loginOrRegister";
                    break;
            }
        }

        // get the route object from the routes object
        const route = routes[hash] || routes["lost"];
        // get the html from the template
        const html = await fetch(route.template).then((response) => response.text());
        // set the content of the content div to the html
        document.getElementById("content").innerHTML = html;
        // set the title of the document to the title of the route
        document.title = route.title;
        // set the description of the document to the description of the route
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", route.description);
    };

    // create a function that watches the hash and calls the urlLocationHandler
    window.addEventListener("hashchange", locationHandler);
    // call the urlLocationHandler to load the page
    locationHandler();
});