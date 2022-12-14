(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["image-q"] = factory();
	else
		root["image-q"] = factory();
})(typeof globalThis !== 'undefined' ? globalThis : typeof this !== 'undefined' ? this : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : null, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/basicAPI.ts":
/*!*************************!*\
  !*** ./src/basicAPI.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildPaletteSync": () => (/* binding */ buildPaletteSync),
/* harmony export */   "buildPalette": () => (/* binding */ buildPalette),
/* harmony export */   "applyPaletteSync": () => (/* binding */ applyPaletteSync),
/* harmony export */   "applyPalette": () => (/* binding */ applyPalette)
/* harmony export */ });
/* harmony import */ var _distance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distance */ "./src/distance/index.ts");
/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image */ "./src/image/index.ts");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./palette */ "./src/palette/index.ts");
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * helper.ts - part of Image Quantization Library
 */



const setImmediateImpl = typeof setImmediate === "function" ? setImmediate : typeof process !== "undefined" && typeof (process == null ? void 0 : process.nextTick) === "function" ? (callback) => process.nextTick(callback) : (callback) => setTimeout(callback, 0);
function buildPaletteSync(images, {
  colorDistanceFormula,
  paletteQuantization,
  colors
} = {}) {
  const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
  const paletteQuantizer = paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors);
  images.forEach((image2) => paletteQuantizer.sample(image2));
  return paletteQuantizer.quantizeSync();
}
function buildPalette(_0) {
  return __async(this, arguments, function* (images, {
    colorDistanceFormula,
    paletteQuantization,
    colors,
    onProgress
  } = {}) {
    return new Promise((resolve, reject) => {
      const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
      const paletteQuantizer = paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization, colors);
      images.forEach((image2) => paletteQuantizer.sample(image2));
      let palette2;
      const iterator = paletteQuantizer.quantize();
      const next = () => {
        try {
          const result = iterator.next();
          if (result.done) {
            resolve(palette2);
          } else {
            if (result.value.palette)
              palette2 = result.value.palette;
            if (onProgress)
              onProgress(result.value.progress);
            setImmediateImpl(next);
          }
        } catch (error) {
          reject(error);
        }
      };
      setImmediateImpl(next);
    });
  });
}
function applyPaletteSync(image2, palette2, { colorDistanceFormula, imageQuantization } = {}) {
  const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
  const imageQuantizer = imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization);
  return imageQuantizer.quantizeSync(image2, palette2);
}
function applyPalette(_0, _1) {
  return __async(this, arguments, function* (image2, palette2, {
    colorDistanceFormula,
    imageQuantization,
    onProgress
  } = {}) {
    return new Promise((resolve, reject) => {
      const distanceCalculator = colorDistanceFormulaToColorDistance(colorDistanceFormula);
      const imageQuantizer = imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization);
      let outPointContainer;
      const iterator = imageQuantizer.quantize(image2, palette2);
      const next = () => {
        try {
          const result = iterator.next();
          if (result.done) {
            resolve(outPointContainer);
          } else {
            if (result.value.pointContainer) {
              outPointContainer = result.value.pointContainer;
            }
            if (onProgress)
              onProgress(result.value.progress);
            setImmediateImpl(next);
          }
        } catch (error) {
          reject(error);
        }
      };
      setImmediateImpl(next);
    });
  });
}
function colorDistanceFormulaToColorDistance(colorDistanceFormula = "euclidean-bt709") {
  switch (colorDistanceFormula) {
    case "cie94-graphic-arts":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.CIE94GraphicArts();
    case "cie94-textiles":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.CIE94Textiles();
    case "ciede2000":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.CIEDE2000();
    case "color-metric":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.CMetric();
    case "euclidean":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.Euclidean();
    case "euclidean-bt709":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.EuclideanBT709();
    case "euclidean-bt709-noalpha":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.EuclideanBT709NoAlpha();
    case "manhattan":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.Manhattan();
    case "manhattan-bt709":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.ManhattanBT709();
    case "manhattan-nommyde":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.ManhattanNommyde();
    case "pngquant":
      return new _distance__WEBPACK_IMPORTED_MODULE_0__.PNGQuant();
    default:
      throw new Error(`Unknown colorDistanceFormula ${colorDistanceFormula}`);
  }
}
function imageQuantizationToImageQuantizer(distanceCalculator, imageQuantization = "floyd-steinberg") {
  switch (imageQuantization) {
    case "nearest":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.NearestColor(distanceCalculator);
    case "riemersma":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionRiemersma(distanceCalculator);
    case "floyd-steinberg":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.FloydSteinberg);
    case "false-floyd-steinberg":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.FalseFloydSteinberg);
    case "stucki":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.Stucki);
    case "atkinson":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.Atkinson);
    case "jarvis":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.Jarvis);
    case "burkes":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.Burkes);
    case "sierra":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.Sierra);
    case "two-sierra":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.TwoSierra);
    case "sierra-lite":
      return new _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArray(distanceCalculator, _image__WEBPACK_IMPORTED_MODULE_1__.ErrorDiffusionArrayKernel.SierraLite);
    default:
      throw new Error(`Unknown imageQuantization ${imageQuantization}`);
  }
}
function paletteQuantizationToPaletteQuantizer(distanceCalculator, paletteQuantization = "wuquant", colors = 256) {
  switch (paletteQuantization) {
    case "neuquant":
      return new _palette__WEBPACK_IMPORTED_MODULE_2__.NeuQuant(distanceCalculator, colors);
    case "rgbquant":
      return new _palette__WEBPACK_IMPORTED_MODULE_2__.RGBQuant(distanceCalculator, colors);
    case "wuquant":
      return new _palette__WEBPACK_IMPORTED_MODULE_2__.WuQuant(distanceCalculator, colors);
    case "neuquant-float":
      return new _palette__WEBPACK_IMPORTED_MODULE_2__.NeuQuantFloat(distanceCalculator, colors);
    default:
      throw new Error(`Unknown paletteQuantization ${paletteQuantization}`);
  }
}


/***/ }),

/***/ "./src/constants/bt709.ts":
/*!********************************!*\
  !*** ./src/constants/bt709.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ Y),
/* harmony export */   "x": () => (/* binding */ x),
/* harmony export */   "y": () => (/* binding */ y)
/* harmony export */ });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */
var Y = /* @__PURE__ */ ((Y2) => {
  Y2[Y2["RED"] = 0.2126] = "RED";
  Y2[Y2["GREEN"] = 0.7152] = "GREEN";
  Y2[Y2["BLUE"] = 0.0722] = "BLUE";
  Y2[Y2["WHITE"] = 1] = "WHITE";
  return Y2;
})(Y || {});
var x = /* @__PURE__ */ ((x2) => {
  x2[x2["RED"] = 0.64] = "RED";
  x2[x2["GREEN"] = 0.3] = "GREEN";
  x2[x2["BLUE"] = 0.15] = "BLUE";
  x2[x2["WHITE"] = 0.3127] = "WHITE";
  return x2;
})(x || {});
var y = /* @__PURE__ */ ((y2) => {
  y2[y2["RED"] = 0.33] = "RED";
  y2[y2["GREEN"] = 0.6] = "GREEN";
  y2[y2["BLUE"] = 0.06] = "BLUE";
  y2[y2["WHITE"] = 0.329] = "WHITE";
  return y2;
})(y || {});


/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bt709": () => (/* reexport module object */ _bt709__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _bt709__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bt709 */ "./src/constants/bt709.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * constants.ts - part of Image Quantization Library
 */




/***/ }),

/***/ "./src/conversion/index.ts":
/*!*********************************!*\
  !*** ./src/conversion/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rgb2xyz": () => (/* reexport safe */ _rgb2xyz__WEBPACK_IMPORTED_MODULE_0__.rgb2xyz),
/* harmony export */   "rgb2hsl": () => (/* reexport safe */ _rgb2hsl__WEBPACK_IMPORTED_MODULE_1__.rgb2hsl),
/* harmony export */   "rgb2lab": () => (/* reexport safe */ _rgb2lab__WEBPACK_IMPORTED_MODULE_2__.rgb2lab),
/* harmony export */   "lab2xyz": () => (/* reexport safe */ _lab2xyz__WEBPACK_IMPORTED_MODULE_3__.lab2xyz),
/* harmony export */   "lab2rgb": () => (/* reexport safe */ _lab2rgb__WEBPACK_IMPORTED_MODULE_4__.lab2rgb),
/* harmony export */   "xyz2lab": () => (/* reexport safe */ _xyz2lab__WEBPACK_IMPORTED_MODULE_5__.xyz2lab),
/* harmony export */   "xyz2rgb": () => (/* reexport safe */ _xyz2rgb__WEBPACK_IMPORTED_MODULE_6__.xyz2rgb)
/* harmony export */ });
/* harmony import */ var _rgb2xyz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rgb2xyz */ "./src/conversion/rgb2xyz.ts");
/* harmony import */ var _rgb2hsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgb2hsl */ "./src/conversion/rgb2hsl.ts");
/* harmony import */ var _rgb2lab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rgb2lab */ "./src/conversion/rgb2lab.ts");
/* harmony import */ var _lab2xyz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lab2xyz */ "./src/conversion/lab2xyz.ts");
/* harmony import */ var _lab2rgb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lab2rgb */ "./src/conversion/lab2rgb.ts");
/* harmony import */ var _xyz2lab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./xyz2lab */ "./src/conversion/xyz2lab.ts");
/* harmony import */ var _xyz2rgb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./xyz2rgb */ "./src/conversion/xyz2rgb.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */









/***/ }),

/***/ "./src/conversion/lab2rgb.ts":
/*!***********************************!*\
  !*** ./src/conversion/lab2rgb.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lab2rgb": () => (/* binding */ lab2rgb)
/* harmony export */ });
/* harmony import */ var _lab2xyz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lab2xyz */ "./src/conversion/lab2xyz.ts");
/* harmony import */ var _xyz2rgb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xyz2rgb */ "./src/conversion/xyz2rgb.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2rgb.ts - part of Image Quantization Library
 */


function lab2rgb(L, a, b) {
  const xyz = (0,_lab2xyz__WEBPACK_IMPORTED_MODULE_0__.lab2xyz)(L, a, b);
  return (0,_xyz2rgb__WEBPACK_IMPORTED_MODULE_1__.xyz2rgb)(xyz.x, xyz.y, xyz.z);
}


/***/ }),

/***/ "./src/conversion/lab2xyz.ts":
/*!***********************************!*\
  !*** ./src/conversion/lab2xyz.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lab2xyz": () => (/* binding */ lab2xyz)
/* harmony export */ });
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * lab2xyz.ts - part of Image Quantization Library
 */
const refX = 0.95047;
const refY = 1;
const refZ = 1.08883;
function pivot(n) {
  return n > 0.206893034 ? __pow(n, 3) : (n - 16 / 116) / 7.787;
}
function lab2xyz(L, a, b) {
  const y = (L + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;
  return {
    x: refX * pivot(x),
    y: refY * pivot(y),
    z: refZ * pivot(z)
  };
}


/***/ }),

/***/ "./src/conversion/rgb2hsl.ts":
/*!***********************************!*\
  !*** ./src/conversion/rgb2hsl.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rgb2hsl": () => (/* binding */ rgb2hsl)
/* harmony export */ });
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/arithmetic */ "./src/utils/arithmetic.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2hsl.ts - part of Image Quantization Library
 */

function rgb2hsl(r, g, b) {
  const min = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__.min3)(r, g, b);
  const max = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__.max3)(r, g, b);
  const delta = max - min;
  const l = (min + max) / 510;
  let s = 0;
  if (l > 0 && l < 1)
    s = delta / (l < 0.5 ? max + min : 510 - max - min);
  let h = 0;
  if (delta > 0) {
    if (max === r) {
      h = (g - b) / delta;
    } else if (max === g) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h *= 60;
    if (h < 0)
      h += 360;
  }
  return { h, s, l };
}


/***/ }),

/***/ "./src/conversion/rgb2lab.ts":
/*!***********************************!*\
  !*** ./src/conversion/rgb2lab.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rgb2lab": () => (/* binding */ rgb2lab)
/* harmony export */ });
/* harmony import */ var _rgb2xyz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rgb2xyz */ "./src/conversion/rgb2xyz.ts");
/* harmony import */ var _xyz2lab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xyz2lab */ "./src/conversion/xyz2lab.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2lab.ts - part of Image Quantization Library
 */


function rgb2lab(r, g, b) {
  const xyz = (0,_rgb2xyz__WEBPACK_IMPORTED_MODULE_0__.rgb2xyz)(r, g, b);
  return (0,_xyz2lab__WEBPACK_IMPORTED_MODULE_1__.xyz2lab)(xyz.x, xyz.y, xyz.z);
}


/***/ }),

/***/ "./src/conversion/rgb2xyz.ts":
/*!***********************************!*\
  !*** ./src/conversion/rgb2xyz.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rgb2xyz": () => (/* binding */ rgb2xyz)
/* harmony export */ });
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgb2xyz.ts - part of Image Quantization Library
 */
function correctGamma(n) {
  return n > 0.04045 ? __pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
}
function rgb2xyz(r, g, b) {
  r = correctGamma(r / 255);
  g = correctGamma(g / 255);
  b = correctGamma(b / 255);
  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505
  };
}


/***/ }),

/***/ "./src/conversion/xyz2lab.ts":
/*!***********************************!*\
  !*** ./src/conversion/xyz2lab.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xyz2lab": () => (/* binding */ xyz2lab)
/* harmony export */ });
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2lab.ts - part of Image Quantization Library
 */
const refX = 0.95047;
const refY = 1;
const refZ = 1.08883;
function pivot(n) {
  return n > 8856e-6 ? __pow(n, 1 / 3) : 7.787 * n + 16 / 116;
}
function xyz2lab(x, y, z) {
  x = pivot(x / refX);
  y = pivot(y / refY);
  z = pivot(z / refZ);
  if (116 * y - 16 < 0)
    throw new Error("xxx");
  return {
    L: Math.max(0, 116 * y - 16),
    a: 500 * (x - y),
    b: 200 * (y - z)
  };
}


/***/ }),

/***/ "./src/conversion/xyz2rgb.ts":
/*!***********************************!*\
  !*** ./src/conversion/xyz2rgb.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xyz2rgb": () => (/* binding */ xyz2rgb)
/* harmony export */ });
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/arithmetic */ "./src/utils/arithmetic.ts");
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * xyz2rgb.ts - part of Image Quantization Library
 */

function correctGamma(n) {
  return n > 31308e-7 ? 1.055 * __pow(n, 1 / 2.4) - 0.055 : 12.92 * n;
}
function xyz2rgb(x, y, z) {
  const r = correctGamma(x * 3.2406 + y * -1.5372 + z * -0.4986);
  const g = correctGamma(x * -0.9689 + y * 1.8758 + z * 0.0415);
  const b = correctGamma(x * 0.0557 + y * -0.204 + z * 1.057);
  return {
    r: (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__.inRange0to255Rounded)(r * 255),
    g: (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__.inRange0to255Rounded)(g * 255),
    b: (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_0__.inRange0to255Rounded)(b * 255)
  };
}


/***/ }),

/***/ "./src/distance/cie94.ts":
/*!*******************************!*\
  !*** ./src/distance/cie94.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCIE94": () => (/* binding */ AbstractCIE94),
