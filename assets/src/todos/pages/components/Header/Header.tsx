import { FaSkiing } from "react-icons/fa";
import React from "react"
import "./headerstyles.css"


export default function Header() {
    return (
        <header className="container">
            <nav className="nav">
                <a href="/" className="logo" style={{ fontSize: '40px' }}><FaSkiing/>Veien til sporet</a>
                <ul>
                    <li>
                        <a href="/routs">Reiseplanlegger</a>
                    </li>
                    <li>
                        <a href="/favorittes">Favoritter</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}