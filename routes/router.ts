import {Router, Request, Response} from 'express';

const router = Router();

router.get('/mensajes', ( req: Request , resp: Response) => {
    resp.json({
        ok: true,
        mensaje:'El GET ha ido bien!!'
    });

});
router.post('/mensajes', ( req: Request , resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    resp.json({
        ok: true,
        mensaje:'El POST ha ido bien!!',
        cuerpo,
        de
    });

});

router.post('/mensajes/:id', ( req: Request , resp: Response) => {

    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    resp.json({
        ok: true,
        mensaje:'El POST por ID_Mensaje ha ido bien!!',
        id,
        cuerpo,
        de
    });

});

export default router;