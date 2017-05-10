var axios = require('axios');

// Include React 
var React = require('react');

// Include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');


// This is the main component. 
var Main = React.createClass({

	// Set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: "",
			results: [],
			savedBeers: []
		}
	},	

	// Use this function to allow children to update the parent with searchTerms.
	setTerm: function(tpc, stYr, endYr){
		this.setState({
			topic: tpc,
			startYear: stYr,
			endYear: endYr
		})
	},

	saveBeer: function(title, date, url){
		helpers.postBeer(title, date, url);
		this.getBeer();
	},

	deleteBeer: function(beer){
		console.log(beer);
		axios.delete('/api/saved/' + beer._id)
			.then(function(response){
				this.setState({
					savedBeers: response.data
				});
				return response;
			}.bind(this));

		this.getBeer();
	},

	getBeer: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedBeers: response.data
				});
			}.bind(this));
	},

	// If the component updates run this code
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log("UPDATED");

			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	},

	componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedBeers: response.data
				});
			}.bind(this));
	},

	// Render the function
	render: function(){
		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron" style={{'backgroundImage': 'url(./images/backbeer.jpg)', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'backgroundSize': '100% 100%', 'backgroundAttachment': 'fixed'}}>
						<h2 className="text-center" style={{'color': 'white', 'textShadow': '3px 3px 10px black', 'fontSize': '54px'}}>Pint Perfect</h2>
						<p className="text-center" style={{'color': 'white', 'textShadow': '3px 3px 10px black', 'fontSize': '24px'}}>Search for and save beers you love!</p>
					</div>
				</div>
				<div className="row">

					<Form setTerm={this.setTerm}/>

				</div>

				<div className="row">
			
					<Results results={this.state.results} saveBeer={this.saveBeer}/>

				</div>

				<div className="row">
				
					<Saved savedBeers={this.state.savedBeers} deleteBeer={this.deleteBeer} />

				</div>
			</div>
		)
	}
});

module.exports = Main;