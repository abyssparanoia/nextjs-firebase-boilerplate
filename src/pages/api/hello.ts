import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  console.log(req)
  res.status(200).json({ message: `hello world` })
}
