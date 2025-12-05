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
import { twoPointersProblem, twoPointersCodeExamples, twoPointersLeetCode, twoPointersCheatSheet, twoPointersSynthesizedCategory } from '../data/twoPointersData';
import type { StepState } from '../redux/types';

const generateVisualizationSteps = (problem: typeof twoPointersProblem[0]): StepState[] => {
  // Get first example
  const example = problem.examples[0];
  if (!example || example.input === null || typeof example.input !== 'object' || !('numbers' in example.input)) {
    return [];
  }

  const { numbers, target } = example.input as { numbers: number[]; target: number };
  const steps: StepState[] = [];
  let left = 0;
  let right = numbers.length - 1;
  let step = 0;

  // Initial state
  steps.push({
    index: step++,
    message: `Starting: left=${left}, right=${right}`,
    pointers: { left, right },
    values: { numbers, target },
    highlights: [left, right],
  });

  // Animation steps
  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      steps.push({
        index: step++,
        message: `✓ Found pair! ${numbers[left]} + ${numbers[right]} = ${target}`,
        pointers: { left, right },
        values: { numbers, target, sum },
        highlights: [left, right],
      });
      break;
    } else if (sum < target) {
      steps.push({
        index: step++,
        message: `Sum ${sum} < target ${target}. Moving left RIGHT`,
        pointers: { left, right },
        values: { numbers, target, sum },
        highlights: [left, right],
      });
      left++;
    } else {
      steps.push({
        index: step++,
        message: `Sum ${sum} > target ${target}. Moving right LEFT`,
        pointers: { left, right },
        values: { numbers, target, sum },
        highlights: [left, right],
      });
      right--;
    }
  }

  return steps.length > 1 ? steps : [steps[0]];
};

const renderFrame = (ctx: CanvasRenderingContext2D, state: StepState) => {
  if (!state.values || typeof state.values !== 'object' || !('numbers' in state.values)) {
    return;
  }

  const { numbers } = state.values as { numbers: number[] };
  const { left, right } = state.pointers || { left: -1, right: -1 };

  const padding = 20;
  const width = 420;
  const height = 130;
  const barWidth = (width - 2 * padding) / numbers.length;
  const maxNum = Math.max(...numbers);

  // Draw bars
  numbers.forEach((num, idx) => {
    const x = padding + idx * barWidth;
    const barHeight = (num / maxNum) * 80;
    const y = height - barHeight - 10;

    let fillColor = '#2a4a4a';
    if (idx === left || idx === right) {
      fillColor = '#4ade80';
    }

    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, barWidth - 5, barHeight);

    // Draw value labels
    ctx.fillStyle = '#aaa';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(num), x + barWidth / 2 - 2.5, height - 5);

    // Draw pointer labels
    if (idx === left) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText('L', x + barWidth / 2 - 2.5, y - 5);
    }
    if (idx === right) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText('R', x + barWidth / 2 - 2.5, y - 5);
    }
  });
};

export const TwoPointersContainer: React.FC = () => {
  const dispatch = useDispatch() as Dispatch<PatternAction>;
  const activeTab = useSelector(selectActiveTab);
  const selectedProblemId = useSelector(selectSelectedProblem);
  const currentState = useSelector(selectCurrentState);
  const isAnimating = useSelector(selectIsAnimating);
  const animationSpeed = useSelector(selectAnimationSpeed);
  const currentStep = useSelector(selectCurrentStep);
  const states = useSelector(selectStates);
  const codeView = useSelector(selectCodeView);

  const selectedProblem = twoPointersProblem.find((p) => p.id === selectedProblemId);

  // Initialize visualization when problem changes
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
      title="Two Pointers Pattern"
      subtitle="Shape: Linear Chain | Complexity: O(n) | The 'sorted array / in-place' solver"
      emoji="👆👆"
      tabs={tabs}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      problems={twoPointersProblem}
      selectedProblemId={selectedProblemId}
      onSelectProblem={handleSelectProblem}
      codeExamples={twoPointersCodeExamples}
      codeView={codeView}
      onChangeCodeView={handleChangeCodeView}
      selectedProblem={selectedProblem || null}
      leetCodeProblems={twoPointersLeetCode}
      cheatSheetData={twoPointersCheatSheet}
    >
      <SynthesizedPatternCategory category={twoPointersSynthesizedCategory} />

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
            title="Two Pointers Structure"
          />

          <PatternVariants
            variants={[
              {
                name: 'Opposite Direction',
                color: '#f472b6',
                description: 'Pointers move toward each other from opposite ends. For sorted arrays, comparing sum to target.',
                logic: 'if sum < target: left++; else: right--',
                condition: 'Use when array is sorted and you need to find pairs',
              },
              {
                name: 'Same Direction',
                color: '#22d3ee',
                description: 'Both pointers move in same direction. For in-place partitioning or moving unwanted elements.',
                logic: 'while condition: advance both or one pointer',
                condition: 'Use for segregation, removing duplicates, or rotating arrays',
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
