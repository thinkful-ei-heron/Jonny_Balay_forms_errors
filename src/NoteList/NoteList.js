import React, {Component} from 'react';
import '../App/App.css';
import Note from "../Note/Note";
import NotefulContext from '../NotefulContext';

class NotesList extends Component {
    static contextType= NotefulContext;

    state = {
        folderName: '',
        folderContent: '',
        folderId: ''
    }

    handleAddNote = (str) => this.setState({folderName: str})
    handleAddContent = (str) => this.setState({folderContent: str})
    togglenoteAdding = (e) => {
        this.context.noteAdding = !this.context.noteAdding;
        this.setState({})
    }
    render() {
        let addNoteForm;
        
        const currentFolderID = this.props.folderId;
        let notes = this.context.notes;
        if(currentFolderID) {
            notes = this.context.notes.filter((note) => note.folderId === (currentFolderID));
            addNoteForm = (this.context.noteAdding) ? <form onSubmit={e => this.context.handleNoteSubmit(e, this.state.folderName, this.state.folderContent, this.props.folderId)}>
            <input value={this.state.folderName} type="text" name="notename" onChange={e => this.handleAddNote(e.target.value)}></input>
            <label htmlFor='notename'>Name of note</label>
            <textarea value={this.state.folderContent} name="notecontent" onChange={e => this.handleAddContent(e.target.value)}></textarea>
            <label htmlFor="notecontent">Content</label>
            <button type="submit">Submit</button>
            </form> : <button onClick={this.togglenoteAdding}>Add Note</button>
        }
        return <>
            {notes.map(note =>
                <Note key={note.id} id={note.id} name={note.name} deleteNote={this.context.deleteNote} content={note.modified}/>
            )}
            {addNoteForm}
            
        </>;
    }
}

export default NotesList;
