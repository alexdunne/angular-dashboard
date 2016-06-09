(function(angular) {
  angular
    .module('dashboardApp')
    .component('projectList', {
      templateUrl: 'app/components/project-list/list.html',
      controller: ProjectListController,
    });

  ProjectListController.$inject = ['projectsService'];

  function ProjectListController(projectsService) {
    var vm = this;
    vm.projectList = projectsService.getProjectList();
    vm.getProjectData = getProjectData;
    vm.toggleProjectVisiblity = toggleProjectVisiblity;

    // Hook into the draggable events
    vm.onDropComplete = onDropComplete;
    vm.onDragStart = onDragStart;
    vm.onDragStop = onDragStop;

    var dragging = false;

    function toggleProjectVisiblity(id) {
      if (!dragging) {
        projectsService.toggleProjectVisiblity(id);
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
    }

    function getProjectData(id) {
      return projectsService.getProject(id);
    }
  }

})(angular);