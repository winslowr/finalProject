
export const createNavbar = function () {
    const navbar = $(
        `<nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item">
            <img src="https://about.netflix.com/images/logo.png">
        </a>
        </div>

        <div id="" class="navbar-menu has-background-grey-dark">
        <div class="navbar-start">
            <a id="home" href='index.html' class="navbar-item has-text-white">
            Home
            </a>

            <a id="findFriends" class="navbar-item has-text-white">
            Find Friends
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
            <a id="about" href='about.html' class="navbar-item has-text-white">
                About
            </a>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
            <div class="buttons">
                <button id="redirect" style="background-color: rgb(180, 29, 19)" class="button is-danger">Login or Sign Up</button>
            </div>
            </div>
        </div>
        </div>
    </nav>`);
    return navbar;
}