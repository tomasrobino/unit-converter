import { useState } from 'react';
import Convert from './Convert';

export default function Main() {
    const [saved, setSaved] = useState([]);
    

    function handleDeletion(e) {
        //console.log(e.target.parentNode.firstChild.textContent);
        setSaved(saved.filter( (elem, i) => {
            //console.log(elem);
            return elem.firstChild.textContent !== e.target.parentNode.firstChild.textContent;
        }));
    }

    
    return (
        <div className="main">
            <Convert saved={saved} setSaved={setSaved}/>
            <p>saved</p>
            <div>
                {saved}
            </div>
        </div>
    )
}