const express = require('express')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
app.use(express.json())
app.use(cors())

const demand = []
const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = demand.findIndex(index => index.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Order not found." })
    }

    userId = id
    userIndex = index

    next()
};

const MethodUrl = (request, response, next) => {
    const method = request.method
    const url = request.path
    console.log(`Method:${method} URL: ${url}`)
    next()
};

app.get('/command', MethodUrl, (request, response) => {
    return response.json(demand)
});

app.post('/command', MethodUrl, (request, response) => {
    const { order, clientName, price, status} = request.body

    const orderClient = { id: uuid.v4(), order, clientName, price, status }

    demand.push(orderClient)
    return response.status(201).json(orderClient)
});
app.put('/command/:id', checkUserId, MethodUrl, (request, response) => {
    const id = request.userId
    const { order, clientName, price, status } = request.body
    const updateOrder = { id, order, clientName, price, status }

    demand[userIndex] = updateOrder

    return response.json(updateOrder)
});
app.delete('/command/:id', checkUserId, MethodUrl, (request, response) => {

    demand.splice(userIndex, 1)
    return response.status(204).json()
});


app.get('/command/:id', checkUserId, MethodUrl, (request, response) => {
    const index = userIndex

    return response.json(demand[index])
});

app.patch('/command/:id', checkUserId, MethodUrl, (request, response) => {
    const index = userIndex

    demand[index].status = "Pronto"

    return response.json(demand[index])
});

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});