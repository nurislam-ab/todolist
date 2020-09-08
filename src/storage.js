const AppLocalStorage = (() => {
  const storeLocal = (keyName, item) => {
    let projects;
    if (localStorage.getItem(`${keyName}`) === null) {
      projects = [];
      projects.push('Default project');
    } else {
      projects = JSON.parse(localStorage.getItem(`${keyName}`));
    }

    projects.push(item);

    localStorage.setItem(`${keyName}`, JSON.stringify(projects));
  };
  const parseData = (keyName) => {
    let data = JSON.parse(localStorage.getItem(`${keyName}`));
    if (data === null) {
      data = [];
    }
    return data;
  };

  const getProjectByTitle = (projectTitle) => {
    const projectIndex = parseData('projects').map(project => project.title).indexOf(projectTitle);
    return projectIndex;
  };

  const updateProject = (projectIndex, projectTitle) => {
    const projects = parseData('projects');
    const updatedProject = projects[projectIndex];
    updatedProject.title = projectTitle;
    projects.splice(projectIndex, 1, updatedProject);
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const updateProjectTodoList = (projectIndex, todo) => {
    const projects = parseData('projects');
    const updatedProject = projects[projectIndex];
    updatedProject.toDoList.push(todo);
    projects.splice(projectIndex, 1, updatedProject);
    localStorage.setItem('projects', JSON.stringify(projects));

    return updatedProject;
  };

  const removeProject = (projectIndex) => {
    const projects = parseData('projects');
    projects.splice(projectIndex, 1);

    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const removeToDo = (projectIndex, toDoIndex) => {
    const projects = parseData('projects');
    const updatedProject = projects[projectIndex];
    updatedProject.toDoList.splice(toDoIndex, 1);
    projects.splice(projectIndex, 1, updatedProject);
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const getProjectTitle = (index, title) => {
    const projects = parseData('projects');
    const projectNew = projects[index];
    if (projectNew.title === title) {
      return true;
    }

    return false;
  };

  return {
    storeLocal,
    parseData,
    getProjectByTitle,
    updateProjectTodoList,
    removeProject,
    removeToDo,
    updateProject,
    getProjectTitle,
  };
})();

export default AppLocalStorage;