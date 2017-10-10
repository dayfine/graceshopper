const
  router = require('express').Router(),
  User = require('../user/user.model')

router
  .get('/', (req, res, next) => {
    User.findBySessionId(req.session.userId)
    .then(user => res.send(user))
    .catch(next)
  })

  .delete('/', (req, res, next) => {
    req.session.destroy()
    res.sendStatus(204)
  })

  .post('/', (req, res, next) => {
    User.login(req.body)
    .then(user => {
      req.session.userId = user.id
      res.send(user)
    })
    .catch(next)
  })

module.exports = router