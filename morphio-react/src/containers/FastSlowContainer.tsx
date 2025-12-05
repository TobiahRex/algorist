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
  selectCurrentStep,
  selectStates,
  selectCodeView,
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
import { fastSlowProblems, fastSlowCodeExamples, fastSlowLeetCode, fastSlowCheatSheet, fastSlowSynthesizedCategory } from '../data/fastSlowData';

const generateVisualizationSteps = (problem: typeof fastSlowProblems[0]): StepState[] => {
  const example = problem.examples[0];
  if (!example) return [];

  const steps: StepState[] = [];
  let step = 0;

  if (problem.id === 'linkedListCycle') {
    steps.push({
      index: step++,
      message: 'Initialized: Slow and Fast pointers at head',
      highlights: [0],
    });

    // Simulate 5 steps
    for (let i = 0; i < 5; i++) {
      steps.push({
        index: step++,
        message: `Step ${i + 1}: Slow→1 step, Fast→2 steps. Checking for collision...`,
        highlights: [i],
      });
    }

    steps.push({
      index: step++,
      message: '✓ Collision detected! Cycle found.',
      highlights: [],
    });
  } else if (problem.id === 'happyNumber') {
    const n = (example.input as { n: number }).n;
    let current = n;
    let slow = current;
    let fast = current;

    const digitSquareSum = (num: number) => {
      let sum = 0;
      while (num > 0) {
        const digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
      }
      return sum;
    };

    steps.push({
      index: step++,
      message: `Starting with n=${n}. Tortoise & Hare begin their transformation race...`,
      values: { current: n },
    });

    for (let i = 0; i < 6; i++) {
      slow = digitSquareSum(slow);
      fast = digitSquareSum(digitSquareSum(fast));

      steps.push({
        index: step++,
        message: `Step ${i + 1}: Slow=${slow}, Fast=${fast}`,
        values: { slow, fast },
      });

      if (fast === 1) {
        steps.push({
          index: step++,
          message: `✓ Fast reached 1! Number ${n} is HAPPY!`,
          values: { slow, fast },
        });
        break;
      }

      if (slow === fast && slow !== 1) {
        steps.push({
          index: step++,
          message: `✓ Collision at ${slow}! Number ${n} is UNHAPPY (cycles without reaching 1)`,
          values: { slow, fast },
        });
        break;
      }
    }
  } else {
    steps.push({
      index: 0,
      message: 'Visualization simulation available for this problem',
      highlights: [],
    });
  }

  return steps.length > 0 ? steps : [{ index: 0, message: 'No simulation available', highlights: [] }];
};

// Simple text-based visualization for linked list patterns
const LinkedListVisualization: React.FC<{
  currentState: StepState | null;
}> = ({ currentState }) => {
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
          <div style={{ marginBottom: '10px' }}>
            <strong>Current Step:</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '4px' }}>
            {state.message}
          </div>
          {state.values && typeof state.values === 'object' && (
            <div style={{ marginTop: '10px', color: '#4ade80' }}>
              {Object.entries(state.values).map(([key, value]: any) => (
                <div key={key}>
                  {key}: <strong>{String(value)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888' }}>
        💡 This pattern detects cycles by racing two pointers at different speeds through the structure.
        When they collide or meet a termination condition, we know the answer.
      </div>
    </div>
  );
};

export const FastSlowContainer: React.FC = () => {
  const dispatch = useDispatch() as Dispatch<PatternAction>;
  const activeTab = useSelector(selectActiveTab);
  const selectedProblemId = useSelector(selectSelectedProblem);
  const currentState = useSelector(selectCurrentState);
  const isAnimating = useSelector(selectIsAnimating);
  const currentStep = useSelector(selectCurrentStep);
  const states = useSelector(selectStates);
  const codeView = useSelector(selectCodeView);

  const selectedProblem = fastSlowProblems.find((p) => p.id === selectedProblemId);

  useEffect(() => {
    if (selectedProblem) {
      const steps = generateVisualizationSteps(selectedProblem);
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
      title="Fast & Slow Pointers Pattern"
      subtitle="Shape: Linear Traversal | Complexity: O(n) space, O(1) extra | The 'cycle detector'"
      emoji="🐢🐇"
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      problems={fastSlowProblems}
      selectedProblemId={selectedProblemId || 'linkedListCycle'}
      onSelectProblem={handleSelectProblem}
      codeExamples={fastSlowCodeExamples}
      codeView={codeView}
      onChangeCodeView={handleChangeCodeView}
      selectedProblem={selectedProblem || null}
      leetCodeProblems={fastSlowLeetCode}
      cheatSheetData={fastSlowCheatSheet}
    >
      <SynthesizedPatternCategory category={fastSlowSynthesizedCategory} />

      <LinkedListVisualization currentState={currentState as any} />

      <PatternVariants
        variants={[
          {
            name: 'Linked List Cycle',
            color: '#f472b6',
            description: 'Detect cycles in linked lists using slow/fast pointers. When fast catches slow, cycle exists.',
            logic: 'slow += 1; fast += 2; if slow === fast: cycle found',
            condition: 'Use when detecting loops in linked lists',
          },
          {
            name: 'Numerical Sequences',
            color: '#22d3ee',
            description: 'Detect cycles in numerical transformations. Fast transforms twice per step, slow once.',
            logic: 'slow = f(slow); fast = f(f(fast)); if collision: cycle',
            condition: 'Use for happy numbers, sequence analysis',
          },
        ]}
      />

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
            <div className="label">Step</div>
            <div className="value">
              {currentStep}/{Math.max(0, states.length - 1)}
            </div>
          </div>
          <div className="state-item">
            <div className="label">Problem</div>
            <div className="value" style={{ fontSize: '0.75rem' }}>
              {selectedProblem?.name.split('(')[0] || '—'}
            </div>
          </div>
          <div className="state-item">
            <div className="label">Status</div>
            <div className="value">{isAnimating ? 'Playing' : 'Paused'}</div>
          </div>
          <div className="state-item">
            <div className="label">Complexity</div>
            <div className="value">O(1) space</div>
          </div>
        </div>
      </div>
    </PatternLayout>
  );
};
