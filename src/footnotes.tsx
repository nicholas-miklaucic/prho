import React from 'react';
import ReactDOM from 'react-dom';
import { Classes as C, Popover2 } from "@blueprintjs/popover2";
import { Classes } from '@blueprintjs/core';
import renderFootnoteBlock from './footnotesCollapse';
import Interweave from 'interweave';

function Footnote(props) {
    return (
        <Popover2
            interactionKind="hover"
            popoverClassName={C.POPOVER2_CONTENT_SIZING}
            placement="auto"
            content={
                <div className={Classes.RUNNING_TEXT}>
                    {props.content}
                </div>
            }>
            <sup id={"fnref-" + props.id}>
                <a className="footnote-ref" href={"#fn-" + props.id}>{props.num}</a>
            </sup>
        </Popover2 >
    );
}

export default function renderFootnotes() {
    document.querySelectorAll('sup > a.footnote-ref').forEach(function repl(el: Element, _ind: Number, _allEls: NodeListOf<Element>) {
        console.log('Editing in footnote...')
        let num = el.innerHTML;
        let child = document.querySelector(el.getAttribute('href'));
        let id_ = el.parentElement.id.split('-').pop();

        let temp = document.createElement('span');
        ReactDOM.render(<Footnote id={id_} num={num} content={<Interweave content={child.outerHTML} />} />, temp);
        el.parentElement.replaceWith(temp);
    });

    renderFootnoteBlock();
}


setTimeout(renderFootnotes, 2000);
