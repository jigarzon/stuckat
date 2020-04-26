'use strict';

var apiRouter = require('express').Router();
apiRouter.use('/', require('./stucked'));
apiRouter.use('/', require('./auth'));

module.exports = apiRouter;
//# sourceMappingURL=index.js.map