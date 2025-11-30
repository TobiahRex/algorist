import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LeftSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const patterns = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/all-patterns', label: '📚 All Patterns', icon: '📚' },
    { path: '/two-pointers', label: '👆👆 Two Pointers', icon: '👆' },
    { path: '/sliding-window', label: '🪟 Sliding Window', icon: '🪟' },
    { path: '/fast-slow', label: '🐢🐇 Fast & Slow', icon: '🐢' },
    { path: '/binary-search', label: '🔍 Binary Search', icon: '🔍' },
    { path: '/bfs', label: '📊 BFS', icon: '📊' },
    { path: '/dfs', label: '📈 DFS', icon: '📈' },
    { path: '/backtracking', label: '🔄 Backtracking', icon: '🔄' },
    { path: '/dynamic-programming', label: '🧩 Dynamic Programming', icon: '🧩' },
  ];

  return (
    <>
      {/* Hamburger button for mobile/collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'rgba(167, 139, 250, 0.1)',
          border: '1px solid rgba(167, 139, 250, 0.3)',
          borderRadius: '8px',
          padding: '10px 12px',
          cursor: 'pointer',
          color: '#a78bfa',
          fontSize: '1.2rem',
          display: isOpen ? 'none' : 'block',
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: isOpen ? '280px' : '0',
          background: 'linear-gradient(135deg, #0d1117 0%, #1a1f3a 100%)',
          borderRight: '1px solid rgba(167, 139, 250, 0.2)',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
          zIndex: 999,
        }}
      >
        {/* Close button inside sidebar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            borderBottom: '1px solid rgba(167, 139, 250, 0.1)',
          }}
        >
          <h2 style={{ margin: 0, color: '#a78bfa', fontSize: '1.3rem' }}>
            🧠 Morphio
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#a78bfa',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation links */}
        <nav
          style={{
            padding: '10px 0',
          }}
        >
          {patterns.map((pattern) => {
            const isActive = location.pathname === pattern.path;
            return (
              <Link
                key={pattern.path}
                to={pattern.path}
                onClick={() => {
                  // Keep sidebar open on navigation
                }}
                style={{
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    padding: '12px 20px',
                    color: isActive ? '#a78bfa' : '#888',
                    borderLeft: isActive ? '4px solid #a78bfa' : '4px solid transparent',
                    background: isActive ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? '600' : '400',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(167, 139, 250, 0.05)';
                      e.currentTarget.style.color = '#a78bfa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#888';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{pattern.icon}</span>
                  <span>{pattern.label.split(' ').slice(1).join(' ')}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            borderTop: '1px solid rgba(167, 139, 250, 0.1)',
            background: 'rgba(0, 0, 0, 0.3)',
            fontSize: '0.75rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          <div>Memory Palace Framework</div>
          <div style={{ marginTop: '5px' }}>POA Mnemonics</div>
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile-like view */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            display: window.innerWidth > 768 ? 'none' : 'block',
          }}
        />
      )}
    </>
  );
};
