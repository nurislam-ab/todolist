import { format, parseISO } from 'date-fns';

const View = (() => {
  const viewBtnSvg = '<svg enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M255.991,206.416c-26.52,0-48.092,21.57-48.092,48.08c0,26.532,21.572,48.12,48.092,48.12  c26.535,0,48.121-21.588,48.121-48.12C304.112,227.986,282.526,206.416,255.991,206.416 M255.991,117.315  C128.445,117.315,0,256.001,0,256.001s128.445,138.684,255.991,138.684C383.554,394.685,512,256.001,512,256.001  S383.554,117.315,255.991,117.315 M255.991,352.665c-54.2,0-98.142-43.899-98.142-98.169c0-54.2,43.942-98.128,98.142-98.128  c54.228,0,98.17,43.928,98.17,98.128C354.161,308.766,310.219,352.665,255.991,352.665"/></svg>';
  const deleteBtnSvg = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="482.428px" height="482.429px" viewBox="0 0 482.428 482.429" style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve">
<g><g><path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
     c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
     h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
     C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
     C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
     c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
     c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
     V115.744z"/>
   <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
     c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
   <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
     c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
   <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
     c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
 </g></g></svg>`;
  const buttonComponent = (string, onclick) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = string;
    deleteButton.setAttribute('onclick', onclick);
    deleteButton.classList.add('btn', 'project-btns');
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
    button.classList.add('project-btns');
    return button;
  };

  const getRandomColors = () => {
    const colorsArr = ['rgb(44, 84, 107)', 'rgb(54, 64, 228)', 'rgb(1, 161, 193)', 'rgb(84, 102, 244)', 'rgb(203, 65, 17)', 'rgb(130, 63, 118)', 'rgb(184, 101, 119)', 'rgb(106, 26, 135)', 'rgb(204, 55, 59)', 'rgb(47 151 128)', 'rgb(64 136 73)', 'rgb(212, 53, 67)'];
    const color = Math.floor(Math.random() * colorsArr.length);
    return colorsArr[color];
  };

  const renderProjects = (project, parentElement, id) => {
    const projectWrapper = document.createElement('div');
    const projectInfo = document.createElement('div');
    const toDosContainer = document.createElement('div');
    const projectButtonsWrapper = document.createElement('div');
    toDosContainer.id = `todos-container-${id}`;
    toDosContainer.classList.add('todos-container');
    projectWrapper.id = id;
    projectWrapper.classList.add('project-wrapper');
    projectInfo.classList.add('project-info');
    projectButtonsWrapper.classList.add('project-buttons');
    const projectTitle = document.createElement('h2');
    projectTitle.setAttribute('onfocus', `onProjectTitleClick(${id})`);
    projectTitle.setAttribute('contenteditable', true);
    projectTitle.id = `project-title-${id}`;
    projectTitle.style.backgroundColor = getRandomColors();

    const updateProjectBtn = buttonComponent('Save', `onProjectClickSave(${id})`);
    updateProjectBtn.classList.toggle('d-none');
    updateProjectBtn.classList.add('save-btn');
    updateProjectBtn.id = `project-${id}`;

    const deleteButton = buttonComponent(`${deleteBtnSvg}`, `deleteProject(${id})`);
    deleteButton.classList.add('delete-btn');
    projectTitle.innerHTML = project.title;
    projectButtonsWrapper.append(updateProjectBtn);
    projectButtonsWrapper.append(deleteButton);
    projectInfo.append(projectTitle);
    projectInfo.append(projectButtonsWrapper);
    projectWrapper.append(projectInfo);
    projectWrapper.append(toDosContainer);
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
    modal.setAttribute('class', 'modal fade todo-form-modal');
    modal.id = id;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `<div class='modal-dialog' role='document'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title'>View todo</h5>
        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div class='modal-body'>
        <form id='todo-form' class='todo-form' method='post'>
          <h2 id='${id}-modal-title' contentEditable=true>${toDo.title}</h5>
          
            <div class='todo-extra-info'>
              <div class='todo-info-block'>
                <label for='priorities'>Priority</label>
                <select id='${id}-modal-priority' name='priorities' required>
                  <option value='' disabled selected hidden>${toDo.priority}</option>
                  <option value='Low'>Low</option>
                  <option value='High'>High</option>
                </select>
              </div>
  
              <div class='todo-info-block'>
                <label for='due-date'>Due date</label>
                <input type='date' name='due-date' id='${id}-modal-date' value='${toDo.dueDate}' required/>
              </div>
              
              <div class='todo-info-block'>
                <label for='projects'>Project</label>
                <select id='${id}-modal-project' required>${projectTitle}</select>
              </div>
            </div>
      
            <label for='description'>Description</label>
            <textarea name='description' id='${id}-modal-description' placeholder='Add a more detailed description' required>${toDo.description}</textarea>
        </form>
      </div>
      <div class='modal-footer'>
        <button type='submit' class='add-todo-btn' data-dismiss='modal' onclick="updateToDo('${id}', '${projectId}', '${toDoId}')">Save</button>
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

  const changePriorityBackgroundColor = (priority, htmlElement) => {
    if (priority === 'High') {
      htmlElement.classList.toggle('high-priority');
    } else {
      htmlElement.classList.toggle('low-priority');
    }
  };

  const addToDoToProject = (projectId, toDo, toDoId, projectTitle) => {
    const currentProject = document.getElementById(`todos-container-${projectId}`);
    const toDoWrapper = document.createElement('div');
    toDoWrapper.classList.add('todo-wrapper');

    const toDoHeader = document.createElement('div');
    toDoHeader.classList.add('todo-header');

    const toDoTitle = document.createElement('div');
    toDoTitle.classList.add('todo-title-wrapper');

    const toDoButtonsWrapper = document.createElement('div');
    toDoButtonsWrapper.classList.add('todo-buttons');

    const toDoPreviewContent = document.createElement('div');
    toDoPreviewContent.classList.add('todo-preview-content');

    const title = document.createElement('h3');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
    const deleteButton = buttonComponent(`${deleteBtnSvg}`, `deleteToDo(${projectId}, ${toDoId})`);
    const modalButton = buttonForModal(`${viewBtnSvg}`, `#project-${projectId}-toDo-${toDoId}`, 'modal', `project-${projectId}-toDo-${toDoId}`, projectTitle);
    const modalView = createModal(projectId, toDo, projectTitle, toDoId);
    title.innerHTML = toDo.title;
    dueDate.innerHTML = format(parseISO(toDo.dueDate), 'MMM-dd-yy');
    priority.innerHTML = toDo.priority;
    changePriorityBackgroundColor(toDo.priority, priority);
    deleteButton.classList.add('delete-btn');
    modalButton.classList.add('view-btn');
    currentProject.append(toDoWrapper);
    toDoTitle.append(title);
    toDoPreviewContent.append(dueDate);
    toDoButtonsWrapper.append(deleteButton);
    toDoButtonsWrapper.append(modalButton);
    toDoHeader.append(priority);
    toDoHeader.append(toDoButtonsWrapper);
    toDoWrapper.append(toDoHeader);
    toDoWrapper.append(toDoTitle);
    toDoWrapper.append(toDoPreviewContent);
    toDoWrapper.append(modalView);
  };

  const showToDoShortForm = (index) => {
    const element = document.getElementById(`todo-short-form-${index}`);
    element.classList.toggle('hidden');
    element.classList.add('todo-short-form');
  };

  const renderAddToDoBtn = (project, index) => {
    const parentWrapper = document.querySelectorAll('.project-wrapper');
    const toDosWrapper = document.getElementById(`todos-container-${index}`);
    const toDoAddWrapper = document.createElement('div');
    const openToDoForm = buttonComponent('+ Add another todo', `showToDoForm(${index})`);
    const toDoForm = document.createElement('form');
    const toDoTitle = document.createElement('textarea');
    const selectedProject = document.createElement('input');
    const addToDoBtn = buttonComponent('Add todo', `addToDoFromShortFrom(${index})`);
    toDoForm.id = `todo-short-form-${index}`;
    toDoTitle.setAttribute('name', 'title');
    toDoTitle.setAttribute('placeholder', 'Enter a title for this todo...');
    toDoTitle.classList.add('input-fields');
    toDoTitle.id = `title-${index}`;
    selectedProject.setAttribute('type', 'hidden');
    selectedProject.setAttribute('value', project.title);
    selectedProject.innerHTML = project.title;
    selectedProject.id = `hidden-project-${index}`;
    addToDoBtn.classList.add('add-todo-btn');
    toDoForm.append(selectedProject);
    toDoForm.append(toDoTitle);
    toDoForm.append(addToDoBtn);
    toDoForm.classList.add('hidden');
    toDoAddWrapper.classList.add('todo-add-wrapper');
    toDosWrapper.append(toDoForm);

    parentWrapper.forEach((wrapper) => {
      toDoAddWrapper.append(openToDoForm);
      wrapper.append(toDoAddWrapper);
    });
  };

  const listProjects = (projectsArr) => {
    const projectsListContainer = document.getElementById('projects-container');

    projectsArr.forEach((project, index) => {
      renderProjects(project, projectsListContainer, index);
      project.toDoList.forEach((toDo, toDoId) => {
        addToDoToProject(index,
          toDo,
          toDoId,
          project.title);
      });
      renderAddToDoBtn(project, index);
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
        case 'textarea':
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

  const showProjectForm = () => {
    document.getElementById('project-form').classList.toggle('d-none');
    document.getElementById('add-project-btn').classList.toggle('d-none');
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
    showToDoShortForm,
    showProjectForm,
  };
})();

export default View;