/* harmony export */   "CIE94Textiles": () => (/* binding */ CIE94Textiles),
/* harmony export */   "CIE94GraphicArts": () => (/* binding */ CIE94GraphicArts)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/* harmony import */ var _conversion_rgb2lab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../conversion/rgb2lab */ "./src/conversion/rgb2lab.ts");
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/arithmetic */ "./src/utils/arithmetic.ts");
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cie94.ts - part of Image Quantization Library
 */



class AbstractCIE94 extends _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const lab1 = (0,_conversion_rgb2lab__WEBPACK_IMPORTED_MODULE_1__.rgb2lab)((0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(r1 * this._whitePoint.r), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(g1 * this._whitePoint.g), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(b1 * this._whitePoint.b));
    const lab2 = (0,_conversion_rgb2lab__WEBPACK_IMPORTED_MODULE_1__.rgb2lab)((0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(r2 * this._whitePoint.r), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(g2 * this._whitePoint.g), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(b2 * this._whitePoint.b));
    const dL = lab1.L - lab2.L;
    const dA = lab1.a - lab2.a;
    const dB = lab1.b - lab2.b;
    const c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
    const c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
    const dC = c1 - c2;
    let deltaH = dA * dA + dB * dB - dC * dC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    const dAlpha = (a2 - a1) * this._whitePoint.a * this._kA;
    return Math.sqrt(__pow(dL / this._Kl, 2) + __pow(dC / (1 + this._K1 * c1), 2) + __pow(deltaH / (1 + this._K2 * c1), 2) + __pow(dAlpha, 2));
  }
}
class CIE94Textiles extends AbstractCIE94 {
  _setDefaults() {
    this._Kl = 2;
    this._K1 = 0.048;
    this._K2 = 0.014;
    this._kA = 0.25 * 50 / 255;
  }
}
class CIE94GraphicArts extends AbstractCIE94 {
  _setDefaults() {
    this._Kl = 1;
    this._K1 = 0.045;
    this._K2 = 0.015;
    this._kA = 0.25 * 100 / 255;
  }
}


/***/ }),

/***/ "./src/distance/ciede2000.ts":
/*!***********************************!*\
  !*** ./src/distance/ciede2000.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CIEDE2000": () => (/* binding */ CIEDE2000)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/* harmony import */ var _conversion_rgb2lab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../conversion/rgb2lab */ "./src/conversion/rgb2lab.ts");
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/arithmetic */ "./src/utils/arithmetic.ts");
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ciede2000.ts - part of Image Quantization Library
 */



const _CIEDE2000 = class extends _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator {
  _setDefaults() {
  }
  static _calculatehp(b, ap) {
    const hp = Math.atan2(b, ap);
    if (hp >= 0)
      return hp;
    return hp + _CIEDE2000._deg360InRad;
  }
  static _calculateRT(ahp, aCp) {
    const aCp_to_7 = __pow(aCp, 7);
    const R_C = 2 * Math.sqrt(aCp_to_7 / (aCp_to_7 + _CIEDE2000._pow25to7));
    const delta_theta = _CIEDE2000._deg30InRad * Math.exp(-__pow((ahp - _CIEDE2000._deg275InRad) / _CIEDE2000._deg25InRad, 2));
    return -Math.sin(2 * delta_theta) * R_C;
  }
  static _calculateT(ahp) {
    return 1 - 0.17 * Math.cos(ahp - _CIEDE2000._deg30InRad) + 0.24 * Math.cos(ahp * 2) + 0.32 * Math.cos(ahp * 3 + _CIEDE2000._deg6InRad) - 0.2 * Math.cos(ahp * 4 - _CIEDE2000._deg63InRad);
  }
  static _calculate_ahp(C1pC2p, h_bar, h1p, h2p) {
    const hpSum = h1p + h2p;
    if (C1pC2p === 0)
      return hpSum;
    if (h_bar <= _CIEDE2000._deg180InRad)
      return hpSum / 2;
    if (hpSum < _CIEDE2000._deg360InRad) {
      return (hpSum + _CIEDE2000._deg360InRad) / 2;
    }
    return (hpSum - _CIEDE2000._deg360InRad) / 2;
  }
  static _calculate_dHp(C1pC2p, h_bar, h2p, h1p) {
    let dhp;
    if (C1pC2p === 0) {
      dhp = 0;
    } else if (h_bar <= _CIEDE2000._deg180InRad) {
      dhp = h2p - h1p;
    } else if (h2p <= h1p) {
      dhp = h2p - h1p + _CIEDE2000._deg360InRad;
    } else {
      dhp = h2p - h1p - _CIEDE2000._deg360InRad;
    }
    return 2 * Math.sqrt(C1pC2p) * Math.sin(dhp / 2);
  }
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const lab1 = (0,_conversion_rgb2lab__WEBPACK_IMPORTED_MODULE_1__.rgb2lab)((0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(r1 * this._whitePoint.r), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(g1 * this._whitePoint.g), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(b1 * this._whitePoint.b));
    const lab2 = (0,_conversion_rgb2lab__WEBPACK_IMPORTED_MODULE_1__.rgb2lab)((0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(r2 * this._whitePoint.r), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(g2 * this._whitePoint.g), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255)(b2 * this._whitePoint.b));
    const dA = (a2 - a1) * this._whitePoint.a * _CIEDE2000._kA;
    const dE2 = this.calculateRawInLab(lab1, lab2);
    return Math.sqrt(dE2 + dA * dA);
  }
  calculateRawInLab(Lab1, Lab2) {
    const L1 = Lab1.L;
    const a1 = Lab1.a;
    const b1 = Lab1.b;
    const L2 = Lab2.L;
    const a2 = Lab2.a;
    const b2 = Lab2.b;
    const C1 = Math.sqrt(a1 * a1 + b1 * b1);
    const C2 = Math.sqrt(a2 * a2 + b2 * b2);
    const pow_a_C1_C2_to_7 = __pow((C1 + C2) / 2, 7);
    const G = 0.5 * (1 - Math.sqrt(pow_a_C1_C2_to_7 / (pow_a_C1_C2_to_7 + _CIEDE2000._pow25to7)));
    const a1p = (1 + G) * a1;
    const a2p = (1 + G) * a2;
    const C1p = Math.sqrt(a1p * a1p + b1 * b1);
    const C2p = Math.sqrt(a2p * a2p + b2 * b2);
    const C1pC2p = C1p * C2p;
    const h1p = _CIEDE2000._calculatehp(b1, a1p);
    const h2p = _CIEDE2000._calculatehp(b2, a2p);
    const h_bar = Math.abs(h1p - h2p);
    const dLp = L2 - L1;
    const dCp = C2p - C1p;
    const dHp = _CIEDE2000._calculate_dHp(C1pC2p, h_bar, h2p, h1p);
    const ahp = _CIEDE2000._calculate_ahp(C1pC2p, h_bar, h1p, h2p);
    const T = _CIEDE2000._calculateT(ahp);
    const aCp = (C1p + C2p) / 2;
    const aLp_minus_50_square = __pow((L1 + L2) / 2 - 50, 2);
    const S_L = 1 + 0.015 * aLp_minus_50_square / Math.sqrt(20 + aLp_minus_50_square);
    const S_C = 1 + 0.045 * aCp;
    const S_H = 1 + 0.015 * T * aCp;
    const R_T = _CIEDE2000._calculateRT(ahp, aCp);
    const dLpSL = dLp / S_L;
    const dCpSC = dCp / S_C;
    const dHpSH = dHp / S_H;
    return __pow(dLpSL, 2) + __pow(dCpSC, 2) + __pow(dHpSH, 2) + R_T * dCpSC * dHpSH;
  }
};
let CIEDE2000 = _CIEDE2000;
CIEDE2000._kA = 0.25 * 100 / 255;
CIEDE2000._pow25to7 = __pow(25, 7);
CIEDE2000._deg360InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(360);
CIEDE2000._deg180InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(180);
CIEDE2000._deg30InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(30);
CIEDE2000._deg6InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(6);
CIEDE2000._deg63InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(63);
CIEDE2000._deg275InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(275);
CIEDE2000._deg25InRad = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.degrees2radians)(25);


/***/ }),

/***/ "./src/distance/cmetric.ts":
/*!*********************************!*\
  !*** ./src/distance/cmetric.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CMetric": () => (/* binding */ CMetric)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * cmetric.ts - part of Image Quantization Library
 */

class CMetric extends _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const rmean = (r1 + r2) / 2 * this._whitePoint.r;
    const r = (r1 - r2) * this._whitePoint.r;
    const g = (g1 - g2) * this._whitePoint.g;
    const b = (b1 - b2) * this._whitePoint.b;
    const dE = ((512 + rmean) * r * r >> 8) + 4 * g * g + ((767 - rmean) * b * b >> 8);
    const dA = (a2 - a1) * this._whitePoint.a;
    return Math.sqrt(dE + dA * dA);
  }
  _setDefaults() {
  }
}


/***/ }),

/***/ "./src/distance/distanceCalculator.ts":
/*!********************************************!*\
  !*** ./src/distance/distanceCalculator.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDistanceCalculator": () => (/* binding */ AbstractDistanceCalculator)
/* harmony export */ });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * common.ts - part of Image Quantization Library
 */
class AbstractDistanceCalculator {
  constructor() {
    this._setDefaults();
    this.setWhitePoint(255, 255, 255, 255);
  }
  setWhitePoint(r, g, b, a) {
    this._whitePoint = {
      r: r > 0 ? 255 / r : 0,
      g: g > 0 ? 255 / g : 0,
      b: b > 0 ? 255 / b : 0,
      a: a > 0 ? 255 / a : 0
    };
    this._maxDistance = this.calculateRaw(r, g, b, a, 0, 0, 0, 0);
  }
  calculateNormalized(colorA, colorB) {
    return this.calculateRaw(colorA.r, colorA.g, colorA.b, colorA.a, colorB.r, colorB.g, colorB.b, colorB.a) / this._maxDistance;
  }
}


/***/ }),

/***/ "./src/distance/euclidean.ts":
/*!***********************************!*\
  !*** ./src/distance/euclidean.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractEuclidean": () => (/* binding */ AbstractEuclidean),
/* harmony export */   "Euclidean": () => (/* binding */ Euclidean),
/* harmony export */   "EuclideanBT709": () => (/* binding */ EuclideanBT709),
/* harmony export */   "EuclideanBT709NoAlpha": () => (/* binding */ EuclideanBT709NoAlpha)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/* harmony import */ var _constants_bt709__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/bt709 */ "./src/constants/bt709.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * euclidean.ts - part of Image Quantization Library
 */


class AbstractEuclidean extends _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const dR = r2 - r1;
    const dG = g2 - g1;
    const dB = b2 - b1;
    const dA = a2 - a1;
    return Math.sqrt(this._kR * dR * dR + this._kG * dG * dG + this._kB * dB * dB + this._kA * dA * dA);
  }
}
class Euclidean extends AbstractEuclidean {
  _setDefaults() {
    this._kR = 1;
    this._kG = 1;
    this._kB = 1;
    this._kA = 1;
  }
}
class EuclideanBT709 extends AbstractEuclidean {
  _setDefaults() {
    this._kR = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.RED;
    this._kG = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.GREEN;
    this._kB = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.BLUE;
    this._kA = 1;
  }
}
class EuclideanBT709NoAlpha extends AbstractEuclidean {
  _setDefaults() {
    this._kR = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.RED;
    this._kG = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.GREEN;
    this._kB = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.BLUE;
    this._kA = 0;
  }
}


/***/ }),

/***/ "./src/distance/index.ts":
/*!*******************************!*\
  !*** ./src/distance/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDistanceCalculator": () => (/* reexport safe */ _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator),
/* harmony export */   "CIE94Textiles": () => (/* reexport safe */ _cie94__WEBPACK_IMPORTED_MODULE_1__.CIE94Textiles),
/* harmony export */   "CIE94GraphicArts": () => (/* reexport safe */ _cie94__WEBPACK_IMPORTED_MODULE_1__.CIE94GraphicArts),
/* harmony export */   "CIEDE2000": () => (/* reexport safe */ _ciede2000__WEBPACK_IMPORTED_MODULE_2__.CIEDE2000),
/* harmony export */   "CMetric": () => (/* reexport safe */ _cmetric__WEBPACK_IMPORTED_MODULE_3__.CMetric),
/* harmony export */   "AbstractEuclidean": () => (/* reexport safe */ _euclidean__WEBPACK_IMPORTED_MODULE_4__.AbstractEuclidean),
/* harmony export */   "Euclidean": () => (/* reexport safe */ _euclidean__WEBPACK_IMPORTED_MODULE_4__.Euclidean),
/* harmony export */   "EuclideanBT709NoAlpha": () => (/* reexport safe */ _euclidean__WEBPACK_IMPORTED_MODULE_4__.EuclideanBT709NoAlpha),
/* harmony export */   "EuclideanBT709": () => (/* reexport safe */ _euclidean__WEBPACK_IMPORTED_MODULE_4__.EuclideanBT709),
/* harmony export */   "AbstractManhattan": () => (/* reexport safe */ _manhattan__WEBPACK_IMPORTED_MODULE_5__.AbstractManhattan),
/* harmony export */   "Manhattan": () => (/* reexport safe */ _manhattan__WEBPACK_IMPORTED_MODULE_5__.Manhattan),
/* harmony export */   "ManhattanBT709": () => (/* reexport safe */ _manhattan__WEBPACK_IMPORTED_MODULE_5__.ManhattanBT709),
/* harmony export */   "ManhattanNommyde": () => (/* reexport safe */ _manhattan__WEBPACK_IMPORTED_MODULE_5__.ManhattanNommyde),
/* harmony export */   "PNGQuant": () => (/* reexport safe */ _pngQuant__WEBPACK_IMPORTED_MODULE_6__.PNGQuant)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/* harmony import */ var _cie94__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cie94 */ "./src/distance/cie94.ts");
/* harmony import */ var _ciede2000__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ciede2000 */ "./src/distance/ciede2000.ts");
/* harmony import */ var _cmetric__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cmetric */ "./src/distance/cmetric.ts");
/* harmony import */ var _euclidean__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./euclidean */ "./src/distance/euclidean.ts");
/* harmony import */ var _manhattan__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./manhattan */ "./src/distance/manhattan.ts");
/* harmony import */ var _pngQuant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pngQuant */ "./src/distance/pngQuant.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */









/***/ }),

/***/ "./src/distance/manhattan.ts":
/*!***********************************!*\
  !*** ./src/distance/manhattan.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractManhattan": () => (/* binding */ AbstractManhattan),
/* harmony export */   "Manhattan": () => (/* binding */ Manhattan),
/* harmony export */   "ManhattanNommyde": () => (/* binding */ ManhattanNommyde),
/* harmony export */   "ManhattanBT709": () => (/* binding */ ManhattanBT709)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/* harmony import */ var _constants_bt709__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/bt709 */ "./src/constants/bt709.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * manhattanNeuQuant.ts - part of Image Quantization Library
 */


