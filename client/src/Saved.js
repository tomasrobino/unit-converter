import equis from './equis.svg';

export default function Saved(props) {
    function handleDeletion(e) {
        if (e.target.tagName === "IMG") {
            let a = [...props.saved];
            a.splice(a.findIndex((element) => element.id === parseInt(e.currentTarget.id)), 1);
            props.setSaved(a);
            fetch("http://localhost:3008/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: e.currentTarget.id })
            })
        }
    }
    
    let saved = [];
    if (Array.isArray(props.saved)){
        props.saved.forEach((element, i) => {
            saved.push(
                <div key={element.id} id={element.id} onClick={handleDeletion} className='savedBox'>
                    <p>{element.first} {element.type} {element.second}</p>
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