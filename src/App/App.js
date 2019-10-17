import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import './App.css';
import FolderList from "../FolderList/FolderList";
import NoteList from "../NoteList/NoteList";
import DetailedNote from "../DetailedNote/DetailedNote";
import NotefulContext from '../NotefulContext';

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };

    componentDidMount() {
        this.getFolders();
        fetch('http://localhost:9090/notes').then(res => res.json()).then(data => this.setState({notes: data}));
    }

    deleteNote = (id) => {
        fetch(`http://localhost:9090/notes/${id}`, {
            method: 'DELETE'
        }).then(() => this.setState({notes: this.state.notes.filter(note => note.id !== id)}));
    };

    handleFolderSubmit = (e, str) => {
        e.preventDefault();
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({name: str})
        }).then(() => this.getFolders());
    };

    getFolders = () => fetch('http://localhost:9090/folders').then(res => res.json()).then(data => this.setState({folders: data}));

    handleNoteSubmit = (e, nameStr, contentStr, folderId) => {
        e.preventDefault();
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({name: nameStr, content: contentStr, folderId: folderId, modified: new Date().toJSON()})
        }).then(() => this.getNotes());
    };

    getNotes = () => fetch('http://localhost:9090/notes').then(res => res.json().then(data => this.setState({notes: data})))

    render() {
        return (
            <NotefulContext.Provider value={{
                notes: this.state.notes,
                folders: this.state.folders,
                addFolder: false,
                deleteNote: this.deleteNote,
                handleFolderSubmit: this.handleFolderSubmit,
                handleNoteSubmit: this.handleNoteSubmit,
                noteAdding: false
            }}>
                <div className="App">
                    <div className="App-header">
                        <Link to='/'>Noteful </Link>

                    </div>
                    <div className='SideNav'>
                        <Switch>
                            <Route path='/notes/:noteId' render={(routeProps) => {
                                const note = this.state.notes.find(note => note.id === routeProps.match.params.noteId);
                                if (note) {
                                    const folder = {...this.state.folders.find(folder => folder.id === note.folderId)};
                                    return (
                                        <div>
                                            <div>{folder.name}</div>
                                            <Link to={'/folders/' + folder.id}>Go Back To</Link>
                                        </div>)
                                }
                            }}/>
                            <Route path='/folders/:folderId'
                                   render={(routeProps) => <FolderList
                                       id={routeProps.match.params.folderId}/>}/>
                            <Route exact path='/' render={(routeProps) => <FolderList/>}/>
                        </Switch>
                    </div>
                    <div className='Main'>
                        <Switch>
                            <Route path='/notes/:noteId' render={(routeProps) => <DetailedNote
                                note={this.state.notes.find(note => note.id === routeProps.match.params.noteId)}/>}/>
                            <Route path='/folders/:folderId'
                                   render={(routeProps) => <NoteList folderId={routeProps.match.params.folderId}
                                   />}/>
                            <Route exact path='/' render={(routeProps) => <NoteList/>}/>
                        </Switch>
                    </div>
                </div>
            </NotefulContext.Provider>
        )
    }
}

export default App;
