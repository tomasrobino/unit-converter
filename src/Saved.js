import equis from './equis.svg';

export default function Saved(props) {
    function handleDeletion(e) {
        let a = [...props.saved];
        a.splice(e.target.parentNode.id, 1);
        props.setSaved(a);
        console.log(a);
        window.localStorage.setItem("SAVED", JSON.stringify(a));
    }
    
    let saved = [];
    if (Array.isArray(props.saved)){
        props.saved.forEach((element, i) => {
            saved.push(
                <div key={i} id={i} onClick={handleDeletion}>
                    <p>{props.saved[i]}</p>
                    <img src={equis} alt="" className='deleteImg'/>
                </div>
            )
        });
    }

    return (
        <div>
            {saved}
        </div>
    )
}