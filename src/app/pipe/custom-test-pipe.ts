import { Pipe, PipeTransform } from '@angular/core';
import * as m from 'moment';

@Pipe({ name: 'custom' })
export class CustomPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} - custom in pipe`;
  }
}

@Pipe({ name: 'square' })
export class SquarePipe implements PipeTransform {

  transform(value: number): number {
    return value * value;
  }
}

@Pipe({ name: 'power' })
export class PowerPipe implements PipeTransform {

  transform(value: number, exponent: number = 1): number {
    return Math.pow(value, exponent);
  }

} 

@Pipe({ name: 'userFullName' })
export class FullNamePipe implements PipeTransform {
  transform(firstName: string, ...names: string[]): string {
    return [ firstName, ...names].join(" ");
  }
}

@Pipe({ name: 'json' })
export class JsonPipe implements PipeTransform {
  transform(value: any, spacing: number = 4): string {
    if (typeof value === 'object')
      return JSON.stringify(value, null, spacing);
    else // primitive type  
      return value?.toString() || '';
  }
}

@Pipe({ name: 'mydate' })
export class DatePipe implements PipeTransform {
  transform(value: any, outFormat: string = 'MMM DD - YYYY'): string {
    try {
      let m_out: m.Moment;
      const dat1 = new Date(value);
      if (dat1.toString() === 'Invalid Date')
        m_out = m.utc(value, 'DD/MM/YYYY HH:mm:ss');
      else   
        m_out = m.utc(dat1);
      return m_out.local().format(outFormat);
    }
    catch(ex) {
      return '';
    } 
  } 
}
