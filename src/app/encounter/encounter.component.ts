
import { Component, OnInit } from '@angular/core';
import EncountersService from '../services/encounters.service';
import {Encounter} from '../models';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
  providers: [EncountersService]
})

export class EncountersComponent implements OnInit {

  marsEncounters: Encounter[];

  constructor(encounterService: EncountersService) { 

    encounterService.getEncounters().subscribe((encounters)=>{
      this.marsEncounters = encounters.sort((a, b) => {
                                     return b.id - a.id;
                                     })
                                     .splice(0,100);
                              }, (err) => {
                                  console.log(err);
   });
  }
  ngOnInit() {
  }

}
