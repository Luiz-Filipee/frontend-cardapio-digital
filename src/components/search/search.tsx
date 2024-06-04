import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import "./search.css"
import { useFoodData } from "../../hooks/useFoodData";

interface InputProps{
    value: number | string,
    updateValue(value: any): void
}


const Input = ({ value, updateValue }: InputProps) => {
    const { data } = useFoodData();

    const searchSubmit = () => {
        data?.forEach(food => {
            if(value == food.title){
                console.log(food);
            }
        })
    }

    return(
        <>
            <div className="input-wrapper">
                <FontAwesomeIcon onClick={searchSubmit} icon={faSearch} className="input-icon" />
                <input value={value} onChange={event => updateValue(event.target.value)} />
            </div>
        </>
    )
}

export function CreateModalSearch(){
    const [itemSearch, setItemSearch] = useState("");

    return(
        <Input value={itemSearch} updateValue={setItemSearch}/>
    )
}