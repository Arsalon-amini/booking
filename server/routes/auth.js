import express from 'express'; 

const router = express.Router(); //gives access to express router

router.get('/:message', (req, res) => {
    res.status(200).send(req.params.message); 
});

module.exports = router;