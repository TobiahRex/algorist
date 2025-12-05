import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';
import { PatternLayout } from '../components/PatternLayout';
import { AnimationCanvas } from '../components/AnimationCanvas';
import { PatternStructure } from '../components/PatternStructure';
import { PatternVariants } from '../components/PatternVariants';
import { SynthesizedPatternCategory } from '../components/SynthesizedPatternCategory';
import { BehaviorAnimation } from '../components/BehaviorAnimation';
import {
  selectActiveTab,
  selectSelectedProblem,
  selectCurrentState,
  selectIsAnimating,
  selectAnimationSpeed,
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
import type { PatternAction } from '../redux/types';
import { slidingWindowProblems, slidingWindowCodeExamples, slidingWindowLeetCode, slidingWindowCheatSheet, slidingWindowSynthesizedCategory } from '../data/slidingWindowData';
import type { StepState } from '../redux/types';

const generateVisualizationSteps = (problem: typeof slidingWindowProblems[0]): StepState[] => {
  const example = problem.examples[0];
  if (!example || example.input === null || typeof example.input !== 'object') {
    return [];
  }

  if (problem.id === 'maxAverage') {
    const { nums, k } = example.input as { nums: number[]; k: number };
    const steps: StepState[] = [];
    let step = 0;

    // Initial window
    let windowSum = nums.slice(0, k).reduce((a, b) => a + b, 0);
    steps.push({
      index: step++,
      message: `Initialized window with first ${k} elements, sum=${windowSum}`,
      pointers: { left: 0, right: k - 1 },
      values: { nums, k, sum: windowSum },
      highlights: Array.from({ length: k }, (_, i) => i),
    });

    // Slide window
    for (let i = k; i < Math.min(k + 3, nums.length); i++) {
      windowSum = windowSum - nums[i - k] + nums[i];
      const avg = (windowSum / k).toFixed(2);
      steps.push({
        index: step++,
        message: `Slid window: removed ${nums[i - k]}, added ${nums[i]}, avg=${avg}`,
        pointers: { left: i - k + 1, right: i },
        values: { nums, k, sum: windowSum, avg: parseFloat(avg) },
        highlights: Array.from({ length: k }, (_, j) => i - k + 1 + j),
      });
    }

    return steps;
  }

  // Default return for other problems
  return [
    {
      index: 0,
      message: 'Visualization coming soon for this problem',
      highlights: [],
    },
  ];
};

const renderFrame = (ctx: CanvasRenderingContext2D, state: StepState) => {
  if (!state.values || typeof state.values !== 'object' || !('nums' in state.values)) {
    return;
  }

  const { nums } = state.values as { nums: number[]; k: number };
  const highlights = state.highlights || [];

  const padding = 20;
  const width = 420;
  const height = 130;
  const barWidth = (width - 2 * padding) / nums.length;
  const maxNum = Math.max(...nums);

  // Draw bars
  nums.forEach((num, idx) => {
    const x = padding + idx * barWidth;
    const barHeight = (num / maxNum) * 80;
    const y = height - barHeight - 10;

    let fillColor = '#2a4a4a';
    if (highlights.includes(idx)) {
      fillColor = '#4ade80';
    }

    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, barWidth - 5, barHeight);

    // Draw value labels
    ctx.fillStyle = '#aaa';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(num), x + barWidth / 2 - 2.5, height - 5);
  });
};

export const SlidingWindowContainer: React.FC = () => {
  const dispatch = useDispatch() as Dispatch<PatternAction>;
  const activeTab = useSelector(selectActiveTab);
  const selectedProblemId = useSelector(selectSelectedProblem);
  const currentState = useSelector(selectCurrentState);
  const isAnimating = useSelector(selectIsAnimating);
  const animationSpeed = useSelector(selectAnimationSpeed);
  const currentStep = useSelector(selectCurrentStep);
  const states = useSelector(selectStates);
  const codeView = useSelector(selectCodeView);

  const selectedProblem = slidingWindowProblems.find((p) => p.id === selectedProblemId);

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
      title="Sliding Window Pattern"
      subtitle="Shape: Contiguous Subarray | Complexity: O(n) | The 'variable window' optimizer"
      emoji="🪟"
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      problems={slidingWindowProblems}
      selectedProblemId={selectedProblemId || 'maxAverage'}
      onSelectProblem={handleSelectProblem}
      codeExamples={slidingWindowCodeExamples}
      codeView={codeView}
      onChangeCodeView={handleChangeCodeView}
      selectedProblem={selectedProblem || null}
      leetCodeProblems={slidingWindowLeetCode}
      cheatSheetData={slidingWindowCheatSheet}
    >
      <SynthesizedPatternCategory category={slidingWindowSynthesizedCategory} />

      {/* Pattern Structure Visualization */}
      {currentState && (
        <>
          <PatternStructure
            arrayLength={8}
            pointers={
              currentState.pointers
                ? Object.entries(currentState.pointers).map(([name, index]) => ({
                    name,
                    index: index as number,
                    color: name === 'left' ? '#f472b6' : '#22d3ee',
                  }))
                : []
            }
            windowStart={currentState.pointers?.left}
            windowEnd={currentState.pointers?.right}
            highlightedIndices={currentState.highlights || []}
            currentState={currentState.values || {}}
            title="Sliding Window Structure (Fixed Size K)"
          />

          {/* Pattern Variants */}
          <PatternVariants
            variants={[
              {
                name: 'Fixed Size Window',
                color: '#22d3ee',
                description: 'Window size K is given and constant. Simpler logic.',
                logic: 'R - L + 1 == K always',
                condition: 'Use when target window size is known',
              },
              {
                name: 'Variable Size Window',
                color: '#a78bfa',
                description: 'Find optimal window size. Need shrinking logic.',
                logic: 'while invalid: shrink L',
                condition: 'Use when finding optimal/longest/shortest subarray',
              },
            ]}
          />

          {/* Behavior Animation */}
          <BehaviorAnimation
            steps={states}
            arrayLength={8}
            onStepChange={(_step) => {
              // Update visualization when step changes
            }}
          />

          {/* Original Canvas Animation */}
          <AnimationCanvas
            width={420}
            height={130}
            currentState={currentState}
            onStep={handleStep}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            isAnimating={isAnimating}
            animationSpeed={animationSpeed}
            totalSteps={states.length}
            currentStep={currentStep}
            renderFrame={renderFrame}
          />
        </>
      )}
    </PatternLayout>
  );
};
