import React from 'react'

class ErrorPage extends React.Component {
    state= {error: null};
    
    static getDerivedStateFromError(error) {
        return {error};
    }


    render() {
        if (this.state.error) {
            return (
                <div className="error-page">
                    <h1>Something went wrong</h1>
                    <p>Try refreshing the page</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorPage