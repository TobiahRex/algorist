import { call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { PATTERN_ACTIONS } from '../types';
import { stepVisualization, pauseAnimation } from '../actions/patternActions';
import { selectIsAnimating, selectAnimationSpeed, selectCurrentStep, selectStates } from '../selectors/patternSelectors';

function* animationSaga(): any {
  while (true) {
    const isAnimating: unknown = yield select(selectIsAnimating);

    if (isAnimating) {
      const speed: unknown = yield select(selectAnimationSpeed);
      const currentStep: unknown = yield select(selectCurrentStep);
      const states: unknown = yield select(selectStates);

      // If we're at the last step, pause
      if (typeof currentStep === 'number' && Array.isArray(states) && currentStep >= states.length - 1) {
        yield put(pauseAnimation());
      } else {
        // Wait for the animation speed
        yield call(delay, typeof speed === 'number' ? speed : 1000);
        // Move to next step
        yield put(stepVisualization());
      }
    } else {
      // If not animating, wait before checking again
      yield call(delay, 100);
    }
  }
}

export function* patternSaga(): any {
  yield takeEvery(PATTERN_ACTIONS.PLAY_ANIMATION, function* () {
    // Just let the animation saga handle it
  });

  yield call(animationSaga);
}
