import React from 'react';

interface DateDisplayProps {
  date: Date | string | number;
  format?: 'short' | 'medium' | 'long';
  className?: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({
  date,
  format = 'medium',
  className = ''
}) => {
  const formatDate = (date: Date | string | number): string => {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }

    switch (format) {
      case 'short':
        return d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      case 'long':
        return d.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      default: // medium
        return d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
    }
  };

  return (
    <span className={`text-gray-700 ${className}`}>
      {formatDate(date)}
    </span>
  );
};

export default DateDisplay;