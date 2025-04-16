import './data.css';
import { formatDistanceToNow } from "date-fns";
import React, {Component} from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            date: props.date ? formatDistanceToNow(new Date(props.date), {includeSeconds: true}) :
            "Invalid date"};
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            30000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: this.props.date ? formatDistanceToNow(new Date(this.props.date), {includeSeconds: true}) :
            "Invalid date"
        });
    }

    render () {
        return (
            <span className='created'>{this.state.date}</span>
        )
    }
}