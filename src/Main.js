import { useState } from 'react';
import exchange from './exchange.svg';

export default function Main() {
    const [selected, setSelected] = useState("km-mi");
    const [typed, setTyped] = useState(0);

    function handleSelection(e) {
        setSelected(e.target.value)
    }

    function handleInput(e) {
        setTyped(e.target.value);
    }

    function handleExchange(e) {
        setTyped(result[0]);
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
                return [typed*1.60934, " kilometers"];
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


    let saved = [];

    function handleSaving() {
        saved.push(
            <div>
                
            </div>
        )
    }

    return (
        <div className="main">
            <div className="convert">
                <p>convert</p>
                <div>
                    <select name="selConversion" onChange={handleSelection} value={selected}>
                        <option value="km-mi">km &rarr; miles</option>
                        <option value="mi-km">miles &rarr; km</option>
                        <option value="ft-m">ft &rarr; meters</option>
                        <option value="m-ft">meters &rarr; ft</option>
                        <option value="cm-in">cm &rarr; inches</option>
                        <option value="in-cm">inches &rarr; cm</option>
                    </select>
                    <img src={exchange} onClick={handleExchange} alt="" className='exchangeImg'/>
                    <input type="number" step="any" value={typed} onChange={handleInput}/>
                    <p>{currentUnit}</p>
                </div>
                <div>
                    <img src={exchange} onClick={handleSaving} alt="" className='saveImg'/>
                    <p>{result}</p>
                </div>
            </div>
            <p>saved</p>
            <div>

            </div>
        </div>
    )
}