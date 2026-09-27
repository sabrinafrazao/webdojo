require('dotenv/config');
const express = require('express');
const cors = require('cors');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('./generated/prisma');

const app = express()
const port = 3333
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

app.use(cors())

app.use(express.json())


app.get('/', (req, res) => {
  res.json({message:'World!' })
})

app.post('/api/users/register', async (req, res) => {

  const {name, email, password} = req.body

  if(!name) {
    return res.status(400).json({error:"Name is required!"})
  }

   if(!email) {
    return res.status(400).json({error:"Email is required!"})
  }

   if(!password) {
    return res.status(400).json({error:"Password is required!"})
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, password }
    })

    return res.status(201).json({message: "Usuário cadastrado com sucesso", user: { id: user.id, name: user.name, email: user.email }})
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({error: "Email já cadastrado!"})
    }

    console.error(error)
    return res.status(500).json({error: "Erro ao cadastrar usuário"})
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})