import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.scss']
})
export class AddusersComponent implements OnInit {

  public formMode: string = 'ADD';
  constructor() { }

  ngOnInit(): void {
  }



  onCancel(){

  }

  onSubmit() {
    
  }
}
