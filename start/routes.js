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
  return { message: 'Beleza, Matos', by: 'Joel' }
})

Route.post('/login', 'AuthController.authenticater')

Route.resource('users', 'UserController')
/* .middleware(new Map([
  [['index'], ['auth', 'typeUser:master,query,edit']],
  [['store'], ['auth', 'typeUser:master,edit']],
  [['show'], ['auth', 'typeUser:master,query,edit,self']],
  [['update'], ['auth', 'typeUser:master,self']],
  [['destroy'], ['auth', 'typeUser:master']],
])).apiOnly() */


Route.resource('address', 'AddressController')
  .middleware(new Map([
    [['index'], ['auth', 'typeUser:master,query,edit']],
    [['store'], ['auth', 'typeUser:master,edit']],
    [['show'], ['auth', 'typeUser:master,query,self,edit']],
    [['update'], ['auth', 'typeUser:master,self,edit']],
    [['destroy'], ['auth', 'typeUser:master,self']],
  ])).apiOnly()

Route.resource('cellphones', 'CellphoneController').middleware(new Map([
  [['index'], ['auth', 'typeUser:master,query,edit']],
  [['store'], ['auth', 'typeUser:master,edit']],
  [['show'], ['auth', 'typeUser:master,query,edit,self']],
  [['update'], ['auth', 'typeUser:master,edit,self']],
  [['destroy'], ['auth', 'typeUser:master,self']],
])).apiOnly()


Route.resource('shoppinglists', 'ShoppinglistController')
  .middleware(new Map([
    [['index'], ['auth', 'typeUser:master,query,edit']],
    [['store'], ['auth', 'typeUser:master,edit']],
    [['show'], ['auth', 'typeUser:master,query,edit,self']],
    [['update'], ['auth', 'typeUser:master']],
    [['destroy'], ['auth', 'typeUser:master']],
  ])).apiOnly()

Route.group(() => {

  Route.get('getAllPurchases/:id', 'UserController.getAllPurchases')
  Route.get('getAllPaidPurchases/:id', 'UserController.getAllPaidPurchases')
  Route.get('getAllUnPaidPurchases/:id', 'UserController.getAllUnPaidPurchases')

})
  .middleware([
    'auth', 'typeUser:master,query,edit,self'
  ])
  .prefix('user')