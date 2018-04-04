import React from 'react';

class StatusBar extends React.Component {
    render() {
      return (
        <div id="statusBar">
          {this.props.dataToDisplay.map(data => <p key={data.name}> {data.name}: {data.value} </p> )}
        </div>
      );
    }

}
export { StatusBar };
