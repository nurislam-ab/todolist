import Controller from './controller';


window.onload = () => {
  Controller.start();
};

window.addProject = () => {
  Controller.addProject();
};

window.addToDo = () => {
  Controller.addToDo();
};

window.deleteProject = (projectId) => {
  Controller.deleteProject(projectId);
};