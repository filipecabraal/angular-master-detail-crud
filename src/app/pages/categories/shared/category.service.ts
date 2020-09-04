import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = 'api/categories';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Responsible method of transforming the return of the service into a list of categories.
   * @param jsonData Array coming from the server.
   * @returns Categories list.
   */
  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];

    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  /**
   * Responsible method of transforming the return of the service into an category.
   * @param jsonData Array coming from the server.
   * @returns Category.
   */
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  /**
   * Method responsible for handling request errors.
   * @param error Error that will be handled.
   * @returns An error.
   */
  private handleError(error: any): Observable<any> {
    console.log('Error in requisition: ', error);

    return throwError(error);
  }

  /**
   * Method responsible for get all categories.
   * @returns A catories list.
   */
  getAll(): Observable<Category[]> {

    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToCategories),
      catchError(this.handleError)
    );
  }

  /**
   * Method responsible for get a category.
   * @param id The unique identifier of category.
   * @returns A category by your id.
   */
  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToCategory),
      catchError(this.handleError)
    );
  }

  /**
   * Method responsible for create a new category.
   * @param category The category that will be created.
   * @returns A category create.
   */
  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      map(this.jsonDataToCategory),
      catchError(this.handleError)
    );
  }

  /**
   * Method responsible for update a category.
   * @param category The category that will be updated.
   * @returns A category update.
   */
  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    return this.http.put(url, category).pipe(
      map(() => category),
      catchError(this.handleError)
    );
  }

  /**
   * Method responsible for update a category.
   * @param id The unique identifier of category that will be deleted.
   * @returns Null.
   */
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }
}
