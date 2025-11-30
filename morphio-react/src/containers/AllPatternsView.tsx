import React, { useState } from 'react';
import { twoPointersProblem, twoPointersCodeExamples } from '../data/twoPointersData';
import { slidingWindowProblems, slidingWindowCodeExamples } from '../data/slidingWindowData';
import { fastSlowProblems, fastSlowCodeExamples } from '../data/fastSlowData';
import { binarySearchProblems, binarySearchCodeExamples } from '../data/binarySearchData';
import { bfsProblems, bfsCodeExamples } from '../data/bfsData';
import { dfsProblems, dfsCodeExamples } from '../data/dfsData';
import { backtrackingProblems, backtrackingCodeExamples } from '../data/backtrackingData';
import { dpProblems, dpCodeExamples } from '../data/dpData';

interface PatternInfo {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  problems: any[];
  codeExamples: Record<string, any>;
}

const patterns: PatternInfo[] = [
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    emoji: '👆👆',
    subtitle: 'Shape: Linear Chain | O(n)',
    problems: twoPointersProblem,
    codeExamples: twoPointersCodeExamples,
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    emoji: '🪟',
    subtitle: 'Shape: Contiguous Subarray | O(n)',
    problems: slidingWindowProblems,
    codeExamples: slidingWindowCodeExamples,
  },
  {
    id: 'fast-slow',
    title: 'Fast & Slow Pointers',
    emoji: '🐢🐇',
    subtitle: 'Cycle Detection | Linked Lists',
    problems: fastSlowProblems,
    codeExamples: fastSlowCodeExamples,
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    emoji: '🔍',
    subtitle: 'Divide & Conquer | O(log n)',
    problems: binarySearchProblems,
    codeExamples: binarySearchCodeExamples,
  },
  {
    id: 'bfs',
    title: 'BFS (Level Order)',
    emoji: '📊',
    subtitle: 'Graph Traversal | Shortest Paths',
    problems: bfsProblems,
    codeExamples: bfsCodeExamples,
  },
  {
    id: 'dfs',
    title: 'DFS Traversal',
    emoji: '📈',
    subtitle: 'Graph Traversal | Recursion',
    problems: dfsProblems,
    codeExamples: dfsCodeExamples,
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    emoji: '🔄',
    subtitle: 'Combinatorial Search',
    problems: backtrackingProblems,
    codeExamples: backtrackingCodeExamples,
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    emoji: '🧩',
    subtitle: 'Optimization | Memoization',
    problems: dpProblems,
    codeExamples: dpCodeExamples,
  },
];

const PatternCard: React.FC<{ pattern: PatternInfo }> = ({ pattern }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(pattern.problems[0]?.id);
  const [showCode, setShowCode] = useState(false);

  const currentProblem = pattern.problems.find((p: any) => p.id === selectedProblem);
  const codeExample = pattern.codeExamples[selectedProblem];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.5) 0%, rgba(13, 17, 23, 0.5) 100%)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
        borderRadius: '8px',
        marginBottom: '15px',
        overflow: 'hidden',
        transition: 'all 0.3s',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          padding: '15px 20px',
          background: 'transparent',
          border: 'none',
          borderBottom: expanded ? '1px solid rgba(167, 139, 250, 0.1)' : 'none',
          color: '#a78bfa',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '1.1rem',
          fontWeight: '600',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(167, 139, 250, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{pattern.emoji}</span>
          <div>
            <div>{pattern.title}</div>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '400' }}>
              {pattern.subtitle}
            </div>
          </div>
        </div>
        <span style={{ fontSize: '1rem' }}>{expanded ? '▼' : '▶'}</span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '20px', background: 'rgba(0, 0, 0, 0.2)' }}>
          {/* Problem selector */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '8px' }}>
              Problems:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {pattern.problems.map((problem: any) => (
                <button
                  key={problem.id}
                  onClick={() => {
                    setSelectedProblem(problem.id);
                    setShowCode(false);
                  }}
                  style={{
                    padding: '6px 12px',
                    background:
                      selectedProblem === problem.id
                        ? 'rgba(167, 139, 250, 0.3)'
                        : 'rgba(167, 139, 250, 0.1)',
                    border:
                      selectedProblem === problem.id
                        ? '1px solid rgba(167, 139, 250, 0.5)'
                        : '1px solid rgba(167, 139, 250, 0.2)',
                    color:
                      selectedProblem === problem.id
                        ? '#a78bfa'
                        : '#888',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      selectedProblem === problem.id
                        ? 'rgba(167, 139, 250, 0.5)'
                        : 'rgba(167, 139, 250, 0.2)';
                  }}
                >
                  {problem.name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Problem description */}
          {currentProblem && (
            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: '500', marginBottom: '5px' }}>
                {currentProblem.name}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.85rem' }}>
                {currentProblem.description}
              </div>
              <div
                style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  color: '#a78bfa',
                }}
              >
                Difficulty: <strong>{currentProblem.difficulty}</strong>
              </div>
            </div>
          )}

          {/* Code toggle and display */}
          <div>
            <button
              onClick={() => setShowCode(!showCode)}
              style={{
                marginBottom: '10px',
                padding: '8px 12px',
                background: 'rgba(167, 139, 250, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                color: '#a78bfa',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(167, 139, 250, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)';
              }}
            >
              {showCode ? '▼ Hide Code' : '▶ Show Code'}
            </button>

            {showCode && codeExample && (
              <div
                style={{
                  background: '#0d1117',
                  borderRadius: '6px',
                  padding: '12px',
                  fontSize: '0.75rem',
                  color: '#e0e0e0',
                  fontFamily: 'monospace',
                  overflowX: 'auto',
                  border: '1px solid rgba(167, 139, 250, 0.1)',
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {codeExample.terse || 'Code example coming soon...'}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const AllPatternsView: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '10px', color: '#a78bfa' }}>
        🧠 All Algorithm Patterns
      </h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>
        Browse all 8 core patterns with problems and code examples
      </p>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
};
