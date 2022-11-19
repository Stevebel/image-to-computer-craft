const HERMITE = new Hermite_class();
let img;
const iq = window['image-q'];
const handleFileSelect = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    // Load image into canvas
    reader.onload = (event) => {
        const editor = document.getElementById('editor');
        editor.classList.remove('hidden');
        const canvas = document.getElementById('canvas');
        img = new Image();
        img.onload = () => {
            drawImage();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

function getCanvas() {
    return document.getElementById('canvas');
}
function getWidthInput() {
    return document.getElementById('width');
}
function getHeightInput() {
    return document.getElementById('height');
}

function getWidth() {
    return parseInt(getWidthInput().value);
}

function getHeight() {
    return parseInt(getHeightInput().value);
}

function drawImage() {
    const canvas = getCanvas();
    canvas.width = img.width;
    canvas.height = img.height;
    if (getWidth() === 0) {
        getWidthInput().value = img.width;
    }
    if (getHeight() === 0) {
        getHeightInput().value = img.height;
    }
    canvas.getContext('2d').drawImage(img,0,0);
}

async function convertImage(cb) {
    drawImage();
    const canvas = getCanvas();
    HERMITE.resample(canvas, getWidth(), getHeight(), true, async function(){
        const pointContainer = iq.utils.PointContainer.fromHTMLCanvasElement(canvas);
        const palette = await iq.buildPalette([pointContainer], {
            colorDistanceFormula: 'cie94-graphic-arts', // optional
            paletteQuantization: 'neuquant', // optional
            colors: 16, // optional
            onProgress: (progress) => console.log('buildPalette', progress), // optional
        });
        const outPointContainer = await iq.applyPalette(pointContainer, palette, {
            colorDistanceFormula: 'cie94-graphic-arts',
            imageQuantization: 'stucki',
            onProgress: (progress) => console.log('applyPalette', progress), // optional
        });
        const outArray = outPointContainer.toUint32Array();
        // Update canvas
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(getWidth(), getHeight());
        imgData.data.set(new Uint8ClampedArray(outArray.buffer));
        ctx.putImageData(imgData, 0, 0);

        cb && cb(canvas, palette);
    });
    
}

async function doPreview() {
    await convertImage();
}

async function doExport() {
    await convertImage((canvas, palette) => {
        const pal = formatPalette(palette);
        // Get pixels from canvas
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        // Map palette to ComputerCraft blit color indices
        const colorMap = {};
        pal.forEach((color, index) => {
            colorMap[color] = index.toString(16);
        });
        // Generate blit lines
        const lines = [];
        for (let y = 0; y < canvas.height; y+=3) {
            let text = '';
            let textColors = '';
            let bgColors = '';
            for (let x = 0; x < canvas.width; x+=2) {
                const chunk = [];
                for (let dy = 0; dy < 3; dy++) {
                    for (let dx = 0; dx < 2; dx++) {
                        const i = ((y+dy) * canvas.width + (x+dx)) * 4;
                        const color = rgbToHex(pixels[i], pixels[i+1], pixels[i+2]);
                        chunk.push(colorMap[color] || '0');
                    }
                }
                const {text: t, textColor: tc, bgColor: bc} = chunkToBlit(chunk);
                text += t;
                textColors += tc;
                bgColors += bc;
            }
            lines.push({
                text,
                textColors,
                bgColors,
            });
        }
        const out = generateLua(lines, pal, canvas.width, canvas.height);
        console.log(out);

        // Copy out to clipboard
        const message = document.getElementById('message');
        navigator.clipboard.writeText(out).then(function() {
            message.innerText = 'Copied to clipboard!';
        }, function() {
            message.innerText = out;
        });
    });
}

function chunkToBlit(chunk) {
    // Find most used colors in chunk
    const colors = {};
    chunk.forEach(color => {
        colors[color] = (colors[color] || 0) + 1;
    });
    const sortedColors = Object.keys(colors).sort((a, b) => colors[b] - colors[a]);
    if (sortedColors.length === 1) {
        // Single color
        return {
            text: `\\128`,
            textColor: '0',
            bgColor: sortedColors[0],
        };
    }

    let bgColor = sortedColors[0];
    let textColor =  sortedColors[1];
    const reverse = chunk[5] !== bgColor;
    const targetColor = reverse ? bgColor : textColor;

    // Convert chunk to blit text
    let byte = 0;
    for (let i = 0; i < 6; i++) {
        if (chunk[i] === targetColor) {
            byte |= 1 << i;
        }
    }

    if (reverse) {
        bgColor = textColor;
        textColor = targetColor;
    }

    return {
        text: `\\${(byte + 128).toString()}`,
        textColor,
        bgColor,
    };
}

function formatPalette(palette) {
    return palette.getPointContainer().getPointArray().map((point) => rgbToHex(point.r, point.g, point.b));
}

function rgbToHex(r, g, b) {
    return `0x${((r << 16) + (g << 8) + b).toString(16)}`
}

function generateLua(lines, pal, width, height) {
return `
-- This code was automatically generated
--
-- Usage:
--   local myImage = require('my-image')
--   local monitor = peripheral.find('monitor')
--   monitor.setTextScale(0.5)
--   monitor.setCursorPos(1, 1)
--   myImage.draw(monitor) or myImage.draw(term)

local image = {
    colors = {
        ${pal.map((color, index) => `${color}`).join(',\n\t\t')}
    }
}

function image.draw(t)
    local x, y = t.getCursorPos()
    -- Set palette colors
    ${pal.map((color, index) => `t.setPaletteColor(2^${index}, ${color})`).join('\n\t')}
    -- Blit
    ${lines.map((line, index) => 
        `t.setCursorPos(x, y + ${index})\n\t`
        +`t.blit('${line.text}', '${line.textColors}', '${line.bgColors}')`
    ).join('\n\n\t')}
end

function image.getSize()
    return ${width}, ${height}
end

return image
`;
}

// Init
document.getElementById('file').addEventListener('change', (e) => handleFileSelect(e), false);
document.getElementById('preview').addEventListener('click', doPreview, false);
document.getElementById('export').addEventListener('click', doExport, false);