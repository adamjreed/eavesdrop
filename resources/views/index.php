<!doctype html> 
<html lang="en"> 
    <head> 
        <meta charset="UTF-8"> 
        <title>99x Recent Tracks</title>

        <link rel="stylesheet" href="css/vendor.css">
        <script src="js/vendor.js"></script>

        <script src="js/controllers/mainCtrl.js"></script>
        <script src="js/services/playlistService.js"></script>
        <script src="js/app.js"></script>
    </head>
    <body class="container" ng-app="playlistApp" ng-controller="mainController">
        <div class="col-md-8 col-md-offset-2">
    
            <div class="page-header">
                <h2>99x Recent Tracks</h2>
            </div>
            <p class="text-center" ng-show="loading">Loading...</p>
            <ul class="comment" ng-hide="loading" ng-repeat="play in songs">
                <li>{{play.song.name}} - {{play.song.artist.name}} - {{play.played_at | playTime}}</li>
            </ul>
        </div>
    </body>
</html>