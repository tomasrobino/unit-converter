import { useState, useEffect } from 'react';
import Convert from './Convert';
import Saved from './Saved';

export default function Main() {
    const [saved, setSaved] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3008/api")
            .then(res => res.json())
            .then(data => setSaved(data));
    }, [saved]);
        
    return (
        <div className="main">
            <Convert saved={saved} setSaved={setSaved}/>
            <Saved saved={saved} setSaved={setSaved}/>
        </div>
    )
}