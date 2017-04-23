function debounce(fn, timeout){
    let lastCalled,
        timeoutId;
    return function() {
        lastCalled = Date.now();
        let context = this;
        let args = arguments;
        function debounced(){
            let now = Date.now();
            let elapsed = now - lastCalled;
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