class AbstractManhattan extends _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    let dR = r2 - r1;
    let dG = g2 - g1;
    let dB = b2 - b1;
    let dA = a2 - a1;
    if (dR < 0)
      dR = 0 - dR;
    if (dG < 0)
      dG = 0 - dG;
    if (dB < 0)
      dB = 0 - dB;
    if (dA < 0)
      dA = 0 - dA;
    return this._kR * dR + this._kG * dG + this._kB * dB + this._kA * dA;
  }
}
class Manhattan extends AbstractManhattan {
  _setDefaults() {
    this._kR = 1;
    this._kG = 1;
    this._kB = 1;
    this._kA = 1;
  }
}
class ManhattanNommyde extends AbstractManhattan {
  _setDefaults() {
    this._kR = 0.4984;
    this._kG = 0.8625;
    this._kB = 0.2979;
    this._kA = 1;
  }
}
class ManhattanBT709 extends AbstractManhattan {
  _setDefaults() {
    this._kR = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.RED;
    this._kG = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.GREEN;
    this._kB = _constants_bt709__WEBPACK_IMPORTED_MODULE_1__.Y.BLUE;
    this._kA = 1;
  }
}


/***/ }),

/***/ "./src/distance/pngQuant.ts":
/*!**********************************!*\
  !*** ./src/distance/pngQuant.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PNGQuant": () => (/* binding */ PNGQuant)
/* harmony export */ });
/* harmony import */ var _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./distanceCalculator */ "./src/distance/distanceCalculator.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pngQuant.ts - part of Image Quantization Library
 */

class PNGQuant extends _distanceCalculator__WEBPACK_IMPORTED_MODULE_0__.AbstractDistanceCalculator {
  calculateRaw(r1, g1, b1, a1, r2, g2, b2, a2) {
    const alphas = (a2 - a1) * this._whitePoint.a;
    return this._colordifferenceCh(r1 * this._whitePoint.r, r2 * this._whitePoint.r, alphas) + this._colordifferenceCh(g1 * this._whitePoint.g, g2 * this._whitePoint.g, alphas) + this._colordifferenceCh(b1 * this._whitePoint.b, b2 * this._whitePoint.b, alphas);
  }
  _colordifferenceCh(x, y, alphas) {
    const black = x - y;
    const white = black + alphas;
    return black * black + white * white;
  }
  _setDefaults() {
  }
}


/***/ }),

/***/ "./src/image/array.ts":
/*!****************************!*\
  !*** ./src/image/array.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorDiffusionArrayKernel": () => (/* binding */ ErrorDiffusionArrayKernel),
/* harmony export */   "ErrorDiffusionArray": () => (/* binding */ ErrorDiffusionArray)
/* harmony export */ });
/* harmony import */ var _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageQuantizer */ "./src/image/imageQuantizer.ts");
/* harmony import */ var _utils_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/point */ "./src/utils/point.ts");
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/arithmetic */ "./src/utils/arithmetic.ts");
/* harmony import */ var _utils_progressTracker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/progressTracker */ "./src/utils/progressTracker.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ditherErrorDiffusionArray.ts - part of Image Quantization Library
 */




var ErrorDiffusionArrayKernel = /* @__PURE__ */ ((ErrorDiffusionArrayKernel2) => {
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["FloydSteinberg"] = 0] = "FloydSteinberg";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["FalseFloydSteinberg"] = 1] = "FalseFloydSteinberg";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["Stucki"] = 2] = "Stucki";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["Atkinson"] = 3] = "Atkinson";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["Jarvis"] = 4] = "Jarvis";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["Burkes"] = 5] = "Burkes";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["Sierra"] = 6] = "Sierra";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["TwoSierra"] = 7] = "TwoSierra";
  ErrorDiffusionArrayKernel2[ErrorDiffusionArrayKernel2["SierraLite"] = 8] = "SierraLite";
  return ErrorDiffusionArrayKernel2;
})(ErrorDiffusionArrayKernel || {});
class ErrorDiffusionArray extends _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__.AbstractImageQuantizer {
  constructor(colorDistanceCalculator, kernel, serpentine = true, minimumColorDistanceToDither = 0, calculateErrorLikeGIMP = false) {
    super();
    this._setKernel(kernel);
    this._distance = colorDistanceCalculator;
    this._minColorDistance = minimumColorDistanceToDither;
    this._serpentine = serpentine;
    this._calculateErrorLikeGIMP = calculateErrorLikeGIMP;
  }
  *quantize(pointContainer, palette) {
    const pointArray = pointContainer.getPointArray();
    const originalPoint = new _utils_point__WEBPACK_IMPORTED_MODULE_1__.Point();
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const errorLines = [];
    let dir = 1;
    let maxErrorLines = 1;
    for (const kernel of this._kernel) {
      const kernelErrorLines = kernel[2] + 1;
      if (maxErrorLines < kernelErrorLines)
        maxErrorLines = kernelErrorLines;
    }
    for (let i = 0; i < maxErrorLines; i++) {
      this._fillErrorLine(errorLines[i] = [], width);
    }
    const tracker = new _utils_progressTracker__WEBPACK_IMPORTED_MODULE_3__.ProgressTracker(height, 99);
    for (let y = 0; y < height; y++) {
      if (tracker.shouldNotify(y)) {
        yield {
          progress: tracker.progress
        };
      }
      if (this._serpentine)
        dir *= -1;
      const lni = y * width;
      const xStart = dir === 1 ? 0 : width - 1;
      const xEnd = dir === 1 ? width : -1;
      this._fillErrorLine(errorLines[0], width);
      errorLines.push(errorLines.shift());
      const errorLine = errorLines[0];
      for (let x = xStart, idx = lni + xStart; x !== xEnd; x += dir, idx += dir) {
        const point = pointArray[idx];
        const error = errorLine[x];
        originalPoint.from(point);
        const correctedPoint = _utils_point__WEBPACK_IMPORTED_MODULE_1__.Point.createByRGBA((0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255Rounded)(point.r + error[0]), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255Rounded)(point.g + error[1]), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255Rounded)(point.b + error[2]), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_2__.inRange0to255Rounded)(point.a + error[3]));
        const palettePoint = palette.getNearestColor(this._distance, correctedPoint);
        point.from(palettePoint);
        if (this._minColorDistance) {
          const dist = this._distance.calculateNormalized(originalPoint, palettePoint);
          if (dist < this._minColorDistance)
            continue;
        }
        let er;
        let eg;
        let eb;
        let ea;
        if (this._calculateErrorLikeGIMP) {
          er = correctedPoint.r - palettePoint.r;
          eg = correctedPoint.g - palettePoint.g;
          eb = correctedPoint.b - palettePoint.b;
          ea = correctedPoint.a - palettePoint.a;
        } else {
          er = originalPoint.r - palettePoint.r;
          eg = originalPoint.g - palettePoint.g;
          eb = originalPoint.b - palettePoint.b;
          ea = originalPoint.a - palettePoint.a;
        }
        const dStart = dir === 1 ? 0 : this._kernel.length - 1;
        const dEnd = dir === 1 ? this._kernel.length : -1;
        for (let i = dStart; i !== dEnd; i += dir) {
          const x1 = this._kernel[i][1] * dir;
          const y1 = this._kernel[i][2];
          if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
            const d = this._kernel[i][0];
            const e = errorLines[y1][x1 + x];
            e[0] += er * d;
            e[1] += eg * d;
            e[2] += eb * d;
            e[3] += ea * d;
          }
        }
      }
    }
    yield {
      pointContainer,
      progress: 100
    };
  }
  _fillErrorLine(errorLine, width) {
    if (errorLine.length > width) {
      errorLine.length = width;
    }
    const l = errorLine.length;
    for (let i = 0; i < l; i++) {
      const error = errorLine[i];
      error[0] = error[1] = error[2] = error[3] = 0;
    }
    for (let i = l; i < width; i++) {
      errorLine[i] = [0, 0, 0, 0];
    }
  }
  _setKernel(kernel) {
    switch (kernel) {
      case 0 /* FloydSteinberg */:
        this._kernel = [
          [7 / 16, 1, 0],
          [3 / 16, -1, 1],
          [5 / 16, 0, 1],
          [1 / 16, 1, 1]
        ];
        break;
      case 1 /* FalseFloydSteinberg */:
        this._kernel = [
          [3 / 8, 1, 0],
          [3 / 8, 0, 1],
          [2 / 8, 1, 1]
        ];
        break;
      case 2 /* Stucki */:
        this._kernel = [
          [8 / 42, 1, 0],
          [4 / 42, 2, 0],
          [2 / 42, -2, 1],
          [4 / 42, -1, 1],
          [8 / 42, 0, 1],
          [4 / 42, 1, 1],
          [2 / 42, 2, 1],
          [1 / 42, -2, 2],
          [2 / 42, -1, 2],
          [4 / 42, 0, 2],
          [2 / 42, 1, 2],
          [1 / 42, 2, 2]
        ];
        break;
      case 3 /* Atkinson */:
        this._kernel = [
          [1 / 8, 1, 0],
          [1 / 8, 2, 0],
          [1 / 8, -1, 1],
          [1 / 8, 0, 1],
          [1 / 8, 1, 1],
          [1 / 8, 0, 2]
        ];
        break;
      case 4 /* Jarvis */:
        this._kernel = [
          [7 / 48, 1, 0],
          [5 / 48, 2, 0],
          [3 / 48, -2, 1],
          [5 / 48, -1, 1],
          [7 / 48, 0, 1],
          [5 / 48, 1, 1],
          [3 / 48, 2, 1],
          [1 / 48, -2, 2],
          [3 / 48, -1, 2],
          [5 / 48, 0, 2],
          [3 / 48, 1, 2],
          [1 / 48, 2, 2]
        ];
        break;
      case 5 /* Burkes */:
        this._kernel = [
          [8 / 32, 1, 0],
          [4 / 32, 2, 0],
          [2 / 32, -2, 1],
          [4 / 32, -1, 1],
          [8 / 32, 0, 1],
          [4 / 32, 1, 1],
          [2 / 32, 2, 1]
        ];
        break;
      case 6 /* Sierra */:
        this._kernel = [
          [5 / 32, 1, 0],
          [3 / 32, 2, 0],
          [2 / 32, -2, 1],
          [4 / 32, -1, 1],
          [5 / 32, 0, 1],
          [4 / 32, 1, 1],
          [2 / 32, 2, 1],
          [2 / 32, -1, 2],
          [3 / 32, 0, 2],
          [2 / 32, 1, 2]
        ];
        break;
      case 7 /* TwoSierra */:
        this._kernel = [
          [4 / 16, 1, 0],
          [3 / 16, 2, 0],
          [1 / 16, -2, 1],
          [2 / 16, -1, 1],
          [3 / 16, 0, 1],
          [2 / 16, 1, 1],
          [1 / 16, 2, 1]
        ];
        break;
      case 8 /* SierraLite */:
        this._kernel = [
          [2 / 4, 1, 0],
          [1 / 4, -1, 1],
          [1 / 4, 0, 1]
        ];
        break;
      default:
        throw new Error(`ErrorDiffusionArray: unknown kernel = ${kernel}`);
    }
  }
}


/***/ }),

/***/ "./src/image/imageQuantizer.ts":
/*!*************************************!*\
  !*** ./src/image/imageQuantizer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractImageQuantizer": () => (/* binding */ AbstractImageQuantizer)
/* harmony export */ });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * common.ts - part of Image Quantization Library
 */
class AbstractImageQuantizer {
  quantizeSync(pointContainer, palette) {
    for (const value of this.quantize(pointContainer, palette)) {
      if (value.pointContainer) {
        return value.pointContainer;
      }
    }
    throw new Error("unreachable");
  }
}


/***/ }),

/***/ "./src/image/imageQuantizerYieldValue.ts":
/*!***********************************************!*\
  !*** ./src/image/imageQuantizerYieldValue.ts ***!
  \***********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/image/index.ts":
/*!****************************!*\
  !*** ./src/image/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractImageQuantizer": () => (/* reexport safe */ _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__.AbstractImageQuantizer),
/* harmony export */   "ImageQuantizerYieldValue": () => (/* reexport safe */ _imageQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_1__.ImageQuantizerYieldValue),
/* harmony export */   "NearestColor": () => (/* reexport safe */ _nearestColor__WEBPACK_IMPORTED_MODULE_2__.NearestColor),
/* harmony export */   "ErrorDiffusionArray": () => (/* reexport safe */ _array__WEBPACK_IMPORTED_MODULE_3__.ErrorDiffusionArray),
/* harmony export */   "ErrorDiffusionArrayKernel": () => (/* reexport safe */ _array__WEBPACK_IMPORTED_MODULE_3__.ErrorDiffusionArrayKernel),
/* harmony export */   "ErrorDiffusionRiemersma": () => (/* reexport safe */ _riemersma__WEBPACK_IMPORTED_MODULE_4__.ErrorDiffusionRiemersma)
/* harmony export */ });
/* harmony import */ var _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageQuantizer */ "./src/image/imageQuantizer.ts");
/* harmony import */ var _imageQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imageQuantizerYieldValue */ "./src/image/imageQuantizerYieldValue.ts");
/* harmony import */ var _imageQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_imageQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nearestColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nearestColor */ "./src/image/nearestColor.ts");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array */ "./src/image/array.ts");
/* harmony import */ var _riemersma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./riemersma */ "./src/image/riemersma.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */







/***/ }),

/***/ "./src/image/nearestColor.ts":
/*!***********************************!*\
  !*** ./src/image/nearestColor.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NearestColor": () => (/* binding */ NearestColor)
/* harmony export */ });
/* harmony import */ var _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageQuantizer */ "./src/image/imageQuantizer.ts");
/* harmony import */ var _utils_progressTracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/progressTracker */ "./src/utils/progressTracker.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * nearestColor.ts - part of Image Quantization Library
 */


class NearestColor extends _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__.AbstractImageQuantizer {
  constructor(colorDistanceCalculator) {
    super();
    this._distance = colorDistanceCalculator;
  }
  *quantize(pointContainer, palette) {
    const pointArray = pointContainer.getPointArray();
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const tracker = new _utils_progressTracker__WEBPACK_IMPORTED_MODULE_1__.ProgressTracker(height, 99);
    for (let y = 0; y < height; y++) {
      if (tracker.shouldNotify(y)) {
        yield {
          progress: tracker.progress
        };
      }
      for (let x = 0, idx = y * width; x < width; x++, idx++) {
        const point = pointArray[idx];
        point.from(palette.getNearestColor(this._distance, point));
      }
    }
    yield {
      pointContainer,
      progress: 100
    };
  }
}


/***/ }),

/***/ "./src/image/riemersma.ts":
/*!********************************!*\
  !*** ./src/image/riemersma.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorDiffusionRiemersma": () => (/* binding */ ErrorDiffusionRiemersma)
/* harmony export */ });
/* harmony import */ var _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageQuantizer */ "./src/image/imageQuantizer.ts");
/* harmony import */ var _spaceFillingCurves_hilbertCurve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spaceFillingCurves/hilbertCurve */ "./src/image/spaceFillingCurves/hilbertCurve.ts");
/* harmony import */ var _utils_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/point */ "./src/utils/point.ts");
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/arithmetic */ "./src/utils/arithmetic.ts");
/**
 * @preserve
 * MIT License
 *
 * Copyright 2015-2018 Igor Bezkrovnyi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * riemersma.ts - part of Image Quantization Library
 */




