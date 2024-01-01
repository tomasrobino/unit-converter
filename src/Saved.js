import { useEffect } from "react";

export default function Saved(props) {
    useEffect(() => {
        
    });

    function handleDeletion(e) {
        //console.log(e.target.parentNode.firstChild.textContent);
        props.setSaved(props.saved.filter( (elem, i) => {
            //console.log(elem);
            return elem.firstChild.textContent !== e.target.parentNode.firstChild.textContent;
        }));
    }
    

    return (
        <div>
            {props.saved}
        </div>
    )
}