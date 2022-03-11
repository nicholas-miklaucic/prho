import { Button, Position, Toaster } from "@blueprintjs/core";
import ReactDOM from "react-dom";

let blocks = document.querySelectorAll("pre > code");

blocks.forEach((block) => {
    // only add button if browser supports Clipboard API
    if (navigator.clipboard) {
        let pre = block.parentElement;
        pre.classList.add("pre-code-block");
        let btn = document.createElement('span');
        btn.classList.add('copy-btn-container');
        ReactDOM.render((
            <Button icon="clipboard"
                minimal={true}
                className="code-btn"
                onClick={copyCode}>
            </Button>
        ), btn);
        pre.replaceChild(btn, block);
        pre.appendChild(block);
    }
});

async function copyCode(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    console.log(e.currentTarget.parentElement.parentElement);
    let pre = e.currentTarget.parentElement.parentElement;
    let block = pre.querySelector('code');

    let codeToaster = Toaster.create({
        position: Position.TOP,
    });

    // there is a very strange bug here, where line numbers end up being inserted like empty lines. The replace call fixes this.
    await navigator.clipboard.writeText(block.innerText.replaceAll('\n\n', '\n'));

    codeToaster.show({ message: "Copied code!", timeout: 1000 })
}
