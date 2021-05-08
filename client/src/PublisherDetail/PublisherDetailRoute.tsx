import * as React from "react";
import { Route } from "react-router-dom";

export const path = "/publisher/:id";

export const makePublisherDetailPath = (id: string | number) =>
    path.replace(":id", id.toString());

export default () => (
    <Route
        path={path}
        component={React.lazy(() => import("./PublisherDetail"))}
        exact
    />
);
