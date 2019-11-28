
    var step = 0;
    var totStep = 0;
    var builder;
    var cont;
    var offset;
    var passoInicial=0;
    //Controle da animação na mudança de passo
        var animate = false;
        var deltaMeshRotationX;
        var deltaMeshRotationY;
        var deltaMeshRotationZ;

    function updateStepDisplay() {
        document.getElementById("x").textContent = step + "/" + totStep;
    }

    function init() {
        if (!Detector.webgl) { alert("no webgl"); return; }

        // capture and show log
        BRIGL.log = function (msg) { document.getElementById("logarea").innerText = msg; };

        // create the builder object to obtain the models
        builder = new BRIGL.Builder("/parts/");

        // load a model..
        builder.loadModelByName("criatividade0001.ldr", {}, function (mesh) {
            offset = mesh.brigl.offset;

            totStep = mesh.brigl.part.numSteps;
            step = 1;
            updateStepDisplay();
            cont = new BRIGL.BriglContainer(document.getElementById("container"), mesh);
            //cont.render();
            setTimeout(renderStep01, 1000);
        });
        var myVar = setInterval(myTimer, 100);
    }
    function renderStep01() {
        step = passoInicial;
        dostep(0);
        document.getElementById("container").style.visibility = "visible";
    }
    function doAnimatedStep(d) {
        var stepA = 0.3; //velocidade animação
        step += d;
        if (step < 1) step = 1;
        if (step > totStep) step = totStep;
        var i = step -1; //indice vetor com valores do posicionamento
        //Verifica se tem valor para deslocar
            if (typeof steps[i] != "object") {
                dostep(0); //Não tem indicação de posição para movimentarmos o modelo
                return; ///////////////////////////////////////////////////////////
            }
        ////
        //Verifica se o passo (ou delta) da animação vai ser positivo ou negativo
            if (cont.mesh.rotation.x > steps[i].meshRotationX)
                 deltaMeshRotationX = stepA * -1;
            else deltaMeshRotationX = stepA;
            if (cont.mesh.rotation.y > steps[i].meshRotationY)
                 deltaMeshRotationY = stepA * -1;
            else deltaMeshRotationY = stepA;
            if (cont.mesh.rotation.z > steps[i].meshRotationZ)
                 deltaMeshRotationZ = stepA * -1;
            else deltaMeshRotationZ = stepA;

        ////
        //Sinaliza para o timer que tem animação disponível
            animate = true;
        ////
    }
 
    function myTimer() {
        if (!animate) return;///////////////////////////////////
        
        var i = step -1; //indice vetor com valores do posicionamento

        //Verifica se encerrou todas as movimentações
            if ((cont.mesh.rotation.x == steps[i].meshRotationX) &&
                (cont.mesh.rotation.y == steps[i].meshRotationY) &&
                (cont.mesh.rotation.z == steps[i].meshRotationZ)) {
                animate = false; //Chegamos ao destino. parar animação
                dostep(0); //Podemo mostrar novo passo do modelo
                return;/////////////////////////////////////////
            }
        ////
        if (deltaMeshRotationX>0) {
            if (cont.mesh.rotation.x + deltaMeshRotationX > steps[i].meshRotationX) {
                cont.mesh.rotation.x = steps[i].meshRotationX;
            }
            else cont.mesh.rotation.x += deltaMeshRotationX;
        }
        else {
            if (cont.mesh.rotation.x + deltaMeshRotationX < steps[i].meshRotationX) {
                cont.mesh.rotation.x = steps[i].meshRotationX;
            }
            else cont.mesh.rotation.x += deltaMeshRotationX;
        }

        if (deltaMeshRotationY>0) {
            if (cont.mesh.rotation.y + deltaMeshRotationY > steps[i].meshRotationY) {
                cont.mesh.rotation.y = steps[i].meshRotationY;
            }
            else cont.mesh.rotation.y += deltaMeshRotationY;
        }
        else {
            if (cont.mesh.rotation.y + deltaMeshRotationY < steps[i].meshRotationY) {
                cont.mesh.rotation.y = steps[i].meshRotationY;
            }
            else cont.mesh.rotation.y += deltaMeshRotationY;
        }

        if (deltaMeshRotationZ>0) {
            if (cont.mesh.rotation.z + deltaMeshRotationZ > steps[i].meshRotationZ) {
                cont.mesh.rotation.z = steps[i].meshRotationZ;
            }
            else cont.mesh.rotation.z += deltaMeshRotationZ;
        }
        else {
            if (cont.mesh.rotation.z + deltaMeshRotationZ < steps[i].meshRotationZ) {
                cont.mesh.rotation.z = steps[i].meshRotationZ;
            }
            else cont.mesh.rotation.z += deltaMeshRotationZ;
        }

        
        cont.render();
    }

    function dostep(d) {
        step += d;
        if (step < 1) step = 1;
        if (step > totStep) step = totStep;
        builder.loadModelByName("criatividade0001.ldr", { stepLimit: step, /*centerOffset:offset,*/ drawLines: true, blackLines: true }, function (mesh) {
            updateStepDisplay();
            cont.setModel(mesh, false);
            if (typeof steps[step-1] === "object") {
                var i=step-1;
                cont.mesh.rotation.x = steps[i].meshRotationX;
                cont.mesh.rotation.y = steps[i].meshRotationY;
                cont.mesh.rotation.z = steps[i].meshRotationZ;
                cont.mesh.position.x = steps[i].meshPositionX;
                cont.mesh.position.y = steps[i].meshPositionY;
                cont.mesh.position.z = steps[i].meshPositionZ;
                cont.camera.position.x = steps[i].cameraPositionX;
                cont.camera.position.y = steps[i].cameraPositionY;
                cont.camera.position.z = steps[i].cameraPositionZ;
                //cont.mesh.position.x y z (para o caso de arrastar a posiçaõ - botão 2 do mouse)
                //cont.camera.position.z (para o caso de ter alterado o zoom)
            }
            cont.render();
            document.getElementById("stepsImage").style.backgroundImage = "url('steps/Page " + (step+1) + ".png')"; 
            

        });
    }
