(function(root, factory) {
    //browser globals
    root.myWebglUtils = factory.call(root);
}(this, function () {
    function createProgramFromScripts(gl, selectors, opt_attribs, opt_locations) {
        var shaders = [];
        for (var ii = 0; ii < selectors.length; ii++) {
            shaders.push(createShaderFromScript(gl, selectors[ii], gl[defaultShaderType[ii]]));
        }
        return createProgram(gl, shaders, opt_attribs, opt_locations);
    }

    var defaultShaderType = [
        "VERTEX_SHADER",
        "FRAGMENT_SHADER",
    ];

    function createShaderFromScript(gl, selector, opt_shaderType) {
        var shaderSource = '';
        var shaderType;
        var shaderScript = document.querySelector(selector);

        if (!shaderScript) {
            throw ('*** Error: unknown script element ***' + selector);
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

        return loadShader(
            gl,
            shaderSource,
            opt_shaderType ? opt_shaderType : shaderType);
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

    function createProgram(gl, shaders, opt_attribs, opt_locations) {
        var program = gl.createProgram();
        shaders.forEach(function (shader) {
           gl.attachShader(program, shader);
        });
        if (opt_attribs) {
            opt_attribs.forEach(function (attrib, ind) {
                gl.bindAttribLocation(
                    program,
                    opt_locations ? opt_locations[ind] : ind,
                    attrib);
            });
        }
        gl.linkProgram(program);

        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var lastError = gl.getProgramInfoLog(program);
            console.log('*** Error Linking program: ' + lastError);

            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    return {
        createProgramFromScripts: createProgramFromScripts,
        createShaderFromScript: createShaderFromScript,
        createProgram: createProgram,
    }
}));