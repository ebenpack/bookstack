import React from 'react';

export default function Category(props){
    const onClick = props.onClick ? e=>props.onClick(e, props.category.get('id')) : ()=>{};
    return (
        <li key={props.category.get('id')} className="category" onClick={onClick}>
            {props.category.getIn(['detail', 'category'])}
        </li>
    );
};