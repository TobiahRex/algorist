import type {
  PatternType,
  TabType,
  StepState,
  SetActivePatternAction,
  SetActiveTabAction,
  SelectProblemAction,
  InitVisualizationAction,
  StepVisualizationAction,
  PlayAnimationAction,
  PauseAnimationAction,
  ResetVisualizationAction,
  SetAnimationSpeedAction,
  SetCodeViewAction,
} from '../types';
import { PATTERN_ACTIONS } from '../types';

export const setActivePattern = (pattern: PatternType): SetActivePatternAction => ({
  type: PATTERN_ACTIONS.SET_ACTIVE_PATTERN,
  payload: pattern,
});

export const setActiveTab = (tab: TabType): SetActiveTabAction => ({
  type: PATTERN_ACTIONS.SET_ACTIVE_TAB,
  payload: tab,
});

export const selectProblem = (problemId: string): SelectProblemAction => ({
  type: PATTERN_ACTIONS.SELECT_PROBLEM,
  payload: problemId,
});

export const initVisualization = (states: StepState[]): InitVisualizationAction => ({
  type: PATTERN_ACTIONS.INIT_VISUALIZATION,
  payload: states,
});

export const stepVisualization = (): StepVisualizationAction => ({
  type: PATTERN_ACTIONS.STEP_VISUALIZATION,
});

export const playAnimation = (): PlayAnimationAction => ({
  type: PATTERN_ACTIONS.PLAY_ANIMATION,
});

export const pauseAnimation = (): PauseAnimationAction => ({
  type: PATTERN_ACTIONS.PAUSE_ANIMATION,
});

export const resetVisualization = (): ResetVisualizationAction => ({
  type: PATTERN_ACTIONS.RESET_VISUALIZATION,
});

export const setAnimationSpeed = (speed: number): SetAnimationSpeedAction => ({
  type: PATTERN_ACTIONS.SET_ANIMATION_SPEED,
  payload: speed,
});

export const setCodeView = (view: 'verbose' | 'terse'): SetCodeViewAction => ({
  type: PATTERN_ACTIONS.SET_CODE_VIEW,
  payload: view,
});
