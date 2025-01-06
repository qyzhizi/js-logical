"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _file = _interopRequireDefault(require("../public/file.png"));
var _file2 = _interopRequireDefault(require("../public/file.jpg"));
var _file3 = _interopRequireDefault(require("../public/file.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Create an array of image objects
var images = [{
  title: "PNG Image",
  src: _file["default"]
}, {
  title: "JPG Image",
  src: _file2["default"]
}, {
  title: "SVG Image",
  src: _file3["default"]
}, {
  title: "SVG Image2",
  src: _file3["default"]
}];

// ImageGallery Component
function ImageGallery() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginBottom: "20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement("h1", null, "\u6B22\u8FCE\u6765\u5230\u6211\u7684\u56FE\u7247\u753B\u5ECA"), /*#__PURE__*/_react["default"].createElement("p", null, "\u8FD9\u91CC\u5C55\u793A\u4E86\u4E00\u4E9B\u6211\u6700\u559C\u6B22\u7684\u56FE\u7247\u3002")), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, images.map(function (image, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      style: {
        textAlign: "center",
        margin: "10px"
      }
    }, /*#__PURE__*/_react["default"].createElement("h2", null, image.title), /*#__PURE__*/_react["default"].createElement("img", {
      src: image.src,
      width: "150",
      alt: image.title
    }));
  })));
}

// Main App Component
function App() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement("h1", null, "I Love JSX!"), /*#__PURE__*/_react["default"].createElement(ImageGallery, null));
}

// Render the App
var root = _client["default"].createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/_react["default"].createElement(App, null));