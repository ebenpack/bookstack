import { sagaTest } from "../../utils/testUtils";
import { watchLoadStacklist } from "../stackListSagas";
import {
    initialState,
    STACK_FAILURE,
    STACK_SUCCESS,
    stackFailure,
    stackRequest,
    stackSuccess,
} from "../stackListModule";

describe("loadStacklist", () => {
    sagaTest(
        { addBookStore: initialState },
        watchLoadStacklist,
        {
            url: "http://foo.bar.baz/api/stack/",
            method: "GET",
        },
        { data: "foo" },
        stackRequest("foobarbaz"),
        stackSuccess("foo"),
        stackFailure("Error message"),
        STACK_SUCCESS,
        STACK_FAILURE
    );
});
