import React from 'react';
import { renderToString } from 'react-dom/server';
import { Image } from 'imagescript';
import * as fs from 'fs/promises';
import path from 'path';

export const drawCalendar = async () => {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
<foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">${renderToString(
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
            }}
        >
            <p>Calendar</p>
        </div>,
    )}</div>
</foreignObject>
</svg>`;

    console.log(svg);

    const image = await Image.renderSVG(svg, 800, Image.SVG_MODE_WIDTH);

    const uint8image = await image.encodeJPEG();

    await fs.writeFile(path.join(process.cwd(), 'image.jpg'), uint8image, { encoding: 'binary' });

    return uint8image;
};

// drawCalendar();
