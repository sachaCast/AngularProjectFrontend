import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  //backendURL = 'http://localhost:8010/api/assignments'
  backendURL =  'https://angularprojectbackend-4e78.onrender.com/api/assignments'
  /*assignments:Assignment[] = [
    {
      id:1,
      name: "Assignment 1",
      dueDate: new Date("2021-01-01"),
      submitted: true
    },
    {
      id:2,
      name: "Assignment 2",
      dueDate: new Date("2021-02-01"),
      submitted: true
    },
    {
      id:3,
      name: "Assignment 3",
      dueDate: new Date("2021-03-01"),
      submitted: false
    }
  ];*/

  constructor(private loggingService:LoggingService,
    private Http:HttpClient) { }

  getAssignments():Observable<Assignment[]> {
    return this.Http.get<any>(this.backendURL);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    //const a:Assignment|undefined = this.assignments.find( a => a.id == id);
    //return of(a);
    return this.Http.get<Assignment>(this.backendURL+"/"+id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    /*this.assignments.push(assignment);
    this.loggingService.log(assignment.name, "ajouté");

    return of('Assignment ajouté');*/
    return this.Http.post<Assignment>(this.backendURL, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {

    //return of('Assignment service: assignment modifié');
    return this.Http.put<Assignment>(this.backendURL, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    return of("assignmnt service: assignment supprimé");*/
    return this.Http.delete<Assignment>(this.backendURL + "/" + assignment.id);
  }

}
