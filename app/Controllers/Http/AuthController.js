'use strict'
const User = use("App/Models/User")
class AuthController {

    async authenticater({ request, response, auth }) {
        const { email, password } = request.all()
        if (!(email && password))
            response.status(400).send([{
                message: 'Informe o e-email e a senha para efetuar login.'
            }])

        else {
            const user = await User.findBy({ email })
            if (!user)
                return response.status(400).send([{
                    message: 'E-mail não registrado.'
                }])
            if (!user.active)
                return response.status(400).send([{
                    message: 'Sua conta está desativada.'
                }])
            const token = await auth.attempt(email, password)
            return { token, user }

        }
    }
}

module.exports = AuthController
