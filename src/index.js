const utils = {
    css(node, props) {
        if (node.currentStyle) {
            return node.currentStyle[props];
        } else {
            return getComputedStyle(node, null)[props];
        }
    }
};

class DotLine {
    constructor(cfg) {
        this.props = cfg || {};
        this.init();
    }

    init() {
        const _props = this.props;
        this.decorator = document.createElement('canvas');
        this.decorator.className = `dl${_props.className ? ' ' + _props.className : ''}`;

        this.initDecorator();
        this.createPoints();
        this.initComponent();

        window.addEventListener('resize', () => {
            if (this.pNode) {
                const size = {
                    width: parseInt(utils.css(this.pNode, 'width')),
                    height: parseInt(utils.css(this.pNode, 'height'))
                };
                this.decorator.width = size.width;
                this.decorator.height = size.height;
                this.size = size;
            }
        }, false);
    }

    createPoints = () => {
        const _props = this.props || {};
        const _size = this.size || {};
        const count = _props.points || 200;
        const points = [];
        let speed;
        switch(_props.speed) {
            case 'slow':
                speed = 1;
                break;
            case 'fast':
                speed = 4;
                break;
            default:
                speed = 2;
                break;
        }
        for( let i = count; i; i-- ) {
            points.push({
                x: Math.round(Math.random() * _size.width),
                y: Math.round(Math.random() * _size.height),
                xSpeed: speed / 2 - Math.random() * speed,
                ySpeed: speed / 2 - Math.random() * speed,
                r: _props.maxPointSize > 1 ? Math.round(Math.random() * _props.maxPointSize) + 1 : 1
            });
        }
        this.points = points;
    }

    initDecorator = () => {
        const _props = this.props || {};
        let parent;
        if (_props.parentId) {
            parent = document.querySelector(`#${_props.parentId}`);
        } else {
            parent = document.documentElement ? document.documentElement : document.body;
        }
        if (utils.css(parent, 'position') === 'static') {
            parent.style.position = 'relative';
        }
        this.decorator.style.cssText = `position:absolute;top:0;left:0;z-index:${_props.zIndex || 100000};`;
        this.pNode = parent;
        this.ctx = this.decorator.getContext('2d');
        this.size = {
            width: parseInt(utils.css(parent, 'width')),
            height: parseInt(utils.css(parent, 'height'))
        };
    }

    initComponent = () => {
        const _size = this.size || {};
        this.decorator.width = _size.width;
        this.decorator.height = _size.height;

        // this.drawPoints();
        this.startDecorate();
    }

    startDecorate = () => {
        this.pNode.appendChild(this.decorator);
        this.drawPoints();
    }

    drawPoints = () => {
        const _props = this.props || {};
        const maxSpace = _props.maxSpace || 100;
        const ctx = this.ctx;
        const _size = this.size || {};
        const pl = this.points.length;
        ctx.clearRect(0, 0, _size.width, _size.height);
        this.points.forEach((p, i) => {
            p.xSpeed *= (p.x + p.xSpeed > _size.width || p.x + p.xSpeed < 0) ? -1 : 1;
            p.ySpeed *= (p.y + p.ySpeed > _size.height || p.y + p.ySpeed < 0) ? -1 : 1;
            p.x += p.xSpeed;
            p.y += p.ySpeed;
            ctx.fillStyle = _props.pointColor || 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = _props.lineColor || 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = _props.lineWidth || 0.5;
            for (let s = i + 1; s < pl; s++) {
                const p2 = this.points[s];
                if (p2.x === p.x && p2.y === p.y) {
                    continue;
                }
                if (Math.abs(p2.x - p.x) > maxSpace || Math.abs(p2.y - p.y) > maxSpace) {
                    continue;
                }
                const pdiff = Math.sqrt(Math.pow(p2.x - p.x, 2) + Math.pow(p2.y - p.y, 2));
                if (pdiff <= maxSpace) {
                    ctx.beginPath();
                    ctx.moveTo(p2.x, p2.y);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                }
            }
            // this.points.forEach(p2 => {
            //     const pdiff = Math.sqrt(Math.pow(p2.x - p.x, 2) + Math.pow(p2.y - p.y, 2));
            //     if (pdiff < maxSpace) {
            //         ctx.beginPath();
            //         ctx.moveTo(p2.x, p2.y);
            //         ctx.lineTo(p.x, p.y);
            //         ctx.stroke();
            //     }
            // });
        });
        requestAnimationFrame(this.drawPoints);
    }
}

export {
    DotLine as default
};
