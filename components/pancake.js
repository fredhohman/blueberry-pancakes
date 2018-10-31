const React = require('react');

class pancake extends React.Component {
    render() {

        const { idyll, hasError, updateProps, ...props } = this.props;
        let pancakeSpanStyle = { fontWeight: '700', color: '#b45326' };
        let numberSpanStyle = { fontWeight: '700', color: '#0948be' };

        return (
            <span>
                <span {...props} style={pancakeSpanStyle}>
                    P
                </span>
                <span {...props} style={numberSpanStyle}>
                    {this.props.number}
                </span>
            </span>
        );
    }
}

module.exports = pancake;
