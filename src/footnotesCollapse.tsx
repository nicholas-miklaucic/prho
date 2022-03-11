import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Collapse, Divider } from '@blueprintjs/core';
import Interweave from 'interweave';

export interface IFootnotesState {
    isOpen?: boolean;
};

export interface IFootnotesProps {
    inner?: any;
}

class FootnotesCollapse extends React.Component<IFootnotesProps, IFootnotesState> {
    public state = {
        isOpen: false,
    };

    public render() {
        return (
            <div>
                <Button onClick={this.handleClick} minimal={true} icon={this.state.isOpen ? "chevron-up" : "chevron-down"}>
                    Footnotes
                </Button>
                <Collapse isOpen={this.state.isOpen} keepChildrenMounted={true}>
                    {this.props.inner}
                </Collapse>
            </div>
        );
    }

    private handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
}

export default function renderFootnoteBlock() {
    document.querySelectorAll('div.footnotes').forEach(function repl(el: Element, _ind: Number, _allEls: NodeListOf<Element>) {
        let temp = document.createElement('div');
        temp.classList.add('footnotes');
        ReactDOM.render((
            <FootnotesCollapse inner={<Interweave content={el.innerHTML} />} />
        ), temp);
        el.replaceWith(temp);
    });
}
