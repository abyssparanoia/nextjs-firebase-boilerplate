import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './pipes/validation'
import { Logger } from '@nestjs/common'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

function requestLogger(logger: Logger): (req: ExpressRequest, res: ExpressResponse, next: () => void) => void {
  return (req, res, next): void => {
    res.on('finish', (): void => {
      logger.debug(`${req.method} ${req.url} -> ${res.statusCode}`)
    })
    next()
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'log', 'verbose', 'warn', 'error'] })

  const logger = new Logger()
  app.useLogger(logger)
  app.use(requestLogger(logger))

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(3001)
}
bootstrap()
