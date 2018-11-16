const glslify = require("glslify");

let vertexShaderSource = glslify("./vert.glsl");
let fragmentShaderSource = glslify("./frag.glsl");

window.addEventListener("load", setupWebGL, false);
var gl, program;

function setupWebGL(evt) {
  window.removeEventListener(evt.type, setupWebGL, false);
  if (!(gl = getRenderingContext())) return;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  gl.compileShader(fragmentShader);
  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var linkErrLog = gl.getProgramInfoLog(program);
    cleanup();
    document.querySelector("p").innerHTML =
      "La liaison du programme a échoué." + "Journal d'erreur : " + linkErrLog;
    return;
  }

  initializeAttributes();

  gl.useProgram(program);
  gl.drawArrays(gl.POINTS, 0, 1);

  cleanup();
}

var buffer;
function initializeAttributes() {
  gl.enableVertexAttribArray(0);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
}

function cleanup() {
  gl.useProgram(null);
  if (buffer) gl.deleteBuffer(buffer);
  if (program) gl.deleteProgram(program);
}

function getRenderingContext() {
  let canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // var canvas = document.querySelector("canvas");
  canvas.width = document.body.clientWidth * 2;
  canvas.height = document.body.clientHeight * 2;
  canvas.style.width = document.body.clientWidth + "px";
  canvas.style.height = document.body.clientHeight + "px";
  var gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) {
    var paragraph = document.querySelector("p");
    paragraph.innerHTML =
      "Échec de l'obtention du contexte" +
      " WebGL. Votre navigateur ne supporte peut-être" +
      " pas WebGL.";
    return null;
  }
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}
