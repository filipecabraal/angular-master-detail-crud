import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operator } from 'rxjs';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = [];
  submittedForm = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPagetitle();
  }

  /**
   * Method responsible for save which action will be taken on the form through the url parameters.
   */
  private setCurrentAction(): void {
    this.activatedRoute.snapshot.url[0].path === 'new' ? this.currentAction = 'new' : this.currentAction = 'edit';
  }

  /**
   * Method responsible for build the form.
   */
  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  /**
   * Method responsible for load the category will be bind on the form.
   */
  private loadCategory(): void {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id'))) // parseInt(params.get('id'), 10)
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        (error) => alert('Server error occurred.')
      );
    }
  }

  /**
   * Method responsible for load the page title on the page.
   */
  private setPagetitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'New category registration';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editing ${categoryName} category`;
    }
  }

}
