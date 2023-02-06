export const utils = {
  clearCanvas: (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  },

  scaleCanvas: (canvas: HTMLCanvasElement, value: number) => {
    const ctx = canvas.getContext('2d');
    ctx && ctx.setTransform(value, 0, 0, value, 0, 0);
  },

  resizeCanvas: (canvas: HTMLCanvasElement, width: number, height: number) => {
    canvas.width = width;
    canvas.height = height;
  },

  drawImageOnCanvas: (
    canvas: HTMLCanvasElement,
    img: HTMLImageElement | null,
    width: number,
    height: number,
  ) => {
    const ctx = canvas.getContext('2d');
    ctx && img && ctx.drawImage(img, 0, 0, width, height);
  },

  setGrayscale(canvas: HTMLCanvasElement, value: boolean) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      value
        ? this.addFilterToList(canvas, 'grayscale', '100%')
        : this.removeFilterFromList(canvas, 'grayscale');
    }
  },

  setBlur(canvas: HTMLCanvasElement, value: number) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      value > 0
        ? this.addFilterToList(canvas, 'blur', `${value}px`)
        : this.removeFilterFromList(canvas, 'blur');
    }
  },

  addFilterToList(canvas: HTMLCanvasElement, filter: string, value: string) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (ctx.filter === 'none') {
        ctx.filter = `${filter}(${value})`;
      } else if (ctx.filter.includes(filter)) {
        const filterRegex = new RegExp(`${filter}\\((.*?)\\)`);
        const newFilter = ctx.filter.replace(filterRegex, `${filter}(${value})`);
        ctx.filter = newFilter;
      } else {
        ctx.filter = `${ctx.filter} ${filter}(${value})`;
      }
    }
  },

  removeFilterFromList(canvas: HTMLCanvasElement, filter: string) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (ctx.filter === 'none') {
        return;
      } else if (ctx.filter.includes(filter)) {
        const filterRegex = new RegExp(`${filter}\\((.*?)\\)`);
        const newFilter = ctx.filter.replace(filterRegex, '');
        ctx.filter = newFilter.length > 1 ? newFilter : 'none';
      }
    }
  },

  createBufferCanvas(width: number, height: number) {
    const bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = width;
    bufferCanvas.height = height;
    const bufferContext = bufferCanvas.getContext('2d');
    return { bufferCanvas, bufferContext };
  },

  generateImageDataFromContext(context: CanvasRenderingContext2D, width: number, height: number) {
    return context.getImageData(0, 0, width, height);
  },

  putImgDataOnBuffer(
    data: ImageData,
    buffer: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    buffer.putImageData(data, 0, 0, 0, 0, width, height);
  },
};
