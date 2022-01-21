import * as React from 'react';

export class Closeable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.open = ()=>this.setState({ open: true });
        this.close = ()=>{
            if (props.onClose) {
                props.onClose();
            }
            this.setState({ open: false });
        }
    }
}

export const bind = (_this, method) => _this[method].bind(_this);