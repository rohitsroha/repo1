var app = angular.module("myapp", []); 
app.controller("myCtrl", function($scope,$http) {
	
	// to get all posts
    $http.get("https://jsonplaceholder.typicode.com/posts")
    .then(function(response) {
        $scope.posts = response.data;
    });
	
    $scope.comments  = new Array();
    
	//to fetch comments based on post id
    $scope.getComments = function (p_id) {

        $http.get("https://jsonplaceholder.typicode.com/posts/"+p_id+"/comments")
        .then(function(response) {
                $scope.comments[p_id] = response.data;;

    });
	
    }    
	
	//to add new post
	// as i am using https://jsonplaceholder.typicode.com/ as fake api for adding new posts, the resource will not be really created on the server
    $scope.addPost = function () {
      var p_title= $scope.p_title;
      var p_body= $scope.p_body;
        
		$http({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: "POST",
        data: { 'title' : $scope.p_title, 'body' : $scope.p_body, 'userId':$scope.p_userid  }
        })
        .then(function(response) {
               $scope.p_title="";
               $scope.p_body="";
			   
			   var postsDiv = angular.element( document.querySelector( '#posts' ) );
                postsDiv.prepend('<ul><li style="font-weight:bold;">'+p_title+'</li><li>'+p_body+'</li></ul>');
        });
	
    }    
	
	//to add comment
	// as i am using https://jsonplaceholder.typicode.com/ as fake api for adding new comments, the resource will not be really created on the server

    $scope.addComment = function (p_id) {


		$http({
        url: 'https://jsonplaceholder.typicode.com/posts/1/comments',
        method: "POST",
        data: { 'name' : $scope.c_name, 'email' : $scope.c_email, 'body' : $scope.c_comment, 'postId':p_id  }
        })
        .then(function(response) {
               $scope.c_name="";
               $scope.c_email="";
               $scope.c_comment="";
			   
        });
	
    }    
   
   $scope.names = [{family: "asdf", first: "test"}, {family: "qwerty", first: "test2"}]
});

// Camel case filter
app.filter( 'camelCase', function ()
             {
                 var camelCaseFilter = function ( input )
                 {
                     var words = input.split( ' ' );
                     for ( var i = 0, len = words.length; i < len; i++ )
                         words[i] = words[i].charAt( 0 ).toUpperCase() + words[i].slice( 1 );
                     return words.join( ' ' );
                 };
                 return camelCaseFilter;
             } )


// here i am using a component 'comments' to display comments
app.component('comments', {
    bindings: {
      data: '=?'
    },
    templateUrl: 'comments.html',
    controllerAs: 'vm',
    controller: function() {
      var vm = this;
      vm.toggle = function() {
        vm.data.flagged = !vm.data.flagged;
      }
    }
  });