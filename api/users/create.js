const message = require('../config/Message')
const utils = require('../utils/utils')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const dynamodb = new AWS.DynamoDB.DocumentClient()

const table = 'users'

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

    const personItem = {
      id: uuidv4(),
      email: reqData.email,
      fullname: reqData.info.name,
      address: reqData.info.address,
      birthday: reqData.info.birthday,
      phone: reqData.info.phone,
      avatar: reqData.info.avatar,
    }

    const params = {
      TableName: table,
      KeyCon,
    }

    // const params = {
    //   TableName: table,
    //   Item: personItem,
    //   Key: {
    //     email: personItem.email,
    //   },
    // }
    const response = await dynamodb.query(params).promise()
    console.log(response)

    return utils.sendResponse(200, response)
  } catch (err) {
    if (err.code === 'UsernameExistsException') {
      return utils.sendResponse(200, {
        statusCode: 500,
        message: `An account with the given email already exists`,
      })
    }
    return utils.sendResponse(200, {
      statusCode: 500,
      message: `Couldn't create this player!, ${err}`,
    })
  }
}
