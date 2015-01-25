
var gl;
var index = 0;


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	var vertices = new Float32Array([-0.5, -0.5, 0, 0.5, 0.5, -0.5,   -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,   0.0, 0.75, 0.25, 0.25, -0.25, 0.25, -0.25, -0.25, -0.75, 0.0,   
		0.0, -0.75, -0.25, -0.25, 0.25, -0.25, 0.25, 0.25, 0.75, 0.0 ]);
    
    //  Configure WebGL    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );	
	
	canvas.addEventListener("mousedown", function(event){ index += 1; });

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	if (index == 1) {
		gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 );
	}
	else if (index == 2) {
		gl.drawArrays( gl.TRIANGLE_STRIP, 7, 5 );
		gl.drawArrays( gl.TRIANGLE_STRIP, 12, 5);
	}	
	else {
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
		index = 0;
	}
	window.requestAnimFrame(render);
}
