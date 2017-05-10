// Include React 
var React = require('react');

// Saved component. Used to show a log of saved beers.
var Saved = React.createClass({

	getInitialState: function(){
		return {
			savedBeers: []
		}
	},

	clickToDelete: function(result){
		this.props.deleteBeer(result);

	},

	componentWillReceiveProps: function(nextProps){
		var that = this;
		console.log(nextProps);
		var myResults = nextProps.savedBeers.map(function(search, i){
			var boundClick = that.clickToDelete.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br /><button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Delete</button></div>
		});

		this.setState({savedBeers: myResults});
	},

	// Render the function
	render: function(){

		return(

			<div className="panel panel-success">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Saved Beers</strong></h3>
				</div>
				<div className="panel-body">

					{/* Map function to loop through the array in JSX*/}
					{this.state.savedBeers}
				</div>
			</div>

		)
	}
});



// Export the component back for use in other files
module.exports = Saved;