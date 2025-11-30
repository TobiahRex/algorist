import { createSelector } from 'reselect';
import type { RootState } from '../types';

// Base selectors
const selectPatternState = (state: RootState) => state.pattern;
const selectVisualization = (state: RootState) => state.pattern.visualization;

// Memoized selectors
export const selectActivePattern = createSelector(
  [selectPatternState],
  (pattern) => pattern.activePattern
);

export const selectActiveTab = createSelector(
  [selectPatternState],
  (pattern) => pattern.activeTab
);

export const selectSelectedProblem = createSelector(
  [selectPatternState],
  (pattern) => pattern.selectedProblem
);

export const selectCodeView = createSelector(
  [selectPatternState],
  (pattern) => pattern.codeView
);

export const selectCurrentStep = createSelector(
  [selectVisualization],
  (visualization) => visualization.currentStep
);

export const selectIsAnimating = createSelector(
  [selectVisualization],
  (visualization) => visualization.isAnimating
);

export const selectAnimationSpeed = createSelector(
  [selectVisualization],
  (visualization) => visualization.animationSpeed
);

export const selectStates = createSelector(
  [selectVisualization],
  (visualization) => visualization.states
);

export const selectCurrentState = createSelector(
  [selectCurrentStep, selectStates],
  (currentStep, states) => states[currentStep] || null
);

export const selectVisualizationState = createSelector(
  [selectVisualization],
  (visualization) => visualization
);
