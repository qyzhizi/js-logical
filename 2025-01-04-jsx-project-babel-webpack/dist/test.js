"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var myElement = /*#__PURE__*/_react["default"].createElement("h1", null, "I Love JSX!");
var root = _client["default"].createRoot(document.getElementById('root'));
root.render(myElement);