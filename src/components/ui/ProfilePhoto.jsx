import React from "react";
import Icon from "./Icon";
import user from "../../assets/user.svg";

function ProfilePhoto(props) {
  return (
    <>
      <div className="w-10 h-10 rounded-full bg-white flex justify-center cursor-pointer">
        <Icon icon={user} w={20} />
      </div>
    </>
  );
}

export default ProfilePhoto;
