import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';


const notNone = (value) => {
  return value === '(none)' ? false : true;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[JobsService]
})
export class RegisterComponent implements OnInit {

  marsJobs: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';

  constructor(jobService: JobsService) {

    jobService.getJobs().subscribe((jobs) => {
      this.marsJobs = jobs;

    }, (err) => {
      console.log(err);
    });
   }

  ngOnInit() {
  this.registerForm = new FormGroup ({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    job_id: new FormControl(this.NO_JOB_SELECTED, [Validators.required])
  });
}
 ngSubmit(event, registerForm){
  event.proventDefault();
  console.log('The Form is invalid', this.registerForm.invalid);
  if(this.registerForm.invalid) {

  } else {
    const name = this.registerForm.get('name').value;
    const age = this.registerForm.get('age').value;
    const job_id = this.registerForm.get('job_id').value;
    console.log('ok, let\'s register this new colonist:', new NewColonust(name, age, job-id));

  }
}


}
