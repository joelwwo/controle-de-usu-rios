'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/login', 'AuthController.authenticater')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('address', 'AddressController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('cellphones', 'CellphoneController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.resource('shoppinglists', 'ShoppinglistController').apiOnly()
}).middleware('auth')
