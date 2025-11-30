import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface CodeExample {
  verbose: string;
  terse?: string;
}

interface CodeDisplayProps {
  examples: { [key: string]: CodeExample };
  selectedExample?: string;
  codeView: 'verbose' | 'terse';
  onChangeView: (view: 'verbose' | 'terse') => void;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  examples,
  selectedExample = Object.keys(examples)[0],
  codeView,
  onChangeView,
}) => {
  if (!selectedExample || !examples[selectedExample]) {
    return <div className="code-panel">No code available</div>;
  }

  const example = examples[selectedExample];
  const code = codeView === 'verbose' ? example.verbose : (example.terse || example.verbose);

  const highlighted = hljs.highlight(code, {
    language: 'python',
    ignoreIllegals: true,
  }).value;

  return (
    <div className="code-panel">
      <div className="controls">
        <button
          className={`${codeView === 'verbose' ? 'active' : ''}`}
          onClick={() => onChangeView('verbose')}
        >
          📖 Verbose
        </button>
        {example.terse && (
          <button
            className={`${codeView === 'terse' ? 'active' : ''}`}
            onClick={() => onChangeView('terse')}
          >
            ⚡ Terse
          </button>
        )}
      </div>
      <pre>
        <code
          dangerouslySetInnerHTML={{ __html: highlighted }}
          style={{ fontSize: '0.85rem', lineHeight: '1.6' }}
        />
      </pre>
    </div>
  );
};
