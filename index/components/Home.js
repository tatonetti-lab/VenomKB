import React from 'react';

const Home = () =>
	<div>
		<div className="center jumbotron text-center">
			<img src="./figure_rev2_web.png" className="img-responsive center-block" />

			<h1 className="text-center">Welcome to VenomKB</h1>

			<h2>This is the home page for VenomKB, a centralized resource for discovering therapeutic uses for animal venoms and venom compounds</h2>

			<button className="btn btn-lg btn-default"><a href="/data">Data</a></button>
			<button className="btn btn-lg btn-default"><a href="/download">Download</a></button>

		</div>
	<div id="news">
		<h3>News and Updates</h3>
		<ul id="news-items">
			<li id="news-item">
				<b>June 25, 2017:</b> VenomKB v2.0 is live! Take a few minutes to check out the new features we've added.
				<p>If you would like to see the old version of VenomKB, click on the following link:<button className="btn btn-xs btn-default"><a href="http://54.211.253.123">VenomKB v1.0</a></button></p>
			</li>
		</ul>
	</div>
	</div>;

export default Home;
