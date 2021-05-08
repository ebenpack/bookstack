import { Link } from "react-router-dom";

import { IStack } from "./types";
import { makeStackDetailPath } from "../StackDetail/StackDetailRoute";

interface StackProps {
    stack: IStack;
}

const Stack = ({ stack }: StackProps) => (
    <div className="stack">
        <h1 className="stackName">
            <Link to={makeStackDetailPath(stack.id)}>{stack.name}</Link>
        </h1>
        <div className="user">{stack.user}</div>
        <div className="creationDate">{stack.creation_date}</div>
    </div>
);

export default Stack;
