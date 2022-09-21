var interval;
var sec = 20;  
var min = 120; 

function countDown() {
    sec--;
    if (sec == -01) {
        sec = 59;
        min = min - 1;
    } else {
        min = min;
    }
    if (sec <= 9) { sec = "0" + sec; }
    time = (min <= 9 ? "0" + min : min) + ":" + sec + " sn";
}

self.addEventListener('message', function(e){
    switch (e.data) {
        case 'start':
            if (true){
                interval =setInterval(function(){
                    countDown();
                    self.postMessage([sec,min]);
                }, 1000);
            }
            break;
         case 'extend':
            min = 00;
            sec = 30;
            break;
        case 'stop':
            clearInterval(interval);
            break;
    };
}, false);