import React from 'react';

export interface CheatSheetItem {
  title: string;
  content: string[];
}

interface CheatSheetProps {
  patternName: string;
  patternEmoji: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyPoints: CheatSheetItem[];
  whenToUse: string[];
  commonMistakes: string[];
}

export const CheatSheet: React.FC<CheatSheetProps> = ({
  patternName,
  patternEmoji,
  timeComplexity,
  spaceComplexity,
  keyPoints,
  whenToUse,
  commonMistakes,
}) => {
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
        <h2 style={{ color: '#a78bfa', marginTop: 0, marginBottom: '20px' }}>
          {patternEmoji} {patternName} Cheat Sheet
        </h2>

        {/* Complexity Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div style={{ color: '#22d3ee', fontWeight: 'bold', marginBottom: '8px' }}>
              ⏱ Time Complexity
            </div>
            <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '14px' }}>
              {timeComplexity}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>
              💾 Space Complexity
            </div>
            <div style={{ color: '#22d3ee', fontFamily: 'monospace', fontSize: '14px' }}>
              {spaceComplexity}
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#a78bfa', marginTop: 0, marginBottom: '12px' }}>🔑 Key Points</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '12px',
            }}
          >
            {keyPoints.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(167, 139, 250, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                }}
              >
                <div style={{ color: '#22d3ee', fontWeight: 'bold', marginBottom: '8px' }}>
                  {item.title}
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: '#aaa',
                    fontSize: '12px',
                    lineHeight: '1.6',
                  }}
                >
                  {item.content.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* When to Use */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#a78bfa', marginTop: 0, marginBottom: '12px' }}>✅ When to Use</h3>
          <div
            style={{
              background: 'rgba(74, 222, 128, 0.1)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: '#aaa',
                fontSize: '13px',
                lineHeight: '1.8',
              }}
            >
              {whenToUse.map((item, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Mistakes */}
        <div>
          <h3 style={{ color: '#a78bfa', marginTop: 0, marginBottom: '12px' }}>⚠️ Common Mistakes</h3>
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: '#aaa',
                fontSize: '13px',
                lineHeight: '1.8',
              }}
            >
              {commonMistakes.map((item, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