class ErrorDiffusionRiemersma extends _imageQuantizer__WEBPACK_IMPORTED_MODULE_0__.AbstractImageQuantizer {
  constructor(colorDistanceCalculator, errorQueueSize = 16, errorPropagation = 1) {
    super();
    this._distance = colorDistanceCalculator;
    this._errorQueueSize = errorQueueSize;
    this._weights = ErrorDiffusionRiemersma._createWeights(errorPropagation, errorQueueSize);
  }
  *quantize(pointContainer, palette) {
    const pointArray = pointContainer.getPointArray();
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const errorQueue = [];
    let head = 0;
    for (let i = 0; i < this._errorQueueSize; i++) {
      errorQueue[i] = { r: 0, g: 0, b: 0, a: 0 };
    }
    yield* (0,_spaceFillingCurves_hilbertCurve__WEBPACK_IMPORTED_MODULE_1__.hilbertCurve)(width, height, (x, y) => {
      const p = pointArray[x + y * width];
      let { r, g, b, a } = p;
      for (let i = 0; i < this._errorQueueSize; i++) {
        const weight = this._weights[i];
        const e = errorQueue[(i + head) % this._errorQueueSize];
        r += e.r * weight;
        g += e.g * weight;
        b += e.b * weight;
        a += e.a * weight;
      }
      const correctedPoint = _utils_point__WEBPACK_IMPORTED_MODULE_2__.Point.createByRGBA((0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_3__.inRange0to255Rounded)(r), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_3__.inRange0to255Rounded)(g), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_3__.inRange0to255Rounded)(b), (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_3__.inRange0to255Rounded)(a));
      const quantizedPoint = palette.getNearestColor(this._distance, correctedPoint);
      head = (head + 1) % this._errorQueueSize;
      const tail = (head + this._errorQueueSize - 1) % this._errorQueueSize;
      errorQueue[tail].r = p.r - quantizedPoint.r;
      errorQueue[tail].g = p.g - quantizedPoint.g;
      errorQueue[tail].b = p.b - quantizedPoint.b;
      errorQueue[tail].a = p.a - quantizedPoint.a;
      p.from(quantizedPoint);
    });
    yield {
      pointContainer,
      progress: 100
    };
  }
  static _createWeights(errorPropagation, errorQueueSize) {
    const weights = [];
    const multiplier = Math.exp(Math.log(errorQueueSize) / (errorQueueSize - 1));
    for (let i = 0, next = 1; i < errorQueueSize; i++) {
      weights[i] = (next + 0.5 | 0) / errorQueueSize * errorPropagation;
      next *= multiplier;
    }
    return weights;
  }
}


/***/ }),

/***/ "./src/image/spaceFillingCurves/hilbertCurve.ts":
/*!******************************************************!*\
  !*** ./src/image/spaceFillingCurves/hilbertCurve.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hilbertCurve": () => (/* binding */ hilbertCurve)
/* harmony export */ });
/* harmony import */ var _utils_progressTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/progressTracker */ "./src/utils/progressTracker.ts");

var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["NONE"] = 0] = "NONE";
  Direction2[Direction2["UP"] = 1] = "UP";
  Direction2[Direction2["LEFT"] = 2] = "LEFT";
  Direction2[Direction2["RIGHT"] = 3] = "RIGHT";
  Direction2[Direction2["DOWN"] = 4] = "DOWN";
  return Direction2;
})(Direction || {});
function* hilbertCurve(width, height, callback) {
  const maxBound = Math.max(width, height);
  const level = Math.floor(Math.log(maxBound) / Math.log(2) + 1);
  const tracker = new _utils_progressTracker__WEBPACK_IMPORTED_MODULE_0__.ProgressTracker(width * height, 99);
  const data = {
    width,
    height,
    level,
    callback,
    tracker,
    index: 0,
    x: 0,
    y: 0
  };
  yield* walkHilbert(data, 1 /* UP */);
  visit(data, 0 /* NONE */);
}
function* walkHilbert(data, direction) {
  if (data.level < 1)
    return;
  if (data.tracker.shouldNotify(data.index)) {
    yield { progress: data.tracker.progress };
  }
  data.level--;
  switch (direction) {
    case 2 /* LEFT */:
      yield* walkHilbert(data, 1 /* UP */);
      visit(data, 3 /* RIGHT */);
      yield* walkHilbert(data, 2 /* LEFT */);
      visit(data, 4 /* DOWN */);
      yield* walkHilbert(data, 2 /* LEFT */);
      visit(data, 2 /* LEFT */);
      yield* walkHilbert(data, 4 /* DOWN */);
      break;
    case 3 /* RIGHT */:
      yield* walkHilbert(data, 4 /* DOWN */);
      visit(data, 2 /* LEFT */);
      yield* walkHilbert(data, 3 /* RIGHT */);
      visit(data, 1 /* UP */);
      yield* walkHilbert(data, 3 /* RIGHT */);
      visit(data, 3 /* RIGHT */);
      yield* walkHilbert(data, 1 /* UP */);
      break;
    case 1 /* UP */:
      yield* walkHilbert(data, 2 /* LEFT */);
      visit(data, 4 /* DOWN */);
      yield* walkHilbert(data, 1 /* UP */);
      visit(data, 3 /* RIGHT */);
      yield* walkHilbert(data, 1 /* UP */);
      visit(data, 1 /* UP */);
      yield* walkHilbert(data, 3 /* RIGHT */);
      break;
    case 4 /* DOWN */:
      yield* walkHilbert(data, 3 /* RIGHT */);
      visit(data, 1 /* UP */);
      yield* walkHilbert(data, 4 /* DOWN */);
      visit(data, 2 /* LEFT */);
      yield* walkHilbert(data, 4 /* DOWN */);
      visit(data, 4 /* DOWN */);
      yield* walkHilbert(data, 2 /* LEFT */);
      break;
    default:
      break;
  }
  data.level++;
}
function visit(data, direction) {
  if (data.x >= 0 && data.x < data.width && data.y >= 0 && data.y < data.height) {
    data.callback(data.x, data.y);
    data.index++;
  }
  switch (direction) {
    case 2 /* LEFT */:
      data.x--;
      break;
    case 3 /* RIGHT */:
      data.x++;
      break;
    case 1 /* UP */:
      data.y--;
      break;
    case 4 /* DOWN */:
      data.y++;
      break;
  }
}


/***/ }),

/***/ "./src/palette/index.ts":
/*!******************************!*\
  !*** ./src/palette/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractPaletteQuantizer": () => (/* reexport safe */ _paletteQuantizer__WEBPACK_IMPORTED_MODULE_0__.AbstractPaletteQuantizer),
/* harmony export */   "NeuQuant": () => (/* reexport safe */ _neuquant_neuquant__WEBPACK_IMPORTED_MODULE_1__.NeuQuant),
/* harmony export */   "NeuQuantFloat": () => (/* reexport safe */ _neuquant_neuquantFloat__WEBPACK_IMPORTED_MODULE_2__.NeuQuantFloat),
/* harmony export */   "RGBQuant": () => (/* reexport safe */ _rgbquant_rgbquant__WEBPACK_IMPORTED_MODULE_3__.RGBQuant),
/* harmony export */   "ColorHistogram": () => (/* reexport safe */ _rgbquant_colorHistogram__WEBPACK_IMPORTED_MODULE_4__.ColorHistogram),
/* harmony export */   "WuQuant": () => (/* reexport safe */ _wu_wuQuant__WEBPACK_IMPORTED_MODULE_5__.WuQuant),
/* harmony export */   "WuColorCube": () => (/* reexport safe */ _wu_wuQuant__WEBPACK_IMPORTED_MODULE_5__.WuColorCube),
/* harmony export */   "PaletteQuantizerYieldValue": () => (/* reexport safe */ _paletteQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_6__.PaletteQuantizerYieldValue)
/* harmony export */ });
/* harmony import */ var _paletteQuantizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paletteQuantizer */ "./src/palette/paletteQuantizer.ts");
/* harmony import */ var _neuquant_neuquant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./neuquant/neuquant */ "./src/palette/neuquant/neuquant.ts");
/* harmony import */ var _neuquant_neuquantFloat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./neuquant/neuquantFloat */ "./src/palette/neuquant/neuquantFloat.ts");
/* harmony import */ var _rgbquant_rgbquant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rgbquant/rgbquant */ "./src/palette/rgbquant/rgbquant.ts");
/* harmony import */ var _rgbquant_colorHistogram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rgbquant/colorHistogram */ "./src/palette/rgbquant/colorHistogram.ts");
/* harmony import */ var _wu_wuQuant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./wu/wuQuant */ "./src/palette/wu/wuQuant.ts");
/* harmony import */ var _paletteQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paletteQuantizerYieldValue */ "./src/palette/paletteQuantizerYieldValue.ts");
/* harmony import */ var _paletteQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_paletteQuantizerYieldValue__WEBPACK_IMPORTED_MODULE_6__);
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */









/***/ }),

/***/ "./src/palette/neuquant/neuquant.ts":
/*!******************************************!*\
  !*** ./src/palette/neuquant/neuquant.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NeuQuant": () => (/* binding */ NeuQuant)
/* harmony export */ });
/* harmony import */ var _utils_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/palette */ "./src/utils/palette.ts");
/* harmony import */ var _utils_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/point */ "./src/utils/point.ts");
/* harmony import */ var _paletteQuantizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../paletteQuantizer */ "./src/palette/paletteQuantizer.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */




const networkBiasShift = 3;
class Neuron {
  constructor(defaultValue) {
    this.r = this.g = this.b = this.a = defaultValue;
  }
  toPoint() {
    return _utils_point__WEBPACK_IMPORTED_MODULE_1__.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
  }
  subtract(r, g, b, a) {
    this.r -= r | 0;
    this.g -= g | 0;
    this.b -= b | 0;
    this.a -= a | 0;
  }
}
const _NeuQuant = class extends _paletteQuantizer__WEBPACK_IMPORTED_MODULE_2__.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256) {
    super();
    this._distance = colorDistanceCalculator;
    this._pointArray = [];
    this._sampleFactor = 1;
    this._networkSize = colors;
    this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
  }
  sample(pointContainer) {
    this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
  }
  *quantize() {
    this._init();
    yield* this._learn();
    yield {
      palette: this._buildPalette(),
      progress: 100
    };
  }
  _init() {
    this._freq = [];
    this._bias = [];
    this._radPower = [];
    this._network = [];
    for (let i = 0; i < this._networkSize; i++) {
      this._network[i] = new Neuron((i << networkBiasShift + 8) / this._networkSize | 0);
      this._freq[i] = _NeuQuant._initialBias / this._networkSize | 0;
      this._bias[i] = 0;
    }
  }
  *_learn() {
    let sampleFactor = this._sampleFactor;
    const pointsNumber = this._pointArray.length;
    if (pointsNumber < _NeuQuant._minpicturebytes)
      sampleFactor = 1;
    const alphadec = 30 + (sampleFactor - 1) / 3 | 0;
    const pointsToSample = pointsNumber / sampleFactor | 0;
    let delta = pointsToSample / _NeuQuant._nCycles | 0;
    let alpha = _NeuQuant._initAlpha;
    let radius = (this._networkSize >> 3) * _NeuQuant._radiusBias;
    let rad = radius >> _NeuQuant._radiusBiasShift;
    if (rad <= 1)
      rad = 0;
    for (let i = 0; i < rad; i++) {
      this._radPower[i] = alpha * ((rad * rad - i * i) * _NeuQuant._radBias / (rad * rad)) >>> 0;
    }
    let step;
    if (pointsNumber < _NeuQuant._minpicturebytes) {
      step = 1;
    } else if (pointsNumber % _NeuQuant._prime1 !== 0) {
      step = _NeuQuant._prime1;
    } else if (pointsNumber % _NeuQuant._prime2 !== 0) {
      step = _NeuQuant._prime2;
    } else if (pointsNumber % _NeuQuant._prime3 !== 0) {
      step = _NeuQuant._prime3;
    } else {
      step = _NeuQuant._prime4;
    }
    const tracker = new _utils__WEBPACK_IMPORTED_MODULE_3__.ProgressTracker(pointsToSample, 99);
    for (let i = 0, pointIndex = 0; i < pointsToSample; ) {
      if (tracker.shouldNotify(i)) {
        yield {
          progress: tracker.progress
        };
      }
      const point = this._pointArray[pointIndex];
      const b = point.b << networkBiasShift;
      const g = point.g << networkBiasShift;
      const r = point.r << networkBiasShift;
      const a = point.a << networkBiasShift;
      const neuronIndex = this._contest(b, g, r, a);
      this._alterSingle(alpha, neuronIndex, b, g, r, a);
      if (rad !== 0)
        this._alterNeighbour(rad, neuronIndex, b, g, r, a);
      pointIndex += step;
      if (pointIndex >= pointsNumber)
        pointIndex -= pointsNumber;
      i++;
      if (delta === 0)
        delta = 1;
      if (i % delta === 0) {
        alpha -= alpha / alphadec | 0;
        radius -= radius / _NeuQuant._radiusDecrease | 0;
        rad = radius >> _NeuQuant._radiusBiasShift;
        if (rad <= 1)
          rad = 0;
        for (let j = 0; j < rad; j++) {
          this._radPower[j] = alpha * ((rad * rad - j * j) * _NeuQuant._radBias / (rad * rad)) >>> 0;
        }
      }
    }
  }
  _buildPalette() {
    const palette = new _utils_palette__WEBPACK_IMPORTED_MODULE_0__.Palette();
    this._network.forEach((neuron) => {
      palette.add(neuron.toPoint());
    });
    palette.sort();
    return palette;
  }
  _alterNeighbour(rad, i, b, g, r, al) {
    let lo = i - rad;
    if (lo < -1)
      lo = -1;
    let hi = i + rad;
    if (hi > this._networkSize)
      hi = this._networkSize;
    let j = i + 1;
    let k = i - 1;
    let m = 1;
    while (j < hi || k > lo) {
      const a = this._radPower[m++] / _NeuQuant._alphaRadBias;
      if (j < hi) {
        const p = this._network[j++];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }
      if (k > lo) {
        const p = this._network[k--];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }
    }
  }
  _alterSingle(alpha, i, b, g, r, a) {
    alpha /= _NeuQuant._initAlpha;
    const n = this._network[i];
    n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
  }
  _contest(b, g, r, a) {
    const multiplier = 255 * 4 << networkBiasShift;
    let bestd = ~(1 << 31);
    let bestbiasd = bestd;
    let bestpos = -1;
    let bestbiaspos = bestpos;
    for (let i = 0; i < this._networkSize; i++) {
      const n = this._network[i];
      const dist = this._distance.calculateNormalized(n, { r, g, b, a }) * multiplier | 0;
      if (dist < bestd) {
        bestd = dist;
        bestpos = i;
      }
      const biasdist = dist - (this._bias[i] >> _NeuQuant._initialBiasShift - networkBiasShift);
      if (biasdist < bestbiasd) {
        bestbiasd = biasdist;
        bestbiaspos = i;
      }
      const betafreq = this._freq[i] >> _NeuQuant._betaShift;
      this._freq[i] -= betafreq;
      this._bias[i] += betafreq << _NeuQuant._gammaShift;
    }
    this._freq[bestpos] += _NeuQuant._beta;
    this._bias[bestpos] -= _NeuQuant._betaGamma;
    return bestbiaspos;
  }
};
let NeuQuant = _NeuQuant;
NeuQuant._prime1 = 499;
NeuQuant._prime2 = 491;
NeuQuant._prime3 = 487;
NeuQuant._prime4 = 503;
NeuQuant._minpicturebytes = _NeuQuant._prime4;
NeuQuant._nCycles = 100;
NeuQuant._initialBiasShift = 16;
NeuQuant._initialBias = 1 << _NeuQuant._initialBiasShift;
NeuQuant._gammaShift = 10;
NeuQuant._betaShift = 10;
NeuQuant._beta = _NeuQuant._initialBias >> _NeuQuant._betaShift;
NeuQuant._betaGamma = _NeuQuant._initialBias << _NeuQuant._gammaShift - _NeuQuant._betaShift;
NeuQuant._radiusBiasShift = 6;
NeuQuant._radiusBias = 1 << _NeuQuant._radiusBiasShift;
NeuQuant._radiusDecrease = 30;
NeuQuant._alphaBiasShift = 10;
NeuQuant._initAlpha = 1 << _NeuQuant._alphaBiasShift;
NeuQuant._radBiasShift = 8;
NeuQuant._radBias = 1 << _NeuQuant._radBiasShift;
NeuQuant._alphaRadBiasShift = _NeuQuant._alphaBiasShift + _NeuQuant._radBiasShift;
NeuQuant._alphaRadBias = 1 << _NeuQuant._alphaRadBiasShift;


