import { gql, useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';


const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p className="text-gray-500"><Spinner/></p>;
  if (error) return <p className="text-red-500">Error loading clients.</p>;

  return (
    <div  className="p-6">
      <h1 style={{ fontFamily: 'var(--font-space)' }} className="text-2xl font-bold text-[#e23d71] mb-4">Clients</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Name</th>
              <th className="text-left py-2 px-4 border-b">Email</th>
              <th className="text-left py-2 px-4 border-b">Phone</th>
              <th className="text-left py-2 px-4 border-b"></th>
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
