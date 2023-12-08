const message = require('../config/Message')
const utils = require('../utils/utils')
const AWS = require('aws-sdk')

const cognito = new AWS.CognitoIdentityServiceProvider()

module.exports.handler = async (event) => {
  try {
    if (!event.body) {
      return utils.sendResponse(200, {
        statusCode: 400,
        message: message.BAD_REQUEST,
      })
    }
    const reqData = JSON.parse(event.body)
    console.log('reqData', reqData)
    const { CLIENT_ID } = process.env

    const params = {
      ClientId: CLIENT_ID,
      Username: reqData.email,
      ConfirmationCode: reqData.code,
      Password: reqData.password,
    }
    const response = await cognito.confirmForgotPassword(params).promise()
    return utils.sendResponse(200, {
      statusCode: 200,
      message: 'Reset password successfully',
    })
  } catch (err) {
    return utils.sendResponse(200, {
      statusCode: 500,
      message: `${err}`,
    })
  }
}
