import React, {ChangeEvent} from "react";
import s from "../TodoList.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import EditableSpan from "../../EditableSpan/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useStyles} from "../../usestyle";
import {TaskStatuses} from "../../../api/todolist-api";


type PropType = {
    id: string
    title: string
    status: TaskStatuses
    idTodo: string
    editTitleTask: (value: string, id: string, idTodo: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoId: string) => void
    removeTask: (id: string, todoListId: string) => void
}

export const Task:React.FC<PropType> = ({id, title, status, idTodo, ...props}) => {
    const classes = useStyles()
    const onClickHandler = () => props.removeTask(id, idTodo)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, idTodo)

    }
    const styleCompletedTask = {
        textDecoration: status === TaskStatuses.Completed ? 'line-through' : ''

    }

    return  <li key={id} style={styleCompletedTask} className={s.items}>
        <div>
            <Checkbox
                onChange={onChangeHandler} checked={status === TaskStatuses.Completed} className={classes.rootCheckBox}  inputProps={{'aria-label': 'primary checkbox'}}
            />
            <EditableSpan title={title}
                          editTitleTask={props.editTitleTask}
                          idTaskTitle={id} idTodo={idTodo} />
        </div>
        <IconButton aria-label="delete" className={classes.rootBtnDelete} onClick={onClickHandler}>
            <DeleteIcon fontSize="large" />
        </IconButton>
    </li>
}