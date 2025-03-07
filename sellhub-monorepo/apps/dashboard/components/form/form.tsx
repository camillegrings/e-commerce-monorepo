import styles from './Form.module.css'

export function CreateProductForm({onSubmit} : {onSubmit:Function}) {
    function create(formData: FormData) {
        const name = formData.get("prod-name"),
        category = formData.get("category"),
        quantity = formData.get("quantity"),
        price = formData.get("price");

        onSubmit({name, category, quantity, price})
    }

    return (
      <form action={create}>
        <fieldset className={styles.field}>
            <label htmlFor='prod-name'>Product name:</label>
            <input name="prod-name" id='prod-name' type='text' required  />
        </fieldset>
        <fieldset className={styles.field}>
            <label htmlFor='category'>Category:</label>
            <input name="category" id='category' type='text' required  />
        </fieldset>
        <fieldset className={styles.field}>
            <label htmlFor='quantity'>Quantity:</label>
            <input name="quantity" id='quantity' type='number' required  />
        </fieldset>
        <fieldset className={styles.field}>
            <label htmlFor='price'>Price:</label>
            <input name="price" id='price' type='number' required  />
        </fieldset>
        <button className={styles.button} type='submit'>Add Product</button>
      </form>
    );
}