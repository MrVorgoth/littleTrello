require("babel-runtime/regenerator");
require("babel-register");

require("../../index.html");
require("../css/style.scss");
require("./firebase.config.js");

require("./containers/Authentication/authentication.scss");
require("./containers/Authentication/SignInSocial/sign-in-social.scss");
// require("./containers/Board/Todo/todo.scss");
// require("./containers/Board/Doing/doing.scss");
// require("./containers/Board/Done/done.scss");
require("./containers/Board/board.scss");
require("./components/Footer/footer.scss");
require("./components/Modal/modal.scss");
require("./app.js");