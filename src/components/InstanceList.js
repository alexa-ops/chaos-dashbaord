import './InstanceList.css';

import React from 'react';
import { Doughnut } from 'react-chartjs';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const InstancesQuery = gql`query InstanceList($state: String) { 
    list(state: $state) {
        InstanceId,
        ImageId,
        State {
            Name
        }
        Tags {
            Key,
            Value
        }
    } 
}`;

const InstancesList = ({ data }) =>{
    if(data.loading) {
        return (
            <div>Loading...</div>
        );
    }

    const instances = data.list;

    if(data.error || !instances) {
        return (
            <div>Error getting data.</div>
        );
    }

    if(!instances.length) {
        return (
            <div>
                <p>0 Instances</p>
                <p>Congratulations, you are now Serverless!</p>
            </div>
        )
    }

    return (
        <div className="instance-list">
            <table className="u-full-width">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>InstanceId</th>
                        <th>ImageId</th>
                    </tr>
                </thead>
                <tbody>
                {instances.map(i => {
                    const nameTag = i.Tags ? i.Tags.find(t => t.Key === 'Name') : { Value: '' }
                    return (
                    <tr key={i.InstanceId}>
                        <td>{nameTag ? nameTag.Value : ''}</td>
                        <td>{i.State.Name}</td>
                        <td>{i.InstanceId}</td>
                        <td>{i.ImageId}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default graphql(InstancesQuery, {
    options: ({ state }) => ({ 
        pollInterval: 30 * 1000,
        variables: { state } 
    }),
})(InstancesList);