import * as React from "react";
import { Route } from "react-router-dom";

export const path = "/list/:id";

export const makeStackDetailPath = (id: number) =>
    path.replace(":id", String(id));

export default () => (
    <Route
        path={path}
        component={React.lazy(() => import("./StackDetail"))}
        exact
    />
);
