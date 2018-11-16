precision mediump float;
void main() {
  vec2 fragmentPosition = 2.5*gl_PointCoord - 1.0;
  vec2 fragmentPosition2 = 1.0*gl_PointCoord - 1.0;
  float distance = length(fragmentPosition);
  float distance2 = length(fragmentPosition2);
  float distanceSqrd = distance * distance;
  float distanceSqrd2 = distance2 * distance2;
  
  gl_FragColor = vec4(
    0.4/distanceSqrd + 0.2/distanceSqrd2,
    0.1/distanceSqrd + 0.05/distanceSqrd2,
    0.0, 1.0 );
}