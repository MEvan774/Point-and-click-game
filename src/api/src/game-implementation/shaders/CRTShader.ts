/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// CRTShader.ts
export class CRTShader {
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private program: WebGLProgram;
    private animationFrameId: number | null = null;

    public constructor() {
    // Create overlay canvas
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "99999";

        document.body.appendChild(this.canvas);

        // Initialize WebGL
        const gl: WebGLRenderingContext | null = this.canvas.getContext("webgl", {
            alpha: true,
            premultipliedAlpha: false,
        });

        if (!gl) {
            throw new Error("WebGL not supported");
        }
        this.gl = gl;

        // Enable blending for transparency
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.resize();
        window.addEventListener("resize", (): void => {
            this.resize();
        });

        // Create shader program
        this.program = this.createShaderProgram();
        this.setupGeometry();

        console.log("CRT Shader overlay initialized");
    }

    private createShaderProgram(): WebGLProgram {
        const vertexShaderSource: string = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

        const fragmentShaderSource: string = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;
    
    // CRT parameters
    #define CURVATURE 5.08
    #define SCANLINE_INTENSITY 0.4 
    #define SCANLINE_COUNT 1.0
    #define VIGNETTE_INTENSITY 55.4
    #define VIGNETTE_OPACITY 0.8
    #define NOISE_INTENSITY 0.15
    #define FLICKER_SPEED 0.02
    #define FLICKER_AMOUNT 0.05
    #define RGB_SHIFT 100.3
    
    // Screen curvature distortion
    vec2 curveScreen(vec2 uv) {
      uv = uv * 2.0 - 1.0;
      vec2 offset = abs(uv.yx) / CURVATURE;
      uv = uv + uv * offset * offset;
      uv = uv * 0.5 + 0.5;
      return uv;
    }
    
    // Scanline effect
    float scanline(vec2 uv) {
      float scanline = sin(uv.y * u_resolution.y * SCANLINE_COUNT);
      return scanline * SCANLINE_INTENSITY;
    }
    
    // Vignette effect
    float vignette(vec2 uv) {
      uv *= 1.0 - uv.yx;
      float vig = uv.x * uv.y * 15.0;
      return pow(vig, VIGNETTE_INTENSITY);
    }
    
    // Random noise
    float noise(vec2 uv) {
      float n = fract(sin(dot(uv * u_time * 0.001, vec2(12.9898, 78.233))) * 43758.5453);
      return n;
    }
    
    // RGB chromatic aberration - pixel-based offset
    vec3 rgbShift(vec2 uv) {
      // Calculate distance from center
      vec2 center = vec2(0.5, 0.5);
      vec2 direction = normalize(uv - center);
      float dist = length(uv - center);
      
      // Convert RGB_SHIFT to pixel offset
      vec2 pixelOffset = direction * RGB_SHIFT / u_resolution.xy;
      
      // Sample different positions for each color channel
      vec2 uvR = uv + pixelOffset;
      vec2 uvG = uv;
      vec2 uvB = uv - pixelOffset;
      
      // Create intensity based on distance from center
      float intensity = dist * 2.0; // Make it stronger towards edges
      
      // Return RGB color with separation
      float r = intensity * step(0.0, uvR.x) * step(uvR.x, 1.0) * step(0.0, uvR.y) * step(uvR.y, 1.0);
      float g = intensity * 0.5;
      float b = intensity * step(0.0, uvB.x) * step(uvB.x, 1.0) * step(0.0, uvB.y) * step(uvB.y, 1.0);
      
      return vec3(r, g, b) * 0.5;
    }
    
    void main() {
      vec2 uv = v_texCoord;
      vec2 curvedUV = curveScreen(uv);
      
      // Make corners transparent
      if (curvedUV.x < 0.0 || curvedUV.x > 1.0 || curvedUV.y < 0.0 || curvedUV.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
      }
      
      // Scanlines
      float scan = scanline(curvedUV);
      
      // Vignette
      float vig = vignette(curvedUV);
      float vignetteEffect = mix(1.0, vig, VIGNETTE_OPACITY);
      
      // Noise
      float noiseEffect = noise(curvedUV) * NOISE_INTENSITY;
      
      // Flicker
      float flicker = 1.0 + FLICKER_AMOUNT * sin(u_time * FLICKER_SPEED);
      
      // RGB shift effect
      vec3 rgbEffect = rgbShift(curvedUV);
      
      // Combine effects
      float darkness = scan + noiseEffect;
      darkness *= flicker;
      
      // Apply vignette darkness
      darkness += (1.0 - vignetteEffect) * 0.5;
      
      // Add RGB aberration - this should now be VERY visible
      vec3 color = vec3(darkness) + rgbEffect;
      
      // Make the overlay semi-transparent
      float alpha = darkness * 0.4 + (1.0 - vignetteEffect) * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

        console.log("Compiling vertex shader...");
        const vertexShader: WebGLShader = this.compileShader(vertexShaderSource, this.gl.VERTEX_SHADER);
        console.log("Vertex shader compiled successfully");

        console.log("Compiling fragment shader...");
        const fragmentShader: WebGLShader = this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
        console.log("Fragment shader compiled successfully");

        const program: WebGLProgram | null = this.gl.createProgram();
        if (!program) {
            throw new Error("Failed to create shader program");
        }

        console.log("Linking shader program...");
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const linkLog: string | null = this.gl.getProgramInfoLog(program);
            console.error("Shader link error:", linkLog);
            throw new Error("Failed to link shader program: " + linkLog);
        }

        console.log("Shader program linked successfully");
        return program;
    }

    private compileShader(source: string, type: number): WebGLShader {
        const shader: WebGLShader | null = this.gl.createShader(type);
        if (!shader) {
            throw new Error("Failed to create shader");
        }

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const info: string | null = this.gl.getShaderInfoLog(shader);
            const shaderType: string = type === this.gl.VERTEX_SHADER ? "vertex" : "fragment";
            console.error(`${shaderType} shader compilation error:`, info);
            console.error("Shader source:", source);
            throw new Error(`Shader compilation error (${shaderType}): ` + info);
        }

        return shader;
    }

    private setupGeometry(): void {
        const positions: Float32Array = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1,
        ]);

        const texCoords: Float32Array = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            1, 1,
        ]);

        // Setup position buffer
        const positionBuffer: WebGLBuffer | null = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const positionLocation: number = this.gl.getAttribLocation(this.program, "a_position");
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        // Setup texCoord buffer
        const texCoordBuffer: WebGLBuffer | null = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoords, this.gl.STATIC_DRAW);

        const texCoordLocation: number = this.gl.getAttribLocation(this.program, "a_texCoord");
        this.gl.enableVertexAttribArray(texCoordLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
        this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    private resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    private render(time: number): void {
        this.gl.useProgram(this.program);

        const timeLocation: WebGLUniformLocation | null = this.gl.getUniformLocation(this.program, "u_time");
        this.gl.uniform1f(timeLocation, time);

        const resolutionLocation: WebGLUniformLocation | null = this.gl.getUniformLocation(this.program, "u_resolution");
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        this.animationFrameId = requestAnimationFrame((t: number): void => {
            this.render(t);
        });
    }

    public start(): void {
        if (this.animationFrameId === null) {
            console.log("Starting CRT shader overlay");
            this.render(0);
        }
    }

    public stop(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    public destroy(): void {
        this.stop();
        this.canvas.remove();
    }

    public toggle(): void {
        if (this.animationFrameId === null) {
            this.start();
        }
        else {
            this.stop();
        }
    }
}
