import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TwoPointersContainer } from './containers/TwoPointersContainer';
import { SlidingWindowContainer } from './containers/SlidingWindowContainer';
import { FastSlowContainer } from './containers/FastSlowContainer';
import { BinarySearchContainer } from './containers/BinarySearchContainer';
import { GenericPatternContainer } from './containers/GenericPatternContainer';
import { AllPatternsView } from './containers/AllPatternsView';
import { LeftSidebar } from './components/LeftSidebar';
import { bfsProblems, bfsCodeExamples } from './data/bfsData';
import { dfsProblems, dfsCodeExamples } from './data/dfsData';
import { backtrackingProblems, backtrackingCodeExamples } from './data/backtrackingData';
import { dpProblems, dpCodeExamples } from './data/dpData';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <LeftSidebar />
      <div style={{ minHeight: '100vh', paddingLeft: '280px', paddingTop: '0', transition: 'padding-left 0.3s ease', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-patterns" element={<AllPatternsView />} />
          <Route path="/two-pointers" element={<TwoPointersContainer />} />
          <Route path="/sliding-window" element={<SlidingWindowContainer />} />
          <Route path="/fast-slow" element={<FastSlowContainer />} />
          <Route path="/binary-search" element={<BinarySearchContainer />} />
          <Route
            path="/bfs"
            element={
              <GenericPatternContainer
                title="BFS (Level Order) Pattern"
                subtitle="Shape: Tree/Graph | Complexity: O(V+E) | The 'level explorer'"
                emoji="📊"
                problems={bfsProblems}
                codeExamples={bfsCodeExamples}
                defaultProblemId="levelOrderTraversal"
                patternType="bfs"
              />
            }
          />
          <Route
            path="/dfs"
            element={
              <GenericPatternContainer
                title="DFS (Depth-First Search) Pattern"
                subtitle="Shape: Tree/Graph | Complexity: O(V+E) | The 'depth explorer'"
                emoji="📈"
                problems={dfsProblems}
                codeExamples={dfsCodeExamples}
                defaultProblemId="preorderTraversal"
                patternType="dfs"
              />
            }
          />
          <Route
            path="/backtracking"
            element={
              <GenericPatternContainer
                title="Backtracking Pattern"
                subtitle="Search Strategy | Complexity: Often Exponential | The 'exhaustive explorer'"
                emoji="🔄"
                problems={backtrackingProblems}
                codeExamples={backtrackingCodeExamples}
                defaultProblemId="permutations"
                patternType="backtracking"
              />
            }
          />
          <Route
            path="/dynamic-programming"
            element={
              <GenericPatternContainer
                title="Dynamic Programming Pattern"
                subtitle="Optimization | Complexity: Problem-Dependent | The 'memoizer'"
                emoji="🧩"
                problems={dpProblems}
                codeExamples={dpCodeExamples}
                defaultProblemId="climbStairs"
                patternType="dp"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const HomePage: React.FC = () => {
  const patterns = [
    {
      path: '/two-pointers',
      title: '👆👆 Two Pointers Pattern',
      subtitle: 'Shape: Linear Chain | O(n)',
      description: 'Master the sorted array / in-place solver pattern',
    },
    {
      path: '/sliding-window',
      title: '🪟 Sliding Window Pattern',
      subtitle: 'Shape: Contiguous Subarray | O(n)',
      description: 'Learn fixed and variable window patterns',
    },
    {
      path: '/fast-slow',
      title: '🐢🐇 Fast & Slow Pointers',
      subtitle: 'Cycle Detection | Linked Lists',
      description: 'Find cycles and middle nodes efficiently',
    },
    {
      path: '/binary-search',
      title: '🔍 Binary Search',
      subtitle: 'Divide & Conquer | O(log n)',
      description: 'Master the search optimization technique',
    },
    {
      path: '/bfs',
      title: '📊 BFS (Level Order)',
      subtitle: 'Graph Traversal | Shortest Paths',
      description: 'Level-by-level graph exploration',
    },
    {
      path: '/dfs',
      title: '📈 DFS Traversal',
      subtitle: 'Graph Traversal | Recursion',
      description: 'Depth-first exhaustive search pattern',
    },
    {
      path: '/backtracking',
      title: '🔄 Backtracking',
      subtitle: 'Combinatorial Search',
      description: 'Explore all possibilities systematically',
    },
    {
      path: '/dynamic-programming',
      title: '🧩 Dynamic Programming',
      subtitle: 'Optimization | Memoization',
      description: 'Solve overlapping subproblems efficiently',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
        🧠 Morphio - Algorithm Pattern Explorer
      </h1>
      <p className="subtitle">
        Explore algorithms using the Memory Palace framework with Person-Object-Action mnemonics
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          maxWidth: '1200px',
          margin: '40px auto',
        }}
      >
        {patterns.map((pattern) => (
          <Link
            key={pattern.path}
            to={pattern.path}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="panel"
              style={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#a78bfa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#2a2f45';
              }}
            >
              <h2 style={{ marginBottom: '10px', color: '#a78bfa' }}>
                {pattern.title}
              </h2>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>
                {pattern.subtitle}
              </p>
              <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.6' }}>
                {pattern.description}
              </p>
              <div style={{ marginTop: '15px', color: '#4ade80', fontSize: '0.9rem' }}>
                Learn More →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default App;
