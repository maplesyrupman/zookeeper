const router = require('express').Router();
const {
    findById,
    filterByQuery,
    createNewZookeeper,
    validateZookeeper
} = require('../../lib/zookeepers')
const { zookeepers } = require('../../data/zookeepers.json');

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;

    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

router.get('/zookeepers/:id', (req, res) => {
    let result = findById(req.params.id, zookeepers);
    
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
})

router.post('/zookeepers', (req, res) => {
    req.body.id = zookeepers.length.toString();

    if (validateZookeeper(req.body)) {
        const newZookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(newZookeeper)
    } else {
        res.status(400).send('Incorrectly formatted zookeeper!')
    }
})

module.exports = router