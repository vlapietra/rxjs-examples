import { of, from } from 'rxjs'
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators'

callServiceWithResultFromPrevious();

function callServiceWithResultFromPrevious() {
    // This is a simple observables which return a single value just like an Angular HTTP service call
    let serviceA$ = of('A').pipe(take(1));


    // This observable returns the value passed to it, we're using it to mock an Angular HTTP service call
    let serviceB$ = (r:any) => of(r).pipe(take(1));


    // switchMap 'switches' the observable stream from the first call tto the second call
    // the result of the first call is available so it can then be passed to the second call
    // subscribe is called for the result of the second observable
    //
    // RESULT:
    //
    // Result of serviceA call: A
    // serviceB called with: A

    serviceA$
        .pipe(
            tap(rA => console.log('Result of serviceA call:', rA)),
            switchMap(rA => serviceB$(rA)),
            map(rB => `serviceB called with: ${rB}`)
        )
        .subscribe(r => console.log(r));
}