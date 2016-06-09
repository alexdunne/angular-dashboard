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
    vm.projects = projectsService.getProjects();
    vm.toggleProjectVisiblity = toggleProjectVisiblity;

    function toggleProjectVisiblity(id) {
      projectsService.toggleProjectVisiblity(id)
    }
  }

})(angular);