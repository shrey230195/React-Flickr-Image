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
		ImageUrl:[],
		key:0,
		src:''
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
	componentWillUpdate:function(){
		this.sendRequest();

	},
	  
	handleImageLoad: function( event ) {

	                
	                this.setState({
	                isLoad:1
	            });
	            },

	handleImageLoadBubbled: function( event ) {

	                

	            },
	prevImage:function(){

		var _key=this.state.key-1;
		var _src=this.state.ImageUrl[_key];
		if(_key<0){
			_key=this.state.ImageUrl.length-1;
		}
		this.setState({
			key:_key,
			src:_src

		});
		console.log(this.state.key);
		React.renderComponent(<div className="SlideShow"><h1 onClick={this.prevImage}> &lt; </h1><img  src={this.state.ImageUrl[this.state.key]}/><h1 onClick={this.nextImage}> &gt; </h1></div>,document.getElementById('LightBox'))
	},
	            
	nextImage:function(){

		var _key=this.state.key+1;
		var _src=this.state.ImageUrl[_key];
		if(_key>=this.state.ImageUrl.length){
			_key=0;
		}
		this.setState({
			key:_key,
			src:_src

		});
		console.log(this.state.key);
		React.renderComponent(<div className="SlideShow"><h1 onClick={this.prevImage}> &lt; </h1><img src={this.state.ImageUrl[this.state.key]}/><h1 onClick={this.nextImage}> &gt; </h1></div>,document.getElementById('LightBox'))
	},
	LightBox:function(event){
		var _src=event.target.src;
		
		var self = this;
		self.setState({
					src:_src
				});
		this.state.ImageUrl.map(function(i,_key){
			if(i===_src){
				self.setState({
				key:_key
				});
				
			}

		});
		
		console.log('image'+JSON.stringify(this.state.src));
		React.renderComponent(<div className="SlideShow"><h1 onClick={this.prevImage}> &lt; </h1><img src={_src}/><h1 onClick={this.nextImage}> &gt; </h1></div>,document.getElementById('LightBox'))
	},
	render:function(){
		
		
		var self=this;
		var url=[];
		var Imgref=[];
		var images = self.state.ImageUrl.map(function(image,key){
			
			Imgref.push("image"+key);
			//console.log(url[key]);
			return <div className="Image"><a href="#LightBox"><img href="#LightBox" onLoad={self.handleImageLoad} onClick={self.LightBox}ref={Imgref[key]} key={key} src={self.state.isLoad===0?"./src/images/loading.gif":self.state.ImageUrl[key]}/></a></div>
		});

		return(
			<div onLoad={this.handleImageLoadBubbled}>

				<div className="searchHeading">
					<h2> search results for</h2>
					<h1>{this.props.url}</h1>
				</div>
				
				
					<div id="LightBox" className="LightBox">

					</div>

				
				<div className="Gallery">
					{images}
				</div>
				
				
			</div>
		);
	}
})