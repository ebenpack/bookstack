import * as React from "react";
import { Route } from "react-router-dom";

export const path = "/list";

export default () => (
    <Route
        path={path}
        component={React.lazy(() => import("./StackList"))}
        exact
    />
);
