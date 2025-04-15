
const ClientRow = ({client}) => {
  return (
    <tr className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
    </tr>
  )
}

export default ClientRow
