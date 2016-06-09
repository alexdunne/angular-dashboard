(function(angular) {
  angular
    .module('dashboardApp')
    .factory('projectsService', projectsService);


  function projectsService() {
    var projects = {
      1: {
        id: 1,
        title: 'Moon setup',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque, dolor eget dictum laoreet, mi velit pulvinar purus, pharetra hendrerit nulla neque sit amet turpis. Phasellus semper libero eu lectus tincidunt, pretium pulvinar mi fringilla. Curabitur efficitur aliquet nulla, vitae ultricies est fermentum tincidunt. Nullam vitae consectetur nulla. Curabitur vitae.',
        isVisible: true
      },
      6: {
        id: 6,
        title: 'Mars servicing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo molestie turpis ac luctus. Aliquam malesuada sollicitudin felis, sed iaculis felis posuere non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut ut leo purus. Nullam feugiat augue a neque luctus sollicitudin. Maecenas in pretium.',
        isVisible: false
      }
    };

    var service = {
      getProjects: getProjects,
      toggleProjectVisiblity: toggleProjectVisiblity,
      showProject: showProject,
      hideProject: hideProject,
    };

    return service;

    function getProjects() {
      return projects;
    }

    function toggleProjectVisiblity(id) {
      if (projectExists(id)) {
        var project = projects[id];
        project.isVisible = !project.isVisible;

      }
    }

    function showProject(id) {
      if (projectExists(id)) {
        projects[id].isVisible = true;
      }
    }

    function hideProject(id) {
      if (projectExists(id)) {
        projects[id].isVisible = false;
      }
    }

    // Private methods
    function projectExists(id) {
      return id in projects;
    }
  }

})(angular);