// Redux Action Types and State Interfaces

// Pattern Types
export type PatternType = 'two-pointers' | 'sliding-window' | 'algorithm-patterns' | 'gang-of-four' | 'learning-methodology';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type TabType = 'learn' | 'problems' | 'cheatsheet';

// Pattern Problem Interface
export interface PatternProblem {
  id: string;
  name: string;
  difficulty: DifficultyLevel;
  description: string;
  examples: TestCase[];
  mnemonicEmoji?: string;
  mnemonicPerson?: string;
  mnemonicObject?: string;
  mnemonicAction?: string;
  mnemonicStory?: string;
  realWorldUses?: RealWorldUse[];
}

export interface TestCase {
  input: unknown;
  expected: unknown;
  display?: string;
}

export interface RealWorldUse {
  title: string;
  description: string;
  icon: string;
}

// Visualization State
export interface VisualizationState {
  currentStep: number;
  isAnimating: boolean;
  animationSpeed: number;
  states: StepState[];
}

export interface StepState {
  index: number;
  message: string;
  highlights?: number[];
  pointers?: { [key: string]: number };
  values?: unknown;
}

// Pattern State
export interface PatternState {
  activePattern: PatternType;
  activeTab: TabType;
  selectedProblem: string;
  visualization: VisualizationState;
  codeView: 'verbose' | 'terse';
}

// Root State
export interface RootState {
  pattern: PatternState;
}

// Action Types
export const PATTERN_ACTIONS = {
  // Pattern selection
  SET_ACTIVE_PATTERN: 'PATTERN/SET_ACTIVE_PATTERN',
  SET_ACTIVE_TAB: 'PATTERN/SET_ACTIVE_TAB',
  SELECT_PROBLEM: 'PATTERN/SELECT_PROBLEM',

  // Visualization
  INIT_VISUALIZATION: 'PATTERN/INIT_VISUALIZATION',
  STEP_VISUALIZATION: 'PATTERN/STEP_VISUALIZATION',
  PLAY_ANIMATION: 'PATTERN/PLAY_ANIMATION',
  PAUSE_ANIMATION: 'PATTERN/PAUSE_ANIMATION',
  RESET_VISUALIZATION: 'PATTERN/RESET_VISUALIZATION',
  SET_ANIMATION_SPEED: 'PATTERN/SET_ANIMATION_SPEED',

  // Code display
  SET_CODE_VIEW: 'PATTERN/SET_CODE_VIEW',
} as const;

// Action Interfaces
export interface SetActivePatternAction {
  type: typeof PATTERN_ACTIONS.SET_ACTIVE_PATTERN;
  payload: PatternType;
}

export interface SetActiveTabAction {
  type: typeof PATTERN_ACTIONS.SET_ACTIVE_TAB;
  payload: TabType;
}

export interface SelectProblemAction {
  type: typeof PATTERN_ACTIONS.SELECT_PROBLEM;
  payload: string;
}

export interface InitVisualizationAction {
  type: typeof PATTERN_ACTIONS.INIT_VISUALIZATION;
  payload: StepState[];
}

export interface StepVisualizationAction {
  type: typeof PATTERN_ACTIONS.STEP_VISUALIZATION;
}

export interface PlayAnimationAction {
  type: typeof PATTERN_ACTIONS.PLAY_ANIMATION;
}

export interface PauseAnimationAction {
  type: typeof PATTERN_ACTIONS.PAUSE_ANIMATION;
}

export interface ResetVisualizationAction {
  type: typeof PATTERN_ACTIONS.RESET_VISUALIZATION;
}

export interface SetAnimationSpeedAction {
  type: typeof PATTERN_ACTIONS.SET_ANIMATION_SPEED;
  payload: number;
}

export interface SetCodeViewAction {
  type: typeof PATTERN_ACTIONS.SET_CODE_VIEW;
  payload: 'verbose' | 'terse';
}

export type PatternAction =
  | SetActivePatternAction
  | SetActiveTabAction
  | SelectProblemAction
  | InitVisualizationAction
  | StepVisualizationAction
  | PlayAnimationAction
  | PauseAnimationAction
  | ResetVisualizationAction
  | SetAnimationSpeedAction
  | SetCodeViewAction;
