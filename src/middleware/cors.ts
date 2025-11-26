import { Application, NextFunction, Request, Response } from 'express';

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [
        'localhost:4200',
        'localhost:8000',
    ];
    const origin: string = req.headers.origin!;
    const host: string = req.headers.host!;

    // console.log('ORIGIN ==> ' + origin);
    // console.log('HOST ==> ' + host);

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', host);
    }

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,OPTIONS,DELETE');

    if (req.method.toLowerCase() == 'options') {
        return res.status(200).end();
    }
    next();
};

export default class CorsMiddlewareConfig {
    public static setup(expressApp: Application): void {
        expressApp.use(allowCrossDomain);
    }
}