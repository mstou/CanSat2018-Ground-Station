import React from 'react';

class StatusBar extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div id="statusBar">
          {this.props.dataToDisplay.map(data => <p id={data.name}> {data.name}: {data.value} </p> )}
        </div>
      );
    }

}
export { StatusBar };
