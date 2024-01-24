import React, {memo} from "react";
import {usePageContext} from "../../utils/usePageContext";
import postButton from "./components/postButton";
import PostButton from "./components/postButton";
import NamesList from "./components/studentList";

interface Todo {
    id: number
    title: string
}



const TodosIndexPage = memo(() => {
    let pageContext = usePageContext<{ todos: Todo[] }>()
    let todos = pageContext?.todos

    

    return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center'}}>
        <h1>Hello students in TBA4245</h1>
        <PostButton/>
        <NamesList/>
    </div>
    )
})

export default TodosIndexPage