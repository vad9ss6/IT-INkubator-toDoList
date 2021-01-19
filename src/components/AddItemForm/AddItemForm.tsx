import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import s from './addItemForm.module.css'

import {Button, TextField} from "@material-ui/core";
import {useStyles} from "../usestyle";

type AddItemFormPropsType = {
    titleForm: string
    add: (title: string) => void
}


const AddItemForm = React.memo(
    (props: AddItemFormPropsType) => {
        const [newInputTitle, setNewInputTitle] = useState<string>("")
        const [error, setError] = useState<boolean>(false)

        const styleError = {
            color: 'red',
            display: error ? 'block' : 'none'
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let inputValue = e.currentTarget.value
            setNewInputTitle(inputValue)
            if (inputValue) {
                setError(false)
            }
        }
        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                onClickHandler()
            }
        }
        const onClickHandler = () => {
            if (newInputTitle.trim() !== '') {
                props.add(newInputTitle.trim())
                setNewInputTitle('')
            } else {
                setError(true)
            }
        }

        const classes = useStyles()
        return <div>
            <div className={s.blockNetTask}>
                <TextField
                    error={error}
                    value={newInputTitle}
                    id="outlined-basic"

                    label={props.titleForm}
                    className={classes.rootInput}
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeHandler}
                />
                <Button onClick={onClickHandler} className={classes.rootBtn}>Add</Button>
            </div>
            <div style={styleError}>Please enter the task!</div>
        </div>


    }
)
export default AddItemForm