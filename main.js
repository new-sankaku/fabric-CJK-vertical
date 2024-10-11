const canvas = new fabric.Canvas('c');
const btnFlip = document.getElementById('ButtonFlip');
const text = 'Hello\nこんにちは\n안녕하세요\n你好';

let style = {
  "fill": "#292929",
  "editable": true,
  "fontSize": 50,
  "left": 100,
  "top": 50,
  "width": 100,
  "height": 100
};

const cjkText = new VerticalTextbox(text, style);
cjkText.left = 250;
cjkText.top = 100;

const textbox = new fabric.Textbox(text, Object.assign(style, {
  left: 500
}));

function handleTextFlipped(txtbox, originTxtBox) {
  const originIndex = canvas.getObjects().indexOf(originTxtBox);
  canvas.startEditing();
  canvas.insertAt(txtbox, originIndex, true);
  canvas.stopEditing();
  canvas.setActiveObject(txtbox);
}

btnFlip.onclick = () => {
  const activeObject = canvas.getActiveObject();

  if (activeObject.type === 'vertical-textbox') {
    activeObject.toTextbox(txtbox => handleTextFlipped(txtbox, activeObject));
  } else if (activeObject.type === 'textbox') {
    VerticalTextbox.fromTextbox(activeObject, txtbox => handleTextFlipped(txtbox, activeObject));
  }
};

canvas.add(cjkText);

function updateStyles() {
  if (cjkText.isEditing) {
    cjkText.setSelectionStyles(style);
  }
}

window.addEventListener('keydown', (kbEvt) => {
  if (kbEvt.ctrlKey) {
    let isHandled = false;

    if (kbEvt.code === 'KeyZ') {
      if (kbEvt.shiftKey) {
        canvas.redo();
      } else {
        canvas.undo();
      }
    }
    if (kbEvt.code === 'KeyB') {
      style.fontWeight = style.fontWeight === 'bold' ? 'normal' : 'bold';
      updateStyles();
      isHandled = true;
    }

    if (kbEvt.code === 'Digit0') {
      style.textBackgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      updateStyles();
      isHandled = true;
    }

    if (kbEvt.code === 'KeyU') {
      style.underline = !style.underline;
      updateStyles();
      isHandled = true;
    }
    if (kbEvt.code === 'KeyG') {
      style.linethrough = !style.linethrough;
      updateStyles();
      isHandled = true;
    }
    if (kbEvt.code === 'KeyE') {
      style.overline = !style.overline;
      updateStyles();
      isHandled = true;
    }

    if (kbEvt.code === 'Equal') {
      style.fontSize += 2;
      updateStyles();
      isHandled = true;
    }
    if (kbEvt.code === 'Minus') {
      style.fontSize -= 2;
      updateStyles();
      isHandled = true;
    }
    if (isHandled) {
      kbEvt.preventDefault();
      kbEvt.stopPropagation();
    }
    canvas.requestRenderAll();
  }
});

const defaultTextOptions = {
  left: 100,
  top: 100,
  fontSize: 20,
  lineHeight: 1,
  charSpacing: 0.1,
  fontFamily: 'MS Mincho, ＭＳ 明朝, serif',
  fill: '#000000',
  stroke: '#000000',
  strokeWidth: 0,
  fontWeight: 'normal',
  fontStyle: 'normal',
  originX: 'left',
  originY: 'top'
};

function getActiveObject() {
  return canvas.getActiveObject();
}
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeSliderValue = document.getElementById('fontSizeSliderValue');

fontSizeSlider.addEventListener('input', () => {
  const value = parseInt(fontSizeSlider.value, 10);
  fontSizeSliderValue.textContent = value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('fontSize', value);
    canvas.renderAll();
  }
});

const lineHeightSlider = document.getElementById('vtxtLineHeightSlider');
const lineHeightSliderValue = document.getElementById('vtxtLineHeightSliderValue');

lineHeightSlider.addEventListener('input', () => {
  const value = parseFloat(lineHeightSlider.value);
  lineHeightSliderValue.textContent = value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('lineHeight', value);
    canvas.renderAll();
  }
});

const charSpacingSlider = document.getElementById('vtxtCharSpacingSlider');
const charSpacingSliderValue = document.getElementById('vtxtCharSpacingSliderValue');

charSpacingSlider.addEventListener('input', () => {
  const value = parseFloat(charSpacingSlider.value);
  charSpacingSliderValue.textContent = value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('charSpacing', value * 1000);
    canvas.renderAll();
  }
});

const boldCheckbox = document.getElementById('vtxtBoldCheckbox');

boldCheckbox.addEventListener('change', () => {
  const isBold = boldCheckbox.checked;

  const obj = getActiveObject();
  if (obj) {
    obj.set('fontWeight', isBold ? 'bold' : 'normal');
    canvas.renderAll();
  }
});

const italicCheckbox = document.getElementById('vtxtItalicCheckbox');

italicCheckbox.addEventListener('change', () => {
  const isItalic = italicCheckbox.checked;

  const obj = getActiveObject();
  if (obj) {
    obj.set('fontStyle', isItalic ? 'italic' : 'normal');
    canvas.renderAll();
  }
});

const fontSelector = document.getElementById('fontSelector');

