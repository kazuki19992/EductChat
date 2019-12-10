"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRouter = require("react-router");

var _Login = require("./Login");

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require("./Signup");

var _Signup2 = _interopRequireDefault(_Signup);

var _Rooms = require("./Rooms");

var _Rooms2 = _interopRequireDefault(_Rooms);

var _Room = require("./Room");

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routingの定義を行う
var appRouting = _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: "/" },
        _react2.default.createElement(_reactRouter.Route, { path: "login", component: _Login2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: "signup", component: _Signup2.default }),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: "rooms", component: _Rooms2.default },
            _react2.default.createElement(_reactRouter.Route, { path: "room", component: _Room2.default })
        )
    )
);

// Routingの初期化
if (!location.hash.length) {
    location.hash = "#/login";
}

// Applicationの描画
(0, _reactDom.render)(appRouting, document.getElementById("app"));