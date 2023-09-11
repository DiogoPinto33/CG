#ifdef GL_ES
precision highp float;
#endif
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 color = texture2D(uSampler, vec2(0.0,0.01) + vTextureCoord);

	float grey = texture2D(uSampler2,vec2(0.0,0.001) + vTextureCoord).r * 0.3 + texture2D(uSampler2,vec2(0.0,0.001) +  vTextureCoord).g * 0.59 + texture2D(uSampler2,vec2(0.0,0.001) +  vTextureCoord).b * 0.11;

	vec4 filter = texture2D(uSampler3, vec2(1.0-grey, 1.0-grey));
	
	gl_FragColor = (color + filter)/2.0;
}

