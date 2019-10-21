import React from 'react'
import {Link} from 'react-router-dom'
import NotefulContext from './NotefulContext'

class Header extends React.Component {
    static contextType = NotefulContext;
    
    toggleAdding = (e) => {
        if (this.context.noteAdding) {
            this.context.noteAdding = !this.context.noteAdding
        }
    }
    
    render() {
        return (
            <>
            <Link to='/' onClick={this.toggleAdding}><h1>Noteful</h1> </Link>
            </>
        )
    }
}

export default Header