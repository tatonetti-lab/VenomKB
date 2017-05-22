import React from 'react';

const Home = () =>
	<div className="center jumbotron text-center">
		<img src="./index/img/figure_rev2_web.png" className="img-responsive center-block" />

		<h1 className="text-center">Welcome to VenomKB</h1>

		<h2>This is the home page for VenomKB, a centralized resource for discovering therapeutic uses for animal venoms and venom compounds</h2>

		<button className="btn btn-lg btn-default"><a href="/data">Data</a></button>
		<button className="btn btn-lg btn-default"><a href="/download">Download</a></button>

	</div>;

export default Home;
