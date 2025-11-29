// components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  type = 'error',
  onDismiss 
}) => {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`p-3 border rounded-md ${styles[type]} transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <svg 
            className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
              type === 'error' ? 'text-red-400' : 
              type === 'warning' ? 'text-yellow-400' : 
              'text-blue-400'
            }`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
          <div>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};