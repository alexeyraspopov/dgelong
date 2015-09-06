// TODO: play with Rx
// TODO: rules for resolve, reject, onNext, onError, onCompleted
// TODO: check .lift(null, fn)

import Maybe, {Just, Nothing} from "./maybe";
import Either, {Right, Left} from "./either";
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
	Right,
	Left,
	Future,
	Resolve,
	Reject,
	Observable,
	Monad,
	utils: { compose, onetime, ...operators }
};
