const _ = require('lodash')

function mysqlErrorHandler(err, req, res, next) {
    const parsedError = _.toPlainObject(err)
    if (parsedError === 'ER_BAD_FIELD_ERROR')
        res.status(400).send('Bad Field')
    else if (parsedError === 'ER_NO_DEFAULT_FOR_FIELD')
        res.status(400).send('Lack of Field')
    else
        res.status(500).send(parsedError)
}

module.exports = mysqlErrorHandler