import { useChatUsers } from "../hooks/chatUsers"
const ChatUsers = () => {

  const {users, loading} = useChatUsers()
  
  return (
    <>
    {
      loading ? <span className="loading loading-spinner loading-md"></span> :   <div>
      <div className=" mt-2.5">
          <h1 className=" font-semibold text-center p-2 text-2xl">All Chats</h1>
        </div>
      <div className="overflow-x-auto cursor-pointer">
 {
  users.map((item)=>(
     <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td className=" flex items-center space-x-10" >
            <div className="avatar mt-2
            ">
          <div className="ring-primary ring-offset-base-100  w-12 rounded-full ring-2 ring-offset-2">
             <img src={item.profilePic} alt="" />
          </div>
        </div>
         <div className=" font-semibold" >{item.name}</div>
        </td>
      </tr>
    </tbody>
  </table>
  ))
 }
</div>
    </div>
    }
    </>
  
  )
}

export default ChatUsers


