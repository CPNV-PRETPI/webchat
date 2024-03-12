document.addEventListener('DOMContentLoaded', function() {
    // Clone the template content
    const LoginOrRegisterTemplate = document.getElementById('loginOrRegisterTemplate').content;
    const LoginOrRegisterClone = LoginOrRegisterTemplate.cloneNode(true);
    const HomeTemplate = document.getElementById('homeTemplate').content;
    const HomeClone = HomeTemplate.cloneNode(true);
    const LostTemplate = document.getElementById('lostTemplate').content;
    const LostClone = LostTemplate.cloneNode(true);


    function LoginOrRegister() {
        document.getElementById('menu').style.display = "none";
        document.getElementById('title').innerHTML = 'login or register';
        document.getElementById('content').innerHTML = ''; // Clear the content
        document.getElementById('content').appendChild(LoginOrRegisterClone);
    }

    function Home() {
        document.getElementById('menu').style.display = "block";
        document.getElementById('title').innerHTML = 'home';
        document.getElementById('content').innerHTML = ''; // Clear the content
        document.getElementById('content').appendChild(HomeClone);
        document.getElementById('loginOrRegister').style.display = "none";
    }

    function Lost() {
        document.getElementById('menu').style.display = "block";
        document.getElementById('title').innerHTML = 'lost';
        document.getElementById('content').innerHTML = ''; // Clear the content
        document.getElementById('content').appendChild(LostClone);
    }

    function Settings() {
        document.getElementById('menu').style.display = "block";
        document.getElementById('title').innerHTML = 'lost';
        document.getElementById('content').innerHTML = ''; // Clear the content
        document.getElementById('content').appendChild();
    }

    // Define the routing logic
    if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const action = params.get('action');

        switch (action) {
            case 'home':
                Home();
                break;
            case 'loginOrRegister':
                LoginOrRegister();
                break;
            case 'settings':
                Settings();
                break;
            default:
                Lost();
                break;
        }
    } else {
        Home();
    }
});