/***/ }),

/***/ "./src/palette/neuquant/neuquantFloat.ts":
/*!***********************************************!*\
  !*** ./src/palette/neuquant/neuquantFloat.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NeuQuantFloat": () => (/* binding */ NeuQuantFloat)
/* harmony export */ });
/* harmony import */ var _utils_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/palette */ "./src/utils/palette.ts");
/* harmony import */ var _utils_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/point */ "./src/utils/point.ts");
/* harmony import */ var _paletteQuantizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../paletteQuantizer */ "./src/palette/paletteQuantizer.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * neuquant.ts - part of Image Quantization Library
 */




const networkBiasShift = 3;
class NeuronFloat {
  constructor(defaultValue) {
    this.r = this.g = this.b = this.a = defaultValue;
  }
  toPoint() {
    return _utils_point__WEBPACK_IMPORTED_MODULE_1__.Point.createByRGBA(this.r >> networkBiasShift, this.g >> networkBiasShift, this.b >> networkBiasShift, this.a >> networkBiasShift);
  }
  subtract(r, g, b, a) {
    this.r -= r;
    this.g -= g;
    this.b -= b;
    this.a -= a;
  }
}
const _NeuQuantFloat = class extends _paletteQuantizer__WEBPACK_IMPORTED_MODULE_2__.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256) {
    super();
    this._distance = colorDistanceCalculator;
    this._pointArray = [];
    this._sampleFactor = 1;
    this._networkSize = colors;
    this._distance.setWhitePoint(255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift, 255 << networkBiasShift);
  }
  sample(pointContainer) {
    this._pointArray = this._pointArray.concat(pointContainer.getPointArray());
  }
  *quantize() {
    this._init();
    yield* this._learn();
    yield {
      palette: this._buildPalette(),
      progress: 100
    };
  }
  _init() {
    this._freq = [];
    this._bias = [];
    this._radPower = [];
    this._network = [];
    for (let i = 0; i < this._networkSize; i++) {
      this._network[i] = new NeuronFloat((i << networkBiasShift + 8) / this._networkSize);
      this._freq[i] = _NeuQuantFloat._initialBias / this._networkSize;
      this._bias[i] = 0;
    }
  }
  *_learn() {
    let sampleFactor = this._sampleFactor;
    const pointsNumber = this._pointArray.length;
    if (pointsNumber < _NeuQuantFloat._minpicturebytes)
      sampleFactor = 1;
    const alphadec = 30 + (sampleFactor - 1) / 3;
    const pointsToSample = pointsNumber / sampleFactor;
    let delta = pointsToSample / _NeuQuantFloat._nCycles | 0;
    let alpha = _NeuQuantFloat._initAlpha;
    let radius = (this._networkSize >> 3) * _NeuQuantFloat._radiusBias;
    let rad = radius >> _NeuQuantFloat._radiusBiasShift;
    if (rad <= 1)
      rad = 0;
    for (let i = 0; i < rad; i++) {
      this._radPower[i] = alpha * ((rad * rad - i * i) * _NeuQuantFloat._radBias / (rad * rad));
    }
    let step;
    if (pointsNumber < _NeuQuantFloat._minpicturebytes) {
      step = 1;
    } else if (pointsNumber % _NeuQuantFloat._prime1 !== 0) {
      step = _NeuQuantFloat._prime1;
    } else if (pointsNumber % _NeuQuantFloat._prime2 !== 0) {
      step = _NeuQuantFloat._prime2;
    } else if (pointsNumber % _NeuQuantFloat._prime3 !== 0) {
      step = _NeuQuantFloat._prime3;
    } else {
      step = _NeuQuantFloat._prime4;
    }
    const tracker = new _utils__WEBPACK_IMPORTED_MODULE_3__.ProgressTracker(pointsToSample, 99);
    for (let i = 0, pointIndex = 0; i < pointsToSample; ) {
      if (tracker.shouldNotify(i)) {
        yield {
          progress: tracker.progress
        };
      }
      const point = this._pointArray[pointIndex];
      const b = point.b << networkBiasShift;
      const g = point.g << networkBiasShift;
      const r = point.r << networkBiasShift;
      const a = point.a << networkBiasShift;
      const neuronIndex = this._contest(b, g, r, a);
      this._alterSingle(alpha, neuronIndex, b, g, r, a);
      if (rad !== 0)
        this._alterNeighbour(rad, neuronIndex, b, g, r, a);
      pointIndex += step;
      if (pointIndex >= pointsNumber)
        pointIndex -= pointsNumber;
      i++;
      if (delta === 0)
        delta = 1;
      if (i % delta === 0) {
        alpha -= alpha / alphadec;
        radius -= radius / _NeuQuantFloat._radiusDecrease;
        rad = radius >> _NeuQuantFloat._radiusBiasShift;
        if (rad <= 1)
          rad = 0;
        for (let j = 0; j < rad; j++) {
          this._radPower[j] = alpha * ((rad * rad - j * j) * _NeuQuantFloat._radBias / (rad * rad));
        }
      }
    }
  }
  _buildPalette() {
    const palette = new _utils_palette__WEBPACK_IMPORTED_MODULE_0__.Palette();
    this._network.forEach((neuron) => {
      palette.add(neuron.toPoint());
    });
    palette.sort();
    return palette;
  }
  _alterNeighbour(rad, i, b, g, r, al) {
    let lo = i - rad;
    if (lo < -1)
      lo = -1;
    let hi = i + rad;
    if (hi > this._networkSize)
      hi = this._networkSize;
    let j = i + 1;
    let k = i - 1;
    let m = 1;
    while (j < hi || k > lo) {
      const a = this._radPower[m++] / _NeuQuantFloat._alphaRadBias;
      if (j < hi) {
        const p = this._network[j++];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }
      if (k > lo) {
        const p = this._network[k--];
        p.subtract(a * (p.r - r), a * (p.g - g), a * (p.b - b), a * (p.a - al));
      }
    }
  }
  _alterSingle(alpha, i, b, g, r, a) {
    alpha /= _NeuQuantFloat._initAlpha;
    const n = this._network[i];
    n.subtract(alpha * (n.r - r), alpha * (n.g - g), alpha * (n.b - b), alpha * (n.a - a));
  }
  _contest(b, g, r, al) {
    const multiplier = 255 * 4 << networkBiasShift;
    let bestd = ~(1 << 31);
    let bestbiasd = bestd;
    let bestpos = -1;
    let bestbiaspos = bestpos;
    for (let i = 0; i < this._networkSize; i++) {
      const n = this._network[i];
      const dist = this._distance.calculateNormalized(n, { r, g, b, a: al }) * multiplier;
      if (dist < bestd) {
        bestd = dist;
        bestpos = i;
      }
      const biasdist = dist - (this._bias[i] >> _NeuQuantFloat._initialBiasShift - networkBiasShift);
      if (biasdist < bestbiasd) {
        bestbiasd = biasdist;
        bestbiaspos = i;
      }
      const betafreq = this._freq[i] >> _NeuQuantFloat._betaShift;
      this._freq[i] -= betafreq;
      this._bias[i] += betafreq << _NeuQuantFloat._gammaShift;
    }
    this._freq[bestpos] += _NeuQuantFloat._beta;
    this._bias[bestpos] -= _NeuQuantFloat._betaGamma;
    return bestbiaspos;
  }
};
let NeuQuantFloat = _NeuQuantFloat;
NeuQuantFloat._prime1 = 499;
NeuQuantFloat._prime2 = 491;
NeuQuantFloat._prime3 = 487;
NeuQuantFloat._prime4 = 503;
NeuQuantFloat._minpicturebytes = _NeuQuantFloat._prime4;
NeuQuantFloat._nCycles = 100;
NeuQuantFloat._initialBiasShift = 16;
NeuQuantFloat._initialBias = 1 << _NeuQuantFloat._initialBiasShift;
NeuQuantFloat._gammaShift = 10;
NeuQuantFloat._betaShift = 10;
NeuQuantFloat._beta = _NeuQuantFloat._initialBias >> _NeuQuantFloat._betaShift;
NeuQuantFloat._betaGamma = _NeuQuantFloat._initialBias << _NeuQuantFloat._gammaShift - _NeuQuantFloat._betaShift;
NeuQuantFloat._radiusBiasShift = 6;
NeuQuantFloat._radiusBias = 1 << _NeuQuantFloat._radiusBiasShift;
NeuQuantFloat._radiusDecrease = 30;
NeuQuantFloat._alphaBiasShift = 10;
NeuQuantFloat._initAlpha = 1 << _NeuQuantFloat._alphaBiasShift;
NeuQuantFloat._radBiasShift = 8;
NeuQuantFloat._radBias = 1 << _NeuQuantFloat._radBiasShift;
NeuQuantFloat._alphaRadBiasShift = _NeuQuantFloat._alphaBiasShift + _NeuQuantFloat._radBiasShift;
NeuQuantFloat._alphaRadBias = 1 << _NeuQuantFloat._alphaRadBiasShift;


/***/ }),

/***/ "./src/palette/paletteQuantizer.ts":
/*!*****************************************!*\
  !*** ./src/palette/paletteQuantizer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractPaletteQuantizer": () => (/* binding */ AbstractPaletteQuantizer)
/* harmony export */ });
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * common.ts - part of Image Quantization Library
 */
class AbstractPaletteQuantizer {
  quantizeSync() {
    for (const value of this.quantize()) {
      if (value.palette) {
        return value.palette;
      }
    }
    throw new Error("unreachable");
  }
}


/***/ }),

/***/ "./src/palette/paletteQuantizerYieldValue.ts":
/*!***************************************************!*\
  !*** ./src/palette/paletteQuantizerYieldValue.ts ***!
  \***************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/palette/rgbquant/colorHistogram.ts":
/*!************************************************!*\
  !*** ./src/palette/rgbquant/colorHistogram.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorHistogram": () => (/* binding */ ColorHistogram)
/* harmony export */ });
/* harmony import */ var _utils_hueStatistics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/hueStatistics */ "./src/utils/hueStatistics.ts");
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/arithmetic */ "./src/utils/arithmetic.ts");
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * colorHistogram.ts - part of Image Quantization Library
 */


const _ColorHistogram = class {
  constructor(method, colors) {
    this._method = method;
    this._minHueCols = colors << 2;
    this._initColors = colors << 2;
    this._hueStats = new _utils_hueStatistics__WEBPACK_IMPORTED_MODULE_0__.HueStatistics(_ColorHistogram._hueGroups, this._minHueCols);
    this._histogram = Object.create(null);
  }
  sample(pointContainer) {
    switch (this._method) {
      case 1:
        this._colorStats1D(pointContainer);
        break;
      case 2:
        this._colorStats2D(pointContainer);
        break;
    }
  }
  getImportanceSortedColorsIDXI32() {
    const sorted = (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_1__.stableSort)(Object.keys(this._histogram), (a, b) => this._histogram[b] - this._histogram[a]);
    if (sorted.length === 0) {
      return [];
    }
    let idxi32;
    switch (this._method) {
      case 1:
        const initialColorsLimit = Math.min(sorted.length, this._initColors);
        const last = sorted[initialColorsLimit - 1];
        const freq = this._histogram[last];
        idxi32 = sorted.slice(0, initialColorsLimit);
        let pos = initialColorsLimit;
        const len = sorted.length;
        while (pos < len && this._histogram[sorted[pos]] === freq) {
          idxi32.push(sorted[pos++]);
        }
        this._hueStats.injectIntoArray(idxi32);
        break;
      case 2:
        idxi32 = sorted;
        break;
      default:
        throw new Error("Incorrect method");
    }
    return idxi32.map((v) => +v);
  }
  _colorStats1D(pointContainer) {
    const histG = this._histogram;
    const pointArray = pointContainer.getPointArray();
    const len = pointArray.length;
    for (let i = 0; i < len; i++) {
      const col = pointArray[i].uint32;
      this._hueStats.check(col);
      if (col in histG) {
        histG[col]++;
      } else {
        histG[col] = 1;
      }
    }
  }
  _colorStats2D(pointContainer) {
    const width = pointContainer.getWidth();
    const height = pointContainer.getHeight();
    const pointArray = pointContainer.getPointArray();
    const boxW = _ColorHistogram._boxSize[0];
    const boxH = _ColorHistogram._boxSize[1];
    const area = boxW * boxH;
    const boxes = this._makeBoxes(width, height, boxW, boxH);
    const histG = this._histogram;
    boxes.forEach((box) => {
      let effc = Math.round(box.w * box.h / area) * _ColorHistogram._boxPixels;
      if (effc < 2)
        effc = 2;
      const histL = {};
      this._iterateBox(box, width, (i) => {
        const col = pointArray[i].uint32;
        this._hueStats.check(col);
        if (col in histG) {
          histG[col]++;
        } else if (col in histL) {
          if (++histL[col] >= effc) {
            histG[col] = histL[col];
          }
        } else {
          histL[col] = 1;
        }
      });
    });
    this._hueStats.injectIntoDictionary(histG);
  }
  _iterateBox(bbox, wid, fn) {
    const b = bbox;
    const i0 = b.y * wid + b.x;
    const i1 = (b.y + b.h - 1) * wid + (b.x + b.w - 1);
    const incr = wid - b.w + 1;
    let cnt = 0;
    let i = i0;
    do {
      fn.call(this, i);
      i += ++cnt % b.w === 0 ? incr : 1;
    } while (i <= i1);
  }
  _makeBoxes(width, height, stepX, stepY) {
    const wrem = width % stepX;
    const hrem = height % stepY;
    const xend = width - wrem;
    const yend = height - hrem;
    const boxesArray = [];
    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        boxesArray.push({
          x,
          y,
          w: x === xend ? wrem : stepX,
          h: y === yend ? hrem : stepY
        });
      }
    }
    return boxesArray;
  }
};
let ColorHistogram = _ColorHistogram;
ColorHistogram._boxSize = [64, 64];
ColorHistogram._boxPixels = 2;
ColorHistogram._hueGroups = 10;


/***/ }),

