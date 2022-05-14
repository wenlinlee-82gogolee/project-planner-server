const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getProject, (req, res) => {
  res.json(res.project);
});

router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    details: req.body.details,
    complete: req.body.complete,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getProject, async (req, res) => {
  if (req.body.title !== null) {
    res.project.title = req.body.title;
  }
  if (req.body.details !== null) {
    res.project.details = req.body.details;
  }
  if (req.body.complete === true) {
    req.body.complete = false;
  } else {
    req.body.complete = true;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: 'Deleted project' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

module.exports = router;
