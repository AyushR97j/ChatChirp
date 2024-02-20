import React from 'react'
import Img1 from "../assets/img1.jpg";

const UserList = ({users, fetchMessagess}) => {

    //console.log("users", users)
  return (
    <div>
      {users?.length > 0 ? (
              users?.map(({ userId, user }) => {
                return (
                  <div key={user.receiverId} className="flex items-center py-8 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessagess(userId, user)}
                    >
                      <div>
                        <img
                          src={Img1}
                          alt="User Img"
                          className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
    </div>
  )
}

export default UserList
