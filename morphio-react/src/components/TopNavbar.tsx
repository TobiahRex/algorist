import React from 'react';
import { useLocation } from 'react-router-dom';

interface TopNavbarProps {
  title?: string;
  emoji?: string;
  tabs?: Array<{ id: string; label: string; icon: string }>;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  title,
  emoji,
  tabs,
  activeTab,
  onSelectTab,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage || !title) {
    return null;
  }

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.95) 0%, rgba(26, 31, 58, 0.95) 100%)',
        borderBottom: '1px solid rgba(167, 139, 250, 0.2)',
        backdropFilter: 'blur(10px)',
        padding: '15px 20px',
        marginLeft: '280px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
          <h1
            style={{
              margin: 0,
              fontSize: '1.3rem',
              color: '#a78bfa',
              fontWeight: '600',
            }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Tab navigation */}
      {tabs && tabs.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            borderTop: '1px solid rgba(167, 139, 250, 0.1)',
            paddingTop: '10px',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab?.(tab.id)}
                style={{
                  background: isActive
                    ? 'rgba(167, 139, 250, 0.2)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(167, 139, 250, 0.5)'
                    : '1px solid rgba(167, 139, 250, 0.2)',
                  color: isActive ? '#a78bfa' : '#888',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)';
                    e.currentTarget.style.background = 'rgba(167, 139, 250, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor =
                      'rgba(167, 139, 250, 0.2)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
