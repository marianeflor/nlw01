import express from 'express'
import cors from 'cors'
import path from 'path'
import { errors } from 'celebrate'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors())

app.listen(3333)

/*
* rota = endereço completo
* recurso = entidade acessada do sistema

* request param: parâmetros que vem na própria rota que identificam um recurso (obrigatório = /users/:id)
* query param: parâmetros que vem na própria rota que servem para paginação, filtro ... (opcional = /users?search=d)
* request body: corpo da requisição / parâmetros para a criação ou atualização de informações

* knex para uniformizar a linguagem em js para diversos bancos SQL
    ex: SELECT * FROM users WHERE name = 'Diego'
    fica: knex('users').where('name', 'Diego').select('*')
*/

/*
const users = [
    'Mariane',
    'Diego',
    'Cleiton',
    'Daniela'
]

app.get('/users', (request, response) => {
    const search = String(request.query.search)
    
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users

    response.json(filteredUsers)
})

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id)
    const user = users[id]

    response.json(user)
})

app.post('/users', (request, response) => {
    const data = request.body

    const user = {
        name: data.name,
        email: data.email
    }

    return response.json(user)
})
*/