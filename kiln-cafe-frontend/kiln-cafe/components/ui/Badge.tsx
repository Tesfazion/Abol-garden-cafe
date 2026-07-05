import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'brass' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '' 
}) => {
  const variantClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    brass: 'badge-brass',
    default: 'badge',
  };
  
  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface CategoryBadgeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  children, 
  className = '',
  onClick 
}) => {
  return (
    <button 
      className={`category-tag ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

interface DietaryBadgeProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({ 
  icon, 
  label, 
  className = '' 
}) => {
  return (
    <span className={`dietary-badge ${className}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
};
