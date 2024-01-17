import { Request, Response, NextFunction } from 'express';

async function checkValidContent(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.content) {
      return res.status(400).send({ 
        message: "Content is empty.",
        error: "content_is_empty"
      });
    }

    if (req.body.content.length > 240) {
      return res.status(400).send({ 
        message: "Content is too long.",
        error: "content_is_too_long"
      });
    }

    next();
  } catch(err: any) {
    return res.status(500).send({ message: err.message || "Some error occurred while validating post" });
  }
}

export { checkValidContent };