/***/ "./src/palette/rgbquant/rgbquant.ts":
/*!******************************************!*\
  !*** ./src/palette/rgbquant/rgbquant.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RGBQuant": () => (/* binding */ RGBQuant)
/* harmony export */ });
/* harmony import */ var _utils_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/palette */ "./src/utils/palette.ts");
/* harmony import */ var _utils_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/point */ "./src/utils/point.ts");
/* harmony import */ var _colorHistogram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colorHistogram */ "./src/palette/rgbquant/colorHistogram.ts");
/* harmony import */ var _paletteQuantizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../paletteQuantizer */ "./src/palette/paletteQuantizer.ts");
/* harmony import */ var _utils_arithmetic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/arithmetic */ "./src/utils/arithmetic.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/**
 * @preserve TypeScript port:
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * rgbquant.ts - part of Image Quantization Library
 */






class RemovedColor {
  constructor(index, color, distance) {
    this.index = index;
    this.color = color;
    this.distance = distance;
  }
}
class RGBQuant extends _paletteQuantizer__WEBPACK_IMPORTED_MODULE_3__.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256, method = 2) {
    super();
    this._distance = colorDistanceCalculator;
    this._colors = colors;
    this._histogram = new _colorHistogram__WEBPACK_IMPORTED_MODULE_2__.ColorHistogram(method, colors);
    this._initialDistance = 0.01;
    this._distanceIncrement = 5e-3;
  }
  sample(image) {
    this._histogram.sample(image);
  }
  *quantize() {
    const idxi32 = this._histogram.getImportanceSortedColorsIDXI32();
    if (idxi32.length === 0) {
      throw new Error("No colors in image");
    }
    yield* this._buildPalette(idxi32);
  }
  *_buildPalette(idxi32) {
    const palette = new _utils_palette__WEBPACK_IMPORTED_MODULE_0__.Palette();
    const colorArray = palette.getPointContainer().getPointArray();
    const usageArray = new Array(idxi32.length);
    for (let i = 0; i < idxi32.length; i++) {
      colorArray.push(_utils_point__WEBPACK_IMPORTED_MODULE_1__.Point.createByUint32(idxi32[i]));
      usageArray[i] = 1;
    }
    const len = colorArray.length;
    const memDist = [];
    let palLen = len;
    let thold = this._initialDistance;
    const tracker = new _utils__WEBPACK_IMPORTED_MODULE_5__.ProgressTracker(palLen - this._colors, 99);
    while (palLen > this._colors) {
      memDist.length = 0;
      for (let i = 0; i < len; i++) {
        if (tracker.shouldNotify(len - palLen)) {
          yield {
            progress: tracker.progress
          };
        }
        if (usageArray[i] === 0)
          continue;
        const pxi = colorArray[i];
        for (let j = i + 1; j < len; j++) {
          if (usageArray[j] === 0)
            continue;
          const pxj = colorArray[j];
          const dist = this._distance.calculateNormalized(pxi, pxj);
          if (dist < thold) {
            memDist.push(new RemovedColor(j, pxj, dist));
            usageArray[j] = 0;
            palLen--;
          }
        }
      }
      thold += palLen > this._colors * 3 ? this._initialDistance : this._distanceIncrement;
    }
    if (palLen < this._colors) {
      (0,_utils_arithmetic__WEBPACK_IMPORTED_MODULE_4__.stableSort)(memDist, (a, b) => b.distance - a.distance);
      let k = 0;
      while (palLen < this._colors && k < memDist.length) {
        const removedColor = memDist[k];
        usageArray[removedColor.index] = 1;
        palLen++;
        k++;
      }
    }
    let colors = colorArray.length;
    for (let colorIndex = colors - 1; colorIndex >= 0; colorIndex--) {
      if (usageArray[colorIndex] === 0) {
        if (colorIndex !== colors - 1) {
          colorArray[colorIndex] = colorArray[colors - 1];
        }
        --colors;
      }
    }
    colorArray.length = colors;
    palette.sort();
    yield {
      palette,
      progress: 100
    };
  }
}


/***/ }),

/***/ "./src/palette/wu/wuQuant.ts":
/*!***********************************!*\
  !*** ./src/palette/wu/wuQuant.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WuColorCube": () => (/* binding */ WuColorCube),
/* harmony export */   "WuQuant": () => (/* binding */ WuQuant)
/* harmony export */ });
/* harmony import */ var _utils_palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/palette */ "./src/utils/palette.ts");
/* harmony import */ var _utils_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/point */ "./src/utils/point.ts");
/* harmony import */ var _paletteQuantizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../paletteQuantizer */ "./src/palette/paletteQuantizer.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * wuQuant.ts - part of Image Quantization Library
 */




function createArray1D(dimension1) {
  const a = [];
  for (let k = 0; k < dimension1; k++) {
    a[k] = 0;
  }
  return a;
}
function createArray4D(dimension1, dimension2, dimension3, dimension4) {
  const a = new Array(dimension1);
  for (let i = 0; i < dimension1; i++) {
    a[i] = new Array(dimension2);
    for (let j = 0; j < dimension2; j++) {
      a[i][j] = new Array(dimension3);
      for (let k = 0; k < dimension3; k++) {
        a[i][j][k] = new Array(dimension4);
        for (let l = 0; l < dimension4; l++) {
          a[i][j][k][l] = 0;
        }
      }
    }
  }
  return a;
}
function createArray3D(dimension1, dimension2, dimension3) {
  const a = new Array(dimension1);
  for (let i = 0; i < dimension1; i++) {
    a[i] = new Array(dimension2);
    for (let j = 0; j < dimension2; j++) {
      a[i][j] = new Array(dimension3);
      for (let k = 0; k < dimension3; k++) {
        a[i][j][k] = 0;
      }
    }
  }
  return a;
}
function fillArray3D(a, dimension1, dimension2, dimension3, value) {
  for (let i = 0; i < dimension1; i++) {
    a[i] = [];
    for (let j = 0; j < dimension2; j++) {
      a[i][j] = [];
      for (let k = 0; k < dimension3; k++) {
        a[i][j][k] = value;
      }
    }
  }
}
function fillArray1D(a, dimension1, value) {
  for (let i = 0; i < dimension1; i++) {
    a[i] = value;
  }
}
class WuColorCube {
}
const _WuQuant = class extends _paletteQuantizer__WEBPACK_IMPORTED_MODULE_2__.AbstractPaletteQuantizer {
  constructor(colorDistanceCalculator, colors = 256, significantBitsPerChannel = 5) {
    super();
    this._distance = colorDistanceCalculator;
    this._setQuality(significantBitsPerChannel);
    this._initialize(colors);
  }
  sample(image) {
    const pointArray = image.getPointArray();
    for (let i = 0, l = pointArray.length; i < l; i++) {
      this._addColor(pointArray[i]);
    }
    this._pixels = this._pixels.concat(pointArray);
  }
  *quantize() {
    yield* this._preparePalette();
    const palette = new _utils_palette__WEBPACK_IMPORTED_MODULE_0__.Palette();
    for (let paletteIndex = 0; paletteIndex < this._colors; paletteIndex++) {
      if (this._sums[paletteIndex] > 0) {
        const sum = this._sums[paletteIndex];
        const r = this._reds[paletteIndex] / sum;
        const g = this._greens[paletteIndex] / sum;
        const b = this._blues[paletteIndex] / sum;
        const a = this._alphas[paletteIndex] / sum;
        const color = _utils_point__WEBPACK_IMPORTED_MODULE_1__.Point.createByRGBA(r | 0, g | 0, b | 0, a | 0);
        palette.add(color);
      }
    }
    palette.sort();
    yield {
      palette,
      progress: 100
    };
  }
  *_preparePalette() {
    yield* this._calculateMoments();
    let next = 0;
    const volumeVariance = createArray1D(this._colors);
    for (let cubeIndex = 1; cubeIndex < this._colors; ++cubeIndex) {
      if (this._cut(this._cubes[next], this._cubes[cubeIndex])) {
        volumeVariance[next] = this._cubes[next].volume > 1 ? this._calculateVariance(this._cubes[next]) : 0;
        volumeVariance[cubeIndex] = this._cubes[cubeIndex].volume > 1 ? this._calculateVariance(this._cubes[cubeIndex]) : 0;
      } else {
        volumeVariance[next] = 0;
        cubeIndex--;
      }
      next = 0;
      let temp = volumeVariance[0];
      for (let index = 1; index <= cubeIndex; ++index) {
        if (volumeVariance[index] > temp) {
          temp = volumeVariance[index];
          next = index;
        }
      }
      if (temp <= 0) {
        this._colors = cubeIndex + 1;
        break;
      }
    }
    const lookupRed = [];
    const lookupGreen = [];
    const lookupBlue = [];
    const lookupAlpha = [];
    for (let k = 0; k < this._colors; ++k) {
      const weight = _WuQuant._volume(this._cubes[k], this._weights);
      if (weight > 0) {
        lookupRed[k] = _WuQuant._volume(this._cubes[k], this._momentsRed) / weight | 0;
        lookupGreen[k] = _WuQuant._volume(this._cubes[k], this._momentsGreen) / weight | 0;
        lookupBlue[k] = _WuQuant._volume(this._cubes[k], this._momentsBlue) / weight | 0;
        lookupAlpha[k] = _WuQuant._volume(this._cubes[k], this._momentsAlpha) / weight | 0;
      } else {
        lookupRed[k] = 0;
        lookupGreen[k] = 0;
        lookupBlue[k] = 0;
        lookupAlpha[k] = 0;
      }
    }
    this._reds = createArray1D(this._colors + 1);
    this._greens = createArray1D(this._colors + 1);
    this._blues = createArray1D(this._colors + 1);
    this._alphas = createArray1D(this._colors + 1);
    this._sums = createArray1D(this._colors + 1);
    for (let index = 0, l = this._pixels.length; index < l; index++) {
      const color = this._pixels[index];
      const match = -1;
      let bestMatch = match;
      let bestDistance = Number.MAX_VALUE;
      for (let lookup = 0; lookup < this._colors; lookup++) {
        const foundRed = lookupRed[lookup];
        const foundGreen = lookupGreen[lookup];
        const foundBlue = lookupBlue[lookup];
        const foundAlpha = lookupAlpha[lookup];
        const distance = this._distance.calculateRaw(foundRed, foundGreen, foundBlue, foundAlpha, color.r, color.g, color.b, color.a);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestMatch = lookup;
        }
      }
      this._reds[bestMatch] += color.r;
      this._greens[bestMatch] += color.g;
      this._blues[bestMatch] += color.b;
      this._alphas[bestMatch] += color.a;
      this._sums[bestMatch]++;
    }
  }
  _addColor(color) {
    const bitsToRemove = 8 - this._significantBitsPerChannel;
    const indexRed = (color.r >> bitsToRemove) + 1;
    const indexGreen = (color.g >> bitsToRemove) + 1;
    const indexBlue = (color.b >> bitsToRemove) + 1;
    const indexAlpha = (color.a >> bitsToRemove) + 1;
    this._weights[indexAlpha][indexRed][indexGreen][indexBlue]++;
    this._momentsRed[indexAlpha][indexRed][indexGreen][indexBlue] += color.r;
    this._momentsGreen[indexAlpha][indexRed][indexGreen][indexBlue] += color.g;
    this._momentsBlue[indexAlpha][indexRed][indexGreen][indexBlue] += color.b;
    this._momentsAlpha[indexAlpha][indexRed][indexGreen][indexBlue] += color.a;
    this._moments[indexAlpha][indexRed][indexGreen][indexBlue] += this._table[color.r] + this._table[color.g] + this._table[color.b] + this._table[color.a];
  }
  *_calculateMoments() {
    const area = [];
    const areaRed = [];
    const areaGreen = [];
    const areaBlue = [];
    const areaAlpha = [];
    const area2 = [];
    const xarea = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaRed = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaGreen = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaBlue = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xareaAlpha = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    const xarea2 = createArray3D(this._sideSize, this._sideSize, this._sideSize);
    let trackerProgress = 0;
    const tracker = new _utils__WEBPACK_IMPORTED_MODULE_3__.ProgressTracker(this._alphaMaxSideIndex * this._maxSideIndex, 99);
    for (let alphaIndex = 1; alphaIndex <= this._alphaMaxSideIndex; ++alphaIndex) {
      fillArray3D(xarea, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaRed, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaGreen, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaBlue, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xareaAlpha, this._sideSize, this._sideSize, this._sideSize, 0);
      fillArray3D(xarea2, this._sideSize, this._sideSize, this._sideSize, 0);
      for (let redIndex = 1; redIndex <= this._maxSideIndex; ++redIndex, ++trackerProgress) {
        if (tracker.shouldNotify(trackerProgress)) {
          yield {
            progress: tracker.progress
          };
        }
        fillArray1D(area, this._sideSize, 0);
        fillArray1D(areaRed, this._sideSize, 0);
        fillArray1D(areaGreen, this._sideSize, 0);
        fillArray1D(areaBlue, this._sideSize, 0);
        fillArray1D(areaAlpha, this._sideSize, 0);
        fillArray1D(area2, this._sideSize, 0);
        for (let greenIndex = 1; greenIndex <= this._maxSideIndex; ++greenIndex) {
          let line = 0;
          let lineRed = 0;
          let lineGreen = 0;
          let lineBlue = 0;
          let lineAlpha = 0;
          let line2 = 0;
          for (let blueIndex = 1; blueIndex <= this._maxSideIndex; ++blueIndex) {
            line += this._weights[alphaIndex][redIndex][greenIndex][blueIndex];
            lineRed += this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex];
            lineGreen += this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex];
            lineBlue += this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex];
            lineAlpha += this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex];
            line2 += this._moments[alphaIndex][redIndex][greenIndex][blueIndex];
            area[blueIndex] += line;
            areaRed[blueIndex] += lineRed;
            areaGreen[blueIndex] += lineGreen;
            areaBlue[blueIndex] += lineBlue;
            areaAlpha[blueIndex] += lineAlpha;
            area2[blueIndex] += line2;
            xarea[redIndex][greenIndex][blueIndex] = xarea[redIndex - 1][greenIndex][blueIndex] + area[blueIndex];
            xareaRed[redIndex][greenIndex][blueIndex] = xareaRed[redIndex - 1][greenIndex][blueIndex] + areaRed[blueIndex];
            xareaGreen[redIndex][greenIndex][blueIndex] = xareaGreen[redIndex - 1][greenIndex][blueIndex] + areaGreen[blueIndex];
            xareaBlue[redIndex][greenIndex][blueIndex] = xareaBlue[redIndex - 1][greenIndex][blueIndex] + areaBlue[blueIndex];
            xareaAlpha[redIndex][greenIndex][blueIndex] = xareaAlpha[redIndex - 1][greenIndex][blueIndex] + areaAlpha[blueIndex];
            xarea2[redIndex][greenIndex][blueIndex] = xarea2[redIndex - 1][greenIndex][blueIndex] + area2[blueIndex];
            this._weights[alphaIndex][redIndex][greenIndex][blueIndex] = this._weights[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea[redIndex][greenIndex][blueIndex];
            this._momentsRed[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsRed[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaRed[redIndex][greenIndex][blueIndex];
            this._momentsGreen[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsGreen[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaGreen[redIndex][greenIndex][blueIndex];
            this._momentsBlue[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsBlue[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaBlue[redIndex][greenIndex][blueIndex];
            this._momentsAlpha[alphaIndex][redIndex][greenIndex][blueIndex] = this._momentsAlpha[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xareaAlpha[redIndex][greenIndex][blueIndex];
            this._moments[alphaIndex][redIndex][greenIndex][blueIndex] = this._moments[alphaIndex - 1][redIndex][greenIndex][blueIndex] + xarea2[redIndex][greenIndex][blueIndex];
          }
        }
      }
    }
  }
  static _volumeFloat(cube, moment) {
    return moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
  }
  static _volume(cube, moment) {
    return _WuQuant._volumeFloat(cube, moment) | 0;
  }
  static _top(cube, direction, position, moment) {
    let result;
    switch (direction) {
      case _WuQuant._alpha:
        result = moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] - moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] - moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] + moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (moment[position][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] - moment[position][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] - moment[position][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[position][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
        break;
      case _WuQuant._red:
        result = moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMaximum] - (moment[cube.alphaMaximum][position][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMaximum][position][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMinimum][position][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][position][cube.greenMinimum][cube.blueMinimum]);
        break;
      case _WuQuant._green:
        result = moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMaximum] - moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMaximum] - (moment[cube.alphaMaximum][cube.redMaximum][position][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMinimum][position][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMaximum][position][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][position][cube.blueMinimum]);
        break;
      case _WuQuant._blue:
        result = moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][position] - moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][position] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][position] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][position] - (moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][position] - moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][position] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][position] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][position]);
        break;
      default:
        throw new Error("impossible");
    }
    return result | 0;
  }
  static _bottom(cube, direction, moment) {
    switch (direction) {
      case _WuQuant._alpha:
        return -moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
      case _WuQuant._red:
        return -moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (-moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
      case _WuQuant._green:
        return -moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMaximum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMaximum] - (-moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
      case _WuQuant._blue:
        return -moment[cube.alphaMaximum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMaximum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMaximum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum] - (-moment[cube.alphaMinimum][cube.redMaximum][cube.greenMaximum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMaximum][cube.greenMinimum][cube.blueMinimum] + moment[cube.alphaMinimum][cube.redMinimum][cube.greenMaximum][cube.blueMinimum] - moment[cube.alphaMinimum][cube.redMinimum][cube.greenMinimum][cube.blueMinimum]);
      default:
        return 0;
    }
  }
  _calculateVariance(cube) {
    const volumeRed = _WuQuant._volume(cube, this._momentsRed);
    const volumeGreen = _WuQuant._volume(cube, this._momentsGreen);
    const volumeBlue = _WuQuant._volume(cube, this._momentsBlue);
    const volumeAlpha = _WuQuant._volume(cube, this._momentsAlpha);
    const volumeMoment = _WuQuant._volumeFloat(cube, this._moments);
    const volumeWeight = _WuQuant._volume(cube, this._weights);
    const distance = volumeRed * volumeRed + volumeGreen * volumeGreen + volumeBlue * volumeBlue + volumeAlpha * volumeAlpha;
    return volumeMoment - distance / volumeWeight;
  }
  _maximize(cube, direction, first, last, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight) {
    const bottomRed = _WuQuant._bottom(cube, direction, this._momentsRed) | 0;
    const bottomGreen = _WuQuant._bottom(cube, direction, this._momentsGreen) | 0;
    const bottomBlue = _WuQuant._bottom(cube, direction, this._momentsBlue) | 0;
    const bottomAlpha = _WuQuant._bottom(cube, direction, this._momentsAlpha) | 0;
    const bottomWeight = _WuQuant._bottom(cube, direction, this._weights) | 0;
    let result = 0;
    let cutPosition = -1;
    for (let position = first; position < last; ++position) {
      let halfRed = bottomRed + _WuQuant._top(cube, direction, position, this._momentsRed);
      let halfGreen = bottomGreen + _WuQuant._top(cube, direction, position, this._momentsGreen);
      let halfBlue = bottomBlue + _WuQuant._top(cube, direction, position, this._momentsBlue);
      let halfAlpha = bottomAlpha + _WuQuant._top(cube, direction, position, this._momentsAlpha);
      let halfWeight = bottomWeight + _WuQuant._top(cube, direction, position, this._weights);
      if (halfWeight !== 0) {
        let halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
        let temp = halfDistance / halfWeight;
        halfRed = wholeRed - halfRed;
        halfGreen = wholeGreen - halfGreen;
        halfBlue = wholeBlue - halfBlue;
        halfAlpha = wholeAlpha - halfAlpha;
        halfWeight = wholeWeight - halfWeight;
        if (halfWeight !== 0) {
          halfDistance = halfRed * halfRed + halfGreen * halfGreen + halfBlue * halfBlue + halfAlpha * halfAlpha;
          temp += halfDistance / halfWeight;
          if (temp > result) {
            result = temp;
            cutPosition = position;
          }
        }
      }
    }
    return { max: result, position: cutPosition };
  }
  _cut(first, second) {
    let direction;
    const wholeRed = _WuQuant._volume(first, this._momentsRed);
    const wholeGreen = _WuQuant._volume(first, this._momentsGreen);
    const wholeBlue = _WuQuant._volume(first, this._momentsBlue);
    const wholeAlpha = _WuQuant._volume(first, this._momentsAlpha);
    const wholeWeight = _WuQuant._volume(first, this._weights);
    const red = this._maximize(first, _WuQuant._red, first.redMinimum + 1, first.redMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
    const green = this._maximize(first, _WuQuant._green, first.greenMinimum + 1, first.greenMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
    const blue = this._maximize(first, _WuQuant._blue, first.blueMinimum + 1, first.blueMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
    const alpha = this._maximize(first, _WuQuant._alpha, first.alphaMinimum + 1, first.alphaMaximum, wholeRed, wholeGreen, wholeBlue, wholeAlpha, wholeWeight);
    if (alpha.max >= red.max && alpha.max >= green.max && alpha.max >= blue.max) {
      direction = _WuQuant._alpha;
      if (alpha.position < 0)
        return false;
    } else if (red.max >= alpha.max && red.max >= green.max && red.max >= blue.max) {
      direction = _WuQuant._red;
    } else if (green.max >= alpha.max && green.max >= red.max && green.max >= blue.max) {
      direction = _WuQuant._green;
    } else {
      direction = _WuQuant._blue;
    }
    second.redMaximum = first.redMaximum;
    second.greenMaximum = first.greenMaximum;
    second.blueMaximum = first.blueMaximum;
    second.alphaMaximum = first.alphaMaximum;
    switch (direction) {
      case _WuQuant._red:
        second.redMinimum = first.redMaximum = red.position;
        second.greenMinimum = first.greenMinimum;
        second.blueMinimum = first.blueMinimum;
        second.alphaMinimum = first.alphaMinimum;
        break;
      case _WuQuant._green:
        second.greenMinimum = first.greenMaximum = green.position;
        second.redMinimum = first.redMinimum;
        second.blueMinimum = first.blueMinimum;
        second.alphaMinimum = first.alphaMinimum;
        break;
      case _WuQuant._blue:
        second.blueMinimum = first.blueMaximum = blue.position;
        second.redMinimum = first.redMinimum;
        second.greenMinimum = first.greenMinimum;
        second.alphaMinimum = first.alphaMinimum;
        break;
      case _WuQuant._alpha:
        second.alphaMinimum = first.alphaMaximum = alpha.position;
        second.blueMinimum = first.blueMinimum;
        second.redMinimum = first.redMinimum;
        second.greenMinimum = first.greenMinimum;
        break;
    }
    first.volume = (first.redMaximum - first.redMinimum) * (first.greenMaximum - first.greenMinimum) * (first.blueMaximum - first.blueMinimum) * (first.alphaMaximum - first.alphaMinimum);
    second.volume = (second.redMaximum - second.redMinimum) * (second.greenMaximum - second.greenMinimum) * (second.blueMaximum - second.blueMinimum) * (second.alphaMaximum - second.alphaMinimum);
    return true;
  }
  _initialize(colors) {
    this._colors = colors;
    this._cubes = [];
    for (let cubeIndex = 0; cubeIndex < colors; cubeIndex++) {
      this._cubes[cubeIndex] = new WuColorCube();
    }
    this._cubes[0].redMinimum = 0;
    this._cubes[0].greenMinimum = 0;
    this._cubes[0].blueMinimum = 0;
    this._cubes[0].alphaMinimum = 0;
    this._cubes[0].redMaximum = this._maxSideIndex;
    this._cubes[0].greenMaximum = this._maxSideIndex;
    this._cubes[0].blueMaximum = this._maxSideIndex;
    this._cubes[0].alphaMaximum = this._alphaMaxSideIndex;
    this._weights = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsRed = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsGreen = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsBlue = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._momentsAlpha = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._moments = createArray4D(this._alphaSideSize, this._sideSize, this._sideSize, this._sideSize);
    this._table = [];
    for (let tableIndex = 0; tableIndex < 256; ++tableIndex) {
      this._table[tableIndex] = tableIndex * tableIndex;
    }
    this._pixels = [];
  }
  _setQuality(significantBitsPerChannel = 5) {
    this._significantBitsPerChannel = significantBitsPerChannel;
    this._maxSideIndex = 1 << this._significantBitsPerChannel;
    this._alphaMaxSideIndex = this._maxSideIndex;
    this._sideSize = this._maxSideIndex + 1;
    this._alphaSideSize = this._alphaMaxSideIndex + 1;
  }
};
let WuQuant = _WuQuant;
WuQuant._alpha = 3;
WuQuant._red = 2;
WuQuant._green = 1;
WuQuant._blue = 0;


/***/ }),

/***/ "./src/quality/index.ts":
/*!******************************!*\
  !*** ./src/quality/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ssim": () => (/* reexport safe */ _ssim__WEBPACK_IMPORTED_MODULE_0__.ssim)
