import React from 'react';

export interface SynthesizedCategory {
  icon: string;
  title: string;
  coreInsight: string;
  commonAcross: string[];
}

interface SynthesizedPatternCategoryProps {
  category: SynthesizedCategory;
}

export const SynthesizedPatternCategory: React.FC<SynthesizedPatternCategoryProps> = ({ category }) => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '2rem' }}>{category.icon}</span>
        <h2 style={{ color: '#f472b6', marginTop: 0, marginBottom: 0, fontSize: '1.3rem' }}>
          Synthesized Pattern Category
        </h2>
      </div>

      <h3 style={{ color: '#a78bfa', marginTop: 0, marginBottom: '12px', fontSize: '1.1rem' }}>
        {category.title}
      </h3>

      <div
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          borderLeft: '3px solid #22d3ee',
          padding: '16px',
          borderRadius: '0 8px 8px 0',
          marginBottom: '16px',
          lineHeight: '1.6',
          color: '#aaa',
          fontSize: '0.95rem',
        }}
      >
        {category.coreInsight}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Common across:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {category.commonAcross.map((domain, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(34, 211, 238, 0.15)',
                border: '1px solid rgba(34, 211, 238, 0.3)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.85rem',
                color: '#67e8f9',
                whiteSpace: 'nowrap',
              }}
            >
              {domain}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
