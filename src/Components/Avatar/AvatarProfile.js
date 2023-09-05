import React from "react";
import css from "./AvatarProfile.module.css";
import Avatar, { Cache } from "react-avatar";

const cache = new Cache({
  sourceTTL: 7 * 24 * 3600 * 1000,

  sourceSize: 20,
});

const AvatarProfile = ({ user, size }) => {
  const getInitials = (name) => {
    if (typeof name !== "string" || name.trim() === "") {
      return "";
    }

    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

  const initials = getInitials(user?.profile?.name);
  return (
    <div className={`${css.center} ${css.smallFont}`}>
      <Avatar
        src={user?.user?.profilePicture ? `/${user.user.profilePicture}` : null}
        name={user?.profile.name}
        alt={initials}
        size={size}
        color={"#133D7A"}
        round={true}
        cache={cache}
        initials={initials}
      />
    </div>
  );
};

export default AvatarProfile;
