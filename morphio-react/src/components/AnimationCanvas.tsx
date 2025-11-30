import React, { useEffect, useRef } from 'react';
import type { StepState } from '../redux/types';

interface AnimationCanvasProps {
  width: number;
  height: number;
  currentState: StepState | null;
  onStep: () => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  isAnimating: boolean;
  animationSpeed: number;
  totalSteps: number;
  currentStep: number;
  renderFrame: (ctx: CanvasRenderingContext2D, state: StepState) => void;
}

export const AnimationCanvas: React.FC<AnimationCanvasProps> = ({
  width,
  height,
  currentState,
  onStep,
  onPlay,
  onPause,
  onReset,
  isAnimating,
  animationSpeed,
  totalSteps,
  currentStep,
  renderFrame,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentState) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);

    // Render frame
    renderFrame(ctx, currentState);
  }, [currentState, renderFrame, width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ borderRadius: '8px', border: '1px solid #2a2f45' }}
      />
      <div className="controls">
        <button onClick={onStep}>Step →</button>
        <button onClick={isAnimating ? onPause : onPlay}>
          {isAnimating ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={onReset}>↺ Reset</button>
      </div>

      <div className="state-grid">
        <div className="state-item">
          <div className="label">Step</div>
          <div className="value">
            {currentStep}/{totalSteps - 1}
          </div>
        </div>
        <div className="state-item">
          <div className="label">Speed</div>
          <div className="value">{animationSpeed}ms</div>
        </div>
        <div className="state-item">
          <div className="label">Status</div>
          <div className="value">{isAnimating ? 'Playing' : 'Paused'}</div>
        </div>
        <div className="state-item">
          <div className="label">Message</div>
          <div className="value" style={{ fontSize: '0.8rem' }}>
            {currentState?.message || '—'}
          </div>
        </div>
      </div>

      {currentState?.message && (
        <div className={`message-box ${currentState.message.includes('Found') ? 'found' : ''}`}>
          {currentState.message}
        </div>
      )}
    </>
  );
};
