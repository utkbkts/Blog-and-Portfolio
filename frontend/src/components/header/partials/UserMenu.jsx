import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const UserMenu = () => {
  const [active, setActive] = useState(false);
  return (
    <OutsideClickHandler onOutsideClick={() => setActive(false)}>
      <div className="relative">
        <img
          src="/avatar.png"
          alt="avatar"
          title="avatar"
          className="w-10 h-10 object-cover rounded-full cursor-pointer"
          onClick={() => setActive(!active)}
        />
        {active && (
          <div className="absolute top-12 w-[240px] right-0 rounded-md shadow-lg bg-white text-black">
            <div className="flex flex-col p-4">
              <span className="font-bold text-sm truncate">
                Utku Toygun Bektasoglu
              </span>
              <hr className="my-2" />
              <p className="text-xs break-words">
                utkutoygunbektasoglu@gmail.com
              </p>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default UserMenu;
