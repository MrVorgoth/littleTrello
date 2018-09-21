require("babel-runtime/regenerator");
require("babel-register");

require("../../index.html");
require("../css/style.scss");
require("./firebase.config.js");

require("./containers/Nav/nav.scss");
require("./components/Hero/hero.scss");
require("./components/About/about.scss");
require("./components/Parallax/parallax.scss");
require("./components/Footer/footer.scss");

require("./components/Modal/modal.scss");
require("./containers/Authentication/authentication.scss");
require("./containers/Authentication/SignInSocial/sign-in-social.scss");
require("./containers/BoardList/board-list.scss");
require("./app.js");