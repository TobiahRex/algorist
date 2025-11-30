import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';
import { PatternLayout } from '../components/PatternLayout';
import {
  selectActiveTab,
  selectSelectedProblem,
  selectCurrentState,
  selectIsAnimating,
  selectCodeView,
} from '../redux/selectors/patternSelectors';
import {
  setActiveTab,
  selectProblem,
  initVisualization,
  playAnimation,
  pauseAnimation,
  resetVisualization,
  setCodeView,
} from '../redux/actions/patternActions';
import type { PatternAction, StepState } from '../redux/types';

interface GenericPatternContainerProps {
  title: string;
  subtitle: string;
  emoji: string;
  problems: unknown[];
  codeExamples: Record<string, unknown>;
  defaultProblemId: string;
}

const SimpleVisualization: React.FC<{ currentState: StepState | null }> = ({ currentState }) => {
  const state = currentState as any;
  return (
    <div
      style={{
        background: '#0d1117',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '15px',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        color: '#e0e0e0',
      }}
    >
      <div style={{ marginBottom: '10px', color: '#22d3ee' }}>📊 Pattern Visualization</div>
      {state && (
        <div>
          <div style={{ marginBottom: '10px', color: '#4ade80' }}>
            <strong>Step:</strong> {state.message}
          </div>
          {state.values && typeof state.values === 'object' && (
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '4px' }}>
              {Object.entries(state.values).map(([key, value]: any) => (
                <div key={key} style={{ marginBottom: '5px' }}>
                  <strong>{key}:</strong> {String(value)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const GenericPatternContainer: React.FC<GenericPatternContainerProps> = ({
  title,
  subtitle,
  emoji,
  problems,
  codeExamples,
  defaultProblemId,
}) => {
  const dispatch = useDispatch() as Dispatch<PatternAction>;
  const activeTab = useSelector(selectActiveTab);
  const selectedProblemId = useSelector(selectSelectedProblem);
  const currentState = useSelector(selectCurrentState);
  const isAnimating = useSelector(selectIsAnimating);
  const codeView = useSelector(selectCodeView);

  const selectedProblem = (problems as any[]).find((p: any) => p.id === selectedProblemId) as any || null;

  useEffect(() => {
    if (selectedProblem) {
      // Generate basic visualization steps
      const steps: StepState[] = [
        {
          index: 0,
          message: `${selectedProblem.name}: Study the pattern and code examples`,
          values: { problem: selectedProblem.name },
        },
        {
          index: 1,
          message: 'Approach: ' + selectedProblem.description,
          values: { description: selectedProblem.description },
        },
      ];
      dispatch(initVisualization(steps));
    }
  }, [selectedProblem, dispatch]);

  const handleSelectTab = (tab: any) => {
    dispatch(setActiveTab(tab));
  };

  const handleSelectProblem = (problemId: string) => {
    dispatch(selectProblem(problemId));
  };

  const handleChangeCodeView = (view: 'verbose' | 'terse') => {
    dispatch(setCodeView(view));
  };

  const handlePlay = () => {
    dispatch(playAnimation());
  };

  const handlePause = () => {
    dispatch(pauseAnimation());
  };

  const handleReset = () => {
    dispatch(resetVisualization());
  };

  const tabs = [
    { id: 'learn' as const, label: 'Learn & Visualize', icon: '🎓' },
    { id: 'problems' as const, label: 'All Problems', icon: '📋' },
    { id: 'cheatsheet' as const, label: 'Cheat Sheet', icon: '📝' },
  ];

  return (
    <PatternLayout
      title={title}
      subtitle={subtitle}
      emoji={emoji}
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      problems={problems as any}
      selectedProblemId={selectedProblemId || defaultProblemId}
      onSelectProblem={handleSelectProblem}
      codeExamples={codeExamples as any}
      codeView={codeView}
      onChangeCodeView={handleChangeCodeView}
      selectedProblem={selectedProblem}
    >
      <SimpleVisualization currentState={currentState as any} />

      <div style={{ marginTop: '15px' }}>
        <div className="controls">
          <button onClick={isAnimating ? handlePause : handlePlay}>
            {isAnimating ? '⏸ Pause' : '▶ Play'}
          </button>
          <button onClick={handleReset}>↺ Reset</button>
        </div>

        <div className="state-grid">
          <div className="state-item">
            <div className="label">Pattern</div>
            <div className="value" style={{ fontSize: '0.75rem' }}>
              {selectedProblem?.name.split('(')[0] || '—'}
            </div>
          </div>
          <div className="state-item">
            <div className="label">Difficulty</div>
            <div className="value" style={{ fontSize: '0.8rem', color: '#fbbf24' }}>
              {selectedProblem?.difficulty.charAt(0).toUpperCase() || '—'}
            </div>
          </div>
          <div className="state-item">
            <div className="label">Type</div>
            <div className="value" style={{ fontSize: '0.75rem' }}>
              Algorithm
            </div>
          </div>
          <div className="state-item">
            <div className="label">Study</div>
            <div className="value" style={{ fontSize: '0.75rem' }}>
              Code &amp; Learn
            </div>
          </div>
        </div>
      </div>
    </PatternLayout>
  );
};
