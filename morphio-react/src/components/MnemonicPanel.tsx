import React from 'react';

interface MnemonicPanelProps {
  title: string;
  emoji?: string;
  person: string;
  personEmoji?: string;
  object: string;
  objectEmoji?: string;
  action: string;
  actionEmoji?: string;
  story: string;
}

export const MnemonicPanel: React.FC<MnemonicPanelProps> = ({
  title,
  emoji = '🧠',
  person,
  personEmoji = '🕴️',
  object,
  objectEmoji = '🎯',
  action,
  actionEmoji = '⚡',
  story,
}) => {
  return (
    <div className="mnemonic-panel">
      <h3>{emoji} {title}</h3>
      <div className="poa-grid">
        <div className="poa-card poa-person">
          <div className="emoji">{personEmoji}</div>
          <div className="type">Person</div>
          <div className="content">{person}</div>
        </div>
        <div className="poa-card poa-object">
          <div className="emoji">{objectEmoji}</div>
          <div className="type">Object</div>
          <div className="content">{object}</div>
        </div>
        <div className="poa-card poa-action">
          <div className="emoji">{actionEmoji}</div>
          <div className="type">Action</div>
          <div className="content">{action}</div>
        </div>
      </div>
      <div className="memory-story">
        {story}
      </div>
    </div>
  );
};
