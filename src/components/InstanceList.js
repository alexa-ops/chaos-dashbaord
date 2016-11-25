import './InstanceList.css';

import React from 'react';
import { Doughnut } from 'react-chartjs';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import colorHelper from './color-helper'

const InstancesQuery = gql`query InstanceList($state: String) { 
    list(state: $state) {
        InstanceId,
        ImageId,
        State {
            Name
        },
        Placement {
            AvailabilityZone
        },
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
                        <th>AvailabilityZone</th>
                        <th>InstanceId</th>
                        <th>ImageId</th>
                    </tr>
                </thead>
                <tbody>
                {instances.map(i => {
                    const nameTag = i.Tags ? i.Tags.find(t => t.Key === 'Name') : { Value: '' }
                    const state = i.State ? i.State.Name : ''
                    const stateColor = colorHelper.getColorByKey(state);

                    const size = 10;
                    const indicatorStyles = {
                        display: 'inline-block',
                        margin: '12px 8px',
                        verticalAlign: 'middle',
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                        backgroundColor: stateColor
                    };
                    return (
                    <tr key={i.InstanceId}>
                        <td>{nameTag ? nameTag.Value : ''}</td>
                        <td><span style={indicatorStyles} />{state}</td>
                        <td>{i.Placement ? i.Placement.AvailabilityZone : ''}</td>
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