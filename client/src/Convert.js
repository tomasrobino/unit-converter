import { useState } from "react";
import exchangeWhite from './exchangeWhite.svg';
import heart from "./heart.svg";

export default function Convert(props) {
    const [selected, setSelected] = useState("km-mi");
    const [typed, setTyped] = useState("0");

    function handleSaving() {
        async function postDB(data) {
            await fetch("http://localhost:3008/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }

        if(Array.isArray(props.saved)) {
            let aux = [...props.saved];
            if (props.saved.length > 7) {
                aux.splice(aux.length-1, 1);
            }
            postDB({ type: 1, first: parseFloat(typed), second: result[0] });
            /*
            props.setSaved([
                typed.concat(" ",currentUnit, " ", "\u2192", " ", result[0], result[1]), ...aux
            ]);
            window.localStorage.setItem("SAVED", JSON.stringify([typed.concat(" ",currentUnit, " ", "\u2192", " ", result[0], result[1]), ...aux]));
            */
        } else {
            props.setSaved([
                typed.concat(" ",currentUnit, " ", "\u2192", " ", result[0], result[1])
            ]);
            window.localStorage.setItem("SAVED", JSON.stringify([typed.concat(" ",currentUnit, " ", "\u2192", " ", result[0], result[1])]));
        }
    }

    

    function handleSelection(e) {
        setSelected(e.target.value)
    }

    function handleInput(e) {
        setTyped(e.target.value);
    }

    function handleExchange(e) {
        setTyped(result[0].toString());
        switch (selected) {
            case "km-mi":
                setSelected("mi-km");
                break;
            case "mi-km":
                setSelected("km-mi");
                break;
            case "ft-m":
                setSelected("m-ft");
                break;
            case "m-ft":
                setSelected("ft-m");
                break;
            case "cm-in":
                setSelected("in-cm");
                break;
            case "in-cm":
                setSelected("cm-in");
                break;
            default:
                break;
        }
    }
    
    let result = (function() {
        switch (selected) {
            case "km-mi":
                return [typed*0.621371, " miles"];
            case "mi-km":
                return [typed*1.60934, " km"];
            case "ft-m":
                return [typed*0.3048, " meters"];
            case "m-ft":
                return [typed*3.28084, " feet"];
            case "cm-in":
                return [typed*0.3937, " inches"];
            case "in-cm":
                return [typed*2.54, " centimeters"];
            default:
                break;
        }
    })();

    result[0]*=100;
    result[0] = Math.trunc(result[0]);
    result[0]/=100;

    let currentUnit = (function() {
        switch (selected) {
            case "km-mi":
                return "km";
            case "mi-km":
                return "miles";
            case "ft-m":
                return "feet";
            case "m-ft":
                return "meters";
            case "cm-in":
                return "cm";
            case "in-cm":
                return "inches";
            default:
                break;
        }
    })();

    return(
        <div className="convert">
            <p>convert</p>
            <div className="inputAndSelect">
                <div className="selectDiv">
                    <select name="selConversion" onChange={handleSelection} value={selected} className="select">
                        <option value="km-mi">km &rarr; miles</option>
                        <option value="mi-km">miles &rarr; km</option>
                        <option value="ft-m">ft &rarr; meters</option>
                        <option value="m-ft">meters &rarr; ft</option>
                        <option value="cm-in">cm &rarr; inches</option>
                        <option value="in-cm">inches &rarr; cm</option>
                    </select>
                    <div style={{ width: "80px" }}>
                        <img src={exchangeWhite} onClick={handleExchange} alt="" className='exchangeImg'/>
                    </div>
                </div>
                <div className="inputDiv">
                    <input type="number" step="any" value={typed} onChange={handleInput} className="input"/>
                    <div style={{ width: "80px" }}>
                        <p>{currentUnit}</p>
                    </div>
                </div>
            </div>
            <div className="resultDiv">
                <img src={heart} onClick={handleSaving} alt="" className='saveImg'/>
                <div style={{ display: "flex" }}>
                    <p style={{ marginRight: "20px" }}>{result[0]}</p>
                    <div style={{ width: "80px" }}>
                        <p>{result[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}