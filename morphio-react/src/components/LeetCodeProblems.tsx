import React, { useState } from 'react';

export interface LeetCodeProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  keyTakeaway: string;
  patternFocus: string;
}

type SortOrder = 'asc' | 'desc' | 'none';

interface LeetCodeProblemsProps {
  problems: LeetCodeProblem[];
  patternName: string;
}

export const LeetCodeProblems: React.FC<LeetCodeProblemsProps> = ({ problems, patternName }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  const difficultyRank = { Easy: 0, Medium: 1, Hard: 2 };

  const sortedProblems = [...problems].sort((a, b) => {
    if (sortOrder === 'none') {
      return 0;
    }

    const rankA = difficultyRank[a.difficulty];
    const rankB = difficultyRank[b.difficulty];

    return sortOrder === 'asc' ? rankA - rankB : rankB - rankA;
  });
  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#4ade80';
      case 'Medium':
        return '#fbbf24';
      case 'Hard':
        return '#ef4444';
      default:
        return '#888';
    }
  };

  const handleSort = (newOrder: SortOrder) => {
    setSortOrder(newOrder);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.6) 0%, rgba(26, 31, 58, 0.6) 100%)',
          border: '1px solid rgba(167, 139, 250, 0.2)',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#a78bfa', marginTop: 0, marginBottom: 0 }}>
            📋 LeetCode Problems: {patternName}
          </h2>

          {/* Sort Controls */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: '#888', fontSize: '12px' }}>Sort by Difficulty:</span>
            <button
              onClick={() => handleSort('none')}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: sortOrder === 'none' ? '2px solid #a78bfa' : '1px solid #555',
                background: sortOrder === 'none' ? 'rgba(167, 139, 250, 0.2)' : 'transparent',
                color: sortOrder === 'none' ? '#a78bfa' : '#888',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: sortOrder === 'none' ? 'bold' : 'normal',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (sortOrder !== 'none') {
                  e.currentTarget.style.borderColor = '#a78bfa';
                  e.currentTarget.style.color = '#a78bfa';
                }
              }}
              onMouseLeave={(e) => {
                if (sortOrder !== 'none') {
                  e.currentTarget.style.borderColor = '#555';
                  e.currentTarget.style.color = '#888';
                }
              }}
            >
              Default
            </button>

            <button
              onClick={() => handleSort('asc')}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: sortOrder === 'asc' ? '2px solid #4ade80' : '1px solid #555',
                background: sortOrder === 'asc' ? 'rgba(74, 222, 128, 0.2)' : 'transparent',
                color: sortOrder === 'asc' ? '#4ade80' : '#888',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: sortOrder === 'asc' ? 'bold' : 'normal',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (sortOrder !== 'asc') {
                  e.currentTarget.style.borderColor = '#4ade80';
                  e.currentTarget.style.color = '#4ade80';
                }
              }}
              onMouseLeave={(e) => {
                if (sortOrder !== 'asc') {
                  e.currentTarget.style.borderColor = '#555';
                  e.currentTarget.style.color = '#888';
                }
              }}
            >
              Easy → Hard
            </button>

            <button
              onClick={() => handleSort('desc')}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: sortOrder === 'desc' ? '2px solid #ef4444' : '1px solid #555',
                background: sortOrder === 'desc' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                color: sortOrder === 'desc' ? '#ef4444' : '#888',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: sortOrder === 'desc' ? 'bold' : 'normal',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (sortOrder !== 'desc') {
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.color = '#ef4444';
                }
              }}
              onMouseLeave={(e) => {
                if (sortOrder !== 'desc') {
                  e.currentTarget.style.borderColor = '#555';
                  e.currentTarget.style.color = '#888';
                }
              }}
            >
              Hard → Easy
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '16px',
          }}
        >
          {sortedProblems.map((problem) => (
            <div
              key={problem.id}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a78bfa';
                e.currentTarget.style.backgroundColor = 'rgba(167, 139, 250, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.2)';
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
              }}
              onClick={() => window.open(problem.url, '_blank')}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>
                    LeetCode #{problem.id}
                  </div>
                  <h3 style={{ color: '#22d3ee', margin: 0, marginBottom: '4px', fontSize: '16px' }}>
                    {problem.title}
                  </h3>
                </div>
                <div
                  style={{
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    background: `${difficultyColor(problem.difficulty)}22`,
                    color: difficultyColor(problem.difficulty),
                    whiteSpace: 'nowrap',
                  }}
                >
                  {problem.difficulty}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ color: '#a78bfa', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
                  Pattern Focus:
                </div>
                <div style={{ color: '#aaa', fontSize: '12px', lineHeight: '1.5' }}>
                  {problem.patternFocus}
                </div>
              </div>

              <div>
                <div style={{ color: '#a78bfa', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
                  Key Takeaway:
                </div>
                <div style={{ color: '#4ade80', fontSize: '12px', lineHeight: '1.5', fontFamily: 'monospace' }}>
                  {problem.keyTakeaway}
                </div>
              </div>

              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <div style={{ color: '#22d3ee', fontSize: '12px', cursor: 'pointer' }}>
                  Open on LeetCode →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
