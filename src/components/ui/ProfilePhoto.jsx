import React from "react";

import user from "../../assets/user.svg";

function ProfilePhoto(props) {
  return (
    <>
      <div
        className={`w-10 h-10 rounded-full bg-white hidden justify-center cursor-pointer ${props.className}`}
      >
        <img src={user} alt="search" width={20} />
      </div>
    </>
  );
}

export default ProfilePhoto;
