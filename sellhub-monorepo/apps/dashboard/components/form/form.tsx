import { useState, useEffect } from 'react'
import styles from './Form.module.css'
import type {Product} from '../../pages/dashboard'

export function ProductForm({onSubmit, onReset, product} : {onSubmit:Function, onReset: Function, product:Product|null}) {
    const [nameInput, setNameInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [priceInput, setPriceInput] = useState("");

    useEffect(() => { 
        if(product) {
            setNameInput(product.name)
            setCategoryInput(product.category)
            setQuantityInput(product.quantity.toString())
            setPriceInput(product.price.toString())
        } else {
            clear()
        }
    },[product])

    function clear() {
        setNameInput("")
        setCategoryInput("")
        setQuantityInput("")
        setPriceInput("")
    }

    function submit() {
        onSubmit({name: nameInput, category:categoryInput, quantity:quantityInput, price:priceInput})
        clear()
    }

    function renderButtons() {
        if(product) {
            return <>
                <button className={styles.primaryButton} type='button' onClick={() => submit()}>Save Product</button>
                <button className={styles.secondaryButton} type='button' onClick={() => onReset()}>Cancel</button>
            </>
            
        }

        return <>
            <button className={styles.primaryButton} type='button' onClick={() => submit()}>Add Product</button>
            <button className={styles.secondaryButton} type='button' onClick={() => clear()}>Clear</button>
        </>
    }

    return (
      <form>
        <fieldset className={styles.field}>
            <label htmlFor='prod-name'>Product name:</label>
            <input name="prod-name" id='prod-name' type='text' value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
        </fieldset>
        <fieldset className={styles.field}>
            <label htmlFor='category'>Category:</label>
            <input name="category" id='category' type='text' value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} required />
        </fieldset>
        <fieldset className={styles.field}>
            <label htmlFor='quantity'>Quantity:</label>
            <input name="quantity" id='quantity' type='text' value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)} required />
        </fieldset>
        <fieldset className={styles.field}>
            <label htmlFor='price'>Price:</label>
            <input name="price" id='price' type='text' value={priceInput} onChange={(e) => setPriceInput(e.target.value)} required />
        </fieldset>
        {renderButtons()}
      </form>
    );
}