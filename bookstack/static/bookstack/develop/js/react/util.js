function debounce(fn, timeout){
    var lastCalled,
        timeoutId;
    return function() {
        lastCalled = Date.now();
        var context = this;
        var args = arguments;
        function debounced(){
            var now = Date.now();
            var elapsed = now - lastCalled;
            if (elapsed > timeout){
                fn.apply(context, args);
            } else {
                timeoutId = setTimeout(debounced, timeout);
            }
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(debounced, timeout);
    };
}

exports.debounce = debounce;