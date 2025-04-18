import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { FaPlus } from "react-icons/fa";

const AddProjectModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS }) || { projects: [] };
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { name, description, status, clientId }); // Debug log
  
    if (!name || !description || !status || !clientId) {
      console.log('Validation failed - missing fields'); // Debug log
      return;
    }
  
    console.log('Attempting to add project...'); // Debug log
    addProject({
      variables: { name, description, status, clientId },
    })
      .then((result) => {
        console.log('Project added successfully', result); // Debug log
        setName("");
        setDescription("");
        setStatus("new");
        setClientId("");
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Error adding project:", err); // This should show any errors
      });
  };
  
  

  if (loading) return null;
  if (error) return <p>Error loading clients</p>;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#ff456a] text-white px-4 py-2 text-lg rounded-lg hover:bg-[#d42542] mt-10 flex items-center gap-2"
      >
        <FaPlus />
        Add Project
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900/70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
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
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Client</option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
