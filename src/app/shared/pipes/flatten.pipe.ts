import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { isArray, isDeepObject, unwrapDeep, flatten } from '../utils';

@Pipe({ name: 'flatten' })
export class FlattenPipe implements PipeTransform {
  transform(input: any): any {
    const isDeep = isDeepObject(input);
    if (!isArray(input) && !isDeep) {
      return input;
    }

    if (isDeep) {
      const unwrapped = unwrapDeep(input);
      if (!isArray(unwrapped)) {
        return unwrapped;
      }

      return flatten(unwrapped, 0);
    }

    return [].concat.apply([], input);
  }
}

@NgModule({
  declarations: [FlattenPipe],
  exports: [FlattenPipe],
})
export class NgFlattenPipeModule {}
