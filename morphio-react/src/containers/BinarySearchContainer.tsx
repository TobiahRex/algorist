import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';
import { PatternLayout } from '../components/PatternLayout';
import { PatternStructure } from '../components/PatternStructure';
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
import { binarySearchProblems, binarySearchCodeExamples, binarySearchLeetCode, binarySearchCheatSheet, binarySearchSynthesizedCategory } from '../data/binarySearchData';

const generateVisualizationSteps = (problem: typeof binarySearchProblems[0]): StepState[] => {
  const example = problem.examples[0];
  if (!example) return [];

  const steps: StepState[] = [];

  if (problem.id === 'basicBinarySearch') {
    const input = example.input as { nums: number[]; target: number };
    const { nums, target } = input;
    let step = 0;
    let left = 0;
    let right = nums.length - 1;

    steps.push({
      index: step++,
      message: `Searching for ${target} in array of length ${nums.length}`,
      pointers: { left, right },
      highlights: [],
    });

    while (left <= right && steps.length < 8) {
      const mid = Math.floor((left + right) / 2);
      const highlights = [];
      for (let i = left; i <= right; i++) {
        highlights.push(i);
      }

      if (nums[mid] === target) {
        steps.push({
          index: step++,
          message: `✓ Found ${target} at index ${mid}!`,
          pointers: { left, right, mid },
          highlights: [mid],
        });
        break;
      } else if (nums[mid] < target) {
        steps.push({
          index: step++,
          message: `nums[${mid}]=${nums[mid]} < ${target}, search right half`,
          pointers: { left, right, mid },
          highlights,
        });
        left = mid + 1;
      } else {
        steps.push({
          index: step++,
          message: `nums[${mid}]=${nums[mid]} > ${target}, search left half`,
          pointers: { left, right, mid },
          highlights,
        });
        right = mid - 1;
      }
    }
  }

  return steps.length > 0 ? steps : [{ index: 0, message: 'Binary search visualization', highlights: [] }];
};

const BinarySearchVisualization: React.FC<{
  currentState: StepState | null;
}> = ({ currentState }) => {
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
      <div style={{ marginBottom: '10px', color: '#22d3ee' }}>📊 Search Tree Visualization</div>
      {currentState && (
        <div>
          <div style={{ marginBottom: '10px', color: '#4ade80' }}>
            <strong>Step:</strong> {currentState.message}
          </div>
          {currentState.pointers && (
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '4px' }}>
              <div>
                left: <strong style={{ color: '#f472b6' }}>{currentState.pointers.left}</strong>
              </div>
              <div>
                right: <strong style={{ color: '#f472b6' }}>{currentState.pointers.right}</strong>
              </div>
              {currentState.pointers.mid !== undefined && (
                <div>
                  mid: <strong style={{ color: '#fbbf24' }}>{currentState.pointers.mid}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888' }}>
        💡 Binary search eliminates half the search space each iteration, reducing O(n) to O(log n).
      </div>
    </div>
  );
};

export const BinarySearchContainer: React.FC = () => {
  const dispatch = useDispatch() as Dispatch<PatternAction>;
  const activeTab = useSelector(selectActiveTab);
  const selectedProblemId = useSelector(selectSelectedProblem);
  const currentState = useSelector(selectCurrentState);
  const isAnimating = useSelector(selectIsAnimating);
  const codeView = useSelector(selectCodeView);
  const states = useSelector(selectStates);

  const selectedProblem = binarySearchProblems.find((p) => p.id === selectedProblemId);

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
      title="Binary Search Pattern"
      subtitle="Shape: Sorted Array | Complexity: O(log n) | The 'divide and conquer' optimizer"
      emoji="🔍"
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      problems={binarySearchProblems}
      selectedProblemId={selectedProblemId || 'basicBinarySearch'}
      onSelectProblem={handleSelectProblem}
      codeExamples={binarySearchCodeExamples}
      codeView={codeView}
      onChangeCodeView={handleChangeCodeView}
      selectedProblem={selectedProblem || null}
      leetCodeProblems={binarySearchLeetCode}
      cheatSheetData={binarySearchCheatSheet}
    >
      <SynthesizedPatternCategory category={binarySearchSynthesizedCategory} />

      <PatternStructure
        arrayLength={8}
        pointers={
          currentState.pointers
            ? Object.entries(currentState.pointers).map(([name, index]) => ({
                name,
                index: index as number,
                color: name === 'mid' ? '#fbbf24' : name === 'left' ? '#f472b6' : '#22d3ee',
              }))
            : []
        }
        windowStart={currentState.pointers?.left}
        windowEnd={currentState.pointers?.right}
        highlightedIndices={currentState.highlights || []}
        currentState={currentState.values || {}}
        title="Binary Search Space"
      />

      <PatternVariants
        variants={[
          {
            name: 'Iterative Binary Search',
            color: '#22d3ee',
            description: 'Iterative approach with left/right pointers. Eliminates half the space with each midpoint check.',
            logic: 'mid = (left + right) / 2; if arr[mid] < target: left = mid + 1; else: right = mid - 1',
            condition: 'Use for standard binary search problems on sorted arrays',
          },
          {
            name: 'Boundary Binary Search',
            color: '#a78bfa',
            description: 'Find leftmost or rightmost occurrence of target. Refine boundaries until they converge.',
            logic: 'Always move towards one boundary even when target found',
            condition: 'Use for finding first/last position, range queries',
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

      <BinarySearchVisualization currentState={currentState} />

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
            <div className="label">Approach</div>
            <div className="value" style={{ fontSize: '0.75rem' }}>
              Divide & Conquer
            </div>
          </div>
          <div className="state-item">
            <div className="label">Time</div>
            <div className="value">O(log n)</div>
          </div>
          <div className="state-item">
            <div className="label">Space</div>
            <div className="value">O(1)</div>
          </div>
          <div className="state-item">
            <div className="label">Requires</div>
            <div className="value" style={{ fontSize: '0.75rem' }}>
              Sorted Input
            </div>
          </div>
        </div>
      </div>
    </PatternLayout>
  );
};
