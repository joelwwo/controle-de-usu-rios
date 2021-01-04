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

Route.get('/', ({ request }) => {
  if (Object.entries(request.all()).length) return request.all()
  return { message: 'Beleza, Matos', by: 'Joel' }
})

Route.post('/login', 'AuthController.authenticater')

Route.resource('users', 'UserController')
  .middleware(new Map([
    [['index'], ['auth', 'typeUser:master,query,edit']],
    [['store'], ['auth', 'typeUser:master,edit', 'cpfOrEmailOwner']],
    [['show'], ['auth', 'typeUser:master,query,edit,self']],
    [['update'], ['auth', 'typeUser:master,self', 'cpfOrEmailOwner']],
    [['destroy'], ['auth', 'typeUser:master']],
  ]))
  .validator(new Map([
    [['users.store'], ['StoreUser']],
    [['users.update'], ['UpdateUser']]
  ]))
  .apiOnly()


Route.resource('address', 'AddressController')
  .middleware(new Map([
    [['index'], ['auth', 'typeUser:master,query,edit']],
    [['store'], ['auth', 'typeUser:master,edit']],
    [['show'], ['auth', 'typeUser:master,query,self,edit']],
    [['update'], ['auth', 'typeUser:master,self,edit']],
    [['destroy'], ['auth', 'typeUser:master,self']],
  ]))
  .validator(new Map([
    [['address.store'], ['StoreAddress']],
    [['address.update'], ['UpdateAddress']]
  ]))
  .apiOnly()

Route.resource('cellphones', 'CellphoneController').middleware(new Map([
  [['index'], ['auth', 'typeUser:master,query,edit']],
  [['store'], ['auth', 'typeUser:master,edit']],
  [['show'], ['auth', 'typeUser:master,query,edit,self']],
  [['update'], ['auth', 'typeUser:master,edit,self', 'cellphoneOwner']],
  [['destroy'], ['auth', 'typeUser:master,self']],
]))
  .validator(new Map([
    [['cellphones.store'], ['StoreCellphone']],
    [['cellphones.update'], ['UpdateCellphone']]
  ]))
  .apiOnly()

Route.resource('shoppinglists', 'ShoppinglistController')
  .middleware(new Map([
    [['index'], ['auth', 'typeUser:master,query,edit']],
    [['store'], ['auth', 'typeUser:master,edit']],
    [['show'], ['auth', 'typeUser:master,query,edit,self']],
    [['update'], ['auth', 'typeUser:master']],
    [['destroy'], ['auth', 'typeUser:master']],
  ]))
  .validator(new Map([
    [['shoppinglists.store'], ['StoreShoppinglist']],
    [['shoppinglists.update'], ['UpdateShoppinglist']]
  ]))
  .apiOnly()

Route.group(() => {

  Route.get('getAllPurchases/:id', 'UserController.getAllPurchases')
  Route.get('getAllPaidPurchases/:id', 'UserController.getAllPaidPurchases')
  Route.get('getAllUnPaidPurchases/:id', 'UserController.getAllUnPaidPurchases')
  Route.get('getAllAdmin', 'UserController.getAllAdmin')
  Route.get('findBy', 'UserController.findBy')
  Route.get('findNameLike/:query', 'UserController.findNameLike')

})
  .middleware([
    'auth', 'typeUser:master,query,edit,self'
  ])
  .prefix('user')