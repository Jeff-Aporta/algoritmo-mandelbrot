let escala = 100;
let centroCanvas;
let centro;

function setup() {
  createCanvas(400, 400);
  centroCanvas = createVector(width / 2, height / 2);
  centro = createVector();
  pixelDensity(1);
  draw();
}

function mouseDragged() {
  centro.add(movedX / escala, movedY / escala);
}

function mouseWheel(evnt) {
  if (evnt.delta > 0) {
    escala /= 1.1;
  } else {
    escala *= 1.1;
  }
}

function draw() {
  loadPixels();
  const MAXIMO_ITERACIONES = 25;

  if (keyIsDown(187)) {
    escala *= 1.1;
  }
  if (keyIsDown(189)) {
    escala /= 1.1;
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Ejecución del algoritmo para graficar mandelbrot

      // C es el número complejo
      let C = createVector(
        (x - centroCanvas.x) / escala,
        (y - centroCanvas.y) / escala
      );
      C.sub(centro);
      //Z es la función, inicia es Z_1
      let Z = C.copy();

      let iteración;
      for (iteración = 0; iteración < MAXIMO_ITERACIONES; iteración++) {
        if (Z.mag() > 2) {
          //el punto C converge
          break;
        }
        // Zn = Z^2+C
        let Zn = createVector(sq(Z.x) - sq(Z.y), 2 * Z.x * Z.y);
        Zn.add(C);
        Z = Zn;
      }

      let pos_pix = (x + y * width) * 4;
      let gris = map(iteración, 0, MAXIMO_ITERACIONES, 0, 255);
      if (iteración == MAXIMO_ITERACIONES) {
        gris = 0;
      }
      // Canales de color
      pixels[pos_pix] = 6 * gris; //Canal rojo
      pixels[pos_pix + 1] = 2 * gris; //Canal verde
      pixels[pos_pix + 2] = gris; //Canal azul
      // Canal de transparencia
      pixels[pos_pix + 3] = 255; //Canal alpha
    }
  }
  updatePixels();
}
