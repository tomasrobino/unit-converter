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
            let savedText;
            switch (element.type) {
                case 0:
                    savedText = ["km", " miles"];
                    break;
                case 1:
                    savedText = ["miles", " km"];
                    break;
                case 2:
                    savedText = ["ft", " meters"];
                    break;
                case 3:
                    savedText = ["meters", " ft"];
                    break;
                case 4:
                    savedText = ["cm", " inches"];
                    break;
                case 5:
                    savedText = ["inches", "cm"];
                    break;
                default:
                    break;
            }

            saved.push(
                <div key={element.id} id={element.id} onClick={handleDeletion} className='savedBox'>
                    <p>{element.first} {savedText[0]} &rarr; {element.second} {savedText[1]}</p>
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