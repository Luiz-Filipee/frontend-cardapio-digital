import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css"

interface InputProps{
    label: string,
    value: number | string,
    updateValue(value: any): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

interface ModalProps{
    closeModal(): void
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData);
    }

    const submitClose = () => {
        closeModal();
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal()
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h1>Cadastre um novo item no cardapio</h1>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <div className="modal-button">
                    <button onClick={submit} className="btn-secondary">
                        {isPending ? 'postando...' : 'postar'}
                    </button>
                    <button onClick={submitClose} className="btn-close">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}