import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { element } from 'protractor';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      resp => this.categories = resp,
      error => alert('Error to load categories list')
    );
  }

  deleteCategory(category: Category): void {
    const alertDel = confirm('You really want to delete?');

    if (alertDel) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(item => item !== category),
        () => alert('Error while deleting.')
      );
    }
  }

}
