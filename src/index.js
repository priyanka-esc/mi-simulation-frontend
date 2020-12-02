import React,{ useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const ParentComponent = () => { 
//   const [stateVariable, setStateVariable] = useState('this is the starting value for the variable'); 
//   return ( 
//       <div> 
//           <h1>This is a function component view in parent function</h1>
//           <ChildComponent exampleProp={stateVariable} />
//       </div> 
//   ) 
// } 
// const ChildComponent = (props) => {
//   return (
//       <div>
//           <h2>{props.exampleProp}</h2>
//       </div>
//   )
// }
// ReactDOM.render( <ParentComponent />, document.getElementById('root') );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
