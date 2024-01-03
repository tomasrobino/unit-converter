import equis from './equis.svg';

export default function Saved(props) {
    function handleDeletion(e) {
        let a = [...props.saved];
        a.splice(a.findIndex((element) => element === e.target.parentNode.firstChild.textContent), 1);
        props.setSaved(a);
        console.log(a);
        window.localStorage.setItem("SAVED", JSON.stringify(a));
    }
    
    let saved = [];
    if (Array.isArray(props.saved)){
        props.saved.forEach((_element, i) => {
            saved.push(
                <div key={i} id={i} onClick={handleDeletion} className='savedBox'>
                    <p>{props.saved[i]}</p>
                    <img src={equis} alt="" className='deleteImg'/>
                </div>
            )
        });
    }

    return (
        <div className='saved'>
            <p className='savedTitle'>saved</p>
            <div className='savedDiv'>
                {saved}
            </div>
        </div>
    )
}