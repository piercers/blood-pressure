import { of } from "rxjs";
import { take } from "rxjs/operators";

export const uiStart = () => of({}).pipe(take(1));
