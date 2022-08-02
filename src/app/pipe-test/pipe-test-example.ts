import { Component } from '@angular/core';

@Component({
  selector: 'pipe-test-example',
  template: `
    <div>
      <h2>Pipe Example</h2>
      <p> {{ title | custom }} </p>
      <p> {{ 4 | square}} </p>
      <p> {{ 10 | power:2 }} </p>
      <p>{{ "Test" | userFullName : "Name 1": "Name 2" : "Name 3" }}</p> 
      <p>{{ 12 | json : 4 }}</p> 
      <p>{{ date1 | mydate: 'YYYY-MM-DDThh:mm:ss A' }}
    </div>
  `,
})

export class PipeTestExampleComponent {
    title: string = '';
    obj = { one: 1, two: "2" };
    date1 = '31/12/2022 12:20:20';
    constructor() {}
}