/** 

 * @jsx React.DOM 
 */

var React = require('React');
var $ = require('jquery');
var base='https://api.flickr.com/services/rest/';
	var key= '4183982b14390bb12794e76a8f2d140a';
var Gallery = module.exports=React.createClass({
	
	getInitialState:function(){
		return{
		source:base+'?api_key='+key+'&format=rest&format=json&nojsoncallback=1&method=flickr.photos.search&text='+this.props.url+'&per_page=30&page=1',
		
		isLoad:0,
		ImageUrl:[]
	};
	},
	sendRequest:function(){
	
		var _ImageUrl=[];
	$.get(this.state.source, function(result) {
            var collection = result.photos.photo;
            collection.map(function(img){
            	
            	
            	_ImageUrl.push("https://farm"+img.farm+".staticflickr.com/"+img.server+"/"+img.id+"_"+img.secret+".jpg");

            });
            
            if (this.isMounted()) {
              this.setState({
                
                ImageUrl:_ImageUrl
              });
            }
          }.bind(this));
	

	},
	componentDidMount:function(){
		
		this.sendRequest();
//		window.addEventListener('scroll', this.myLazyLoad);
},
componentWillReceiveProps :function(nextProps){
	this.setState({
		source:'https://api.flickr.com/services/rest/?api_key=4183982b14390bb12794e76a8f2d140a&format=rest&format=json&nojsoncallback=1&method=flickr.photos.search&text='+nextProps.url+'&per_page=30&page=1',
		
		ImageUrl:[]

	});
	console.log(this.state.source);
	console.log(nextProps.url);
	console.log(this.state.ImageUrl);
	
},
//componentDidUpdate:function(){
//	window.removeEventListener('scroll', this.handleScroll);
//this.sendRequest();
//},
//componentWillUpdate:function(){
//	this.sendRequest();

//},
  myLazyLoad: function(e) {
        // here do actions that you need: load new content, do ajax request, ...
        // example: check you scrolling and load new content from page 1, 2, 3 ... N
        var self = this;
        self.setState({
        	source:'https://api.flickr.com/services/rest/?api_key=4183982b14390bb12794e76a8f2d140a&format=rest&format=json&nojsoncallback=1&method=flickr.photos.search&text='+self.props.url+'&per_page=30&page=2',
        });
        console.log('fuck');
    },
     handleImageLoad: function( event ) {

                
                this.setState({
                isLoad:1
            });
            },

    handleImageLoadBubbled: function( event ) {

                

            },
	render:function(){
		
		
		var self=this;
		var url=[];
		var Imgref=[];
		var images = self.state.ImageUrl.map(function(image,key){
			
			Imgref.push("image"+key);
			//console.log(url[key]);
			return <img onLoad={self.handleImageLoad} ref={Imgref[key]} key={key}className="Image" src={self.state.isLoad===0?"./src/images/loading.gif":self.state.ImageUrl[key]}/>
		});

		return(
			<div onLoad={this.handleImageLoadBubbled}>
				<div className="searchHeading">
					<h2> search results for</h2>
					<h1>{this.props.url}</h1>
				</div>
				<div className="Gallery">
					{images}
				</div>
			</div>
		);
	}
})