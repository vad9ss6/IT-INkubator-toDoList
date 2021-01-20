import React, {ChangeEvent, useState} from "react";


type EditableSpanPropType = {
    title: string
    idTaskTitle: string
    idTodo: string | ''
    editTitleTask?:(value: string , id: string, idTodo: string) => void
    editTodoTitle?:(value: string , id: string) => void
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
        props.editTitleTask && props.editTitleTask(title, props.idTaskTitle, props.idTodo)
        props.editTodoTitle && props.editTodoTitle(title, props.idTodo)
    }


    return editMode
        ? <input
            style={{backgroundColor: 'black', color: 'white', width: '70%',}}
            value={title} onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode} onTouchEnd={activateEditMode} style={{paddingLeft: '5px'}}>{props.title}</span>
}

export default EditableSpan