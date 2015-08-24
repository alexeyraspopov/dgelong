// TODO: check how stacktrace looks like
// TODO: play with Rx
// TODO: rules for resolve, reject, onNext, onError, onCompleted

import Maybe, {Just, Nothing} from "./maybe";
import Either, {Success, Failure} from "./either";
import Future, {Resolve, Reject} from "./future";
import Observable from "./observable";

export default { Maybe, Just, Nothing, Either, Success, Failure, Future, Resolve, Reject, Observable };
