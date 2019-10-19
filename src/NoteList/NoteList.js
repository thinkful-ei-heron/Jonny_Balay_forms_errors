import React, {Component} from 'react';
import '../App/App.css';
import Note from "../Note/Note";
import NotefulContext from '../NotefulContext';
import './NoteList.css'


class NotesList extends Component {
    static contextType= NotefulContext;

    state = {
        noteName: '',
        noteContent: '',
        folderId: '',
        nameTouched: false,
        contentTouched: false
    };
    componentDidMount() {
        if (this.props.folderId) {
            this.setState({folderId: this.props.folderId})
        }
    }
    handleNoteSubmit = (e, nameStr, contentStr, folderId) => {
        this.context.handleNoteSubmit(e, nameStr, contentStr, folderId);
        this.setState({
            noteName: '',
            noteContent: '',
            folderId: '',
            nameTouched: false,
            contentTouched: false
        })
    }
    handleAddNote = (str) => this.setState({noteName: str, nameTouched: true});
    handleAddContent = (str) => this.setState({noteContent: str, contentTouched: true});
    handleFolderSelect = (index) => {
    const folderId = this.context.folders[index - 1].id
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
            onSubmit={e => this.handleNoteSubmit(e, this.state.noteName, this.state.noteContent, this.state.folderId)}
        >
        <label htmlFor='notename'>Name of note: {this.state.nameTouched && <p>{this.validateName()}</p>}</label>
        <input value={this.state.noteName} type="text" name="notename" onChange={e => this.handleAddNote(e.target.value)}/>
    <label htmlFor="pickfolder">Pick a folder:</label> 
        <select name="pickfolder" onChange={e => this.handleFolderSelect(e.target.selectedIndex)}>
        <option value="">Select an option...</option>
    {this.context.folders.map(itm => <option id={itm.id} key={itm.id} selected={currentFolderID === itm.id && 'selected'}>{itm.name}</option>)}
        </select>
        <label htmlFor="notecontent">Content: {this.state.contentTouched && <p>{this.validateContent()}</p>}</label>
        <textarea value={this.state.noteContent} name="notecontent" onChange={e => this.handleAddContent(e.target.value)}/>
        <button type="submit" disabled={this.validateName() || this.validateContent()}>Submit</button>
        </form>

       
        if(currentFolderID) {
            notes = this.context.notes.filter((note) => note.folderId === (currentFolderID));
        }
        return <>
        {this.context.noteAdding ? addNoteForm : <button onClick={this.togglenoteAdding}>Add Note</button>}
            {notes.map(note =>
                <Note key={note.id} id={note.id} name={note.name} deleteNote={this.context.deleteNote} content={note.modified}/>
            )}
        </>;
    }
}
export default NotesList;
