import exchange from './exchange.svg';

export default function Saved(props) {

    function handleDeletion(e) {
        let a = [...props.saved];
        a.splice(e.target.parentNode.id, 1);
        props.setSaved(a);
    }
    
    let saved = [];
    props.saved.forEach((element, i) => {
        saved.push(
            <div key={i} id={i} onClick={handleDeletion}>
                <p>{props.saved[i]}</p>
                <img src={exchange} alt="" className='deleteImg'/>
            </div>
        )
    });

    return (
        <div>
            {saved}
        </div>
    )
}