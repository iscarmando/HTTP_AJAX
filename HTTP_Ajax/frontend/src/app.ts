import  express from 'express';
import * as path from 'path';

const app = express();
const router = express.Router();

const port = process.env.SERVER_PORT || 4000;

app.use(express.static(path.join(__dirname, '../src/public')));
    app.use('/', router);
    app.use(express.static(__dirname));


router.get('/',(req,res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname , '../src/view')
    })
    
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})