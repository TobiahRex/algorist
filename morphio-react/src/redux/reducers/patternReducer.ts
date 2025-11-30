import type { PatternState, PatternAction } from '../types';
import { PATTERN_ACTIONS } from '../types';

const initialVisualization = {
  currentStep: 0,
  isAnimating: false,
  animationSpeed: 1000,
  states: [],
};

const initialState: PatternState = {
  activePattern: 'two-pointers',
  activeTab: 'learn',
  selectedProblem: 'twoSumII',
  visualization: initialVisualization,
  codeView: 'verbose',
};

export const patternReducer = (state = initialState, action: PatternAction): PatternState => {
  switch (action.type) {
    case PATTERN_ACTIONS.SET_ACTIVE_PATTERN:
      return {
        ...state,
        activePattern: action.payload,
        selectedProblem: '', // Reset problem selection when switching patterns
        visualization: initialVisualization,
      };

    case PATTERN_ACTIONS.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case PATTERN_ACTIONS.SELECT_PROBLEM:
      return {
        ...state,
        selectedProblem: action.payload,
        visualization: initialVisualization,
      };

    case PATTERN_ACTIONS.INIT_VISUALIZATION:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          currentStep: 0,
          states: action.payload,
        },
      };

    case PATTERN_ACTIONS.STEP_VISUALIZATION:
      const nextStep = Math.min(
        state.visualization.currentStep + 1,
        state.visualization.states.length - 1
      );
      return {
        ...state,
        visualization: {
          ...state.visualization,
          currentStep: nextStep,
        },
      };

    case PATTERN_ACTIONS.PLAY_ANIMATION:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          isAnimating: true,
        },
      };

    case PATTERN_ACTIONS.PAUSE_ANIMATION:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          isAnimating: false,
        },
      };

    case PATTERN_ACTIONS.RESET_VISUALIZATION:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          currentStep: 0,
          isAnimating: false,
        },
      };

    case PATTERN_ACTIONS.SET_ANIMATION_SPEED:
      return {
        ...state,
        visualization: {
          ...state.visualization,
          animationSpeed: action.payload,
        },
      };

    case PATTERN_ACTIONS.SET_CODE_VIEW:
      return {
        ...state,
        codeView: action.payload,
      };

    default:
      return state;
  }
};