/* harmony export */ });
/* harmony import */ var _ssim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssim */ "./src/quality/ssim.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */



/***/ }),

/***/ "./src/quality/ssim.ts":
/*!*****************************!*\
  !*** ./src/quality/ssim.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ssim": () => (/* binding */ ssim)
/* harmony export */ });
/* harmony import */ var _constants_bt709__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/bt709 */ "./src/constants/bt709.ts");
var __pow = Math.pow;
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * ssim.ts - part of Image Quantization Library
 */

const K1 = 0.01;
const K2 = 0.03;
function ssim(image1, image2) {
  if (image1.getHeight() !== image2.getHeight() || image1.getWidth() !== image2.getWidth()) {
    throw new Error("Images have different sizes!");
  }
  const bitsPerComponent = 8;
  const L = (1 << bitsPerComponent) - 1;
  const c1 = __pow(K1 * L, 2);
  const c2 = __pow(K2 * L, 2);
  let numWindows = 0;
  let mssim = 0;
  iterate(image1, image2, (lumaValues1, lumaValues2, averageLumaValue1, averageLumaValue2) => {
    let sigxy = 0;
    let sigsqx = 0;
    let sigsqy = 0;
    for (let i = 0; i < lumaValues1.length; i++) {
      sigsqx += __pow(lumaValues1[i] - averageLumaValue1, 2);
      sigsqy += __pow(lumaValues2[i] - averageLumaValue2, 2);
      sigxy += (lumaValues1[i] - averageLumaValue1) * (lumaValues2[i] - averageLumaValue2);
    }
    const numPixelsInWin = lumaValues1.length - 1;
    sigsqx /= numPixelsInWin;
    sigsqy /= numPixelsInWin;
    sigxy /= numPixelsInWin;
    const numerator = (2 * averageLumaValue1 * averageLumaValue2 + c1) * (2 * sigxy + c2);
    const denominator = (__pow(averageLumaValue1, 2) + __pow(averageLumaValue2, 2) + c1) * (sigsqx + sigsqy + c2);
    const ssim2 = numerator / denominator;
    mssim += ssim2;
    numWindows++;
  });
  return mssim / numWindows;
}
function iterate(image1, image2, callback) {
  const windowSize = 8;
  const width = image1.getWidth();
  const height = image1.getHeight();
  for (let y = 0; y < height; y += windowSize) {
    for (let x = 0; x < width; x += windowSize) {
      const windowWidth = Math.min(windowSize, width - x);
      const windowHeight = Math.min(windowSize, height - y);
      const lumaValues1 = calculateLumaValuesForWindow(image1, x, y, windowWidth, windowHeight);
      const lumaValues2 = calculateLumaValuesForWindow(image2, x, y, windowWidth, windowHeight);
      const averageLuma1 = calculateAverageLuma(lumaValues1);
      const averageLuma2 = calculateAverageLuma(lumaValues2);
      callback(lumaValues1, lumaValues2, averageLuma1, averageLuma2);
    }
  }
}
function calculateLumaValuesForWindow(image, x, y, width, height) {
  const pointArray = image.getPointArray();
  const lumaValues = [];
  let counter = 0;
  for (let j = y; j < y + height; j++) {
    const offset = j * image.getWidth();
    for (let i = x; i < x + width; i++) {
      const point = pointArray[offset + i];
      lumaValues[counter] = point.r * _constants_bt709__WEBPACK_IMPORTED_MODULE_0__.Y.RED + point.g * _constants_bt709__WEBPACK_IMPORTED_MODULE_0__.Y.GREEN + point.b * _constants_bt709__WEBPACK_IMPORTED_MODULE_0__.Y.BLUE;
      counter++;
    }
  }
  return lumaValues;
}
function calculateAverageLuma(lumaValues) {
  let sumLuma = 0;
  for (const luma of lumaValues) {
    sumLuma += luma;
  }
  return sumLuma / lumaValues.length;
}


/***/ }),

/***/ "./src/utils/arithmetic.ts":
/*!*********************************!*\
  !*** ./src/utils/arithmetic.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "degrees2radians": () => (/* binding */ degrees2radians),
/* harmony export */   "max3": () => (/* binding */ max3),
/* harmony export */   "min3": () => (/* binding */ min3),
/* harmony export */   "intInRange": () => (/* binding */ intInRange),
/* harmony export */   "inRange0to255Rounded": () => (/* binding */ inRange0to255Rounded),
/* harmony export */   "inRange0to255": () => (/* binding */ inRange0to255),
/* harmony export */   "stableSort": () => (/* binding */ stableSort)
/* harmony export */ });
function degrees2radians(n) {
  return n * (Math.PI / 180);
}
function max3(a, b, c) {
  let m = a;
  if (m < b)
    m = b;
  if (m < c)
    m = c;
  return m;
}
function min3(a, b, c) {
  let m = a;
  if (m > b)
    m = b;
  if (m > c)
    m = c;
  return m;
}
function intInRange(value, low, high) {
  if (value > high)
    value = high;
  if (value < low)
    value = low;
  return value | 0;
}
function inRange0to255Rounded(n) {
  n = Math.round(n);
  if (n > 255)
    n = 255;
  else if (n < 0)
    n = 0;
  return n;
}
function inRange0to255(n) {
  if (n > 255)
    n = 255;
  else if (n < 0)
    n = 0;
  return n;
}
function stableSort(arrayToSort, callback) {
  const type = typeof arrayToSort[0];
  let sorted;
  if (type === "number" || type === "string") {
    const ord = Object.create(null);
    for (let i = 0, l = arrayToSort.length; i < l; i++) {
      const val = arrayToSort[i];
      if (ord[val] || ord[val] === 0)
        continue;
      ord[val] = i;
    }
    sorted = arrayToSort.sort((a, b) => callback(a, b) || ord[a] - ord[b]);
  } else {
    const ord2 = arrayToSort.slice(0);
    sorted = arrayToSort.sort((a, b) => callback(a, b) || ord2.indexOf(a) - ord2.indexOf(b));
  }
  return sorted;
}


