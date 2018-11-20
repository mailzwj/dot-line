import React, { Component } from 'react';
import { render } from 'react-dom';

import DotLine from '../DotLine.min';

import './index.less';

class Demo extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const dec = new DotLine({
            parentId: 'J_CW',
            points: 100,
            maxPointSize: 2,
            pointColor: "rgba(255, 100, 0, 0.5)",
            lineColor: "rgba(255, 100, 0, 0.4)",
            lineWidth: 0.5,
            maxSpace: 50
        });

        const dec2 = new DotLine({
            points: 200,
            maxPointSize: 2,
            pointColor: "rgba(83, 150, 255, 0.5)",
            lineColor: "rgba(83, 150, 255, 0.4)",
            lineWidth: 0.5,
            maxSpace: 100,
            speed: 'fast'
        });
    }

    render() {
        return (
            <div className="cw" id="J_CW">
                {/* <DotLine className="my-decorate"
                    points={500}
                    maxPointSize={2}
                    pointColor="rgba(255, 100, 0, 0.5)"
                    lineColor="rgba(255, 100, 0, 0.4)"
                    lineWidth={0.5}
                    maxSpace={80}
                    // speed="slow"
                /> */}
            </div>
        );
    }
}

const page = document.createElement('div');
page.style.height = '100%';
document.body.appendChild(page);

render(<Demo />, page);
