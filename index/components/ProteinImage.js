import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ProteinImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jdr-box">
                {(this.props.pdb_image_url !== '') &&
                    <div>
                        <Image
                            className="bootstrap-image-resize"
                            src={this.props.pdb_image_url}
                        />
                        {this.props.pdb_structure_known &&
                            <div>
                                <small><i>Exact structure found in PDB</i></small>
                            </div>
                        }
                        {!this.props.pdb_structure_known &&
                            <div>
                                <small><i>No exact structure in PDB - similar structure shown above</i></small>
                            </div>
                        }
                    </div>
                }
                {(this.props.pdb_image_url === '') &&
                    <div>
                        <Image
                            className="bootstrap-image-resize"
                            src="./index/img/protein_placeholder.png"
                        />
                        <small><i>No known 3D structure in PDB and no similar sequences found.</i></small>
                    </div>
                }
            </div>
        );
    }
}

ProteinImage.propTypes = {
    pdb_image_url: PropTypes.string,
    pdb_structure_known: PropTypes.bool
};

export default ProteinImage;
