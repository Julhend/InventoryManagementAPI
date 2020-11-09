const dbConn = require("./connection/db.Connection")

function chainWhere(object) {
  const parsedObjectKeys = Object.keys(object)
  return parsedObjectKeys.map((key, index) => {
    let value = object[key]
    if (typeof value === 'string')
      value = `"${value}"`
    let composedString = `${key} = ${value}`
    if (index + 1 < parsedObjectKeys.length) {
      composedString += ' AND'
    }
    return composedString
  }).join(' ')
}


function get(tableName, searchParameters) {
  let query = `SELECT * from ${tableName}`
  const searchParameterKeys = Object.keys(searchParameters)
  if (searchParameterKeys.length) {
    query += `WHERE ${chainWhere(searchParameters)}`
  }
  return new Promise((resolve, reject) => {
    dbConn.query(query, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })

}


function add(tableName, body) {
  return body
}

function edit(tableName, id, body) {
  return id
}


function remove(tableName, id) {
  return id
}

module.exports = {
  get,
  add,
  edit,
  remove
}