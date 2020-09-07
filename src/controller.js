import ToDo from './todo';
import Project from './project';
import View from './view';
import AppLocalStorage from './storage';

const Controller = (() => {
  const start = () => {
    View.listProjects(AppLocalStorage.parseData('projects'));
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), 'projects');
  };

  const addToDoFromShortFrom = (index) => {
    const title = document.getElementById(`title-${index}`).value;
    const selectedProject = document.getElementById(`hidden-project-${index}`).value;

    const todo = ToDo(title);
    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
    AppLocalStorage.updateProjectTodoList(projectIndex, todo);
  };

  const showToDoShortForm = (index) => {
    View.showToDoShortForm(index);
  };

  const addToDo = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priorities');
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const project = document.getElementById('projects');
    const selectedProject = project.options[project.selectedIndex].text;
    const todo = ToDo(title, dueDate, description, selectedPriority);
    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
    AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    View.deleteProjects();
    start();
    View.clearForm('todo-form');
  };

  const updateToDo = (modalId, projectId, toDoId) => {
    const title = document.getElementById(`${modalId}-modal-title`).innerHTML;
    const description = document.getElementById(`${modalId}-modal-description`).innerHTML;
    const project = document.getElementById(`${modalId}-modal-project`);
    const priority = document.getElementById(`${modalId}-modal-priority`);
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const selectedProject = project.options[project.selectedIndex].text;
    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
    const date = document.getElementById(`${modalId}-modal-date`).value;
    const todo = ToDo(title, date, description, selectedPriority);

    AppLocalStorage.removeToDo(projectId, toDoId);
    AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    View.deleteProjects();
    start();
  };

  const toggleProjectForm = () => {
    View.showProjectForm();
  };

  const addProject = () => {
    const title = document.getElementById('project-title').value;
    const project = Project(title, []);
    AppLocalStorage.storeLocal('projects', project);
    View.deleteProjects();
    start();
    View.clearForm('project-form');
    toggleProjectForm();
  };

  const toggleSaveBtn = (projectId) => {
    View.showSaveBtn(projectId);
  };

  const onToDoClick = (modalId) => View.showSaveBtnToDo(modalId);

  const updateProjectTitle = (projectId) => {
    const title = document.getElementById(`project-title-${projectId}`).innerHTML;
    AppLocalStorage.updateProject(projectId, title);
    View.showSaveBtn(projectId);
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), 'projects');
  };

  const deleteProject = (projectId) => {
    AppLocalStorage.removeProject(projectId);
    View.deleteProjects();
    start();
  };

  const deleteToDo = (projectId, toDoId) => {
    AppLocalStorage.removeToDo(projectId, toDoId);
    View.deleteProjects();
    start();
  };

  const addSelectedProjectsToModal = (modalId, projectTitle) => {
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), modalId);
    View.addCurrentProjectToSelectedList(modalId, projectTitle);
  };

  return {
    addToDo,
    addProject,
    deleteProject,
    deleteToDo,
    start,
    toggleSaveBtn,
    updateProjectTitle,
    onToDoClick,
    addSelectedProjectsToModal,
    updateToDo,
    showToDoShortForm,
    addToDoFromShortFrom,
    toggleProjectForm,
  };
})();

export default Controller;