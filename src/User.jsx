import React from 'react'

export default function User({user}) {
    const renderUserProfile = (profile) => {
        return <div dangerouslySetInnerHTML={{ __html: profile }} />;
      };

    // created a separate onclick function then added asyc await for post method
      const onActivateUser = async() =>{
        const response = await fetch(`/api/users/${user.id}/activate`, { method: 'POST' })
        const data = await response.json();
        console.log(data)
    }
      

  return (
    <>
      <h2>{user.name}</h2>
          {renderUserProfile(user.profile)}
          <button onClick={onActivateUser}>
            Activate User
          </button>
    </>
  )
}
