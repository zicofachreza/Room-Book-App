"use strict"

const express = require('express')
const Contoller = require('../controllers/controller')
const router = express.Router()

router.get('/', Contoller.showHome)
router.post('/register',Contoller.postRegisterUser)
router.post('/login',Contoller.postLoginUser)

router.use(function(req,res,next) {
    if(!req.session.userId){
        const error = 'please login first'
        res.redirect(`/?error${error}`)
    }else{
        next()
    }
})

router.get('/categories', Contoller.showCategory)
router.get('/homeLogin',Contoller.showHomeLogin)
router.get('/rooms', Contoller.showRoom)
router.get('/roomList', Contoller.showRoomList)
router.get('/profiles', Contoller.showProfile)
router.get('/logout',Contoller.getLogout)
router.get('/roomList/:scheduleId/delete', Contoller.showDeleteOrderer)
router.get('/profiles/:profileId/edit', Contoller.showEditProfile)
router.post('/profiles/:profileId/edit', Contoller.postEditProfile)
router.get('/rooms/:roomId/book', Contoller.showBookRoom)
router.post('/rooms/:roomId/book', Contoller.postBookRoom)

module.exports = router