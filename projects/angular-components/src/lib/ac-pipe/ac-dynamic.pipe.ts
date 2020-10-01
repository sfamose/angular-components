import {InjectionToken, Injector, Pipe, PipeTransform, Type} from '@angular/core';

@Pipe({
  name: 'acDynamicPipe'
})
export class AcDynamicPipe implements PipeTransform {

  public constructor(private injector: Injector) {
  }

  transform(value: unknown, pipeToken: Type<PipeTransform> | string, ...args: unknown[]): unknown {
    if (!pipeToken) {
      return value;
    } else {
      const pipe = this.injector.get(pipeToken);
      return pipe.transform(value, ...args);
    }
  }

}
