import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, RouterLink, RouterOutlet],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  //@Input()
  assignmentTransmis!: Assignment;

  /*name!: string;
  dueDate!: Date;
  submitted!: boolean;*/

  constructor(private assignmentService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(){
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onAssignmentRendu(){
    this.assignmentTransmis.submitted = true;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message),
        this.router.navigate(["/home"]);
      });

    //this.router.navigate(["/home"]);
  }

  onDelete() {
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(["/home"]);
      });

      //this.assignmentTransmis = null;
      //this.router.navigate(["/home"]);
  }

  onClickEdit(){
    this.router.navigate(["assignment", this.assignmentTransmis.id,'edit'],
      {queryParams:{nom:this.assignmentTransmis.name}, fragment:'edition'});
  }

  isAdmin():boolean {
    return this.authService.loggedIn;
  }

isGradeValid(): boolean {
  const gradeStr = this.assignmentTransmis.grade;
  if (!gradeStr || gradeStr.trim() === '') return false;
  const grade = +gradeStr;
  return !isNaN(grade) && grade >= 0 && grade <= 20;
}



}
