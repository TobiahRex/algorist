import React, { type ReactNode } from 'react';
import type { TabType, PatternProblem } from '../redux/types';
import { TabNavigation } from './TabNavigation';
import { ProblemSelector } from './ProblemSelector';
import { MnemonicPanel } from './MnemonicPanel';
import { RealWorldPanel } from './RealWorldPanel';
import { CodeDisplay } from './CodeDisplay';
import { LeetCodeProblems, type LeetCodeProblem } from './LeetCodeProblems';
import { CheatSheet, type CheatSheetItem } from './CheatSheet';

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

interface CodeExample {
  verbose: string;
  terse?: string;
}

interface PatternLayoutProps {
  title: string;
  subtitle: string;
  emoji: string;
  tabs: Tab[];
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  problems: PatternProblem[];
  selectedProblemId: string;
  onSelectProblem: (problemId: string) => void;
  codeExamples: { [key: string]: CodeExample };
  codeView: 'verbose' | 'terse';
  onChangeCodeView: (view: 'verbose' | 'terse') => void;
  selectedProblem: PatternProblem | null;
  children?: ReactNode;
  leetCodeProblems?: LeetCodeProblem[];
  cheatSheetData?: {
    timeComplexity: string;
    spaceComplexity: string;
    keyPoints: CheatSheetItem[];
    whenToUse: string[];
    commonMistakes: string[];
  };
}

export const PatternLayout: React.FC<PatternLayoutProps> = ({
  title,
  subtitle,
  emoji,
  tabs,
  activeTab,
  onSelectTab,
  problems,
  selectedProblemId,
  onSelectProblem,
  codeExamples,
  codeView,
  onChangeCodeView,
  selectedProblem,
  children,
  leetCodeProblems,
  cheatSheetData,
}) => {
  return (
    <div>
      <h1>{emoji} {title}</h1>
      <p className="subtitle">{subtitle}</p>

      <TabNavigation tabs={tabs} activeTab={activeTab} onSelectTab={onSelectTab} />

      {activeTab === 'learn' && (
        <>
          <ProblemSelector
            problems={problems.map(p => ({
              id: p.id,
              name: p.name,
              difficulty: p.difficulty,
            }))}
            selectedProblemId={selectedProblemId}
            onSelectProblem={onSelectProblem}
          />

          {selectedProblem && (
            <>
              {selectedProblem.mnemonicPerson && (
                <MnemonicPanel
                  title="Memory Hook (Person → Object → Action)"
                  person={selectedProblem.mnemonicPerson}
                  personEmoji={selectedProblem.mnemonicEmoji}
                  object={selectedProblem.mnemonicObject || ''}
                  action={selectedProblem.mnemonicAction || ''}
                  story={selectedProblem.mnemonicStory || ''}
                />
              )}

              {selectedProblem.realWorldUses && (
                <RealWorldPanel
                  uses={selectedProblem.realWorldUses}
                  patternEssence={selectedProblem.description}
                />
              )}

              <div className="learning-grid">
                <div className="panel">
                  <h2 style={{ color: '#22d3ee' }}>⚡ Behavior Animation</h2>
                  {children}
                </div>

                <div className="panel">
                  <h2 style={{ color: '#22d3ee' }}>💻 Code Examples</h2>
                  <CodeDisplay
                    examples={codeExamples}
                    selectedExample={selectedProblemId}
                    codeView={codeView}
                    onChangeView={onChangeCodeView}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {activeTab === 'problems' && leetCodeProblems && (
        <LeetCodeProblems problems={leetCodeProblems} patternName={title.replace(/[^a-zA-Z\s]/g, '').trim()} />
      )}

      {activeTab === 'cheatsheet' && cheatSheetData && (
        <CheatSheet
          patternName={title.replace(/[^a-zA-Z\s]/g, '').trim()}
          patternEmoji={emoji}
          timeComplexity={cheatSheetData.timeComplexity}
          spaceComplexity={cheatSheetData.spaceComplexity}
          keyPoints={cheatSheetData.keyPoints}
          whenToUse={cheatSheetData.whenToUse}
          commonMistakes={cheatSheetData.commonMistakes}
        />
      )}
    </div>
  );
};
