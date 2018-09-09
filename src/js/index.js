require("babel-runtime/regenerator");
require("babel-register");

require("../../index.html");
require("../css/style.scss");
require("./firebase.config.js");

require("./containers/Authentication/authentication.scss");
require("./containers/Authentication/SignInSocial/sign-in-social.scss");
require("./containers/Board/ToDo/to-do.scss");
require("./containers/Board/Doing/doing.scss");
require("./containers/Board/Done/done.scss");
require("./app.js");