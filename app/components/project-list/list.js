(function(angular) {
  angular
    .module('dashboardApp')
    .component('projectList', {
      templateUrl: 'components/project-list/list.html',
      controller: ProjectListController,
    });

  ProjectListController.$inject = ['projectsService', 'socketService'];

  function ProjectListController(projectsService, socketService) {
    var vm = this;
    vm.projectList = projectsService.getProjectList();
    vm.getProjectData = getProjectData;
    vm.toggleProjectVisiblity = toggleProjectVisiblity;

    // Hook into the draggable events
    vm.onDropComplete = onDropComplete;
    vm.onDragStart = onDragStart;
    vm.onDragStop = onDragStop;

    var dragging = false;    

    function getProjectData(id) {
      return projectsService.getProject(id);
    }

    function toggleProjectVisiblity(id) {
      if (!dragging) {
        projectsService.toggleProjectVisiblity(id);

        socketService.emit('project:toggle-visiblility', { projectId: id });
      }
    }

    function onDragStart(id, event) {
      dragging = true;
    }

    function onDragStop(id, event) {
      dragging = false;
    }

    function onDropComplete(id, event, dropProjectId) {
      projectsService.moveProject(id, dropProjectId);

      socketService.emit('project:move', {
        toBeMovedId: id,
        toMoveToId: dropProjectId
      });
    }

    socketService.on('project:moved', function (data) { 
      projectsService.moveProject(data.toBeMovedId, data.toMoveToId);
    });

    socketService.on('project:toggle-visiblility', function (data) { 
      projectsService.toggleProjectVisiblity(data.projectId);
    });
  }

})(angular);