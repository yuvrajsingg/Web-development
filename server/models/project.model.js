// server/models/project.model.js
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    completion: { type: Date },
    description: { type: String }
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default Project;
