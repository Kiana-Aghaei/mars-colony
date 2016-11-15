import { Component, OnInit } from '@angular/core';
class Apple {
    constructor(
      public name: string,
      public color: string
    ){}
  }
@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css']
})
export class ListTestComponent implements OnInit {
  appleList: [Apple];
  apple: Apple;

  constructor() {
    this.apple = {name:'', color:''};
    this.appleList = [
      { name: 'Granny Smith', color: 'Green'},
      { name: 'Delicious', color: 'Deep Red'},
      { name: 'Candy', color: 'Blue'}
    ];
  }
  addApple() {
    this.appleList.push(this.apple);
    this.apple = { name:'', color:''};
  }

  renderAppleForm(appleForm){
    console.log (appleForm);
  }

  ngOnInit() {
  }
}
