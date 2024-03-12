document.addEventListener('DOMContentLoaded', function() {
    // Clone the template content
    const LoginOrRegisterTemplate = document.getElementById('loginOrRegisterTemplate').content;
    const LoginOrRegisterClone = LoginOrRegisterTemplate.cloneNode(true);
    const HomeTemplate = document.getElementById('homeTemplate').content;
    const HomeClone = HomeTemplate.cloneNode(true);
    const LostTemplate = document.getElementById('lostTemplate').content;
    const LostClone = LostTemplate.cloneNode(true);

    function loginOrRegister() {
        document.getElementById('title').innerHTML = 'login or register';
        // Clear the content
        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(LoginOrRegisterClone);
    }

    function Home() {
        document.getElementById('title').innerHTML = 'lost';
        // Clear the content
        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(HomeClone);
    }

    function Lost() {
        document.getElementById('title').innerHTML = 'home';
        // Clear the content
        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(LostClone);
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
                loginOrRegister();
                break;
            default:
                Lost();
                break;
        }
    } else {
        loginOrRegister();
    }
});