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
        _extends({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 226 30" }, this.props),
        _react2.default.createElement(
          "title",
          null,
          "Cancel"
        ),
        _react2.default.createElement("path", { className: "cls-1", d: "M0 0h226v30H0z" }),
        _react2.default.createElement("path", { className: "cls-2", d: "M68.4 4.06a1.53 1.53 0 0 1-.28.8 1.13 1.13 0 0 1-.92.44 1.19 1.19 0 0 1-.64-.2 12.42 12.42 0 0 0-7-2.12A11.47 11.47 0 0 0 53.7 4.5a10.83 10.83 0 0 0-4.12 4.26 12.74 12.74 0 0 0-1.5 6.24 12.76 12.76 0 0 0 1.52 6.3 10.82 10.82 0 0 0 4.14 4.24A11.51 11.51 0 0 0 59.56 27a12.4 12.4 0 0 0 7-2.08 1.26 1.26 0 0 1 .68-.2 1.1 1.1 0 0 1 .92.48 1.12 1.12 0 0 1 .28.76 1 1 0 0 1-.56 1A14.64 14.64 0 0 1 64 28.68a15.12 15.12 0 0 1-4.44.7 14 14 0 0 1-7-1.82 13.51 13.51 0 0 1-5.12-5.1A14.64 14.64 0 0 1 45.52 15a14.56 14.56 0 0 1 1.88-7.36 13.68 13.68 0 0 1 5.08-5.16A13.83 13.83 0 0 1 59.56.62a15.22 15.22 0 0 1 4.38.64 14.08 14.08 0 0 1 3.86 1.8 1.11 1.11 0 0 1 .6 1zM100.84 27.86a1.07 1.07 0 0 1-.36.84 1.23 1.23 0 0 1-.84.32 1.15 1.15 0 0 1-.7-.22 1.4 1.4 0 0 1-.46-.58l-3-7.32h-13l-3 7.32a1.11 1.11 0 0 1-1.08.8 1.14 1.14 0 0 1-.84-.28 1.16 1.16 0 0 1-.32-.76v-.12a1.19 1.19 0 0 1 0-.36L87.88 1.66a1.19 1.19 0 0 1 1.2-.8 1.15 1.15 0 0 1 .7.22 1.42 1.42 0 0 1 .46.58l10.52 25.72a2.18 2.18 0 0 1 .08.48zM83.4 18.54h11.12l-5.6-13.68zM133.46 1.3a1.13 1.13 0 0 1 .3.8v25.6a1.2 1.2 0 0 1-1.24 1.3 1.27 1.27 0 0 1-.54-.12 1.43 1.43 0 0 1-.42-.28L114.4 5.46V27.9a1 1 0 0 1-.34.76 1.11 1.11 0 0 1-.78.32 1.08 1.08 0 0 1-.8-.32 1 1 0 0 1-.32-.76V2.18A1.13 1.13 0 0 1 113.32 1a1.11 1.11 0 0 1 1 .44l17.24 23.24V2.1a1.09 1.09 0 0 1 1.08-1.1 1.07 1.07 0 0 1 .82.3zM168.72 4.06a1.53 1.53 0 0 1-.28.8 1.13 1.13 0 0 1-.92.44 1.19 1.19 0 0 1-.64-.2 12.42 12.42 0 0 0-7-2.12A11.47 11.47 0 0 0 154 4.5a10.83 10.83 0 0 0-4.12 4.26A12.74 12.74 0 0 0 148.4 15a12.76 12.76 0 0 0 1.52 6.3 10.82 10.82 0 0 0 4.14 4.24 11.51 11.51 0 0 0 5.82 1.5 12.4 12.4 0 0 0 7-2.08 1.26 1.26 0 0 1 .68-.2 1.1 1.1 0 0 1 .92.48 1.12 1.12 0 0 1 .28.76 1 1 0 0 1-.56 1 14.64 14.64 0 0 1-3.84 1.74 15.12 15.12 0 0 1-4.44.7 14 14 0 0 1-7-1.82 13.51 13.51 0 0 1-5.12-5.1 14.64 14.64 0 0 1-1.9-7.48 14.56 14.56 0 0 1 1.88-7.34 13.68 13.68 0 0 1 5.08-5.16 13.83 13.83 0 0 1 7.02-1.92 15.22 15.22 0 0 1 4.38.64 14.08 14.08 0 0 1 3.86 1.8 1.11 1.11 0 0 1 .6 1zM196.94 27a1.19 1.19 0 0 1 .34.84 1.1 1.1 0 0 1-.34.84 1.21 1.21 0 0 1-.86.32H181.4a1.16 1.16 0 0 1-1.2-1.2V2.18A1.16 1.16 0 0 1 181.4 1h14.68a1.16 1.16 0 0 1 1.2 1.2 1.1 1.1 0 0 1-.34.84 1.2 1.2 0 0 1-.86.32h-13.36v10h11.56a1.16 1.16 0 0 1 1.2 1.2 1.1 1.1 0 0 1-.34.84 1.2 1.2 0 0 1-.86.32h-11.56v10.9h13.36a1.13 1.13 0 0 1 .86.38zM225.66 26.94a1.1 1.1 0 0 1 .34.84 1.16 1.16 0 0 1-1.2 1.2h-14.28a1.16 1.16 0 0 1-1.2-1.2V2.18a1.13 1.13 0 0 1 .36-.86 1.29 1.29 0 0 1 .92-.32 1.24 1.24 0 0 1 .88.34 1.13 1.13 0 0 1 .36.86v24.42h13a1.21 1.21 0 0 1 .82.32zM0 28.613L28.584-.009 30 1.404 1.416 30.027z" }),
        _react2.default.createElement("path", { className: "cls-2", d: "M0 1.397L1.417-.017l28.583 28.623-1.416 1.413z" })
      );
    }
  }]);

  return SVG;
}(_react2.default.Component);

exports.default = SVG;
module.exports = exports["default"];
//# sourceMappingURL=cancel.svg.react.js.map