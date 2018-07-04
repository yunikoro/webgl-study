(function(root, factory) {
    //browser globals
    root.myWebglUtils = factory.call(root);
}(this, function () {
    function createProgramFromScripts() {
        console.log('hello world');
    }

    function createShaderFromScript(gl, selector, opt_shaderType) {
        var shaderSource = '';
        var shaderType;
        var shaderScript = document.querySelector(selector);
        if (!shaderSource) {
            throw ('*** Error: unknown script element ***' + selercor);
        }
        shaderSource = shaderScript.text;

        if(!opt_shaderType) {
            if (!opt_shaderType) {
                if (shaderScript.type === 'x-shader/x-vertex') {
                    shaderType = gl.VERTEX_SHADER;
                } else if (shaderScript.type === 'x-shader/x-fragment') {
                    shaderType = gl.FRAGMENT_SHADER;
                } else {
                    throw ('*** Error unknown shader type ***');
                }
            }
        }
    }

    function loadShader(gl, shaderSource, shaderType) {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        var complied = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!complied) {
            var lastError = gl.getShaderInfoLog(shader);
            console.log('*** Error compiling shader: ' + shader + ' lastError: ' + lastError);
            gl.deleteShader(shader);
        }
        return shader;
    }

    function createProgram() {

    }

    return {
        createProgramFromScripts: createProgramFromScripts,
        createShaderFromScript: createShaderFromScript,
        createProgram: createProgram,
    }
}));