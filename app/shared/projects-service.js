(function(angular) {
  angular
    .module('dashboardApp')
    .factory('projectsService', projectsService);

  function projectsService() {
    // Store the project data foreach project
    var projectsData = {
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
        isVisible: true
      }
    };

    // Store the order of the projects
    var projectList = [1, 6];

    var service = {
      getProjectList: getProjectList,
      getProject: getProject,
      toggleProjectVisiblity: toggleProjectVisiblity,
      showProject: showProject,
      hideProject: hideProject,
      moveProject: moveProject,
    };

    return service;

    function getProjectList() {
      return projectList;
    }

    function getProject(id) {
      return projectsData[id];
    }

    function toggleProjectVisiblity(id) {
      if (projectExists(id)) {
        var project = projectsData[id];
        project.isVisible = !project.isVisible;

      }
    }

    function showProject(id) {
      if (projectExists(id)) {
        projectsData[id].isVisible = true;
      }
    }

    function hideProject(id) {
      if (projectExists(id)) {
        projectsData[id].isVisible = false;
      }
    }

    function moveProject(toBeMovedId, toMoveToId) {
      // Insert the project after the one it has been moved to
      removeProject(toBeMovedId);
      insertProject(toBeMovedId, toMoveToId);
    }

    // Private methods
    function projectExists(id) {
      return projectList.indexOf(id) !== -1 && id in projectsData;
    }

    function insertProject(toBeMovedId, insertAfterId) {
      var index = projectList.indexOf(insertAfterId) + 1;
      projectList.splice(index, 0, toBeMovedId);
    }

    function removeProject(id) {
      var index = projectList.indexOf(id);
      projectList.splice(index, 1);
    }  
  }

})(angular);