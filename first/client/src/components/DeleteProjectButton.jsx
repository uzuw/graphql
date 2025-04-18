import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECTS } from "../mutations/projectMutation";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECTS, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-1 text-red-600 hover:text-red-800"
    >
      <FaTrash />
      Delete
    </button>
  );
};

export default DeleteProjectButton;
