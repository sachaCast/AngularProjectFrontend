import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/not-submitted.directive';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AssignmentDetailComponent } from "./assignment-detail/assignment-detail.component";
import { Assignment } from './assignment.model';
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";
import { AssignmentsService } from '../shared/assignments.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    SubmittedDirective,
    NotSubmittedDirective,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    AssignmentDetailComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  providers: [provideNativeDateAdapter()]
})
export class AssignmentsComponent implements OnInit {

  title = "This is the list of assignments :";
  formVisible = false;
  assignmentSelectionne: Assignment = new Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe(assignments => this.assignments = assignments);
  }

  getColor(a: any) {
    return a.submitted ? 'lightgreen' : 'lightcoral';
  }

  onAddAssignmentBtnClick() {
    // Возможность показать форму вручную
  }

  assignmentClique(assignment: any) {
    this.assignmentSelectionne = assignment;
  }
  onDelete(assignment: Assignment) {
  if (confirm(`Are you sure you want to delete "${assignment.name}"?`)) {
    this.assignmentService.deleteAssignment(assignment)
      .subscribe({
        next: () => {
          console.log(`Deleted: ${assignment.name}`);
          this.assignments = this.assignments.filter(a => a.id !== assignment.id);
        },
        error: (error) => {
          console.error("Deletion failed:", error);
        }
      });
  }
  }
}
