import React, { Component } from 'react';
import './App.css';



//const Api = "AIzaSyDRrBiyVXiM82WsXw8UU_2zfPC543tc1FQ";
class App extends Component {

constructor() {
  super();
  this.state= {
    Videos: [],
    VidAdded: []
 }
}



submitting(e) {
let output = document.getElementById("query").value;
e.preventDefault();
 if(output === '') {
   alert('You need to put some searching criteria ')
 }
else {
console.log(output);
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${output}&key=AIzaSyDRrBiyVXiM82WsXw8UU_2zfPC543tc1FQ`)
.then((res) => res.json())
.then((data) =>{
    this.setState({Videos: {
     title: data.items.map(obj => obj.snippet.title),
     videoId: data.items.map(obj => obj.id.videoId),
     link: data.items.map(obj => 'https://www.youtube.com/embed/' + obj.id.videoId)
}});
})
  .catch((err) => {
    console.log(err);
  });
}
};


addVid(videoId, title, link) {
  let VidsAdded = this.state.VidAdded;
  let VidAdded =[];
  VidAdded = {
   title: title,
   Id: videoId,
   link: link
 };
VidsAdded.push(VidAdded);
this.setState({VidsAdded:VidsAdded});
};


deleteVid(Id) {
  let Vid = this.state.VidAdded;
  let index = Vid.findIndex(x => x.Id === Id);
  console.log(Vid.findIndex(x => x.Id === Id))
Vid.splice(index, 1);
this.setState({Vid:Vid});
console.log(Vid);
}



render() {

let Videos = this.state.Videos;



return (
    <div className="App ">
    <div className="jumbotron">
      <h3 className="display-4" > Youtube Api fetch application </h3>
    </div>
    <div className="container">
    <div className="row">
    <div  className="col-md-6" style={{borderRight: '1px dotted grey'}}>
    <h4 className="mb-5"> <span style={{borderBottom: '1px solid grey', borderWeight: '20%'}}>Your choices</span></h4>

{
  this.state.VidAdded && this.state.VidAdded.map(obj =>
    <div>
      <div key={obj.Id} className="Video">
      <p className="title">{obj.title}  <a className="btn btn-secondary " onClick={this.deleteVid.bind(this, obj.Id)}>-</a></p>
      <iframe  width="500" height="300"  title="{obj.title}" src={obj.link} allowFullScreen></iframe>
    </div>
</div>
  )
}

</div>




<div className="col-md-6">
  <form onSubmit={this.submitting.bind(this)} name="search-form"  style= {{}}  className="form-inline mb-5 centered" id="searchVideos">
    <input type="text" id="query" placeholder="Video name" />
    <input type="submit" id="search -btn" value="search" />
  </form>


      {
          Videos.link && Videos.link.map((obj, i) => {
          let Vid = <div key={Videos.videoId[i]} className="Video">
          <p className="title">{Videos.title[i]}  <a className="btn btn-secondary" onClick={this.addVid.bind(this, Videos.videoId[i], Videos.title[i], Videos.link[i])}>+</a></p>
          <iframe  width="500" height="300"  title="{Videos.title[i]}" src={obj} allowFullScreen></iframe>
          </div>
          return Vid;
        })
      }

            </div>
          </div>
        </div>
    </div>
);

}
}

export default App;
