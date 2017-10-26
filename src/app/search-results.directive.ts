import { environment } from 'environments/environment';
import { Directive } from '@angular/core';


@Directive({
  selector: '[appSearchResults]',
  scope: {
    displayField: '@',
    query: '@',
    results: '&'
  },
  restrict: 'E',
  controller: function ($scope, $http) {
    $scope.$watch('query', function () {
        $http({
            method: 'JSONP',
            url: environment.searchUrl,
            params: {
                'json.wrf': 'JSON_CALLBACK',
                    'q': $scope.query,
                    'wt': 'json'
            }
        })
            .success(function (data) {
            var docs = data.response.docs;
            $scope.results.docs = docs;

        }).error(function () {});
    });
  },
  template: '<mat-toolbar><mat-form-field><input matInput placeholder="Search" [formControl]="emailFormControl" ng-model="query" name="Search"></input><mat-icon>search</mat-icon></mat-form-field></mat-toolbar>' +
    '<h2>Search Results for {{query}}</h2>' +
    '<mat-card class="mtgcard" ng-repeat="doc in results.docs">' +
    '  <mat-card-header><mat-card-title>{{doc["name"]}}</mat-card-title></mat-card-header><mat-card-content>' +
    '  <p>{{doc["type"]}}</p>' +
    '  <p>{{doc["manacost"]}}</p></mat-card-content>' +
    '</mat-card>'
})
export class SearchResultsDirective {

  constructor() { }

}
