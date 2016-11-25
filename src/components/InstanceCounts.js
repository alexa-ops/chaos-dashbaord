import React from 'react';
import { Doughnut } from 'react-chartjs';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const InstancesQuery = gql`query InstanceCount($selector: CountSelector) { 
    countBy(selector: $selector) { 
        total, 
        groups { key, value } 
    } 
}`;

const chartOptions = { 
    showTooltips: true 
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
        // color: '#F7464A',
        // highlight: '#FF5A5E',
    }));

    return (
        <div>
            <Doughnut data={chartData} options={chartOptions} height="200" width="350"/>
        </div>
    )
}

export default graphql(InstancesQuery, {
  options: ({ selector }) => ({ variables: { selector } }),
})(InstancesChart);