var express = require('express')
var router = express.Router()

router.post('/', (req,res)=> {
    var info = {
        'name': 'Ashik',
        'number': 12345
    }
    console.log(req.body)
    
    res.status(201).json(info)
})

router.get('/', (req,res)=> {
    var info = {
        'status': 'IS a get request'
    }

    
    res.status(201).json(info)
})


module.exports = router