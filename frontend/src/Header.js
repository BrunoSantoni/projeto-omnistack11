import React from 'react';

export default function Header(props) { //Capturou o título com o parâmetro props
    return(
        <header>
            <h1>{props.children}</h1>
        </header>
    );
}