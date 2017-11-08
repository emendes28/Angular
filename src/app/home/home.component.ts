import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('goals',[
      transition('* => *',[
        query(':enter', style({ opacity: 0}), {optional : true}),
        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({ opacity: 0, transform :'translateY(-75%)', offset: 0}),
            style({ opacity: .5, transform :'translateY(35px)', offset: .3}),
            style({ opacity: 1, transform :'translateY(0)', offset: 1}),
          ]))]), {optional : true}),
        query(':leave', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({ opacity: 1, transform :'translateY(0)', offset: 0}),
            style({ opacity: .5, transform :'translateY(35px)', offset: .3}),
            style({ opacity: 0, transform :'translateY(-75%)', offset: 1}),
          ]))]), {optional : true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  itemCount : number =4;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = ['My first life goal','Add an Item', 'row teste'];

  constructor(private _data:DataService) { }

  ngOnInit() {
    const self = this;
    self.itemCount = self.goals.length;
    self._data.goal.subscribe(res=>self.goals = res);
    self._data.changeGoal(self.goals);
  }


  addItem() {    
    const self = this;
    if(self.goalText != '' && self.goalText != 'Write an goal' ){
      self.goals.push(self.goalText);
      self.goalText = '';
      self.itemCount = self.goals.length;
      self._data.changeGoal(self.goals);
    } else {
      self.goalText = 'Write an goal';
    }
  }

  removeItem(i){
    const self = this;
    self.goals.splice(i,1);
    self.itemCount = self.goals.length;
    self._data.changeGoal(self.goals);
  }

}
