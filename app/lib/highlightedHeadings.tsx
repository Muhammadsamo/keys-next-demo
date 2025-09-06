import React from 'react';
// Highlight specific words in headings
export const highlightHeading = (
  text: string, 
  highlightedWord?: string, 
  normalClass: string = 'mute', 
  highlightClass: string = 'color',
  isReversed: boolean = false
) => {
  if (!highlightedWord || !text) return text;
  
  const parts = text.split(highlightedWord);
  if (parts.length === 1) return text; // IF no match found
  
  return parts.map((part, index) => (
      <React.Fragment key={index}>
          {isReversed ? (
            <>
              {index < parts.length - 1 && <span className={highlightClass}>{highlightedWord}</span>}
              <span className={normalClass}>{part}</span>
            </>
          ) : (
            <>
              <span className={normalClass}>{part}</span>
              {index < parts.length - 1 && <span className={highlightClass}>{highlightedWord}</span>}
            </>
          )}
      </React.Fragment>
  ));
};