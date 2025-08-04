import { useAuth } from '../contexts/AuthContext';

export const useUser = () => {
  const { user, isAuthenticated, isLoading, refreshUserData } = useAuth();
  
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.full_name || user.username || '';
  };
  
  const getUserInitials = () => {
    const displayName = getUserDisplayName();
    if (!displayName) return '';
    
    return displayName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const getUserLevel = () => {
    if (!user) return { level: 'Débutant', color: 'text-gray-500' };
    
    const bottlesCount = user.bottles_count || 0;
    if (bottlesCount >= 100) return { level: 'Maître Sommelier', color: 'text-yellow-500' };
    if (bottlesCount >= 50) return { level: 'Expert', color: 'text-purple-500' };
    if (bottlesCount >= 20) return { level: 'Connaisseur', color: 'text-blue-500' };
    if (bottlesCount >= 5) return { level: 'Amateur', color: 'text-green-500' };
    return { level: 'Débutant', color: 'text-gray-500' };
  };
  
  const refreshUser = async () => {
    return await refreshUserData();
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    displayName: getUserDisplayName(),
    initials: getUserInitials(),
    level: getUserLevel(),
    refreshUser,
  };
};

export default useUser;