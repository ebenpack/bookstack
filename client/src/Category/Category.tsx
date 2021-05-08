import * as React from "react";

import { ICategory } from "./types";

interface CategoryProps {
    onClick: (event: React.MouseEvent, id: number) => void;
    category: ICategory;
}

const Category = ({ onClick, category }: CategoryProps) => (
    <li
        key={category.id}
        className="category"
        onClick={(e) => onClick(e, category.id)}
    >
        {category.detail.category}
    </li>
);

export default Category;
