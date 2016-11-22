import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,ValidatorFn, AbstractControl } from '@angular/forms';
import { Colonist, NewColonist, Job } from '../models';
import  JobsService from '../services/jobs.service';
import { Router } from '@angular/router';
import ColonistsService from '../services/colonist.service'
import { cantBe } from '../shared/validators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[JobsService, ColonistsService]
})
export class RegisterComponent implements OnInit {

colonist: NewColonist;
marsJobs: Job[];
marsColonist: Colonist;
registerForm: FormGroup;

NO_JOB_SELECTED = '(none)';


  constructor(jobService: JobsService,
              private colonistsService: ColonistsService,
              private router: Router,
              ) {


    jobService.getJobs().subscribe((jobs) => {
    this.marsJobs = jobs;
    });
  }


  ngOnInit() {
  this.registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    age: new FormControl('', [Validators.required]),
    job_id: new FormControl('(none)', [cantBe(this.NO_JOB_SELECTED)])
  });
}

onSubmit(event) {
  event.preventDefault();
    const name = this.registerForm.get('name').value;
    const age = this.registerForm.get('age').value;
    const job_id = this.registerForm.get('job_id').value;
    const colonist = new NewColonist(name, age, job_id);

    if (this.registerForm.valid){
      this.colonistsService.submitColonist(colonist).subscribe(
        (colonist)=> {
          localStorage.setItem('colonist_id', JSON.stringify(colonist.id));
          this.router.navigate(['/Encounters']);
          
    }, (err)=> {
      console.log(err);
    });

  }
 }
}