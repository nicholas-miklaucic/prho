import { useEffect } from 'react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import remarkFootnotes from 'remark-footnotes';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import numberedFootnoteLabels from 'remark-numbered-footnote-labels';
import renderFootnotes from './footnotes';

import Preset from 'unified';
import 'katex/dist/katex.min.css';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useRemark } from 'react-remark';
import { Classes, Navbar, Button, Alignment, Tabs, Tab, Code } from '@blueprintjs/core';
import * as Space from 'react-spaces';


const testURL = 'https://gist.githubusercontent.com/nicholas-miklaucic/5df8dae0ff348b42a9501f8aba01e310/raw/e6672af2287b4f533fcfd204af2480876a74dd10/test.md';
const sampleURL = 'https://gist.githubusercontent.com/nicholas-miklaucic/831b8cfa96644e8804786d6201f5ec33/raw/01b7c311197d1c4b66dd96479b5ff4f458560e61/sample-text.md';
const mathURL = 'https://gist.githubusercontent.com/nicholas-miklaucic/058b0b4e8a632d5622cd64d28732e748/raw/4fc1c1d52e9bda2f7987ec4c7ca5322d79d8a1b9/equations.md';

export function App(props) {
    const [reactContent, setMarkdownSource] = useRemark({
        remarkPlugins: [remarkMath, remarkGfm, remarkFootnotes, numberedFootnoteLabels],
        remarkToRehypeOptions: { allowDangerousHtml: true },
        rehypePlugins: {
            plugins: [
                rehypeRaw,
                rehypeKatex,
                [rehypePrism, { showLineNumbers: false }]],
        },
        rehypeReactOptions: {
            allowDangerousHtml: true,
            components: {
                table: (props) => <table className="bp4-html-table bp4-html-table-striped bp4-interactive" {...props} />,
            },
        },
    });

    const [codeContent, setCodeSource] = useRemark({
        remarkPlugins: [],
        remarkToRehypeOptions: { allowDangerousHtml: true },
        rehypePlugins: {
            plugins: [[rehypePrism, { showLineNumbers: true }]],
        },
        rehypeReactOptions: {
            components: {
            },
        },
    });

    useEffect(() => {
        fetch(mathURL).then(resp => resp.text()).then(text => setMarkdownSource(text));
        setCodeSource(`
\`\`\`python
from scipy import stats
import param
import panel as pn
import bokeh
import numpy as np


class GaussianMixture(param.Parameterized):
    w = param.Magnitude(default=0.5, step=0.01)
    mu1 = param.Number(default=66, bounds=(48, 84), step=0.1)
    mu2 = param.Number(default=68, bounds=(48, 84), step=0.1)
    sigma1 = param.Number(default=2.95, bounds=(0, 4), step=0.01)
    sigma2 = param.Number(default=2.95, bounds=(0, 4), step=0.01)

    @pn.depends('w', 'mu1', 'mu2', 'sigma1', 'sigma2')
    def plot(self):
        dist1 = stats.norm(loc=self.mu1, scale=self.sigma1)
        dist2 = stats.norm(loc=self.mu2, scale=self.sigma2)

        xx = np.linspace(47.5, 84.5, 100)
        yy1 = dist1.pdf(xx)
        yy2 = dist2.pdf(xx)
        yy = yy1 * self.w + yy2 * (1 - self.w)

        p = bokeh.plotting.figure(title=f"Metropolis-Hastings",
                                  sizing_mode='scale_height',
                                  tools='',
                                  x_range=(min(xx), max(xx)),
                                  y_range=(0, max(max(yy1), max(yy2)) * 1.2))

        p.line(x=xx,
               y=yy1,
               width=2,
               legend_label='Distribution 1',
               color=c1,
               line_width=1)
        p.line(x=xx,
               y=yy2,
               width=2,
               legend_label='Distribution 2',
               color=c2,
               line_width=1)
        p.line(x=xx,
               y=yy,
               width=2,
               legend_label='Combined',
               color=c3,
               line_width=3)

        # p.quad(left=height_values - 0.5, right=height_values+0.5, bottom=0, top=height_weights, fill_color='grey', alpha=0.3, legend_label='Observed Data')

        return pn.pane.Bokeh(p, theme='dark_minimal')

mix = GaussianMixture()
\`\`\`
        `);
    }, []);
    if (props.showImg) {
        return (
            <Space.Fixed height="100%">
                <Space.LeftResizable size="30%" scrollable={true}>
                    <div className={[Classes.RUNNING_TEXT, Classes.TEXT_LARGE].join(' ')} id="content">
                        {reactContent}
                    </div>
                </Space.LeftResizable>
                <Space.Fill scrollable={true}>
                    <Tabs id="panelTabs" defaultSelectedTabId="plot-tab" large={true} className="panel-tabs">
                        <Tabs.Expander />
                        <Tab id="plot-tab" panel={
                            <div id="img" className='tab-content-container'>
                            </div>
                        }>
                            Plot
                        </Tab>
                        <Tab id="code-tab" panel={
                            <div id="code-tab-content" className={[Classes.RUNNING_TEXT, 'tab-content-container'].join(' ')}>
                                {codeContent}
                            </div>
                        }>
                            Code
                        </Tab>
                        <Tabs.Expander />
                    </Tabs>
                </Space.Fill>
            </Space.Fixed >
        );
    } else {
        return (
            <Space.Fixed height="100%">
                <Space.Left size="20%"></Space.Left>
                <Space.Fixed width="40rem" height="100%" scrollable={true}>
                    <div className={[Classes.RUNNING_TEXT, Classes.TEXT_LARGE].join(' ')} id="content">
                        {reactContent}
                    </div>
                </Space.Fixed>
                <Space.Right size="20%"></Space.Right>
            </Space.Fixed >
        );
    }
}
