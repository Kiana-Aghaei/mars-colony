import { Component, OnInit } from '@angular/core';
import AliensService from '../services/aliens.service';
import EncountersService from '../services/encounters.service';
import { FormGroup, FormControl, FormBuilder, Validators,ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Alien, NewEncounter, Encounter } from '../models';
import { cantBe } from '../shared/validators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, EncountersService]
})
export class ReportComponent implements OnInit {

  aliensList: Alien[];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED= '(none)';

  constructor(private aliensService: AliensService,
              private encountersService: EncountersService,
              private router: Router){

                aliensService.getAliens().subscribe((aliens)=>{
                  this.aliensList = aliens;
                })
              }

  ngOnInit() {
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED,[cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.maxLength(450)])
    });
  }

private getDate(){
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()}`;
}

onSubmit(event) {
  event.preventDefault();
  const date = this.getDate();
  const atype = this.reportForm.get('atype').value;
  const action = this.reportForm.get('action').value;
  const colonist_id = localStorage.getItem('colonist_id');
  const encounter = new NewEncounter(date,colonist_id, atype, action );

  if (this.reportForm.valid) {
  this.encountersService.submitEncounter(encounter).subscribe((enc)=>{
    this.router.navigate(['/Encounters']);
    console.log('success');
  },(err)=>{
    console.log('error');
  });
}
}}