"use strict"

const idr = require('../helpers/helper')
const {Category, Room, Schedule, User, UserProfile} = require('../models')
const bcrypt = require('bcryptjs')

class Contoller {
    static showHome(req, res) {
        try {
            let {error} = req.query
            res.render('viewHome',{error})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async postRegisterUser(req, res) {
        try {
            let {fullName, username, gender, dateOfBirth, address, nik, email, password} = req.body
            let newUser =  await User.create({username, password, email})

            await UserProfile.create({fullName, gender, dateOfBirth, address, nik, UserId : newUser.id})
            res.redirect("/")

        } catch (error) {
            res.send(error.message)
        }
    }

    static async postLoginUser(req, res) {
        try {
            let {username, password} = req.body
            let findUser =  await User.findOne({
                where: {username}
            })

            if (findUser) {
                const isValidPassword = bcrypt.compareSync(password, findUser.password)
                if (isValidPassword) {
                    req.session.userId = findUser.id
                    return res.redirect(`/homeLogin`)
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/?error=${error}`)
                }
            }

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showHomeLogin(req, res) {
        try {
            res.render('viewHomeLogin')

        } catch (error) {
            res.send(error.message)
        }
    }

    static async getLogout(req, res) {
        try {
            req.session.destroy(el => {
                if (el) res.send(el)
                else res.redirect('/')
            })

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showCategory(req, res) {
        try {
            let dataCategory = await Category.findAll()
            res.render('viewCategory', {dataCategory, idr})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showRoom(req, res) {
        try {
            let {status, status2} = req.query
            let dataRoom = await Room.readRoom(status, status2)
            let dataSchedule = await Schedule.findAll()
            res.render('viewRoom', {dataRoom, dataSchedule, idr})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showBookRoom(req, res) {
        try {
            let {errors} = req.query
            if (!errors) errors = []
            else errors = errors.split(', ')

            let {roomId} = req.params
            let dataRoom = await Room.findByPk(roomId)
            res.render('viewBookRoom', {dataRoom, errors})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async postBookRoom(req, res) {
        try {
            let UserId = req.session.userId;
            let {roomId} = req.params
            let {ordererName, email, checkIn, checkOut} = req.body
            await Schedule.create({ordererName, email, checkIn, checkOut, RoomId : roomId, UserId})
            res.redirect('/roomList')

        } catch (error) {
            let {roomId} = req.params
            if (error?.name === 'SequelizeValidationError') {
                error = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/rooms/${roomId}/book?errors=${error}`)
            } else {
                res.send(error.message)
            }
        }
    }

    static async showProfile(req, res) {
        try {
            let dataProfile = await UserProfile.findAll()
            res.render('viewProfile', {dataProfile})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showEditProfile(req, res) {
        try {
            let {profileId} = req.params
            let dataProfile = await UserProfile.findByPk(profileId)
            res.render('viewEditProfile', {dataProfile})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async postEditProfile(req, res) {
        try {
            let {profileId} = req.params
            let {fullName, nik, gender, address, dateOfBirth} = req.body
            await UserProfile.update({fullName, nik, gender, address, dateOfBirth}, {where: {id: profileId}})
            res.redirect('/profiles')

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showRoomList(req, res) {
        try {
            let dataSchedule = await Schedule.findAll()
            res.render('viewRoomList', {dataSchedule})

        } catch (error) {
            res.send(error.message)
        }
    }

    static async showDeleteOrderer(req, res) {
        try {
            let {scheduleId} = req.params
            await Schedule.destroy({
                where: {id: scheduleId}
            })
            res.redirect('/roomList')

        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = Contoller