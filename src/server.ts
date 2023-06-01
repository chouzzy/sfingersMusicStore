import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes'
import cors from 'cors';


const app = express()
app.use(cors());

app.use(express.json())

app.use(router)

// Tratamento de erro

app.listen(3333, () => console.log('Sir, we are back online! 🦥'))