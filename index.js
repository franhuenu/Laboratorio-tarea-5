const express = require('express')
const app = express()

app.listen(8000,()=> {
console.log('Estamos escuchando en el puerto 8000')
})

app.get('/',(req,res)=>{
res.send('culero')
} )

