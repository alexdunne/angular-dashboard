(function(angular) {
  angular
    .module('dashboardApp')
    .component('projectDashboard', {
      templateUrl: 'components/project-dashboard/dashboard.html',
      controller: ProjectsDashboardController,
    });

  ProjectsDashboardController.$inject = ['projectsService'];

  function ProjectsDashboardController(projectsService) {
    var vm = this;
    vm.projectList = projectsService.getProjectList();
    vm.getProjectData = getProjectData;
    vm.hideProject = hideProject;

    // Hook into the draggable events
    vm.onDropComplete = onDropComplete;
    vm.onDragStart = onDragStart;
    vm.onDragStop = onDragStop;

    function hideProject (id) {
      projectsService.hideProject(id);
    }

    function getProjectData(id) {
      return projectsService.getProject(id);
    }

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
  }
})(angular);