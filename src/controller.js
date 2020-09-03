import ToDo from './todo';
import Project from './project';
import View from './view';

const Controller = (() => {
  const testProject = Project('Testing Project');
  const testTodo = ToDo('Test', 'Description', '2020-09-05', 'high');
  testProject.addTodoList(testTodo);
  const projectsArr = [testProject];

  const addToDo = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priorities');
    const selectedPriority = priority.options[priority.selectedIndex].text;
    const project = document.getElementById('projects');
    const selectedProject = project.options[project.selectedIndex].text;
    const todo = ToDo(title, description, dueDate, selectedPriority);

    const projectIndex = projectsArr.map(project => project.title).indexOf(selectedProject);
    projectsArr[projectIndex].addTodoList(todo);
    const projectObj = projectsArr[projectIndex];
    View.addToDoToProject(projectIndex, todo, projectObj.getTodosForProject().length - 1);
  };

  const addProject = () => {
    const title = document.getElementById('project-title').value;
    const project = Project(title);
    projectsArr.push(project);
    View.updateProjectView(project, projectsArr.length - 1);
    View.addProjectToSelectList(project);
  };

  const start = () => {
    View.listProjects(projectsArr);
    View.updateProjectSelectList(projectsArr);
  };

  const deleteProject = (projectId) => {
    console.log('in here?');
    projectsArr.splice(projectId, 1);
    console.log(projectsArr);
    View.deleteProjects();
    start();
  };

  return {
    addToDo,
    addProject,
    deleteProject,
    start,
  };
})();

export default Controller;