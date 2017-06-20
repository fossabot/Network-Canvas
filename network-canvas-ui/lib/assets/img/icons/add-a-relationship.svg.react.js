"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SVG = function (_React$Component) {
  _inherits(SVG, _React$Component);

  function SVG() {
    _classCallCheck(this, SVG);

    return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
  }

  _createClass(SVG, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        _extends({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 280 240" }, this.props),
        _react2.default.createElement(
          "title",
          null,
          "Add A Relationship"
        ),
        _react2.default.createElement("circle", { className: "cls-1", cx: "112", cy: "128", r: "112" }),
        _react2.default.createElement("path", { className: "cls-2", d: "M167.606 131.721l-3.497-5.059L210.77 94.4l3.498 5.058zM75.853 99.475l3.497-5.058 46.663 32.262-3.497 5.06z" }),
        _react2.default.createElement("path", { className: "cls-3", d: "M127.72 196.5c3.26-3.12 7.4-10.69 6.55-12.81h21.61c-.85 2.12 3.29 9.69 6.55 12.81z" }),
        _react2.default.createElement("path", { className: "cls-2", d: "M145.07 110.06c-19.41 0-35.15 17.44-35.15 39a41.25 41.25 0 0 0 9.08 26.05l52.19-52.19c-6.46-7.92-15.77-12.86-26.12-12.86z" }),
        _react2.default.createElement("path", { className: "cls-3", d: "M119 175.11C125.41 183 134.71 188 145.07 188c19.41 0 35.15-17.44 35.15-39a41.25 41.25 0 0 0-9.05-26.09z" }),
        _react2.default.createElement("path", { className: "cls-4", d: "M166 194.21l-45.5 45.47a113.18 113.18 0 0 1-27.81-1.34c.83-22.28 16.9-40.85 38.52-46.51 4.47 4.47 23.22 4.49 27.7 0a53.68 53.68 0 0 1 7.09 2.38z" }),
        _react2.default.createElement("path", { className: "cls-5", d: "M187.48 210.74a111.49 111.49 0 0 1-67 28.94L166 194.21a52.21 52.21 0 0 1 21.48 16.53z" }),
        _react2.default.createElement("ellipse", { className: "cls-6", cx: "224.5", cy: "56", rx: "55.5", ry: "56" }),
        _react2.default.createElement("path", { className: "cls-1", d: "M220.5 38h8v36h-8z" }),
        _react2.default.createElement("path", { className: "cls-1", d: "M206.5 60v-8h36v8z" }),
        _react2.default.createElement("path", { className: "cls-3", d: "M57.56 120.76c1.63-1.56 3.7-5.34 3.27-6.41h10.81c-.42 1.06 1.65 4.84 3.27 6.41z" }),
        _react2.default.createElement("path", { className: "cls-2", d: "M66.23 77.54c-9.71 0-17.57 8.72-17.57 19.48a20.62 20.62 0 0 0 4.53 13L79.28 84a16.83 16.83 0 0 0-13.05-6.46z" }),
        _react2.default.createElement("path", { className: "cls-3", d: "M53.19 110.06a16.83 16.83 0 0 0 13 6.43c9.71 0 17.57-8.72 17.57-19.48a20.62 20.62 0 0 0-4.53-13z" }),
        _react2.default.createElement("path", { className: "cls-4", d: "M76.69 119.61l-23 23H40c0-11.55 8.18-21.27 19.28-24.17a15.13 15.13 0 0 0 13.85 0 26.84 26.84 0 0 1 3.56 1.17z" }),
        _react2.default.createElement("path", { className: "cls-5", d: "M76.69 119.61l-23 23h38.75a25.05 25.05 0 0 0-15.75-23z" })
      );
    }
  }]);

  return SVG;
}(_react2.default.Component);

exports.default = SVG;
module.exports = exports["default"];
//# sourceMappingURL=add-a-relationship.svg.react.js.map