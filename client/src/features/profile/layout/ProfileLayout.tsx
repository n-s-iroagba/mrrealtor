import React, { useState } from 'react';
import '../styles/profile.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ProfileLayout = () => {
  const [firstName, setFirstName] = useState('Nnamdi');
  const [surName, setSurName] = useState('Nnamdi');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPicture, setIsChangingPicture] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleSurNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurName(e.target.value);
  };

  const handlePictureChangeClick = () => {
    setIsChangingPicture(!isChangingPicture);
  };

  return (
    <div className="profile-layout">
      <h1>Your Profile</h1>
      <div>
        <img src="" alt="profile" />
      </div>
      <div>
       
        {isEditing ?  <button onClick={handleEditClick}>Save Profile Details</button> : <button onClick={handleEditClick}> 'Edit Profile Details'</button>}
     
        <button onClick={handlePictureChangeClick}>
          {isChangingPicture ? 'Cancel' : 'Change Profile Picture'}
        </button>
        <button>Remove Profile Picture</button>
      </div>
      {isChangingPicture && (
        <div className='d-flex flex-column align-items-center '>
          <input type="file" />
          <button>save profile picture</button>
        </div>
      )}
      <div>
        <h4>Name  {isEditing &&   <FontAwesomeIcon icon ={faPen}/>}:</h4>
        <div className="profile-inputs">
          {isEditing ? (
            <>
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                className="profile-input"
              />
              <input
                type="text"
                value={surName}
                onChange={handleSurNameChange}
                className="profile-input"
              />
            
            </>
          ) : (
            <>
              <div className="profile-input">{firstName}</div>
              <div className="profile-input">{surName}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
