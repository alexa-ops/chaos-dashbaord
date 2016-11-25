import React, { Component } from 'react';
import Dashboard from 'react-dazzle';

import InstanceCounts from './InstanceCounts'
import InstanceList from './InstanceList'

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css';

class AppDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Widgets that are available in the dashboard
      widgets: {
          InstanceList: {
            type: InstanceList,
            title: 'Instances',
            props: {
              state: ''
            }
          },
          InstancesByAZ: {
              type: InstanceCounts,
              title: 'By AZ',
              props: {
                selector: 'az'
              }
          },
          InstancesBySize: {
              type: InstanceCounts,
              title: 'By Size',
              props: {
                selector: 'size'
              }
          },
          InstancesByState: {
              type: InstanceCounts,
              title: 'By State',
              props: {
                selector: 'state'
              }
          }
      },
      // Layout of the dashboard
      layout: {
        rows: [{
          columns: [{
            className: '',
            widgets: [{ key: 'InstanceList' }],
          }],
        }, {
          columns: [{
            className: 'four columns',
            widgets: [{ key: 'InstancesByAZ' }],
          }, {
            className: 'four columns',
            widgets: [{ key: 'InstancesBySize' }],
          }, {
            className: 'four columns',
            widgets: [{ key: 'InstancesByState' }],
          }],
        }],
      }
    };
  }

  render() {
    return (
    <div className="">
      <Dashboard layout={this.state.layout} widgets={this.state.widgets} />
    </div>
    );
  }
}

export default AppDashboard;