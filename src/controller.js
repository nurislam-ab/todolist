import ToDo from './todo';
import Project from './project';
import View from './view';
import AppLocalStorage from './storage';

const Controller = (() => {
  const start = () => {
    View.listProjects(AppLocalStorage.parseData('projects'));
    View.updateProjectSelectList(AppLocalStorage.parseData('projects'), 'projects');
  };

  const addDefaultProject = () => {
    const project = Project('Default', []);
    AppLocalStorage.populateWithDefaultProject('projects', project);
    View.deleteProjects();
    start();
  };

  const addToDoFromShortFrom = (index) => {
    const title = document.getElementById(`title-${index}`).value;
    const selectedProject = document.getElementById(`hidden-project-${index}`).value;
    if (title !== '') {
      const todo = ToDo(title);
      const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
      AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    } else {
      alert('Please, enter the title!');
    }
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

  const validateToDoForm = () => {
    const toDoTitle = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    if (toDoTitle === '') {
      alert('Please, enter the title!');
      return false;
    }

    if (description === '') {
      alert('Please, type the description!');
      return false;
    }
    if (dueDate === '') {
      alert('Please, select the date!');
      return false;
    }
    return Controller.addToDo();
  };

  const updateToDo = (modalId, projectId, toDoId) => {
    const title = document.getElementById(`${modalId}-modal-title`).innerHTML;
    const description = document.getElementById(`${modalId}-modal-description`).value;
    const project = document.getElementById(`${modalId}-modal-project`);
    const priority = document.getElementById(`${modalId}-modal-priority`);
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const selectedProject = project.options[project.selectedIndex].text;
    const projectIndex = AppLocalStorage.getProjectByTitle(selectedProject);
    const date = document.getElementById(`${modalId}-modal-date`).value;
    const todo = ToDo(title, date, description, selectedPriority);

    if (title === '') {
      alert('Please, enter the todo title!');
      return false;
    }

    if (description === '') {
      alert('Please, enter the todo description!');
      return false;
    }

    if (date === '') {
      alert('Please, enter the todo due date!');
      return false;
    }
    AppLocalStorage.removeToDo(projectId, toDoId);
    AppLocalStorage.updateProjectTodoList(projectIndex, todo);
    View.deleteProjects();
    start();
    return true;
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

  const validateProjectForm = () => {
    const projectTitle = document.getElementById('project-title').value;
    if (projectTitle === '') {
      alert('Please, enter the project title!');
      return false;
    }
    return Controller.addProject();
  };

  const toggleSaveBtn = (projectId) => {
    View.showSaveBtn(projectId);
  };

  const onToDoClick = (modalId) => View.showSaveBtnToDo(modalId);

  const updateProjectTitle = (projectId) => {
    const title = document.getElementById(`project-title-${projectId}`).innerHTML;
    if (title === '') {
      alert('Please, enter the project title!');
    }
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
    validateProjectForm,
    validateToDoForm,
    addDefaultProject,
  };
})();

export default Controller;