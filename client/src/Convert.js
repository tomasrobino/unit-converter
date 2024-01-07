import { useState } from "react";
import exchangeWhite from './exchangeWhite.svg';
import heart from "./heart.svg";

export default function Convert(props) {
    const [selected, setSelected] = useState("0");
    const [typed, setTyped] = useState("0");

    function handleSaving() {
        async function postDB(data) {
            await fetch("http://localhost:3008/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                while (res!=="1") {
                    return fetch("http://localhost:3008/api", {
                        method: "GET"
                    });
                }
            }).then(res => res.json())
            .then(data => props.setSaved(data));; 
        }

        postDB({ type: parseInt(selected), first: parseFloat(typed), second: result[0] });
    }

    

    function handleSelection(e) {
        setSelected(e.target.value)
    }

    function handleInput(e) {
        setTyped(e.target.value);
    }

    function handleExchange() {
        setTyped(result[0].toString());
        if (selected%2===0) {
            setSelected((parseInt(selected)+1).toString());
        } else setSelected((selected-1).toString());
    }
    
    let result = (function() {
        switch (selected) {
            case "0":
                return [typed*0.621371, " miles"];
            case "1":
                return [typed*1.60934, " km"];
            case "2":
                return [typed*0.3048, " meters"];
            case "3":
                return [typed*3.28084, " feet"];
            case "4":
                return [typed*0.3937, " inches"];
            case "5":
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
            case "0":
                return "km";
            case "1":
                return "miles";
            case "2":
                return "feet";
            case "3":
                return "meters";
            case "4":
                return "cm";
            case "5":
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
                        <option value="0">km &rarr; miles</option>
                        <option value="1">miles &rarr; km</option>
                        <option value="2">ft &rarr; meters</option>
                        <option value="3">meters &rarr; ft</option>
                        <option value="4">cm &rarr; inches</option>
                        <option value="5">inches &rarr; cm</option>
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