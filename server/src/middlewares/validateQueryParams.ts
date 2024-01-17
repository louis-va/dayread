import { Request, Response, NextFunction } from 'express';

async function checkPageQuery(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.query.page) {
      return res.status(400).send({ 
        message: "Missing page in query.",
        error: "wrong_query"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while validating query params" });
  }
}

export { checkPageQuery };