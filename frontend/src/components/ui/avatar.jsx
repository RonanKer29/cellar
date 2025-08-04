import React, { useMemo } from 'react';
import { generateAvatar } from '../../utils/avatar';

const Avatar = ({ 
  name, 
  src, 
  size = 56, 
  className = '',
  showInitials = true,
  ...props 
}) => {
  const avatarSrc = useMemo(() => {
    if (src) return src;
    if (name && showInitials) {
      return generateAvatar(name, size);
    }
    return null;
  }, [name, src, size, showInitials]);

  const baseClasses = "rounded-full object-cover flex-shrink-0 shadow-md transition-transform duration-200 hover:scale-105";
  const combinedClasses = `${baseClasses} ${className}`;

  if (avatarSrc) {
    return (
      <img
        src={avatarSrc}
        alt={name ? `Avatar de ${name}` : 'Avatar'}
        className={combinedClasses}
        style={{ width: size, height: size }}
        {...props}
      />
    );
  }

  // Fallback si pas de nom et pas d'image
  return (
    <div
      className={`${combinedClasses} bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center`}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="w-1/2 h-1/2 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Avatar;