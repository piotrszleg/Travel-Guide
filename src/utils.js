import * as React from 'react';

export class Closeable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            onClose : null
        };

        this.open = (onClose)=>this.setState({ open: true, onClose: onClose });
        this.close = ()=>{
            if (props.onClose) {
                props.onClose();
            }
            if (this.state.onClose) {
                this.state.onClose();
            }
            this.setState({ open: false });
        }
    }
}

export const bind = (_this, method) => _this[method].bind(_this);