import "babel-polyfill";

export default class Succession {
    constructor (functions, callback) {
        this.functions = functions;
        this.callback = callback;
        this.results = [];

        var self = this;

        this.generator = (function* () {
            for (var i = 0; i < self.functions.length-1; i++) {
                var prevResult = yield self.getPromise(self.functions[i], prevResult);
            };
            return self.getPromise(self.functions[i], prevResult);
        })();
    };

    execute (prevResult) {
        var yieldedValue = this.generator.next(prevResult);
        var nextPromise = yieldedValue.value;

        nextPromise.then((result) => {
            this.results.push(result);
            if (yieldedValue.done) {
                this.callback(null, this.results);
            } else {
                this.execute(result);
            }
        }, (err) => {
            this.callback(err);
        });
    };

    getPromise (func, prevResult) {
        return new Promise ((resolve, reject) => {
            func((err, result) => {
                if (err) reject(err);
                else resolve(result);
            }, prevResult);
        });
    }
}