fontSelector.addEventListener('change', () => {
  const selectedFont = fontSelector.value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('fontFamily', selectedFont);
    canvas.renderAll();
  }
});

const textColorPicker = document.getElementById('textColorPicker');

textColorPicker.addEventListener('input', () => {
  const color = textColorPicker.value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('fill', color);
    canvas.renderAll();
  }
});

const textOutlineColorPicker = document.getElementById('textOutlineColorPicker');

textOutlineColorPicker.addEventListener('input', () => {
  const color = textOutlineColorPicker.value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('stroke', color);
    canvas.renderAll();
  }
});

const fontStrokeWidthSlider = document.getElementById('fontStrokeWidthSlider');
const fontStrokeWidthSliderValue = document.getElementById('fontStrokeWidthSliderValue');

fontStrokeWidthSlider.addEventListener('input', () => {
  const value = parseFloat(fontStrokeWidthSlider.value);
  fontStrokeWidthSliderValue.textContent = value;

  const obj = getActiveObject();
  if (obj) {
    obj.set('strokeWidth', value);
    canvas.renderAll();
  }
});

const alignButtons = document.querySelectorAll('.align-button');

alignButtons.forEach(button => {
  button.addEventListener('click', () => {
    alignButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    const align = button.getAttribute('data-align-vertical');

    const obj = canvas.getActiveObject();
    if (obj && obj instanceof VerticalTextbox) {
      obj.set('verticalAlign', align);
      obj.set('dirty', true);
      canvas.requestRenderAll();
    }
  });
});

document.getElementById('addGradientButton').addEventListener('click', () => {
  const obj = getActiveObject();
  if (obj) {
    obj.set('fill', {
      type: 'linear',
      gradientUnits: 'percentage',
      coords: { x1: 0, y1: 0, x2: 0, y2: 1 },
      colorStops: [
        { offset: 0, color: '#ff0000' },
        { offset: 1, color: '#0000ff' }
      ]
    });
    canvas.renderAll();
  }
});

document.getElementById('addShadowButton').addEventListener('click', () => {
  const obj = getActiveObject();
  if (obj) {
    obj.set('shadow', new fabric.Shadow({
      color: 'red',
      blur: 20,
      offsetX: 10,
      offsetY: 10
    }));
    canvas.renderAll();
  }
});

document.getElementById('ButtonFlip').addEventListener('click', () => {
  const obj = getActiveObject();
  if (obj) {
    obj.toggle('flipX');
    canvas.renderAll();
  }
});

canvas.on('selection:created', updateControlPanel);
canvas.on('selection:updated', updateControlPanel);
canvas.on('selection:cleared', resetControlPanel);
canvas.on('object:modified', updateControlPanel);
canvas.on('object:added', updateControlPanel);

function updateControlPanel() {
  const obj = getActiveObject();
  if (obj) {
    fontSizeSlider.value = obj.fontSize;
    fontSizeSliderValue.textContent = obj.fontSize;
    lineHeightSlider.value = obj.lineHeight;
    lineHeightSliderValue.textContent = obj.lineHeight;
    charSpacingSlider.value = obj.charSpacing / 1000;
    charSpacingSliderValue.textContent = (obj.charSpacing / 1000).toFixed(2);
    boldCheckbox.checked = obj.fontWeight === 'bold';
    italicCheckbox.checked = obj.fontStyle === 'italic';
    fontSelector.value = obj.fontFamily.includes('MS Gothic') ? 'MS Gothic, ＭＳ ゴシック, sans-serif' : 'MS Mincho, ＭＳ 明朝, serif';
    textColorPicker.value = obj.fill;
    textOutlineColorPicker.value = obj.stroke;
    fontStrokeWidthSlider.value = obj.strokeWidth;
    fontStrokeWidthSliderValue.textContent = obj.strokeWidth;

    alignButtons.forEach(button => {
      const align = button.getAttribute('data-align-vertical');
      if (obj.originY === 'top' && align === 'top') {
        button.classList.add('selected');
      } else if (obj.originY === 'center' && align === 'middle') {
        button.classList.add('selected');
      } else if (obj.originY === 'bottom' && align === 'bottom') {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }
}

function resetControlPanel() {
  fontSizeSlider.value = 20;
  fontSizeSliderValue.textContent = 20;
  lineHeightSlider.value = 1;
  lineHeightSliderValue.textContent = 1;
  charSpacingSlider.value = 0.1;
  charSpacingSliderValue.textContent = '0.1';
  boldCheckbox.checked = false;
  italicCheckbox.checked = false;
  fontSelector.value = 'MS Mincho, ＭＳ 明朝, serif';
  textColorPicker.value = '#000000';
  textOutlineColorPicker.value = '#000000';
  fontStrokeWidthSlider.value = 0;
  fontStrokeWidthSliderValue.textContent = 0;
  alignButtons.forEach(button => button.classList.remove('selected'));
}

function drawGrid(ctx, canvasWidth, canvasHeight, gridSpacing) {
  ctx.save();
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvasWidth; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }

  for (let y = 0; y <= canvasHeight; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  ctx.restore();
}

canvas.on('after:render', () => {
  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const gridSpacing = 50;

  drawGrid(ctx, canvasWidth, canvasHeight, gridSpacing);
});