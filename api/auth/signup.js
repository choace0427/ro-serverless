const message = require("../config/Message");
const utils = require("../utils/utils");
const AWS = require("aws-sdk");

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  try {
    if (!event.body) {
      return utils.sendResponse(200, {
        statusCode: 400,
        message: message.BAD_REQUEST,
      });
    }
    const reqData = JSON.parse(event.body);
    console.log("reqData", reqData);
    const { CLIENT_ID } = process.env;

    const params = {
      ClientId: CLIENT_ID,
      Password: reqData.password,
      Username: reqData.email,
      UserAttributes: [
        {
          Name: "email",
          Value: reqData.email,
        },
      ],
    };
    const response = await cognito.signUp(params).promise();

    return utils.sendResponse(200, response);
  } catch (err) {
    if (err.code === "UsernameExistsException") {
      return utils.sendResponse(200, {
        statusCode: 500,
        message: `An account with the given email already exists`,
      });
    }
    return utils.sendResponse(200, {
      statusCode: 500,
      message: `Couldn't create this player!, ${err}`,
    });
  }
};
