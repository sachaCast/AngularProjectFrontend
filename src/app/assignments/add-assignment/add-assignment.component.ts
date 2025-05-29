import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { SubjectsService, Subject } from '../../shared/subjects.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-assignment',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.subjectsService.getSubjects().subscribe(data => {
      this.subjects = data;
    });

    this.assignmentsService.getAssignments().subscribe(assignments => {
      this.allAssignments = assignments;
    });
  }

  assignmentName = "";
  assignmentDueDate!: Date;
  assignmentAuthor = "";
  assignmentGrade = "";
  assignmentNote = "";
  subjects: Subject[] = [];
  selectedSubject: any = null;
  allAssignments: Assignment[] = [];

  addAssignment() {
    const newAssignment = new Assignment();

    const maxId = this.allAssignments.reduce((max, a) => a.id > max ? a.id : max, 0);
    newAssignment.id = maxId + 1;

    newAssignment.name = this.assignmentName;
    newAssignment.dueDate = this.assignmentDueDate;
    newAssignment.submitted = false;
    newAssignment.author = this.assignmentAuthor;
    newAssignment.grade = this.assignmentGrade;
    newAssignment.note = this.assignmentNote;
    newAssignment.subject = this.selectedSubject.subject;
    newAssignment.teacher = this.selectedSubject.teacher;

    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}
