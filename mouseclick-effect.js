
// configs
var textureFile = "star.jpg";   // 128x128 pixel
var quantity = 30;

// matter js module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// utils functions
function resetToPosition(target, pos) {
    Body.setVelocity(target, {x: 0, y: 0});
    Body.setAngularVelocity(target, 0);
    Body.setPosition(target, pos);
    Body.setAngle(target, 0);
}
function inRange(min, max, value) {
    return Math.min(max, Math.max(min, value));
}
function clickAndFocus(position) {
    var element = document.elementFromPoint(position.x, position.y);
    var event = new MouseEvent("click", {
        clientX: position.x, clientY: position.y, bubbles: true
    });
    element.dispatchEvent(event);
    element.focus();
}

/* mouseclick-effect.js */
{
    // get the canvas to draw
    var canvas = document.getElementById("mouseclick-effect-canvas");

    // create a matter js engine
    var engine = Engine.create();

    // create a renderer on canvas
    var render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            wireframes: false,
            background: "transparent",
            wireframeBackground: "transparent"
        }
    });

    // init (width, height) and subscribe resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // a list of rendered images
    var imageList = [];
    for (var n = 0; n < quantity; n++) {
        var renderedImg = Bodies.rectangle(0, window.canvas.height + 1, 10, 10, {
            render: {sprite: {texture: textureFile, xScale: 0.1, yScale: 0.1}}
        });
        imageList.push(renderedImg);
    }

    // mouse constrains
    var mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse, constraint: {render: {visible: false }}
    });

    // trigger effect on mouse down
    Events.on(mouseConstraint, "mousedown", function(event) {
        if (mouseConstraint.mouse.button != 0)  return;
        canvas.style.pointerEvents = "none";
        clickAndFocus(mouseConstraint.constraint.pointA);
        imageList.forEach(function(renderedImg, index, arr) {
            var rnd = inRange(0.2, 0.8, Math.random());
            resetToPosition(renderedImg, mouseConstraint.constraint.pointA);
            Body.setVelocity(renderedImg, {
                x: 2 * Math.cos(Math.PI * rnd), y: -6 * Math.sin(Math.PI * rnd)
            });
        });
        canvas.style.pointerEvents = "all";
    });

    // add to the world powered by engine
    Composite.add(engine.world, imageList);
    Composite.add(engine.world, [mouseConstraint]);

    // run the renderer
    Render.run(render);

    // run the engine
    var runner = Runner.create();
    Runner.run(runner, engine);
}
