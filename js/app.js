// =========================================================================================
//  .S_sSSs     .S_sSSs     .S_SSSs                 .S       S.    .S_sSSs      sSSs_sSSs
//  .SS~YS%%b   .SS~YS%%b   .SS~SSSSS               .SS       SS.  .SS~YS%%b    d%%SP~YS%%b
//  S%S   `S%b  S%S   `S%b  S%S   SSSS              S%S       S%S  S%S   `S%b  d%S'     `S%b
//  S%S    S%S  S%S    S%S  S%S    S%S              S%S       S%S  S%S    S%S  S%S       S%S
//  S%S    d*S  S%S    S&S  S%S SSSS%S              S&S       S&S  S%S    S&S  S&S       S&S
//  S&S   .S*S  S&S    S&S  S&S  SSS%S              S&S       S&S  S&S    S&S  S&S       S&S
//  S&S_sdSSS   S&S    S&S  S&S    S&S              S&S       S&S  S&S    S&S  S&S       S&S
//  S&S~YSY%b   S&S    S&S  S&S    S&S              S&S       S&S  S&S    S&S  S&S       S&S
//  S*S   `S%b  S*S    S*S  S*S    S&S              S*b       d*S  S*S    d*S  S*b       d*S
//  S*S    S%S  S*S    S*S  S*S    S*S              S*S.     .S*S  S*S   .S*S  S*S.     .S*S
//  S*S    S&S  S*S    S*S  S*S    S*S               SSSbs_sdSSS   S*S_sdSSS    SSSbs_sdSSS
//  S*S    SSS  S*S    SSS  SSS    S*S                YSSP~YSSY    SSS~YSSY      YSSP~YSSY
//  SP          SP                 SP
//  Y           Y                  Y
// =========================================================================================

// Variables globales del generador de problema
var rectaDeGenerador = [];
var puntosProblema = [];
var mProblema = 0.5; // valor entre 0.1 y 1
var bProblema = 1; // valor entre 0 y 10
var dataProblema = [];
var pointsBlue = [];
var pointsRed = [];
var pointsCurve = [];
var iteraciones = 0;
var aciertos = 0;
var errores = 0;
var puntosAcertados = [];
var puntosErroneos = [];

// Colores
var colorPuntosSinClasificar = "#EE0000";
var colorPuntosErrados = "#FF1493";
var colorPuntosAcertados = "#00FF7F";
var colorPuntosRecta = "#2F4F4F";
var colorPuntosUp = "#1E90FF";
var colorPuntosDown = "#CD853F";

//==============Parametros Generales================
var cantidadPuntos = 100;
var cantidadConjDeEvaluacion = 1000;
var x0 = 1; //Bias de la red

// Puntos de curva
var numbersOfPoints = 11;
var updateLong = 0.1;
var r = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
var th = Math.PI / 20;

// Variables globales de la uP
//var generadorObject =  new Generador();

//Ecuaciones resueltas
var division = 10 / Math.sqrt(cantidadConjDeEvaluacion);

// =============================================================================
// Parametros de la red neuronal
// =============================================================================
//Factor de aprendizaje
var factorDeAprendizaje = 0.4;
var iteracionesMaximas = 10000;
var datosDeEntrenamiento = [];

// var lEntrada = new red.Layer(2);
// var lOculta = new red.Layer(3);
// var lSalida = new red.Layer(1);

// lEntrada.project(lOculta);
// lOculta.project(lSalida);

// // Estado Inicial de la aplicacion grafica por defecto

//Formando red
var red = require("./red/synaptic");
var lEntrada = new red.Layer(2);
var lOculta = new red.Layer(3);
var lSalida = new red.Layer(1);

lEntrada.project(lOculta);
lOculta.project(lSalida);

var redNeuronal = new red.Network({
  input: lEntrada,
  hidden: [lOculta],
  output: lSalida
});

// var redMulticapa = new red.Architect.Perceptron(2, 3, 1);

// var entrenador = new red.Trainer(redNeuronal); // Create trainer

