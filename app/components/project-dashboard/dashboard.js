(function(angular) {
  angular
    .module('dashboardApp')
    .component('projectDashboard', {
      templateUrl: 'app/components/project-dashboard/dashboard.html',
      controller: ProjectsDashboardController,
    });

  ProjectsDashboardController.$inject = ['projectsService'];

  function ProjectsDashboardController(projectsService) {
    var vm = this;
    vm.projectList = projectsService.getProjectList();
    vm.getProjectData = getProjectData;
    vm.hideProject = hideProject;

    function hideProject (id) {
      projectsService.hideProject(id);
    }

    function getProjectData(id) {
      return projectsService.getProject(id);
    }
  }
})(angular);