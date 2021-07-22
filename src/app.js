const fs = require('fs')
const path = require('path')

const express = require('express')
const app = new express()

const { accounts, users, writeJSON } = require('./data.js')

const accountRoutes = require('./routes/accounts.js')
const servicesRoutes = require('./routes/services.js')

app.set('views',path.join(__dirname, '/views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))

// const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8')
// const accounts = JSON.parse(accountData)

// const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8')
// const users = JSON.parse(userData)

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts }))

app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

app.get('/profile', (req, res) =>  res.render('profile', { user: users[0] }))

app.listen(3000, () => { console.log('Running on port 3000') })