import React from 'react';
import { Doughnut } from 'react-chartjs';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import colorHelper from './color-helper'

const InstancesQuery = gql`query InstanceCount($selector: CountSelector) { 
    countBy(selector: $selector) { 
        total, 
        groups { key, value } 
    } 
}`;

const chartOptions = { 
    showTooltips: true 
}

const colors = {
    red: '#FE5A59',
    blue: '#2AB7CA',
    yellow: '#FED766',
    green: '#3CD070',
}


const InstancesChart = ({ data }) =>{
    if(data.loading) {
        return (
            <div>Loading...</div>
        );
    }

    const countBy = data.countBy;

    if(data.error || !countBy) {
        return (
            <div>Error getting data.</div>
        );
    }

    if(!countBy.groups) {
        return (
            <div>
                {countBy.total}
            </div>
        )
    }

    const chartData = countBy.groups.map(c => ({
        label: c.key,
        value: c.value,
        color: colorHelper.getColorByKey(c.key),
    }));

    return (
        <div>
            <Doughnut data={chartData} options={chartOptions} height="200" />
        </div>
    )
}

export default graphql(InstancesQuery, {
    options: ({ selector }) => ({
        pollInterval: 30 * 1000,
        variables: { selector } 
    }),
})(InstancesChart);