import { useState } from 'react';
import Convert from './Convert';
import Saved from './Saved';

export default function Main() {
    const [saved, setSaved] = useState(() =>{
        let aux = window.localStorage.getItem("SAVED");
        if (aux !== "") {
            return JSON.parse(window.localStorage.getItem("SAVED"));
        } else {
            window.localStorage.setItem("SAVED", []);
            return [];
        };
    });
        
    return (
        <div className="main">
            <Convert saved={saved} setSaved={setSaved}/>
            <Saved saved={saved} setSaved={setSaved}/>
        </div>
    )
}