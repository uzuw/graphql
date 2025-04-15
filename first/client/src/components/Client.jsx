import { gql, useQuery } from '@apollo/client';
import ClientRow from './ClientRow';

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading clients.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#e23d71] mb-4">Clients</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Name</th>
              <th className="text-left py-2 px-4 border-b">Email</th>
              <th className="text-left py-2 px-4 border-b">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;
