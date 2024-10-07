'use client'

import React, { ChangeEvent, FormEvent, useState } from "react";

import styles from "./CreateForm.module.css"

interface Props<T, K, D, E> {
    formFields: T,
    data: K,
    api: D,
    relationFields?: E,
}

function CreateForm<D extends { create: Function }, T extends Object, K, E>({ api, formFields, data, relationFields }: Props<T, K, D, E>) {
    const [formData, setFormData] = useState<T>()

    const createForm = async (e: FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        await api.create({ ...data, ...formData, ...relationFields });
    }

    const valid = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        } as T));
    }

    return (
        <form onSubmit={createForm} className={styles.form}>
            {Object.keys(formFields).map((item, i) => (
                <input key={i} type="text" placeholder={item} name={item} className={styles.createIpt} onChange={valid} />
            ))}
            <button type="submit">Создать туду лист</button>
        </form>
    );
}

export default CreateForm;
