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
    handleFolderSelect = (index) => {
       const folderId = this.context.folders[index].id
       this.setState({folderId: folderId})
    }
    togglenoteAdding = (e) => {
        this.context.noteAdding = !this.context.noteAdding;
        this.setState({})
    };
    validateName = () => (this.state.noteName.trim() === '') ? 'Please Enter A Note Name' : undefined;
    validateContent = () => (this.state.noteContent.trim() === '') ? 'Please Enter Note Content' : undefined;
    render() {
        const currentFolderID = this.props.folderId;
        let notes = this.context.notes;

        const addNoteForm = 
        <form 
            onSubmit={currentFolderID ? e => this.context.handleNoteSubmit(e, this.state.noteName, this.state.noteContent, currentFolderID) : e => this.context.handleNoteSubmit(e, this.state.noteName, this.state.noteContent, this.state.folderId)}
        >
        <input value={this.state.noteName} type="text" name="notename" onChange={e => this.handleAddNote(e.target.value)}/>
        <label htmlFor='notename'>Name of note <p>{this.validateName()}</p></label>
        {currentFolderID ? '' : 
             <><label htmlFor="pickfolder">Pick folder:</label> 
            <select name="pickfolder" onChange={e => this.handleFolderSelect(e.target.selectedIndex)}>
            {this.context.folders.map(itm => <option id={itm.id} key={itm.id}>{itm.name}</option>)}
            </select></>}
        <textarea value={this.state.noteContent} name="notecontent" onChange={e => this.handleAddContent(e.target.value)}/>
        <label htmlFor="notecontent">Content <p>{this.validateContent()}</p></label>
        <button type="submit" disabled={this.validateName() || this.validateContent()}>Submit</button>
        </form>

       
        if(currentFolderID) {
            notes = this.context.notes.filter((note) => note.folderId === (currentFolderID));
        }
        return <>
            {notes.map(note =>
                <Note key={note.id} id={note.id} name={note.name} deleteNote={this.context.deleteNote} content={note.modified}/>
            )}
            {this.context.noteAdding ? addNoteForm : <button onClick={this.togglenoteAdding}>Add Note</button>}
        </>;
    }
}
export default NotesList;
