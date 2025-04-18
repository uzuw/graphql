import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutation";

const EditProject = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status || "new");

  const [updateProject] = useMutation(UPDATE_PROJECT);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProject({
      variables: {
        id: project.id,
        name,
        description,
        status,
      },
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Update Project Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;
