/* eslint-disable import/no-extraneous-dependencies */
import Controller from './controller';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/reset.scss';
import './css/styles.scss';


window.onload = () => {
  Controller.start();
};

window.validateToDoForm = () => {
  Controller.validateToDoForm();
};

window.deleteProject = (projectId) => {
  Controller.deleteProject(projectId);
};

window.deleteToDo = (projectId, toDoId) => {
  Controller.deleteToDo(projectId, toDoId);
};

window.onProjectTitleClick = (projectId) => {
  Controller.toggleSaveBtn(projectId);
};

window.onProjectClickSave = (projectId) => {
  Controller.updateProjectTitle(projectId);
};

window.createSelectedModalList = (modalId, projectTitle) => {
  Controller.addSelectedProjectsToModal(modalId, projectTitle);
};

window.updateToDo = (modalId, projectId, toDoId) => {
  Controller.updateToDo(modalId, projectId, toDoId);
};

window.showToDoForm = (index) => {
  Controller.showToDoShortForm(index);
};

window.addToDoFromShortFrom = (index) => {
  Controller.addToDoFromShortFrom(index);
};

window.showProjectForm = () => {
  Controller.toggleProjectForm();
};

window.validateProjectForm = () => {
  Controller.validateProjectForm();
};