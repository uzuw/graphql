import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 hover:shadow-xl transition-shadow space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
      <p className="text-gray-600">{project.description}</p>
      <span
        className={`inline-block px-3 py-1 text-sm rounded-full ${
          project.status === "Completed"
            ? "bg-green-100 text-green-700"
            : project.status === "In progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {project.status}
      </span>
      <div>
        <a
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          <VisibilityIcon style={{ fontSize: '1rem' }} />
          View
        </a>
      </div>
    </div>
  );
}
