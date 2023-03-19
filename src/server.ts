import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express'
import { AppError } from './errors/AppError'
import { router } from './routes'


const app = express()

app.use(express.json())

app.use(router)

// Tratamento de erro
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {

    // Erros instanciados na classe AppError, ex throw new AppError(lalala)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    // Erro sem instanciar na classe App Error ex Throw new Error(lalala)
    return res.status(500).json({
        status:'error',
        message:`⛔ Internal Server Error: ${err.message}⛔`
    })
})

app.listen(3333, () => console.log('Sir, we are back online! 🦥'))