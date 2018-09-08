require("babel-runtime/regenerator");
require("babel-register");

require("../../index.html");
require("../css/style.scss");
require("./firebase.config.js");

require("./containers/Authentication/authentication.scss");
require("./containers/Authentication/SignInSocial/sign-in-social.scss");
require("./app.js");