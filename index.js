const express = require ('express')
const app = express ()

const path=require('path')

app.use(express.static('public'))

const PORT = process.env.PORT || 8000

app.listen(PORT,function(){
    console.log('Aplicación disponible en el puerto '+PORT)
})


app.get('/', function (req, res) {
    res.sendFile (path.join(__dirname, 'public/index.html'))
})
