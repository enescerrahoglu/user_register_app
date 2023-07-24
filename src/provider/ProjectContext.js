import React, {createContext, useState} from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]);

  const deleteProject = index => {
    setProjects(prevProjects => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(index, 1);
      return updatedProjects;
    });
  };

  return (
    <ProjectContext.Provider value={{projects, setProjects, deleteProject}}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
