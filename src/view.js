import { format, parseISO } from 'date-fns';

const View = (() => {
  const buttonComponent = (string, onclick) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = string;
    deleteButton.setAttribute('onclick', onclick);
    return deleteButton;
  };

  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const buttonForModal = (string, dataTarget, dataToogle, id, projectTitle) => {
    const button = document.createElement('button');
    button.innerHTML = string;
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('data-toggle', `${dataToogle}`);
    button.setAttribute('data-target', `${dataTarget}`);
    button.setAttribute('onclick', `createSelectedModalList('${id}-modal-project', '${projectTitle}')`);
    return button;
  };

  const renderProjects = (project, parentElement, id) => {
    const projectWrapper = document.createElement('div');
    projectWrapper.id = id;
    const projectTitle = document.createElement('h3');
    projectTitle.setAttribute('onfocus', `onProjectTitleClick(${id})`);
    projectTitle.setAttribute('contenteditable', true);
    projectTitle.id = `project-title-${id}`;

    const updateProjectBtn = buttonComponent('Save project', `onProjectClickSave(${id})`);
    updateProjectBtn.classList.toggle('d-none');
    updateProjectBtn.id = `project-${id}`;

    const deleteButton = buttonComponent('Delete Project', `deleteProject(${id})`);
    projectTitle.innerHTML = project.title;
    projectWrapper.append(projectTitle);
    projectWrapper.append(updateProjectBtn);
    projectWrapper.append(deleteButton);
    parentElement.append(projectWrapper);
  };

  const showSaveBtn = (projectId) => {
    const saveBtn = document.getElementById(`project-${projectId}`);
    saveBtn.classList.toggle('d-none');
  };

  const showSaveBtnToDo = (modalId) => {
    const saveBtn = document.getElementById(`savebutton-${modalId}`);
    saveBtn.classList.toogle('d-none');
  };

  const createModal = (projectId, toDo, projectTitle, toDoId) => {
    const id = `project-${projectId}-toDo-${toDoId}`;
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal fade');
    modal.id = id;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class='modal-dialog' role='document'>
          <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>Title: <span contentEditable=true id='${id}-modal-title'>${toDo.title}</span></h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <label for="projects">Project</label>
            <select id='${id}-modal-project'>${projectTitle}
            </select>
            <p>Description: <span contentEditable=true id='${id}-modal-description'>${toDo.description}</span></p>
            <input type="date" name="due-date" id='${id}-modal-date' value="${toDo.dueDate}">
            <label for="priorities">Priority</label>
            <select id='${id}-modal-priority' name="priorities">
              <option value="" disabled selected hidden>${toDo.priority}</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal' onclick="updateToDo('${id}', '${projectId}', '${toDoId}')" >Save</button>
          </div>
        </div>
      </div>
    </div>`;
    return modal;
  };

  const addCurrentProjectToSelectedList = (modalId, projectTitle) => {
    const selectListContainer = document.getElementById(modalId);
    const optionElement = document.createElement('option');
    optionElement.innerHTML = projectTitle;
    optionElement.setAttribute('selected', true);
    optionElement.setAttribute('hidden', true);
    selectListContainer.append(optionElement);
  };

  const addToDoToProject = (projectId, toDo, toDoId, projectTitle) => {
    const currentProject = document.getElementById(`${projectId}`);
    const toDoWrapper = document.createElement('div');
    const title = document.createElement('p');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
    const deleteButton = buttonComponent('Delete To Do', `deleteToDo(${projectId}, ${toDoId})`);
    const modalButton = buttonForModal('View To Do', `#project-${projectId}-toDo-${toDoId}`, 'modal', `project-${projectId}-toDo-${toDoId}`, projectTitle);
    const modalView = createModal(projectId, toDo, projectTitle, toDoId);
    title.innerHTML = toDo.title;
    dueDate.innerHTML = format(parseISO(toDo.dueDate), 'MMM-dd-yy');
    priority.innerHTML = toDo.priority;
    currentProject.append(toDoWrapper);
    toDoWrapper.append(title);
    toDoWrapper.append(dueDate);
    toDoWrapper.append(priority);
    toDoWrapper.append(deleteButton);
    toDoWrapper.append(modalButton);
    toDoWrapper.append(modalView);
  };

  const listProjects = (projectsArr) => {
    const projectsListContainer = document.getElementById('projects-container');

    projectsArr.forEach((project, index) => {
      renderProjects(project, projectsListContainer, index);
      project.toDoList.forEach((toDo, toDoId) => addToDoToProject(index, toDo, toDoId, project.title));
    });
  };

  const updateProjectView = (project, index) => {
    const projectsListContainer = document.getElementById('projects-container');
    renderProjects(project, projectsListContainer, index);
  };

  const updateProjectSelectList = (arrayProjects, id) => {
    const selectListContainer = document.getElementById(id);
    removeAllChildNodes(selectListContainer);
    arrayProjects.forEach((project) => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', project.title);
      optionElement.innerHTML = project.title;
      selectListContainer.append(optionElement);
    });
  };

  const addProjectToSelectList = (project) => {
    const selectListContainer = document.getElementById('projects');
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', project.title);
    optionElement.innerHTML = project.title;
    selectListContainer.append(optionElement);
  };

  const deleteProjects = () => {
    const projectsListContainer = document.getElementById('projects-container');
    const selectListContainer = document.getElementById('projects');
    removeAllChildNodes(projectsListContainer);
    removeAllChildNodes(selectListContainer);
  };

  const clearForm = (formId) => {
    const formElements = document.getElementById(`${formId}`).elements;

    for (let i = 0; i < formElements.length; i += 1) {
      const fieldType = formElements[i].type.toLowerCase();

      switch (fieldType) {
        case 'text':
        case 'date':
          formElements[i].value = '';
          break;
        case 'select-one':
          formElements[i].selectedIndex = 0;
          break;
        default:
          break;
      }
    }
  };

  return {
    listProjects,
    updateProjectView,
    updateProjectSelectList,
    addProjectToSelectList,
    addToDoToProject,
    deleteProjects,
    clearForm,
    showSaveBtn,
    showSaveBtnToDo,
    addCurrentProjectToSelectedList,
  };
})();

export default View;