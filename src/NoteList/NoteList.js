import React, {Component} from 'react';
import '../App/App.css';
import Note from "../Note/Note";
import NotefulContext from '../NotefulContext';

class NotesList extends Component {
    static contextType= NotefulContext;

    state = {
        noteName: '',
        noteContent: '',
        folderId: ''
    };

    handleAddNote = (str) => this.setState({noteName: str});
    handleAddContent = (str) => this.setState({noteContent: str});
    togglenoteAdding = (e) => {
        this.context.noteAdding = !this.context.noteAdding;
        this.setState({})
    };
    validateName = () => (this.state.noteName.trim() === '') ? 'Please Enter A Note Name' : undefined;
    validateContent = () => (this.state.noteContent.trim() === '') ? 'Please Enter Note Content' : undefined;
    render() {
        let addNoteForm;
        
        const currentFolderID = this.props.folderId;
        let notes = this.context.notes;
        if(currentFolderID) {
            notes = this.context.notes.filter((note) => note.folderId === (currentFolderID));
            addNoteForm = (this.context.noteAdding) ? <form onSubmit={e => this.context.handleNoteSubmit(e, this.state.noteName, this.state.noteContent, this.props.folderId)}>
            <input value={this.state.noteName} type="text" name="notename" onChange={e => this.handleAddNote(e.target.value)}/>
            <label htmlFor='notename'>Name of note <p>{this.validateName()}</p></label>
            <textarea value={this.state.noteContent} name="notecontent" onChange={e => this.handleAddContent(e.target.value)}/>
            <label htmlFor="notecontent">Content <p>{this.validateContent()}</p></label>
            <button type="submit" disabled={this.validateName() || this.validateContent()}>Submit</button>
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
