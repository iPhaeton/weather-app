import "babel-polyfill";

export default class Succession {
    constructor (functions, callback) {
        this.functions = functions;
        this.callback = callback;

        var self = this;

        this.generator = (function* () {
            for (var i = 0; i < self.functions.length; i++) {
                var prevResult = yield new Promise ((resolve, reject) => {
                    self.functions[i]((err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }, prevResult);
                });
            };
            return prevResult;
        })();
    };

    execute (prevResult) {
        var yieldedValue = this.generator.next(prevResult);
        var nextPromise = yieldedValue.value;

        if (!yieldedValue.done) {
            nextPromise.then((result) => {
                this.execute(result);
            }, (err) => {
                this.callback(err);
            })
        } else {
            this.callback(yieldedValue.value)
        }
    };
}