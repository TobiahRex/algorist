import React from 'react';

interface RealWorldUse {
  title: string;
  description: string;
  icon: string;
}

interface RealWorldPanelProps {
  uses: RealWorldUse[];
  patternEssence: string;
  synthesisCategory?: string;
  synthesisInsight?: string;
  synthesisExamples?: string;
}

export const RealWorldPanel: React.FC<RealWorldPanelProps> = ({
  uses,
  patternEssence,
  synthesisCategory,
  synthesisInsight,
  synthesisExamples,
}) => {
  return (
    <div className="realworld-panel">
      <h3>🏗️ Real-World Engineering Use Cases</h3>
      <div className="realworld-grid">
        {uses.map((use, idx) => (
          <div key={idx} className="scenario-box">
            <div className="scenario-icon">{use.icon}</div>
            <div className="scenario-title">{use.title}</div>
            <div className="scenario-desc">{use.description}</div>
          </div>
        ))}
      </div>
      <div className="pattern-summary">
        <strong>Pattern Essence:</strong> {patternEssence}
      </div>
      {synthesisCategory && (
        <div className="pattern-synthesis">
          <h4>🎯 Synthesized Pattern Category</h4>
          <div className="category">{synthesisCategory}</div>
          {synthesisInsight && <div className="insight">{synthesisInsight}</div>}
          {synthesisExamples && <div className="examples">{synthesisExamples}</div>}
        </div>
      )}
    </div>
  );
};
