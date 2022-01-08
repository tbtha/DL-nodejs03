import http from "http";
import axios  from "axios";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import _ from "lodash";
import chalk from "chalk";

const urlApi = "https://randomuser.me/api/";
const usuarios = []


const server = http.createServer(async(req, res)=>{
    
    if(req.url.includes('/consultar')){
        const {data} = await axios (urlApi)
        const id = uuidv4().slice(0,6)
        const time = moment().format("DD MM YYYY hh:mm:ss")
        usuarios.push({
            nombre: data.results[0].name.first,
            apellido: data.results[0].name.last,
            ID: id,
            timestamp: time,
        })
        
        
        const arregloConsola = JSON.stringify(_.defaults(usuarios))
        console.log(chalk.blue.bgWhite(arregloConsola))

        usuarios.forEach((u)=>{
            res.write(`Nombre: ${u.nombre} - Apellido: ${u.apellido} - ID: ${u.ID} - Timestamp: ${u.timestamp} \n`)
        })
        
        res.end();
    }
    
   
 
})

const puerto = 5450;
server.listen(puerto,() => console.log('servidor activo'));



