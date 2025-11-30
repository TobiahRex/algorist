import React from 'react';
import type { DifficultyLevel } from '../redux/types';

interface Problem {
  id: string;
  name: string;
  difficulty: DifficultyLevel;
}

interface ProblemSelectorProps {
  problems: Problem[];
  selectedProblemId: string;
  onSelectProblem: (problemId: string) => void;
}

export const ProblemSelector: React.FC<ProblemSelectorProps> = ({
  problems,
  selectedProblemId,
  onSelectProblem,
}) => {
  return (
    <div className="problem-selector">
      {problems.map((problem) => (
        <button
          key={problem.id}
          className={`problem-btn ${selectedProblemId === problem.id ? 'active' : ''}`}
          onClick={() => onSelectProblem(problem.id)}
        >
          <span className={`diff ${problem.difficulty}`}></span>
          {problem.name}
        </button>
      ))}
    </div>
  );
};
