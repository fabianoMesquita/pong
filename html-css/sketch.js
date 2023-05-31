//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 12;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let yRaquete = 150;
let xRaquete = 5;
let raqueteComprimento = 8;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150
let velocidadeYOponente;
let chanceDeErrar = 0;

//variáveis placar
let meusPontos = 0;
let pontosOponente = 0;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  bolinhaNaoFicaPresa();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  calculaChanceDeErrar();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width || xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}
function mostraRaquete (x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}
function mostraRaqueteOponente (){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura);
}
function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=5;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete +=5;
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
}
function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura, xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}
function incluiPlacar(){stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(128,0,128));
  rect(150, 10, 40, 20);
  fill(color(128,0,128));
  rect(450, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(255);
  text(pontosOponente, 470, 26);
}
function marcaPonto(){
  if (xBolinha > 595){
    meusPontos += 1;
  }
  if (xBolinha < 5){
    pontosOponente += 1;
  }
}