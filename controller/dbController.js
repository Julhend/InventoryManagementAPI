const dbConn = require("./connection/db.Connection")
const _ = require("lodash")
const humps = require('humps')
const { v4: uuidv4 } = require('uuid');

function chainWhere(object) {
  const parsedObject = humps.decamelizeKeys(object)
  const parsedObjectKeys = Object.keys(parsedObject)
  return parsedObjectKeys.map((key, index) => {
    let value = parsedObject[key]
    if (typeof value === 'string')
      value = `"${value}"`
    let composedString = `${key} = ${value}`
    if (index + 1 < parsedObjectKeys.length) {
      composedString += ' AND'
    }
    return composedString
  }).join(' ')
}

function chainSet(object) {
  const parsedObject = humps.decamelizeKeys(object)
  const parsedObjectKeys = Object.keys(parsedObject)
  return parsedObjectKeys.map((key, index) => {
    let value = parsedObject[key]
    if (typeof value === 'string')
      value = `"${value}"`
    let composedString = `${key} = ${value}`
    if (index + 1 < parsedObjectKeys.length) {
      composedString += ' ,'
    }
    return composedString
  }).join(' ')
}


function createInsertColumn(object) {
  const parsedObject = humps.decamelizeKeys(object)
  return {
    columns: Object.keys(parsedObject),
    values: Object.values(parsedObject).map(val => {
      if (typeof val === 'string')
        return `"${val}"`
      return val
    })
  }

}

function get(tableName, searchParameters) {
  let query = `SELECT * from ${tableName} `
  const searchParameterKeys = Object.keys(searchParameters)
  if (searchParameterKeys.length) {
    query += `WHERE ${chainWhere(searchParameters)}`
  }
  return new Promise((resolve, reject) => {
    dbConn.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.map(res => {
          const plainObject = _.toPlainObject(res)
          const camelCaseObject = humps.camelizeKeys(plainObject)
          return camelCaseObject
        }))
      }
    })
  })
}


function add(tableName, body) {
  body.id = uuidv4()
  const columnValue = createInsertColumn(body)
  let query = `INSERT INTO ${tableName} (${columnValue.columns})
  VALUES (${columnValue.values})`
  return new Promise((resolve, reject) => {
    dbConn.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

function edit(tableName, id, body) {
  let query = `UPDATE ${tableName}
  SET ${chainSet(body)}
  WHERE id = "${id}"`
  return new Promise((resolve, reject) => {
    dbConn.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}


function remove(tableName, searchParameters) {
  let query = `DELETE FROM ${tableName} `
  const searchParameterKeys = Object.keys(searchParameters)
  if (searchParameterKeys.length) {
    query += `WHERE ${chainWhere(searchParameters)}`
  }
  return new Promise((resolve, reject) => {
    dbConn.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve('Data has been removed')
      }
    })
  })
}

module.exports = {
  get,
  add,
  edit,
  remove
}