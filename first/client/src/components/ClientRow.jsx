import {FaTrash} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENTS } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';


const ClientRow = ({client}) => {

    const [deleteClient]=useMutation(DELETE_CLIENTS, {
        variables: {
            id: client.id
        },
        refetchQueries: [
            { query: GET_CLIENTS },
            { query: GET_PROJECTS }, // ensures any projects related to the client are updated too
          ],
        //or
        // update(cache, {data:{deleteClient}}){
        //     const {clients}=cache.readQuery({query:GET_CLIENTS});
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {clients: clients.filter(client=>client.id!== deleteClient.id)},
        //     });
        // }
    });

  return (
    <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
                <td className="py-2 px-4 border-b"><button onClick={deleteClient} className='hover:text-red-500 hover:scale-120 transition transform'><FaTrash/></button></td>              
    </tr>
  )
}

export default ClientRow
