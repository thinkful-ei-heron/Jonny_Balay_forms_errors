import React, {Component} from 'react';
import '../App/App.css';
import './FolderList.css';
import {Link} from "react-router-dom";
import NotefulContext from '../NotefulContext';
import PropTypes from "prop-types";

class FolderList extends Component {
    static contextType = NotefulContext;
    state = {
        folderName: '',
        touched: false
    };

    toggleNoteAdding = (e) => {
        if (this.context.noteAdding) {
        this.context.noteAdding = !this.context.noteAdding;
        }
    }
    handleAddFolder = (str) => this.setState({folderName: str, touched: true});
    toggleAddFolder = () => {
        this.context.addFolder = !this.context.addFolder;
        this.setState({});
    };
    emptyFolder = () => this.setState({folderName: ''});
    validateFolderName = () => (this.state.folderName.trim() === '') ? 'Please Enter A Folder Name' : undefined;
    render() {

        let addFolder = (this.context.addFolder) ? ( <form onSubmit={(e) => {
            this.context.handleFolderSubmit(e, this.state.folderName);
            this.emptyFolder()}}>
            <input type='text' value={this.state.folderName} onChange={e => this.handleAddFolder(e.target.value)}/>
        <label >FolderName{this.state.touched && <p className='error'>{this.validateFolderName()}</p>}</label>
            <button disabled={this.validateFolderName()} type='submit'>Submit</button>
        </form>) : (<button onClick={this.toggleAddFolder}> Add Folder</button>);

        return (
            <>
                {this.context.folders.map((folder) => {
                    return (<div key={folder.id} className={(folder.id === this.props.id) ? 'background' : ''}><Link
                        key={folder.id} to={'/folders/' + folder.id} onClick={this.toggleNoteAdding}>{folder.name}</Link></div>);
                })
                }
                {addFolder}
            </>);
    }
}
FolderList.propTypes = {
    id: PropTypes.string
};
export default FolderList;