/***/ }),

/***/ "./src/utils/hueStatistics.ts":
/*!************************************!*\
  !*** ./src/utils/hueStatistics.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HueStatistics": () => (/* binding */ HueStatistics)
/* harmony export */ });
/* harmony import */ var _conversion_rgb2hsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../conversion/rgb2hsl */ "./src/conversion/rgb2hsl.ts");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./palette */ "./src/utils/palette.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * hueStatistics.ts - part of Image Quantization Library
 */


class HueGroup {
  constructor() {
    this.num = 0;
    this.cols = [];
  }
}
class HueStatistics {
  constructor(numGroups, minCols) {
    this._numGroups = numGroups;
    this._minCols = minCols;
    this._stats = [];
    for (let i = 0; i <= numGroups; i++) {
      this._stats[i] = new HueGroup();
    }
    this._groupsFull = 0;
  }
  check(i32) {
    if (this._groupsFull === this._numGroups + 1) {
      this.check = () => {
      };
    }
    const r = i32 & 255;
    const g = i32 >>> 8 & 255;
    const b = i32 >>> 16 & 255;
    const hg = r === g && g === b ? 0 : 1 + (0,_palette__WEBPACK_IMPORTED_MODULE_1__.hueGroup)((0,_conversion_rgb2hsl__WEBPACK_IMPORTED_MODULE_0__.rgb2hsl)(r, g, b).h, this._numGroups);
    const gr = this._stats[hg];
    const min = this._minCols;
    gr.num++;
    if (gr.num > min) {
      return;
    }
    if (gr.num === min) {
      this._groupsFull++;
    }
    if (gr.num <= min) {
      this._stats[hg].cols.push(i32);
    }
  }
  injectIntoDictionary(histG) {
    for (let i = 0; i <= this._numGroups; i++) {
      if (this._stats[i].num <= this._minCols) {
        this._stats[i].cols.forEach((col) => {
          if (!histG[col]) {
            histG[col] = 1;
          } else {
            histG[col]++;
          }
        });
      }
    }
  }
  injectIntoArray(histG) {
    for (let i = 0; i <= this._numGroups; i++) {
      if (this._stats[i].num <= this._minCols) {
        this._stats[i].cols.forEach((col) => {
          if (histG.indexOf(col) === -1) {
            histG.push(col);
          }
        });
      }
    }
  }
}


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* reexport safe */ _point__WEBPACK_IMPORTED_MODULE_3__.Point),
/* harmony export */   "PointContainer": () => (/* reexport safe */ _pointContainer__WEBPACK_IMPORTED_MODULE_4__.PointContainer),
/* harmony export */   "Palette": () => (/* reexport safe */ _palette__WEBPACK_IMPORTED_MODULE_2__.Palette),
/* harmony export */   "HueStatistics": () => (/* reexport safe */ _hueStatistics__WEBPACK_IMPORTED_MODULE_1__.HueStatistics),
/* harmony export */   "ProgressTracker": () => (/* reexport safe */ _progressTracker__WEBPACK_IMPORTED_MODULE_5__.ProgressTracker),
/* harmony export */   "arithmetic": () => (/* reexport module object */ _arithmetic__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _arithmetic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arithmetic */ "./src/utils/arithmetic.ts");
/* harmony import */ var _hueStatistics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hueStatistics */ "./src/utils/hueStatistics.ts");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./palette */ "./src/utils/palette.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./point */ "./src/utils/point.ts");
/* harmony import */ var _pointContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pointContainer */ "./src/utils/pointContainer.ts");
/* harmony import */ var _progressTracker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./progressTracker */ "./src/utils/progressTracker.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */









/***/ }),

/***/ "./src/utils/palette.ts":
/*!******************************!*\
  !*** ./src/utils/palette.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hueGroup": () => (/* binding */ hueGroup),
/* harmony export */   "Palette": () => (/* binding */ Palette)
/* harmony export */ });
/* harmony import */ var _pointContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pointContainer */ "./src/utils/pointContainer.ts");
/* harmony import */ var _conversion_rgb2hsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../conversion/rgb2hsl */ "./src/conversion/rgb2hsl.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * palette.ts - part of Image Quantization Library
 */


const hueGroups = 10;
function hueGroup(hue, segmentsNumber) {
  const maxHue = 360;
  const seg = maxHue / segmentsNumber;
  const half = seg / 2;
  for (let i = 1, mid = seg - half; i < segmentsNumber; i++, mid += seg) {
    if (hue >= mid && hue < mid + seg)
      return i;
  }
  return 0;
}
class Palette {
  constructor() {
    this._pointArray = [];
    this._i32idx = {};
    this._pointContainer = new _pointContainer__WEBPACK_IMPORTED_MODULE_0__.PointContainer();
    this._pointContainer.setHeight(1);
    this._pointArray = this._pointContainer.getPointArray();
  }
  add(color) {
    this._pointArray.push(color);
    this._pointContainer.setWidth(this._pointArray.length);
  }
  has(color) {
    for (let i = this._pointArray.length - 1; i >= 0; i--) {
      if (color.uint32 === this._pointArray[i].uint32)
        return true;
    }
    return false;
  }
  getNearestColor(colorDistanceCalculator, color) {
    return this._pointArray[this._getNearestIndex(colorDistanceCalculator, color) | 0];
  }
  getPointContainer() {
    return this._pointContainer;
  }
  _nearestPointFromCache(key) {
    return typeof this._i32idx[key] === "number" ? this._i32idx[key] : -1;
  }
  _getNearestIndex(colorDistanceCalculator, point) {
    let idx = this._nearestPointFromCache("" + point.uint32);
    if (idx >= 0)
      return idx;
    let minimalDistance = Number.MAX_VALUE;
    idx = 0;
    for (let i = 0, l = this._pointArray.length; i < l; i++) {
      const p = this._pointArray[i];
      const distance = colorDistanceCalculator.calculateRaw(point.r, point.g, point.b, point.a, p.r, p.g, p.b, p.a);
      if (distance < minimalDistance) {
        minimalDistance = distance;
        idx = i;
      }
    }
    this._i32idx[point.uint32] = idx;
    return idx;
  }
  sort() {
    this._i32idx = {};
    this._pointArray.sort((a, b) => {
      const hslA = (0,_conversion_rgb2hsl__WEBPACK_IMPORTED_MODULE_1__.rgb2hsl)(a.r, a.g, a.b);
      const hslB = (0,_conversion_rgb2hsl__WEBPACK_IMPORTED_MODULE_1__.rgb2hsl)(b.r, b.g, b.b);
      const hueA = a.r === a.g && a.g === a.b ? 0 : 1 + hueGroup(hslA.h, hueGroups);
      const hueB = b.r === b.g && b.g === b.b ? 0 : 1 + hueGroup(hslB.h, hueGroups);
      const hueDiff = hueB - hueA;
      if (hueDiff)
        return -hueDiff;
      const lA = a.getLuminosity(true);
      const lB = b.getLuminosity(true);
      if (lB - lA !== 0)
        return lB - lA;
      const satDiff = (hslB.s * 100 | 0) - (hslA.s * 100 | 0);
      if (satDiff)
        return -satDiff;
      return 0;
    });
  }
}


/***/ }),

/***/ "./src/utils/point.ts":
/*!****************************!*\
  !*** ./src/utils/point.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point)
/* harmony export */ });
/* harmony import */ var _constants_bt709__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/bt709 */ "./src/constants/bt709.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * point.ts - part of Image Quantization Library
 */

class Point {
  static createByQuadruplet(quadruplet) {
    const point = new Point();
    point.r = quadruplet[0] | 0;
    point.g = quadruplet[1] | 0;
    point.b = quadruplet[2] | 0;
    point.a = quadruplet[3] | 0;
    point._loadUINT32();
    point._loadQuadruplet();
    return point;
  }
  static createByRGBA(red, green, blue, alpha) {
    const point = new Point();
    point.r = red | 0;
    point.g = green | 0;
    point.b = blue | 0;
    point.a = alpha | 0;
    point._loadUINT32();
    point._loadQuadruplet();
    return point;
  }
  static createByUint32(uint32) {
    const point = new Point();
    point.uint32 = uint32 >>> 0;
    point._loadRGBA();
    point._loadQuadruplet();
    return point;
  }
  constructor() {
    this.uint32 = -1 >>> 0;
    this.r = this.g = this.b = this.a = 0;
    this.rgba = new Array(4);
    this.rgba[0] = 0;
    this.rgba[1] = 0;
    this.rgba[2] = 0;
    this.rgba[3] = 0;
  }
  from(point) {
    this.r = point.r;
    this.g = point.g;
    this.b = point.b;
    this.a = point.a;
    this.uint32 = point.uint32;
    this.rgba[0] = point.r;
    this.rgba[1] = point.g;
    this.rgba[2] = point.b;
    this.rgba[3] = point.a;
  }
  getLuminosity(useAlphaChannel) {
    let r = this.r;
    let g = this.g;
    let b = this.b;
    if (useAlphaChannel) {
      r = Math.min(255, 255 - this.a + this.a * r / 255);
      g = Math.min(255, 255 - this.a + this.a * g / 255);
      b = Math.min(255, 255 - this.a + this.a * b / 255);
    }
    return r * _constants_bt709__WEBPACK_IMPORTED_MODULE_0__.Y.RED + g * _constants_bt709__WEBPACK_IMPORTED_MODULE_0__.Y.GREEN + b * _constants_bt709__WEBPACK_IMPORTED_MODULE_0__.Y.BLUE;
  }
  _loadUINT32() {
    this.uint32 = (this.a << 24 | this.b << 16 | this.g << 8 | this.r) >>> 0;
  }
  _loadRGBA() {
    this.r = this.uint32 & 255;
    this.g = this.uint32 >>> 8 & 255;
    this.b = this.uint32 >>> 16 & 255;
    this.a = this.uint32 >>> 24 & 255;
  }
  _loadQuadruplet() {
    this.rgba[0] = this.r;
    this.rgba[1] = this.g;
    this.rgba[2] = this.b;
    this.rgba[3] = this.a;
  }
}


/***/ }),

/***/ "./src/utils/pointContainer.ts":
/*!*************************************!*\
  !*** ./src/utils/pointContainer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PointContainer": () => (/* binding */ PointContainer)
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/utils/point.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * pointContainer.ts - part of Image Quantization Library
 */

class PointContainer {
  constructor() {
    this._width = 0;
    this._height = 0;
    this._pointArray = [];
  }
  getWidth() {
    return this._width;
  }
  getHeight() {
    return this._height;
  }
  setWidth(width) {
    this._width = width;
  }
  setHeight(height) {
    this._height = height;
  }
  getPointArray() {
    return this._pointArray;
  }
  clone() {
    const clone = new PointContainer();
    clone._width = this._width;
    clone._height = this._height;
    for (let i = 0, l = this._pointArray.length; i < l; i++) {
      clone._pointArray[i] = _point__WEBPACK_IMPORTED_MODULE_0__.Point.createByUint32(this._pointArray[i].uint32 | 0);
    }
    return clone;
  }
  toUint32Array() {
    const l = this._pointArray.length;
    const uint32Array = new Uint32Array(l);
    for (let i = 0; i < l; i++) {
      uint32Array[i] = this._pointArray[i].uint32;
    }
    return uint32Array;
  }
  toUint8Array() {
    return new Uint8Array(this.toUint32Array().buffer);
  }
  static fromHTMLImageElement(img) {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
    return PointContainer.fromHTMLCanvasElement(canvas);
  }
  static fromHTMLCanvasElement(canvas) {
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, width, height);
    return PointContainer.fromImageData(imgData);
  }
  static fromImageData(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    return PointContainer.fromUint8Array(imageData.data, width, height);
  }
  static fromUint8Array(uint8Array, width, height) {
    switch (Object.prototype.toString.call(uint8Array)) {
      case "[object Uint8ClampedArray]":
      case "[object Uint8Array]":
        break;
      default:
        uint8Array = new Uint8Array(uint8Array);
    }
    const uint32Array = new Uint32Array(uint8Array.buffer);
    return PointContainer.fromUint32Array(uint32Array, width, height);
  }
  static fromUint32Array(uint32Array, width, height) {
    const container = new PointContainer();
    container._width = width;
    container._height = height;
    for (let i = 0, l = uint32Array.length; i < l; i++) {
      container._pointArray[i] = _point__WEBPACK_IMPORTED_MODULE_0__.Point.createByUint32(uint32Array[i] | 0);
    }
    return container;
  }
  static fromBuffer(buffer, width, height) {
    const uint32Array = new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
    return PointContainer.fromUint32Array(uint32Array, width, height);
  }
}


/***/ }),

/***/ "./src/utils/progressTracker.ts":
/*!**************************************!*\
  !*** ./src/utils/progressTracker.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressTracker": () => (/* binding */ ProgressTracker)
/* harmony export */ });
const _ProgressTracker = class {
  constructor(valueRange, progressRange) {
    this._range = valueRange;
    this._progressRange = progressRange;
    this._step = Math.max(1, this._range / (_ProgressTracker.steps + 1) | 0);
    this._last = -this._step;
    this.progress = 0;
  }
  shouldNotify(current) {
    if (current - this._last >= this._step) {
      this._last = current;
      this.progress = Math.min(this._progressRange * this._last / this._range, this._progressRange);
      return true;
    }
    return false;
  }
};
let ProgressTracker = _ProgressTracker;
ProgressTracker.steps = 100;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildPalette": () => (/* reexport safe */ _basicAPI__WEBPACK_IMPORTED_MODULE_7__.buildPalette),
/* harmony export */   "buildPaletteSync": () => (/* reexport safe */ _basicAPI__WEBPACK_IMPORTED_MODULE_7__.buildPaletteSync),
/* harmony export */   "applyPalette": () => (/* reexport safe */ _basicAPI__WEBPACK_IMPORTED_MODULE_7__.applyPalette),
/* harmony export */   "applyPaletteSync": () => (/* reexport safe */ _basicAPI__WEBPACK_IMPORTED_MODULE_7__.applyPaletteSync),
/* harmony export */   "constants": () => (/* reexport module object */ _constants__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "conversion": () => (/* reexport module object */ _conversion__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "distance": () => (/* reexport module object */ _distance__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "palette": () => (/* reexport module object */ _palette__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "image": () => (/* reexport module object */ _image__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   "quality": () => (/* reexport module object */ _quality__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "utils": () => (/* reexport module object */ _utils__WEBPACK_IMPORTED_MODULE_6__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants/index.ts");
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversion */ "./src/conversion/index.ts");
/* harmony import */ var _distance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./distance */ "./src/distance/index.ts");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./palette */ "./src/palette/index.ts");
/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./image */ "./src/image/index.ts");
/* harmony import */ var _quality__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quality */ "./src/quality/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
/* harmony import */ var _basicAPI__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./basicAPI */ "./src/basicAPI.ts");
/**
 * @preserve
 * Copyright 2015-2018 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * iq.ts - Image Quantization Library
 */










})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=image-q.js.map