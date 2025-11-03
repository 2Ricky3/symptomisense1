import React, { useState } from 'react';
import { FaUser, FaUserMd, FaUserNurse, FaHeart, FaBrain, FaSmile } from 'react-icons/fa';

interface AvatarSelectorProps {
  onSelect: (avatar: string) => void;
  currentAvatar?: string;
  onClose: () => void;
}

const avatarOptions = [
  { icon: FaUser, color: 'from-blue-500 to-blue-600', name: 'default' },
  { icon: FaUserMd, color: 'from-green-500 to-green-600', name: 'doctor' },
  { icon: FaUserNurse, color: 'from-pink-500 to-pink-600', name: 'nurse' },
  { icon: FaHeart, color: 'from-red-500 to-red-600', name: 'heart' },
  { icon: FaBrain, color: 'from-purple-500 to-purple-600', name: 'brain' },
  { icon: FaSmile, color: 'from-yellow-500 to-yellow-600', name: 'smile' },
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onSelect, currentAvatar, onClose }) => {
  const [selected, setSelected] = useState(currentAvatar || 'default');

  const handleSelect = (name: string) => {
    setSelected(name);
  };

  const handleSave = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        <h3 className="text-2xl font-bold text-dark mb-4">Choose Your Avatar</h3>
        <p className="text-muted text-sm mb-6">Select an icon to represent your profile</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {avatarOptions.map((avatar) => {
            const Icon = avatar.icon;
            const isSelected = selected === avatar.name;
            
            return (
              <button
                key={avatar.name}
                onClick={() => handleSelect(avatar.name)}
                className={`
                  relative p-6 rounded-xl transition-all duration-300 transform hover:scale-105
                  ${isSelected ? 'ring-4 ring-primary shadow-lg scale-105' : 'hover:shadow-md'}
                `}
              >
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center`}>
                  <Icon className="text-2xl text-white" />
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
          >
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;
