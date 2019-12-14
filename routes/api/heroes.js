const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const heroes = require ('../../heroes');


//getting all members
router.get('/',(req,res) => res.json(heroes));

//get the single member
// router.get('/:id',(req, res) => {
//     res.send(req.params.id)
// });

//getting a single member data and id not found..
router.get('/:id',(req, res) => {
const found = heroes.some(heroe => heroe.id === parseInt(req.params.id));
    if (found) {
        res.json(heroes.filter(heroe => heroe.id === parseInt(req.params.id)));
    } else {
        res.status(404).json({msg : `no heroes with the id ${req.params.id}`})
    }
})

//post methord
router.post('/',(req,res) =>{
    //res.send(req.body);
    const newHeroes = {
        id : uuid.v4(),
        name : req.body.name
    };
    if (!newHeroes.name) {
        return res.status(400),json({'msg':`please include a name`}); 
    }
    heroes.push(newHeroes);
    res.json(heroes);
});


//update Heroes
router.put('/:id',(req, res) => {
    const found = heroes.some(heroe => heroe.id === parseInt(req.params.id));
        if (found) {
            const updateHero = req.body;
            heroes.forEach( heroe => {
                if(heroe.id === parseInt(req.params.id)){
                    heroe.name = updateHero.name?updateHero.name:heroe.name;
                    res.json({msg :`member updated`,heroe})

                }
            });
        } else {
            res.status(404).json({msg : `no heroes with the id ${req.params.id}`})
        }
})

// delete hero
router.delete('/:id',(req, res) => {
    const found = heroes.some(heroe => heroe.id === parseInt(req.params.id));
        if (found) {
            res.json({msg : `member deleted sucessfully`,
            heroes:heroes.filter(heroe => heroe.id !== parseInt(req.params.id))});
        } else {
            res.status(404).json({msg : `no heroes with the id ${req.params.id}`})
        }
    });



module.exports = router;