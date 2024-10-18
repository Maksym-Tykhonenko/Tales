import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [winMode, setWinMode] = useState(false);
  const [topicId, setTopicId] = useState(null);

  return (
    <QuizContext.Provider value={{ winMode, setWinMode, topicId, setTopicId }}>
      {children}
    </QuizContext.Provider>
  );
};