import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import profileImg from '../../../assets/icons/profile.png';
import { LuUserPlus } from "react-icons/lu";


// Define the interface for the props
interface NavBarProps {
  role: string | null;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ role, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handelProfile = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  return (
    <div className="p-3 shadow-md">
      <div className="flex items-center justify-between">
        <Link to="/mytasks" className="font-bold text-2xl">TaskMaster</Link>

        {role === 'admin' && (
          <div className="ml-auto mr-6">
            <Link
              to="/invite"
              className="mt-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition duration-300 ">
              <LuUserPlus className="w-10 h-10 p-1 bg-gray-300 rounded-full hover:bg-gray-400 transition" />
            </Link>
          </div>
        )}
        <div className="relative mr-6">
          <img
            src={profileImg}
            alt="Profile"
            className="cursor-pointer rounded-full w-10 h-10"
            onClick={handelProfile} />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 rounded">
              <Button
                onClick={onLogout}
                className="bg-gray-300 w-full px-4 py-2 text-left text-gray-800 rounded border-none hover:bg-gray-400">
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
