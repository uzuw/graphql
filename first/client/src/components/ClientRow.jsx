import {FaTrash} from 'react-icons/fa'

const ClientRow = ({client}) => {
  return (
    <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
                <td className="py-2 px-4 border-b"><button className='hover:text-red-500 hover:scale-120 transition transform'><FaTrash/></button></td>              
    </tr>
  )
}

export default ClientRow
