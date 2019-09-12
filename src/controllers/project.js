const express = require('express');
const authMiddleware = require('../middleware/auth');

const Project = require('../models/project');
//const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  
  try{
    const projects = await Project.find().populate('user');
    
    return res.send({ projects });
  
  }catch(err){
    return res.status(400).send({error:'Não listou os projetos.'})
  }

});

router.get('/:projectId', async (req, res) => {
  try {
    const projects = await Project.findById(req.params.projectId).populate('user');

    return res.send({ projects });

  } catch (err) {
    return res.status(400).send({ error: 'Não listou os projetos.' });
  }
});

router.post('/', async (req, res) => {
  try{
    const projects = await Project.create({ ...req.body, user: req.userId });

    return res.send({ projects });
  } catch(err){
    return res.status(400).send({ error: 'Aconteceu algo de errado no envio' })
  }
});

router.put('/projectId', async (req, res) =>{
  res.send({ user: req.userId });
});

router.delete('/projectId', async (req, res) => {
  res.send({ user: req.userId });
});

module.exports = (app) => app.use('/projects', router);
