import express from 'express'
import path from "path"
import { Firestore, Timestamp } from "@google-cloud/firestore"

const publicDir = path.join(__dirname, '../public/')

const firestore = new Firestore()
const pastes = firestore.collection('pastes')

const app = express()

app.use('/', express.static(publicDir))

app.get('/api/:id', async (request, response) => {
    const doc = await pastes.doc(request.params.id).get()
    const data = doc.data()
    if (data === undefined) {
        response.sendStatus(404)
        return
    }
    response.send({
        id: doc.id,
        content: data.content,
        createdAt: data.createdAt.seconds
    })
})

app.post('/api/', async (request, response) => {
    console.log(request.body)
    const content = request.body.content
    if (content === undefined) {
        response.sendStatus(400)
        return
    }
    const doc = await pastes.add({
        content: content,
        createdAt: Timestamp.now()
    })
    response.status(201).send({id: doc.id})
})

app.get('/*', (request, response) => {
    response.sendFile(`${publicDir}/index.html`)
})

app.listen(process.env.PORT, () => console.log('Listening on post 5000'))
