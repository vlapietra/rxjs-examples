import { of, from } from 'rxjs'
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators'

callServicesAndCombineResults();

function callServicesAndCombineResults() {
    // This is a simple observables which return a single value, in this case an array, just like an Angular HTTP service call
    let serviceA$ = of(['A','B','C']).pipe(take(1));


    // This observable returns the value passed to it prepended with 'b', we're using it to mock an Angular HTTP service call
    let serviceB$ = (r:any) => of(`b${r}`).pipe(take(1));


    // mergeMap uses from() to create a new observable from each value in the array from serviceA$
    // switchMap passes each new observable to serviceB$
    // map combines the result from serviceB$ with the parameter passed in from serviceA$
    // subscribe is called for each combined observable
    //
    // RESULT:
    //
    // Result of serviceA call: ['A','B','C']
    // { resultA: 'A', resultB: 'bA' }
    // { resultB: 'B', resultB: 'bB' }
    // { resultC: 'C', resultB: 'bC' }

    serviceA$
        .pipe(
            tap(rA => console.log('Result of serviceA call:', rA)),
            mergeMap(rA => from(rA)),
            switchMap(resultA =>
                // this must be wrapped in {} to create a closure around rA so it can be accessed in the serviceB$ map function
                {
                    return serviceB$(resultA).pipe(map(resultB => ({resultA, resultB})));
                }
            ),
        )
        .subscribe(r => console.log(r));
}