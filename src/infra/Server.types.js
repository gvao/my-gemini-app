/** @typedef {http.Server<typeof IncomingMessage, typeof ServerResponse>} ListenerServer */
/** @typedef {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}} Response */
/** @typedef {http.IncomingMessage} Request */
/** @typedef {(req: Request, res: Response)=> { status: number, body: Record<string, string> }} Handler */