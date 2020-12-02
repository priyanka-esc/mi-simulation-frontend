import React, { useState } from 'react' 
import ReactDOM from 'react-dom' 
import config from './config/config.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        minLatitude:'',
        maxLatitude:'',
        minLongitude:'',
        maxLongitude:'',
        requestCount:'',
       booking_bins:[],
       drop_off_points:[],
       pick_up_points:[]
    };

    this.simulate = this.simulate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayBinData = this.displayBinData.bind(this);
  }

displayBinData() {
  return  (
 <div>
   <div>
   <table>
       <th>
           Bins per km
       </th>
       <tbody>
              { 
                       this.state.booking_bins.map((bin => 
                        <tr><td>{bin}</td></tr>  
                       ))
              }   
       </tbody>
   </table>
   </div>
   <div>
   <p> popular drop off points</p>
         <table>
         <tr>
                 <th>Name</th>
                 <th>Coordinates</th>
                 </tr>
                 <tbody>
                    { 
                             this.state.drop_off_points.map((point => 
                                 <tr>
                                 <td>{point["name"]}</td>
                                 <td>{point["coordinates"]}</td>
                            </tr>  
                             )
                    )}   
                    </tbody>
         </table>
         </div>
         <div>
         <p> popular pick up points</p>
         <table>
             <tr>
                 <th>Name</th>
                 <th>Coordinates</th>
                 </tr>
                 <tbody>
                    { 
                             this.state.pick_up_points.map((point => 
                              <tr>
                                  <td>{point["name"]}</td>
                                  <td>{point["coordinates"]}</td>
                             </tr>  
                             )
                    )}   
                    </tbody>
         </table>
         </div>
         </div>
  );
}

  simulate(e) {

   let url = `${config.BACKEND_SERVER_URL}?minLatitude=${encodeURIComponent(this.state.minLatitude)}&maxLatitude=${encodeURIComponent(this.state.maxLatitude)}&minLongitude=${encodeURIComponent(this.state.minLongitude)}&maxLongitude=${encodeURIComponent(this.state.maxLongitude)}`;
    if(this.state.requestCount)
        {
            url = url + `&requestCount=${encodeURIComponent(this.state.requestCount)}`;
        }
 fetch(url,
        {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let tempArr = [];
        let keys = Object.keys(response.booking_distance_bins);
        keys.forEach(key =>{
            var value = response.booking_distance_bins[key];
            tempArr.push(key+" "+value);
        });

        let parsed = JSON.parse(response.most_popular_dropoff_points);
        let tempDropOffPoints = [];
        parsed.features.forEach(feature => 
            {
                tempDropOffPoints.push(
                {"name":feature.properties.name,
                 "coordinates":feature.geometry.coordinates});
            }
        );

        parsed = JSON.parse(response.most_popular_pickup_points);
        let tempPickupPoints = [];
        parsed.features.forEach(feature => 
            {
                tempPickupPoints.push(
                {"name":feature.properties.name,
                 "coordinates":feature.geometry.coordinates});
            }
        );

        this.setState({
            booking_bins:tempArr,
            drop_off_points:tempDropOffPoints,
            pick_up_points:tempPickupPoints
        });       
      })
      .catch(err => {
        console.log(err);
      });
      return this.displayBinData();
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
        return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Simulate Mobility Intelligence</h1>
              <form className="d-flex flex-column">
                <legend className="text-center">Please enter min-max latitudes and min-max longitudes within Berlin</legend>
                <p/>
                <div>
                <label htmlFor="minLatitude">
                  Minimum latitude:
                  <input
                    name="minLatitude"
                    id="minLatitude"
                    type="text"
                    className="form-control"
                    value={this.state.minLatitude}
                    onChange={(e) => this.handleChange({ minLatitude: e.target.value })}
                    required
                    />
                </label>
                </div>
                <br/>
                <div>
                <label htmlFor="maxLatitude">
                  Maximum latitude:
                  <input
                    name="maxLatitude"
                    id="maxLatitude"
                    type="text"
                    className="form-control"
                    value={this.state.maxLatitude}
                    onChange={(e) => this.handleChange({ maxLatitude: e.target.value })}
                    required
                    />
                </label>
                </div>
                <br/>
                <div>
                <label htmlFor="minLongitude">
                  Minimum longitude:
                  <input
                    name="minLongitude"
                    id="minLongitude"
                    type="text"
                    className="form-control"
                    //value={this.state.name}
                    //onChange={(e) => this.handleChange({ name: e.target.value })}
                    
                    value={this.state.minLongitude}
                    onChange={(e) => this.handleChange({ minLongitude: e.target.value })}
                    required
                    />
                </label>
                </div>
                <br/>
                <div>
                <label htmlFor="maxLongitude">
                  Maximum longitude:
                  <input
                    name="maxLongitude"
                    id="maxLongitude"
                    type="text"
                    className="form-control"
                    value={this.state.maxLongitude}
                    onChange={(e) => this.handleChange({ maxLongitude: e.target.value })}
                    required
                    />
                </label>
                </div>
                <br/>
                <label htmlFor="requestCount">
                  Number of requests:
                  <input
                    name="requestCount"
                    id="requestCount"
                    type="text"
                    className="form-control"
                    value={this.state.requestCount}
                    onChange={(e) => this.handleChange({ requestCount: e.target.value })}
                    />
                </label>
                <p/>
                <div>
                    <button className="btn btn-primary" type='button' onClick={(e) => this.simulate(e)}>
                  Simulate
                </button>
                </div>
              </form>
              <br/>
            </div>
          </div>
        </div>
    );
}
}
 
let domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);
export default App;