import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { footer } from '../styles/footer.scss';

const App = ({ children }) =>
    <div>
    	<Link to="/">Home</Link>
    	<span> | </span>
    	<Link to="/about">About</Link>
    	<span> | </span>
    	<Link to="/protein">Protein</Link>
        { children }
        <footer className={footer}>
            <Link to="/">Filterable Table</Link>
            <Link to="/about">About</Link>
        </footer>
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
