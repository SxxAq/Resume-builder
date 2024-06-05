import { useEffect } from 'react';

import { StyledButton } from '../atoms';

export const PrintResume = () => {
  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  return (
    <StyledButton
      className="bg-white text-[#111827] hover:text-white"
      onClick={globalThis?.print}
      variant="outlined"
    >
      Download as PDF
    </StyledButton>
  );
};
