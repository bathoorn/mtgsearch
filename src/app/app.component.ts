import { Component } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { Http, Response } from '@angular/http';
import { Facet } from './facet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchApiService]
})
export class AppComponent {
  title = 'mtgsearch';

  facets: Facet[] = [];
  results: Response;

    constructor(
      private searchApiService: SearchApiService
    ) {
    }
  
    public ngOnInit() {
      this.searchApiService
        .searchSolr()
        .subscribe(
          (res) => {
            this.results = res;
          }
        );
    }
  
    onAddTodo(todo) {
      this.todoDataService
        .addTodo(todo)
        .subscribe(
          (newTodo) => {
            this.todos = this.todos.concat(newTodo);
          }
        );
    }
  
    onToggleTodoComplete(todo) {
      this.todoDataService
        .toggleTodoComplete(todo)
        .subscribe(
          (updatedTodo) => {
            todo = updatedTodo;
          }
        );
    }
  
    onRemoveTodo(todo) {
      this.todoDataService
        .deleteTodoById(todo.id)
        .subscribe(
          (_) => {
            this.todos = this.todos.filter((t) => t.id !== todo.id);
          }
        );
    }
}
