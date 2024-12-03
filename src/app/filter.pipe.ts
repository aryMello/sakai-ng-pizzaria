import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], status: string): any[] {
    return items.filter(item => item.status === status);
  }
}
