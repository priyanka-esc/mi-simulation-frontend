import React, { useState } from 'react' 
import ReactDOM from 'react-dom' 

class SimulationData extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {            
            booking_bins :props.booking_distance_bins,
            drop_off_points: props.most_popular_dropoff_points,
            pick_up_points: props.most_popular_pickup_points            
        };
    }
    
    render() {");
        //console.log(this.state);
        const { booking_bins, drop_off_points, pick_up_points} = this.state;

        if(booking_bins && booking_bins['From 0->1km'] == 0){
            console.log(booking_bins);
        return (
            <p>hello mister</p>
        );
        }
        if(booking_bins)
        {
        return (
            <div>
            <h1 className="header">Simulation Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Booking bins per km</th>
                        <th>Popular Drop off points</th>
                        <th>Popular pick up points</th>
                    </tr>
                </thead>
                <tbody>
                    {/* { {this.props.friends && this.props.friends.map(friend => {
                        return <tr>
                            <td>{friend._id}</td>
                            <td>{friend.name}</td>
                            <td>{friend.since}</td>
                        </tr>
                    })} */}
                        <tr>
                            <td>{booking_bins}</td>
                            <td>{drop_off_points}</td>
                            <td>{pick_up_points}</td>
                        </tr>
                </tbody>
            </table>
            </div>
        );
    }
        else {
            return null;
        }
    }
}
// let domContainer = document.getElementsByClassName('simulation_data');
// ReactDOM.render(<SimulationData />, domContainer);
export default SimulationData;