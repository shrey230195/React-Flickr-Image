/** 

 * @jsx React.DOM 
 */

var React = require('React');
var Gallery=require('./Gallery');

var App=React.createClass({
	getInitialState:function(){
		return{
			search:'Joker',
			isDisabled:0
		}
	},
	Search:function(e){
		var searchText= this.refs.ImgSearch.getDOMNode().value;
		this.setState({
			search:searchText
		});
	},
	isButtonDisabled:function(e){
		var Disabled=this.refs.ImgSearch.getDOMNode().value;
		Disabled.length===0?this.setState({isDisabled:0}):this.setState({isDisabled:1});
	},
	render:function(){
		
		return(
		<div className="container">
			<div className="Search">
				<div className="SearchField">
					<div className="Flickr">
					<p>Flick</p><p>r</p><p>Search</p>
					</div>
					<input ref="ImgSearch" type="text" onChange={this.isButtonDisabled}/>
					{this.state.isDisabled===0?<button onClick={this.Search} className="btn btn-primary" disabled="disabled">submit</button>:<button onClick={this.Search} className="btn btn-primary">submit</button>}
					
				</div>
			</div>
			<div className="jumbotron">
				<Gallery url={this.state.search}/>
			</div>
		</div>
		)
	}
});
React.renderComponent(
	
	<App/>,
	document.getElementById('app')
);