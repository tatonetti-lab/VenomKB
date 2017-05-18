import React from 'react';
import { Accordion, Panel, ButtonToolbar, Button } from 'react-bootstrap';

const vkb1_title = (
	<h3>VenomKB v1.0 data tables</h3>
);

const handleClick = (e) => {
    console.log(e);
};

const Download = () =>
	<div className="jumbotron">
		<h2>Download</h2>

		<Accordion>
			<Panel header={vkb1_title} bsStyle="success">
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<ButtonToolbar>
						<Button bsStyle="primary" onClick={handleClick('vextractor.csv')}>vextractor.csv</Button>
						<Button bsStyle="primary" onClick={handleClick('semantic_vextractor.csv')}>semantic_vextractor.csv</Button>
						<Button bsStyle="primary" onClick={handleClick('manual_venoms.tsv')}>manual_venoms.tsv</Button>
					</ButtonToolbar>
				</div>
			</Panel>
		</Accordion>
	</div>;


export default Download;
