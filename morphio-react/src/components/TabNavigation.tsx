import React from 'react';
import type { TabType } from '../redux/types';

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="main-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`main-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onSelectTab(tab.id)}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
};
