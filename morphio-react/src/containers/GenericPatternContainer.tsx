import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';
import { PatternLayout } from '../components/PatternLayout';
import { PatternVariants } from '../components/PatternVariants';
import { SynthesizedPatternCategory } from '../components/SynthesizedPatternCategory';
import { BehaviorAnimation } from '../components/BehaviorAnimation';
import {
  selectActiveTab,
  selectSelectedProblem,
  selectCurrentState,
  selectIsAnimating,
  selectCodeView,
  selectStates,
} from '../redux/selectors/patternSelectors';
import {
  setActiveTab,
  selectProblem,
  initVisualization,
  stepVisualization,
  playAnimation,
  pauseAnimation,
  resetVisualization,
  setCodeView,
} from '../redux/actions/patternActions';
import type { PatternAction, StepState } from '../redux/types';
import { bfsSynthesizedCategory } from '../data/bfsData';
import { dfsSynthesizedCategory } from '../data/dfsData';
import { backtrackingSynthesizedCategory } from '../data/backtrackingData';
import { dpSynthesizedCategory } from '../data/dpData';

interface GenericPatternContainerProps {
  title: string;
  subtitle: string;
  emoji: string;
  problems: unknown[];
  codeExamples: Record<string, unknown>;
  defaultProblemId: string;
  patternType?: 'bfs' | 'dfs' | 'backtracking' | 'dp';
}

const getVariantsForPattern = (
  patternType?: 'bfs' | 'dfs' | 'backtracking' | 'dp'
) => {
  const variantMap: Record<string, any[]> = {
    bfs: [
      {
        name: 'Level-Order Traversal',
        color: '#22d3ee',
        description: 'Process nodes level by level using a queue. All nodes at depth N before depth N+1.',
        logic: 'queue.push(start); while queue: process queue.shift(); queue.push(neighbors)',
        condition: 'Use for shortest paths, level-by-level exploration',
      },
      {
        name: 'Connected Components',
        color: '#4ade80',
        description: 'Find all connected regions by BFS from each unvisited node.',
        logic: 'for each unvisited: BFS() marks all connected as visited',
        condition: 'Use for grouping, finding islands, connected regions',
      },
    ],
    dfs: [
      {
        name: 'Recursive DFS',
        color: '#a78bfa',
        description: 'Use call stack for implicit traversal. Visit node, recurse on neighbors.',
        logic: 'visit(node): for neighbor in neighbors: visit(neighbor)',
        condition: 'Use for deep exploration, backtracking problems',
      },
      {
        name: 'Iterative DFS',
        color: '#f472b6',
        description: 'Use explicit stack for iterative traversal. Full control over order.',
        logic: 'stack.push(start); while stack: process stack.pop(); stack.push(neighbors)',
        condition: 'Use to avoid stack overflow, need explicit control',
      },
    ],
    backtracking: [
      {
        name: 'Decision Tree Exploration',
        color: '#fbbf24',
        description: 'Explore all possible decisions using backtracking. Prune invalid branches.',
        logic: 'choose → explore → unchoose if invalid',
        condition: 'Use for permutations, combinations, puzzles',
      },
      {
        name: 'Constraint Satisfaction',
        color: '#ec4899',
        description: 'Find solutions respecting constraints. Backtrack when constraints violated.',
        logic: 'if constraint violated: undo choice and try next',
        condition: 'Use for N-Queens, Sudoku, valid placements',
      },
    ],
    dp: [
      {
        name: 'Top-Down (Memoization)',
        color: '#06b6d4',
        description: 'Recursive approach with memoization. Solve subproblems on demand.',
        logic: 'if memo[state]: return memo[state]; else: solve and store',
        condition: 'Use when subproblem structure is natural recursion',
      },
      {
        name: 'Bottom-Up (Tabulation)',
        color: '#10b981',
        description: 'Build solution from base cases up. Fill table iteratively.',
        logic: 'for i in range: dp[i] = compute based on dp[i-1], dp[i-2], ...',
        condition: 'Use for avoiding recursion overhead, guaranteed coverage',
      },
    ],
  };

  return variantMap[patternType || ''] || [];
};

const getSynthesizedCategoryForPattern = (
  patternType?: 'bfs' | 'dfs' | 'backtracking' | 'dp'
) => {
  const categoryMap: Record<string, any> = {
    bfs: bfsSynthesizedCategory,
    dfs: dfsSynthesizedCategory,
    backtracking: backtrackingSynthesizedCategory,
    dp: dpSynthesizedCategory,
  };
  return categoryMap[patternType || ''] || null;
};

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
  patternType,
}) => {
  const dispatch = useDispatch() as Dispatch<PatternAction>;
  const activeTab = useSelector(selectActiveTab);
  const selectedProblemId = useSelector(selectSelectedProblem);
  const currentState = useSelector(selectCurrentState);
  const isAnimating = useSelector(selectIsAnimating);
  const codeView = useSelector(selectCodeView);
  const states = useSelector(selectStates);

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

  const handleStep = () => {
    dispatch(stepVisualization());
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
      {getSynthesizedCategoryForPattern(patternType) && (
        <SynthesizedPatternCategory category={getSynthesizedCategoryForPattern(patternType)!} />
      )}

      <SimpleVisualization currentState={currentState as any} />

      {getVariantsForPattern(patternType).length > 0 && (
        <PatternVariants variants={getVariantsForPattern(patternType)} />
      )}

      <BehaviorAnimation
        steps={states}
        arrayLength={8}
        onStepChange={(_step) => {
          // Update visualization when step changes
        }}
      />

      <div style={{ marginTop: '15px' }}>
        <div className="controls">
          <button onClick={handleStep}>Step →</button>
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
