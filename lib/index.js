// TODO: play with Rx
// TODO: rules for resolve, reject, onNext, onError, onCompleted
// TODO: check .lift(null, fn)
// TODO: s/Success/Right, s/Failure/Left
// TODO: update readme with better install guide (amd, cjs, es6)

import Maybe, {Just, Nothing} from "./maybe";
import Either, {Success, Failure} from "./either";
import Future, {Resolve, Reject} from "./future";
import Observable from "./observable";
import * as Monad from "./monad";
import compose from "./compose";
import onetime from "./onetime";
import * as operators from "./operators";

export default {
	Maybe,
	Just,
	Nothing,
	Either,
	Success,
	Failure,
	Future,
	Resolve,
	Reject,
	Observable,
	Monad,
	utils: { compose, onetime, ...operators }
};
