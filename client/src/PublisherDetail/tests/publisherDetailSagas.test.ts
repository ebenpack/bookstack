import { sagaTest } from "../../utils/testUtils";
import { watchLoadPublisher } from "../publisherDetailSagas";
import {
    initialState,
    PUBLISHER_FAILURE,
    PUBLISHER_SUCCESS,
    publisherFailure,
    publisherRequest,
    publisherSuccess,
} from "../publisherDetailModule";

describe("loadPublisher", () => {
    sagaTest(
        { addBookStore: initialState },
        watchLoadPublisher,
        {
            method: "GET",
            url: "http://foo.bar.baz/api/publisher/foobarbaz/",
        },
        { data: "foo" },
        publisherRequest("foobarbaz"),
        publisherSuccess("foo"),
        publisherFailure("Error message"),
        PUBLISHER_SUCCESS,
        PUBLISHER_FAILURE
    );
});
