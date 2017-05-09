import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

// const ProteinDetail = ({ protein }) => {
class ProteinDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            protein: props
        };
    }

    handleButtonClick() {
        this.forceUpdate();
    }

    render() {
        const {protein} = this.state.protein;

        if (protein === undefined) {
            return (
                <div>
                    <h2>Loading...</h2>
                    <button onClick={this.handleButtonClick.bind(this)}>
                        Click me
                    </button>
                </div>
            );
        }
        return (
            // <div className={`protein protein-detail ${ protein.completed ? 'done' : ''}`}>
            <div>
                <h1>{protein.name}</h1>
                <h3>VenomKB ID: {protein.venomkb_id}</h3>
                <h4>Organism: {protein.venom_ref}</h4>
                <p>
                    {protein.description}
                </p>

                <div className="col-xs-12"></div>
                <h4>Sequence:</h4>
                <p>
                    {protein.aa_sequence}
                </p>
            </div>
        );
    }
}

ProteinDetail.propTypes = {
    protein: PropTypes.object,
    onRemove: PropTypes.func,
    updateProtein: PropTypes.func,
    router: PropTypes.object
};


export default withRouter(ProteinDetail);
