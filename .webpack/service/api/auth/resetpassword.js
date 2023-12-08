/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./api/auth/resetpassword.js":
/*!***********************************!*\
  !*** ./api/auth/resetpassword.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const message = __webpack_require__(/*! ../config/Message */ "./api/config/Message.js");
const utils = __webpack_require__(/*! ../utils/utils */ "./api/utils/utils.js");
const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
module.exports.handler = async event => {
  try {
    if (!event.body) {
      return utils.sendResponse(200, {
        statusCode: 400,
        message: message.BAD_REQUEST
      });
    }
    const reqData = JSON.parse(event.body);
    console.log('reqData', reqData);
    const {
      CLIENT_ID
    } = process.env;
    const params = {
      ClientId: CLIENT_ID,
      Username: reqData.email,
      ConfirmationCode: reqData.code,
      Password: reqData.password
    };
    const response = await cognito.confirmForgotPassword(params).promise();
    return utils.sendResponse(200, {
      statusCode: 200,
      message: 'Reset password successfully'
    });
  } catch (err) {
    return utils.sendResponse(200, {
      statusCode: 500,
      message: `${err}`
    });
  }
};

/***/ }),

/***/ "./api/config/Message.js":
/*!*******************************!*\
  !*** ./api/config/Message.js ***!
  \*******************************/
/***/ ((module) => {

module.exports = {
  BAD_REQUEST: "Request element is not enough!"
};

/***/ }),

/***/ "./api/utils/utils.js":
/*!****************************!*\
  !*** ./api/utils/utils.js ***!
  \****************************/
/***/ ((module) => {

const sendResponse = (statusCode, body) => {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body || {}),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
  return response;
};
const validateInput = data => {
  const body = JSON.parse(data);
  const {
    email,
    password
  } = body;
  if (!email || !password || password.length < 6) return false;
  return true;
};
module.exports = {
  sendResponse,
  validateInput
};

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("aws-sdk");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./api/auth/resetpassword.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=resetpassword.js.map