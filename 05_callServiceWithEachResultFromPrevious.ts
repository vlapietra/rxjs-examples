import { of, from } from 'rxjs'
import { concatMap, delay, map, mergeMap, switchMap, take, tap } from 'rxjs/operators'

callServiceWithEachResultFromPrevious();

function callServiceWithEachResultFromPrevious() {
    let getRandomDelay = (max:number) => Math.floor(Math.random() * Math.floor(max))*1000;

    // This is a simple observables which return a single value, in this case an array of numbers, just like an Angular HTTP service call
    let serviceA$ = of([1,2,3]).pipe(take(1));

    // This observable returns the value passed to it, we're using it to mock an Angular HTTP service call with a delayed response
    let serviceB$ = (r:any) => of(r).pipe(take(1), delay(getRandomDelay(3)));

    // mergeMap uses from() to create a new observable from each value in the array from serviceA$
    // concatMap processes each new observable in order once the previous completes
    // subscribe is called for each new observable
    //
    // RESULT:
    //
    // Result of serviceA call: [1,2,3]
    // serviceB called with: 1
    // serviceB called with: 2
    // serviceB called with: 3

    serviceA$
        .pipe(
            tap(rA => console.log('Result of serviceA call:', rA)),
            mergeMap(rA => from(rA)),
            /*
            ** UNCOMMENT FOR SEQUENTIAL PROCESSING
            ** concatMap processes each observable sequentially
            ** so the delay doesn't matter, they will always be returned in order
            */
            concatMap(r => serviceB$(r)),

            /*
            ** UNCOMMENT FOR PARALLEL PROCESSING
            ** mergeMap processes all observables in parallel
            ** so the order in which they are returned will be random based on the delay
            */
           //mergeMap(r => serviceB$(r)),

           map(rB => `serviceB called with: ${rB}`)
        )
        .subscribe(r => console.log(r));
}