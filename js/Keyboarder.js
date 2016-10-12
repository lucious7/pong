function Keyboarder(){
    this.KEYS = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32, A: 65, Z: 90};
    var keyState = {};
    window.addEventListener("keydown", function(e){
        keyState[e.keyCode] = true;
    });
    window.addEventListener("keyup", function(e){
        keyState[e.keyCode] = false;
    });

    this.isDown = function(keyCode){
        return keyState[keyCode];
    };
};