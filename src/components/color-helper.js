

const colors = {
    red: '#FE5A59',
    blue: '#2AB7CA',
    yellow: '#FED766',
    green: '#3CD070',
}

const getColorByKey = (key) => {
    switch(key) {
        case 'running':
            return colors.green;
        case 'rebooting':
            return colors.green;
        case 'pending':
        case 'shutting-down':
        case 'stopping':
            return colors.yellow;
        case 'terminated':
        case 'stopped':
            return colors.red;
        case 'us-east-1c':
        case 't2.nano':
            return '#50514F'
    }
}

module.exports = {
    colors,
    getColorByKey
}