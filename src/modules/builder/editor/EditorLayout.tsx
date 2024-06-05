import React, { useState } from 'react';
import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';
import ErrorBoundary from 'src/helpers/common/components/ErrorBoundary';
import Button from '@mui/material/Button';
import ImportFromFirestoreButton from './ImportSave';
import { headers } from 'src/helpers/constants/editor-data';
import { resetResumeStore } from 'src/stores/useResumeStore';
import Save from './Save'; // Adjust the import path as necessary

const EditorLayout = () => {
  const [link, setLink] = useState('');
  const section = headers[link];

  const linkClickHandler = (link: string) => {
    setLink(link);
  };

  const displayElement = link ? (
    <EditSection section={section} onLinkClick={linkClickHandler} />
  ) : (
    <DataHeaders onLinkClick={linkClickHandler} />
  );

  return (
    <ErrorBoundary>
      <div className="bg-resume-50 h-full text-resume-800 p-6 overflow-auto relative no-scrollbar shadow-level-4dp">
        {displayElement}

        <div className="mt-8 flex flex-col space-y-4">
          <ImportFromFirestoreButton />
          <div className="flex justify-center space-x-2">
            <Save />
            <Button
              className="bg-[#dc2626] text-white hover:bg-[#7f1d1d] flex-1"
              onClick={resetResumeStore}
            >
              Reset all
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EditorLayout;
