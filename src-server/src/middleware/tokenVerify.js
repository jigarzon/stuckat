
// THIS CLASS IS NOT BEING USED AND IS HERE AS AN EXAMPLE

module.exports = function ({ config }) {
  return async (req, res, next) => {
  // delete from here: /stack (it should be authed)
    // if (req.path === '/log' || (req.path.startsWith('/rfps') && req.method === 'GET')) {
    //   next()
    //   return
    // }
    // var token = req.headers['x-shortlink']
    // if (token) {
    //   try {
    //     var info = await getShortlinkInfo(token)

    //     req.oid = info.organizationId
    //     next()
    //   } catch (e) {
    //     res.status(401).json({
    //       result: 'invalid token'
    //     })
    //   }
    // } else {
    //   res.status(401).json({
    //     result: 'no token present in header'
    //   })
    // }
  }
}
