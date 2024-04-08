import React, { memo } from "react";
import { usePageContext } from "../../utils/usePageContext";
import PostButton from "./components/postButton";
import NamesList from "./components/studentList";
import Map from "./components/mapboxgl";


interface Todo {
    id: number
    title: string
}

const TodosIndexPage = memo(() => {
    let pageContext = usePageContext<{ todos: Todo[] }>()
    let todos = pageContext?.todos

    return (

        <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
            <h1>Veien til sporet</h1>
            <h2>VM i 2025</h2>
            <Map />
            <p style={{ paddingLeft: '20%', paddingRight: '20%', fontFamily: 'times new roman' }}>
                <h3>Welcome to the semester project in GIB2, hope you are ready to get creative and make something fun!</h3>
                <br />
                <br />
                This Web page was set up as a demo on the Ubuntu server. It was built with a django backend and a react frontend, but note that you are free to choose whatever technology you prefer.
                This web page has simple functionality (see the "student to sign up"  functionality below) to read/write to the postgres database instance running on the server.
                <br />
                <br />
                Please note that this application is only for demo-purposes. The repo is available at <a href="https://github.com/Lauvsnes1/react-django-example/tree/main" > this github repo</a>. You can use it as inspiration and a guide on how you connect
                to the server and r/w to the database, but I strongly encourage you to build the application yourselves, as the learning outcome is much higher. Remember that a thourogh guide on connecting to the geomatics server is available on blackboard too.
                <br />
                <br />
                If you need help you can come to me in the student assistent hours at room L11 on fridays from 12:15 - 14:00 (as long as nothing else is written on blackboard) or email me on evenlau@stud.ntnu.no.
                <br />
                <br />
                <span style={{ fontWeight: "bold" }}> Acknowledment:</span> This application was built with the react-django template of Nikita Kozlov. See more <a href="https://github.com/kozlovzxc/GIB2_prosjekt"> here.</a>
                <span style={{ fontWeight: 'bold' }}>
                    <br />
                    NB:</span> it is possible to omit the use of pipenv as used in the article.
            </p>
            <PostButton />
            <NamesList />
        </div>
    )
})

export default TodosIndexPage