$(function() {
  //Deshabilita botones
  $("#reset").prop("disabled", true);
  $("#reset").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#entrepaso").prop("disabled", true);
  $("#entrepaso").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#entreauto").prop("disabled", true);
  $("#entreauto").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#load").prop("disabled", true);
  $("#load").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#geconeval").prop("disabled", true);
  $("#geconeval").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#evaluate").prop("disabled", true);
  $("#evaluate").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#resultados").prop("disabled", true);
  $("#resultados").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#iniciarup").prop("disabled", true);
  $("#iniciarup").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  // Generar puntos de curva
  function generarPointOfCurve() {
    pointsCurve = [];
    for (var i = 0; i <= 10; i = i + 0.1) {
      pointsCurve.push([i, Math.sqrt(Math.pow(7, 2) - Math.pow(i, 2))]);
    }
  }
  generarPointOfCurve();
  //Agregar eventos del teclado
  document.addEventListener(
    "keydown",
    event => {
      const keyName = event.key;

      if (keyName === "p" || keyName === "P") {
        neuronaUp.pasoAPaso();
      }
    },
    false
  );

  var chartEntrenamiento = Highcharts.chart("gEntrenamiento", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Actividad Del Perceptron"
    },
    subtitle: {
      text: "Graficas de procesos que ocurren en la neurona"
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    series: [
      {
        name: "Puntos",
        color: colorPuntosDown,
        data: [[1.6, 4]]
      }
    ]
  });

  // Grafica del problema
  var chartProblema = Highcharts.chart("gProblema", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Problema Generado"
    },
    subtitle: {
      text: "Puntos creados al azar"
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    series: [
      {
        name: "Puntos bajo la curva",
        color: colorPuntosUp,
        data: [[2, 4]]
      },
      {
        name: "Puntos sobre la curva",
        color: colorPuntosDown,
        data: [[7, 9]]
      },
      {
        type: "line",
        name: "Radio de semicirculo r: " + r,
        color: colorPuntosRecta,
        lineWidth: 0.5,
        data: pointsCurve
      }
    ]
  });
});

// =============================================================================
// Codigo de generador de conjunto de problema
// =============================================================================

window.generarPuntosDeCurva = function(numberOfPoints, updateLong, r, th) {
  pointsCurve = [];
  for (var i = 0; i <= numberOfPoints; i = i + updateLong) {
    pointsCurve.push([i, Math.sqrt(Math.pow(r, 2) - Math.pow(i, 2))]);
  }
};

window.evaluarSigno = function(x, y, r) {
  var posicion = Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2)) - y;
  if (posicion >= 0) {
    return 1;
  } else {
    return -1;
  }
};

window.generarPuntosEntrenamiento = function() {
  $("#iniciarup").prop("disabled", false);
  $("#iniciarup").css({
    "background-color": "lightgreen",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#reset").prop("disabled", false);
  $("#reset").css({
    "background-color": "lightgreen",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  rectaDeGenerador = [];
  puntosProblema = [];
  dataProblema = [];
  pointsBlue = [];
  pointsRed = [];
  var nroPuntos = 0;

  var punto = function(umbral, x, y, s) {
    this.punto = [umbral, x, y];
    this.s = s;
  };

  r = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  generarPuntosDeCurva(numbersOfPoints, updateLong, r, th);

  while (nroPuntos < cantidadPuntos) {
    var px = (Math.random() * 10).toFixed(2);
    var py = (Math.random() * 10).toFixed(2);
    var ps = evaluarSigno(px, py, r);
    if (ps >= 0) {
      pointsBlue.push([parseFloat(px), parseFloat(py)]);
    }
    if (ps < 0) {
      pointsRed.push([parseFloat(px), parseFloat(py)]);
    }
    puntosProblema.push(new punto(1, px, py, ps));
    nroPuntos++;
  }

  for (var i = 0; i < cantidadPuntos; i++) {
    dataProblema.push([
      parseFloat(puntosProblema[i].punto[1]),
      parseFloat(puntosProblema[i].punto[2])
    ]);
  }

  graficarPuntosProblema();
};

window.generarPuntosEvaluacion = function() {
  puntosProblema = [];
  dataProblema = [];
  pointsBlue = [];
  pointsRed = [];

  var nroPuntos = 0;

  var punto = function(umbral, x, y, s) {
    this.punto = [umbral, x, y];
    this.s = s;
  };

  for (var i = 0; i < 10; i += division) {
    for (var j = 0; j < 10; j += division) {
      var px = j.toFixed(2);
      var py = i.toFixed(2);
      var ps = evaluarSigno(px, py, r);
      if (ps >= 0) {
        pointsRed.push([parseFloat(px), parseFloat(py)]);
      }
      if (ps < 0) {
        pointsBlue.push([parseFloat(px), parseFloat(py)]);
      }
      puntosProblema.push(new punto(x0, px, py, ps));
    }
  }

  for (var x = 0; x < puntosProblema.length; x++) {
    dataProblema.push([
      parseFloat(puntosProblema[x].punto[1]),
      parseFloat(puntosProblema[x].punto[2])
    ]);
  }

  graficarPuntosProblema();
};

// Restablecer Variables
window.reestablecerProblema = function() {
  $("#geconeval").prop("disabled", true);
  $("#geconeval").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });

  rectaDeGenerador = [];
  puntosProblema = [];
  dataProblema = [];
  pointsBlue = [];
  pointsRed = [];

  var myChart = Highcharts.chart("gProblema", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Problema Generado"
    },
    subtitle: {
      text: "Puntos creados al azar"
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    series: [
      {
        name: "Puntos sobre la recta",
        color: colorPuntosUp,
        data: [[8, 7]]
      },
      {
        name: "Puntos bajo la recta",
        color: colorPuntosDown,
        data: [[8, 1]]
      },
      {
        type: "line",
        name: "Radio de semicirculo r: " + r,
        color: colorPuntosRecta,
        lineWidth: 0.5,
        data: pointsCurve
      }
    ]
  });
};

window.graficarPuntosProblema = function() {
  var myChart = Highcharts.chart("gProblema", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Problema Generado"
    },
    subtitle: {
      text: "Puntos creados al azar"
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    series: [
      {
        name: "Puntos bajo la curva",
        color: colorPuntosUp,
        data: pointsRed
      },
      {
        name: "Puntos sobre la curva",
        color: colorPuntosDown,
        data: pointsBlue
      },
      {
        name: "Radio de semicirculo r: " + r,
        type: "line",
        lineWidth: 0.5,
        color: colorPuntosRecta,
        data: pointsCurve
      }
    ]
  });
};

