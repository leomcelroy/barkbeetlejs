import React, { Component } from 'react';

class Workplane extends Component {

  state = {
      width: 500,
      height: 500,
      v0: 0,
      v1: 0,
      v2: 500,
      v3: 500,
    };

  wheel(e) {
    e.preventDefault();
    // let loc = utils.getSVGpoint(e, this.state.v0, this.state.v1, this.state.v2, this.state.v3 ,this.state.width, this.state.height);

    if (e.ctrlKey) {

      let zoomRate = 10;
      //zooms to center now

      if (e.deltaY < 0) {
        //console.log('zoom in');

        let v2 = (e.deltaY * zoomRate + this.state.v2 > 1) ? e.deltaY * zoomRate + this.state.v2 : this.state.v2;
        let v3 = (e.deltaY * zoomRate + this.state.v3 > 1) ? e.deltaY * zoomRate + this.state.v3 : this.state.v3;

        let v0 = this.state.v0 - e.deltaY * zoomRate/2;
        let v1 = this.state.v1 - e.deltaY * zoomRate/2;
        // console.log("e.deltaY * zoomRate", e.deltaY * zoomRate)
        // console.log("v0", e.deltaY * zoomRate, v0)
        // console.log("v1", this.state.v1, v1)

        this.setState({v0, v1, v2, v3})
      }

      if (e.deltaY > 0) {
        //console.log('zoom out');

        let v2 = e.deltaY * zoomRate + this.state.v2;
        let v3 = e.deltaY * zoomRate + this.state.v3;

        let v0 = this.state.v0 - e.deltaY * zoomRate/2;
        let v1 = this.state.v1 - e.deltaY * zoomRate/2;

        this.setState({v0,v1, v2, v3})
      }

      return
    }

    if (e.deltaY < 0) {
      //console.log('scrolling up');

      let v1 = this.state.v1 + e.deltaY;
      this.setState({v1});
    }
    if (e.deltaY > 0) {
      //console.log('scrolling down');

      let v1 = this.state.v1 + e.deltaY;
      this.setState({v1});
    }
    if (e.deltaX < 0) {
      //console.log('scrolling left');

      let v0 = this.state.v0 + e.deltaX;
      this.setState({v0});
    }
    if (e.deltaX > 0) {
      //console.log('scrolling right');

      let v0 = this.state.v0 + e.deltaX;
      this.setState({v0});
    }
  }

  render() {

    return (
      <svg
        width={this.state.width}
        height={this.state.height}
        viewBox={`${this.state.v0} ${this.state.v1} ${this.state.v2} ${this.state.v3}`}
        xmlns={"http://www.w3.org/2000/svg"}
        onWheel={(e) => this.wheel(e)}
        style={{border: "1px solid #cccccc"}}>

          {this.props.groups}
      </svg>
    );
  }
}

export {Workplane}

// import React, { Component, useState} from 'react';
// import * as utils from './utils.js';
//
//
// const Workplane = ({groups}) => {
//
//   const [state, setState] = useState({
//       width: 500,
//       height: 500,
//     });
//
//   const [v0, setV0] = useState(0);
//   const [v1, setV1] = useState(0);
//   const [v2, setV2] = useState(500);
//   const [v3, setV3] = useState(500);
//
//   const wheel = (e) => {
//     e.preventDefault();
//     let loc = utils.getSVGpoint(e, v0, v1, v2, v3 ,state.width, state.height);
//
//     if (e.ctrlKey) {
//
//       let zoomRate = 10;
//       //zooms to center now
//
//       if (e.deltaY < 0) {
//         //console.log('zoom in');
//
//         let v2Temp = (e.deltaY * zoomRate + v2 > 1) ? e.deltaY * zoomRate + v2 : v2;
//         let v3Temp = (e.deltaY * zoomRate + v3 > 1) ? e.deltaY * zoomRate + v3 : v3;
//
//         let v0Temp = v0 - e.deltaY * zoomRate/2;
//         let v1Temp = v1 - e.deltaY * zoomRate/2;
//         // console.log("e.deltaY * zoomRate", e.deltaY * zoomRate)
//         // console.log("v0", e.deltaY * zoomRate, v0)
//         // console.log("v1", state.v1, v1)
//
//         setV0(v0Temp);
//         setV1(v1Temp);
//         setV2(v2Temp);
//         setV3(v3Temp);
//       }
//
//       if (e.deltaY > 0) {
//         //console.log('zoom out');
//
//         let v2Temp = e.deltaY * zoomRate + v2;
//         let v3Temp = e.deltaY * zoomRate + v3;
//
//         let v0Temp = v0 - e.deltaY * zoomRate/2;
//         let v1Temp = v1 - e.deltaY * zoomRate/2;
//
//         setV0(v0Temp);
//         setV1(v1Temp);
//         setV2(v2Temp);
//         setV3(v3Temp);
//       }
//
//       return
//     }
//
//     if (e.deltaY < 0) {
//       console.log('scrolling up');
//
//       let v1Temp = v1 + e.deltaY;
//       setV1(v1Temp);
//     }
//     if (e.deltaY > 0) {
//       console.log('scrolling down');
//
//       let v1Temp = v1 + e.deltaY;
//       setV1(v1Temp);
//     }
//     if (e.deltaX < 0) {
//       console.log('scrolling left');
//
//       let v0Temp = v0 + e.deltaX;
//       setV0(v0Temp);
//     }
//     if (e.deltaX > 0) {
//       console.log('scrolling right');
//
//       let v0Temp = v0 + e.deltaX;
//       setV0(v0Temp);
//     }
//   }
//
//   console.log(v0, v1)
//
//   return (
//       <svg
//         width={state.width}
//         height={state.height}
//         viewBox={`${v0} ${v1} ${v2} ${v3}`}
//         xmlns={"http://www.w3.org/2000/svg"}
//         onWheel={(e) => wheel(e)}
//         style={{border: "1px solid #cccccc"}}>
//
//           {groups}
//       </svg>
//   );
//
// }
//
// export {Workplane}
