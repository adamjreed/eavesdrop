<!doctype html> 
<html lang="en"> 
    <head> 
        <meta charset="UTF-8"> 
        <title>99x Recent Tracks</title>

        <link rel="stylesheet" href="css/vendor.css">
        <script src="js/vendor.js"></script>

        <script src="js/controllers/latestCtrl.js"></script>
        <script src="js/services/latestService.js"></script>
        <script src="js/app.js"></script>
    </head>
    <body class="container" ng-app="playlistApp" ng-controller="latestController">
        <div class="col-md-8 col-md-offset-2">
    
            <div class="page-header">
                <h2>99x Recent Tracks</h2>
            </div>
            <div class="showing">
                <span>Show Last:</span>
                <select
                    ng-model="currentPeriod"
                    ng-change="changePeriod()"
                    ng-options="period.id as period.name for period in periods">
                </select>
            </div>
            <p class="text-center" ng-show="loading">Loading...</p>
            <ul class="comment" ng-hide="loading">
                <li ng-repeat="play in songs">{{play.song.name}} - {{play.song.artist.name}} - {{play.played_at | playTime}}</li>
            </ul>
        </div>
    </body>
</html>