// =============================================================================
// Inicializar grafica de neurona
// =============================================================================

var w0 = Math.random() * 10;
var w1 = Math.random() * 10;
var w2 = Math.random() * 10;
var hiperPlanoNeurona = [];
var entrenada = null;
var x0 = 1;
var x1 = null;
var x2 = null;

window.inicializarUp = function() {
  $("#load").prop("disabled", true);
  $("#load").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#entrepaso").prop("disabled", false);
  $("#entrepaso").css({
    "background-color": "lightskyblue",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#entreauto").prop("disabled", false);
  $("#entreauto").css({
    "background-color": "lightskyblue",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#evaluate").prop("disabled", true);
  $("#evaluate").css({
    "background-color": "gray",
    color: "white",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  w0 = Math.random();
  w1 = Math.random();
  w2 = Math.random();
  // hiperPlanoNeurona = false;
  GraficarPlanoActualEntrenamiento();
  //actualizarDatos();
  iteraciones = 0;
  entrenada = false;
};

window.GraficarPlanoActualEntrenamiento = function() {
  //actualizarDatos();
  var myChart = Highcharts.chart("gEntrenamiento", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Neurona Entrenada"
    },
    subtitle: {
      text: "Solución que aporta la neurona"
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    series: [
      {
        name: "Puntos bajo la curva",
        color: colorPuntosUp,
        data: pointsRed
      },
      {
        name: "Puntos sobre la curva",
        color: colorPuntosDown,
        data: pointsBlue
      }
    ]
  });
};

window.calculoDeLaCurva = function(i) {
  return Math.sqrt(Math.pow(x1 * w1, 2) - Math.pow(x2 * w2 + i, 2)) - w0;
};

window.calculoDeHiperPlanoNeurona = function(signo) {
  hiperPlanoNeurona = [];
  for (let i = 0; i <= numbersOfPoints; i++) {
    hiperPlanoNeurona.push([i, signo * calculoDeLaCurva(i)]);
  }
};

// =============================================================================
// Entrenamiento de neurona
// =============================================================================
// Entrenamiento automatico de la neurona
window.entrenarUp = function() {
  $("#evaluate").prop("disabled", false);
  $("#evaluate").css({
    "background-color": "lightpink",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#load").prop("disabled", false);
  $("#load").css({
    "background-color": "lightpink",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  $("#geconeval").prop("disabled", false);
  $("#geconeval").css({
    "background-color": "lightpink",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  datosDeEntrenamiento = [];
  //Obteniendo datos de entrada
  for (let i = 0; i < 100; i++) {
    var entrada = [
      parseFloat(puntosProblema[i].punto[1]),
      parseFloat(puntosProblema[i].punto[2])
    ];
    if (puntosProblema[i].s == -1) {
      var salida = [0];
    } else {
      var salida = [1];
    }
    datosDeEntrenamiento.push({
      input: entrada,
      output: salida
    });
  }
  for (var j = 0; j < iteracionesMaximas; j++) {
    for (var i = 0; i < 100; i++) {
      redNeuronal.activate([
        datosDeEntrenamiento[i].input[0] * 0.1,
        datosDeEntrenamiento[i].input[1] * 0.1
      ]);
      redNeuronal.propagate(factorDeAprendizaje, [
        datosDeEntrenamiento[i].output[0]
      ]);
    }
  }
};

// window.entrenar = function() {
//   for (var i = 0; i < datosDeEntrenamiento.length; i++) {
//     lEntrada.activate(datosDeEntrenamiento[i]["input"]);
//     lSalida.activate();
//     lSalida.propagate(factorDeAprendizaje, datosDeEntrenamiento[i]["output"]);
//   }
// };

// window.reEntrenar = function() {
//   for (var i = 0; i < 1000; i++) {
//     //datosDeEntrenamiento = _.shuffle(datosDeEntrenamiento);
//     entrenar();
//   }
// };

window.cargarConjuntoDeEvaluacion = function() {
  var myChart = Highcharts.chart("gEntrenamiento", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Neurona Entrenada"
    },
    subtitle: {
      text: "Solución que aporta la neurona"
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    series: [
      {
        name: "Puntos para evaluar red",
        color: "#FF0000",
        data: dataProblema
      }
    ]
  });
  //actualizarDatos();
};

window.evaluarAprendizaje = function() {
  $("#resultados").prop("disabled", false);
  $("#resultados").css({
    "background-color": "lightgreen",
    color: "black",
    "text-align": "center",
    "text-decoration": "none",
    display: "inline-block",
    cursor: "pointer"
  });
  pointsBlue = [];
  pointsRed = [];
  aciertos = 0;
  errores = 0;
  puntosAcertados = [];
  puntosErroneos = [];

  for (var x = 0; x < dataProblema.length; x++) {
    var resultado = redNeuronal.activate([
      dataProblema[x][0] * 0.1,
      dataProblema[x][1] * 0.1
    ]);

    if (resultado >= 0.5) {
      pointsRed.push([dataProblema[x][0], dataProblema[x][1]]);
      if (evaluarSigno(dataProblema[x][0], dataProblema[x][1], r) >= 0) {
        aciertos++;
        puntosAcertados.push([dataProblema[x][0], dataProblema[x][1]]);
      } else {
        errores++;
        puntosErroneos.push([dataProblema[x][0], dataProblema[x][1]]);
      }
    } else {
      pointsBlue.push([dataProblema[x][0], dataProblema[x][1]]);
      if (evaluarSigno(dataProblema[x][0], dataProblema[x][1], r) < 0) {
        aciertos++;
        puntosAcertados.push([dataProblema[x][0], dataProblema[x][1]]);
      } else {
        errores++;
        puntosErroneos.push([dataProblema[x][0], dataProblema[x][1]]);
      }
    }
  }

  var myChart = Highcharts.chart("gEntrenamiento", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Solucion propuesta por la red"
    },
    subtitle: {
      text: "Factor de aprendizaje en " + factorDeAprendizaje + "Iteraciones realizadas " + iteracionesMaximas
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    series: [
      {
        name: "Puntos bajo la curva",
        color: colorPuntosUp,
        data: pointsRed
      },
      {
        name: "Puntos sobre la curva",
        color: colorPuntosDown,
        data: pointsBlue
      }
    ]
  });
};

window.mostrarDiferencia = function() {
  var myChart = Highcharts.chart("gEntrenamiento", {
    chart: {
      type: "scatter"
    },
    title: {
      text: "Resultados"
    },
    subtitle: {
      text: "La precision de la red neuronal es de " + ((puntosAcertados.length) * 100 / dataProblema.length).toFixed(4) + ' %'
    },
    xAxis: {
      title: {
        text: "Eje X"
      }
    },
    yAxis: {
      title: {
        text: "Eje Y"
      }
    },
    series: [
      {
        name: "Puntos acertados",
        color: "#00FF00",
        data: puntosAcertados
      },
      {
        name: "Puntos erroneos",
        color: "#FF0000",
        data: puntosErroneos
      }
    ]
  });
};