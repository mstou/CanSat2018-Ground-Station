import React from 'react';

class StatusBar extends React.Component {
    render() {
      return (
        <div id="statusBar">
          {this.props.dataToDisplay.map(data => <p key={data.name}> <strong> {data.name} </strong>: {data.value + data.units} </p> )}
        </div>
      );
    }

}
export { StatusBar };
