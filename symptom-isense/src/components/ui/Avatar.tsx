import React from 'react';
import { FaUser, FaUserMd, FaUserNurse, FaHeart, FaBrain, FaSmile } from 'react-icons/fa';

interface AvatarProps {
  src?: string;
  alt?: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-2xl',
};

const avatarIcons = {
  default: { icon: FaUser, color: 'from-blue-500 to-blue-600' },
  doctor: { icon: FaUserMd, color: 'from-green-500 to-green-600' },
  nurse: { icon: FaUserNurse, color: 'from-pink-500 to-pink-600' },
  heart: { icon: FaHeart, color: 'from-red-500 to-red-600' },
  brain: { icon: FaBrain, color: 'from-purple-500 to-purple-600' },
  smile: { icon: FaSmile, color: 'from-yellow-500 to-yellow-600' },
};

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'User avatar', 
  avatar = 'default',
  size = 'md',
  className = '' 
}) => {
  const sizeClass = sizeClasses[size];
  
  if (src) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden border-2 border-primary/20 shadow-md ${className}`}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const avatarConfig = avatarIcons[avatar as keyof typeof avatarIcons] || avatarIcons.default;
  const Icon = avatarConfig.icon;

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br ${avatarConfig.color} flex items-center justify-center text-white font-semibold shadow-md ${className}`}>
      <Icon className="text-white" />
    </div>
  );
};

export default Avatar;
