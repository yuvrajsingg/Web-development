// server/controllers/project.controller.js
import Project from '../models/project.model.js';

// Create
export const create = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const project = new Project({
      title, firstname, lastname, email,
      completion: completion ? new Date(completion) : undefined,
      description
    });
    const saved = await project.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Find All
export const findAll = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
};

// Find One
export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving project', error: error.message });
  }
};

// Update
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.completion) updateData.completion = new Date(updateData.completion);
    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// Delete one
export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

// Delete all
export const deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany({});
    return res.status(200).json({ message: 'All projects deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting all projects', error: error.message });
  }
};
