const express = require('express');
const authMiddleware = require('../middleware/auth');

const Projects = require('../models/project');
//const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/projects', async (req, res) => {
  
  try{
    const project = await Projects.find();
    return res.send({ project });
  
  }catch(err){
    return res.status(400).send({error:'Não listou os projetos.'})
  }
  //res.send({ user: req.userId });
});

router.get('/:projectId', async (req, res) => {
  res.send({ user: req.userId });
});

router.post('/', async (req, res) => {
  try{
    const project = await Projects.create({ ...req.body, user: req.userId, title: req.title, description: req.description });

    return res.send({ project });
  } catch(err){
    return res.status(400).send({ error: 'Aconteceu algo de errado no envio' })
  }
  //res.send({ user: req.userId });
});

router.put('/projectId', async (req, res) =>{
  res.send({ user: req.userId });
});

router.delete('/projectId', async (req, res) => {
  res.send({ user: req.userId });
});

module.exports = (app) => app.use('/projects', router);