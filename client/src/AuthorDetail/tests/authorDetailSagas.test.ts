import { sagaTest } from "../../utils/testUtils";
import { watchLoadAuthor } from "../authorDetailSagas";
import {
    AUTHOR_FAILURE,
    AUTHOR_SUCCESS,
    authorFailure,
    authorRequest,
    authorSuccess,
    initialState,
} from "../authorDetailModule";

describe("loadAuthor", () => {
    sagaTest(
        { addBookStore: initialState },
        watchLoadAuthor,
        {
            method: "GET",
            url: "http://foo.bar.baz/api/author/foobarbaz/",
        },
        { data: "foo" },
        authorRequest("foobarbaz"),
        authorSuccess("foo"),
        authorFailure("Error message"),
        AUTHOR_SUCCESS,
        AUTHOR_FAILURE
    );
});
