import React from 'react';

interface Variant {
  name: string;
  color: string;
  description: string;
  logic: string;
  condition?: string;
}

interface PatternVariantsProps {
  variants: Variant[];
}

export const PatternVariants: React.FC<PatternVariantsProps> = ({ variants }) => {
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
      <h3 style={{ color: '#a78bfa', marginBottom: '20px', marginTop: 0 }}>
        🔀 Pattern Variants
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '16px',
        }}
      >
        {variants.map((variant, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `2px solid ${variant.color}`,
              borderRadius: '8px',
              padding: '16px',
              boxShadow: `0 0 12px ${variant.color}33`,
            }}
          >
            {/* Variant Name */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: variant.color,
                marginBottom: '8px',
              }}
            >
              {variant.name}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '12px',
                color: '#aaa',
                marginBottom: '12px',
                lineHeight: '1.5',
              }}
            >
              {variant.description}
            </div>

            {/* Logic */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderLeft: `3px solid ${variant.color}`,
                padding: '10px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#4ade80',
                marginBottom: '8px',
              }}
            >
              {variant.logic}
            </div>

            {/* Condition if provided */}
            {variant.condition && (
              <div
                style={{
                  fontSize: '11px',
                  color: '#fbbf24',
                  fontStyle: 'italic',
                  padding: '8px 12px',
                  background: 'rgba(251, 191, 36, 0.1)',
                  borderRadius: '4px',
                }}
              >
                💡 {variant.condition}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
