import { Response } from "express";
import { json } from "body-parser";

import RequestWithRawBody from "./interfaces/raw-body.interface";

const rawBodyMiddleware = () => {
  return json({
    verify: (request: RequestWithRawBody, response: Response, buffer: Buffer) => {
      if (request.url.startsWith("/hooks") && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    }
  });
};

export default rawBodyMiddleware;
