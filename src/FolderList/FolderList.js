import React, {Component} from 'react';
import '../App/App.css';
import './FolderList.css';
import {Link} from "react-router-dom";
import NotefulContext from '../NotefulContext';

class FolderList extends Component {
    static contextType = NotefulContext;
    state = {
        folderName: '',
    };

    handleAddFolder = (str) => this.setState({folderName: str});
    toggleAddFolder = () => {
        this.context.addFolder = !this.context.addFolder;
        this.setState({});
    };
    errorHandler = () => (this.state.folderName.trim() === '');
    emptyFolder = () => this.setState({folderName: ''});
    validateFolderName = () => (this.state.folderName.trim() === '') ? 'Please Enter A Folder Name' : undefined;
    render() {

        let addFolder = (this.context.addFolder) ? ( <form onSubmit={(e) => {
            this.context.handleFolderSubmit(e, this.state.folderName);
            this.emptyFolder()}}>
            <input type='text' value={this.state.folderName} onChange={e => this.handleAddFolder(e.target.value)}/>
            <label >FolderName<p className='error'>{this.validateFolderName()}</p></label>
            <button disabled={this.validateFolderName()} type='submit'>Submit</button>
        </form>) : (<button onClick={this.toggleAddFolder}> Add Folder</button>);

        return (
            <>
                {this.context.folders.map((folder) => {
                    return (<div key={folder.id} className={(folder.id === this.props.id) ? 'background' : ''}><Link
                        key={folder.id} to={'/folders/' + folder.id}>{folder.name}</Link></div>);
                })
                }
                {addFolder}
            </>);
    }
}

export default FolderList;
