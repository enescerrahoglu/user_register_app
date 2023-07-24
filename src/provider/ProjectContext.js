import React, {createContext, useState} from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectContext.Provider value={{projects, setProjects}}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
