import React, {ChangeEvent, useState} from "react";

type EditableSpanPropType = {
    title: string
    idTaskTitle: string
    idTodo: string
    editTitleTask:(value: string , id: string, idTodo: string) => void
}



function EditableSpan(props:EditableSpanPropType) {
    const [editMode,setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const changeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)

    }
    const activateEditMode = () =>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () =>{
        setEditMode(false)
        props.editTitleTask(title, props.idTaskTitle, props.idTodo)
    }


    return editMode? <input style={{backgroundColor: 'black', color: 'white'}} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/> : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan