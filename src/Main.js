import { useEffect, useState } from 'react';
import Convert from './Convert';
import Saved from './Saved';

export default function Main() {
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        console.log(saved);
    }, [saved])

        
    return (
        <div className="main">
            <Convert saved={saved} setSaved={setSaved}/>
            <p>saved</p>
            <Saved saved={saved} setSaved={setSaved}/>
        </div>
    )
}