import React, { useState } from 'react';
import type { StepState } from '../redux/types';

interface BehaviorAnimationProps {
  steps: StepState[];
  arrayLength: number;
  onStepChange?: (step: StepState) => void;
}

export const BehaviorAnimation: React.FC<BehaviorAnimationProps> = ({
  steps,
  arrayLength,
  onStepChange,
}): React.ReactElement => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = steps[currentStepIndex];

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        onStepChange?.(steps[nextIndex]);
      } else {
        setIsPlaying(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps, onStepChange]);

  const handleStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onStepChange?.(steps[nextIndex]);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    onStepChange?.(steps[0]);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const state = currentStep as any;
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.6) 0%, rgba(26, 31, 58, 0.6) 100%)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px',
      }}
    >
      <h3 style={{ color: '#a78bfa', marginBottom: '20px', marginTop: 0 }}>
        ⚡ Behavior Animation
      </h3>

      {/* Step Message */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(167, 139, 250, 0.2)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: '#4ade80',
            lineHeight: '1.6',
          }}
        >
          {state ? state.message : null}
        </div>
      </div>

      {/* Array Visualization */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end',
            minWidth: 'fit-content',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: arrayLength }).map((_, idx) => {
            const isInWindow =
              state?.windowStart !== undefined &&
              state?.windowEnd !== undefined &&
              idx >= state.windowStart &&
              idx <= state.windowEnd;
            const isHighlighted = state?.highlights?.includes(idx);
            const pointerNames = state?.pointers
              ? Object.entries(state.pointers)
                  .filter(([_, pos]) => pos === idx)
                  .map(([name]) => name)
              : [];

            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                {/* Pointer labels */}
                {pointerNames.length > 0 && (
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: '#fbbf24',
                      minHeight: '16px',
                    }}
                  >
                    {pointerNames.join(', ')}
                  </div>
                )}

                {/* Cell */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    border: isInWindow
                      ? '2px solid #22d3ee'
                      : isHighlighted
                        ? '2px solid #fbbf24'
                        : '1px solid #555',
                    borderRadius: '6px',
                    background: isInWindow
                      ? 'rgba(34, 211, 238, 0.3)'
                      : isHighlighted
                        ? 'rgba(251, 191, 36, 0.3)'
                        : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: isInWindow ? '#22d3ee' : isHighlighted ? '#fbbf24' : '#888',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                  }}
                >
                  {idx}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* State Grid */}
      {state?.values && typeof state.values === 'object' && Object.keys(state.values as any).length > 0 && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '8px',
          }}
        >
          {Object.entries(state.values as any).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: 'rgba(167, 139, 250, 0.1)',
                padding: '8px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace',
              }}
            >
              <div style={{ color: '#a78bfa', fontSize: '10px' }}>{key}</div>
              <div style={{ color: '#4ade80' }}>{String(value)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleStep}
          disabled={currentStepIndex >= steps.length - 1}
          style={{
            padding: '8px 16px',
            background: currentStepIndex >= steps.length - 1 ? '#333' : 'rgba(167, 139, 250, 0.2)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            color: currentStepIndex >= steps.length - 1 ? '#666' : '#a78bfa',
            borderRadius: '6px',
            cursor: currentStepIndex >= steps.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          Step →
        </button>
        <button
          onClick={handlePlay}
          style={{
            padding: '8px 16px',
            background: 'rgba(74, 222, 128, 0.2)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            color: '#4ade80',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            background: 'rgba(251, 191, 36, 0.2)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: '#fbbf24',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Step Counter */}
      <div
        style={{
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#888',
        }}
      >
        Step {currentStepIndex + 1} of {steps.length}
      </div>
    </div>
  );
};
