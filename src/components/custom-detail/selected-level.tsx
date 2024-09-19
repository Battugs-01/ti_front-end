import React, { createContext, useContext, useState } from "react";
import { AssessmentListType } from "service/screening_list/type";

interface LevelContextProps {
  selectedLevel: AssessmentListType | null;
  setSelectedLevel: (level: AssessmentListType | null) => void;
}

const LevelContext = createContext<LevelContextProps | undefined>(undefined);

export const LevelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<AssessmentListType | null>(
    null
  );

  return (
    <LevelContext.Provider value={{ selectedLevel, setSelectedLevel }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevelContext = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevelContext must be used within a LevelProvider");
  }
  return context;
};
