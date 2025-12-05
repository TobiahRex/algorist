import React from 'react';

interface PointerPosition {
  name: string;
  index: number;
  color: string;
}

interface WindowVisualizationProps {
  arrayLength: number;
  pointers: PointerPosition[];
  windowStart?: number;
  windowEnd?: number;
  highlightedIndices?: number[];
  currentState?: Record<string, any>;
  title: string;
}

export const PatternStructure: React.FC<WindowVisualizationProps> = ({
  arrayLength,
  pointers,
  windowStart,
  windowEnd,
  highlightedIndices = [],
  currentState = {},
  title,
}) => {
  const cellWidth = 50;
  const cellHeight = 50;
  const spacing = 10;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.6) 0%, rgba(26, 31, 58, 0.6) 100%)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px',
      }}
    >
      {/* Title */}
      <h3 style={{ color: '#a78bfa', marginBottom: '20px', marginTop: 0 }}>
        📊 {title}
      </h3>

      {/* Array Visualization */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '20px',
          marginBottom: '24px',
          overflowX: 'auto',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
        }}
      >
        {/* Array Cells */}
        <div style={{ display: 'flex', gap: `${spacing}px`, alignItems: 'flex-end', minWidth: 'fit-content' }}>
          {Array.from({ length: arrayLength }).map((_, idx) => {
            const isInWindow =
              windowStart !== undefined &&
              windowEnd !== undefined &&
              idx >= windowStart &&
              idx <= windowEnd;
            const isHighlighted = highlightedIndices.includes(idx);
            const pointerAtIndex = pointers.find((p) => p.index === idx);

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Pointer label above */}
                {pointerAtIndex && (
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: pointerAtIndex.color,
                      minHeight: '16px',
                    }}
                  >
                    {pointerAtIndex.name}
                  </div>
                )}

                {/* Cell */}
                <div
                  style={{
                    width: `${cellWidth}px`,
                    height: `${cellHeight}px`,
                    border: isInWindow ? `2px solid #22d3ee` : isHighlighted ? `2px solid #fbbf24` : `1px solid #555`,
                    borderRadius: '6px',
                    background: isInWindow
                      ? 'rgba(34, 211, 238, 0.2)'
                      : isHighlighted
                        ? 'rgba(251, 191, 36, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: isInWindow ? '#22d3ee' : isHighlighted ? '#fbbf24' : '#888',
                    fontWeight: isInWindow || isHighlighted ? 'bold' : 'normal',
                    boxShadow: pointerAtIndex ? `0 0 8px ${pointerAtIndex.color}` : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  [{idx}]
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Window Bracket */}
      {windowStart !== undefined && windowEnd !== undefined && (
        <div
          style={{
            textAlign: 'center',
            color: '#22d3ee',
            fontSize: '12px',
            marginBottom: '16px',
            fontFamily: 'monospace',
          }}
        >
          window = arr[{windowStart}..{windowEnd}] (size: {windowEnd - windowStart + 1})
        </div>
      )}

      {/* Current State Display */}
      {Object.keys(currentState).length > 0 && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <div style={{ color: '#4ade80', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
            📍 Current State:
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
            }}
          >
            {Object.entries(currentState).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: 'rgba(167, 139, 250, 0.1)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              >
                <span style={{ color: '#a78bfa' }}>{key}</span>
                <span style={{ color: '#888' }}> = </span>
                <span style={{ color: '#4ade80' }}>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invariant Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(74, 222, 128, 0.1) 100%)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          borderLeft: '4px solid #22d3ee',
        }}
      >
        <div style={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🔒 The Invariant
        </div>
        <div style={{ color: '#aaa', fontSize: '12px', lineHeight: '1.6', fontFamily: 'monospace' }}>
          <div>
            • <span style={{ color: '#4ade80' }}>window = arr[L..R]</span> always satisfies the constraint
          </div>
          <div>
            • <span style={{ color: '#4ade80' }}>state</span> always reflects current window contents
          </div>
          <div>
            • Pointers move according to pattern rules
          </div>
        </div>
      </div>
    </div>
  );
};
