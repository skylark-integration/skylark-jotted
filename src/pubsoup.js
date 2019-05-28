define(['./util'], function (util) {
    'use strict';
    return class PubSoup {
        constructor() {
            this.topics = {};
            this.callbacks = {};
        }
        find(query) {
            this.topics[query] = this.topics[query] || [];
            return this.topics[query];
        }
        subscribe(topic, subscriber, priority = 90) {
            var foundTopic = this.find(topic);
            subscriber._priority = priority;
            foundTopic.push(subscriber);
            foundTopic.sort(function (a, b) {
                return a._priority > b._priority ? 1 : b._priority > a._priority ? -1 : 0;
            });
        }
        remover(arr, fn) {
            arr.forEach(function () {
                if (!fn) {
                    arr.length = 0;
                    return;
                }
                var index = [].indexOf.call(arr, fn);
                if (index === -1) {
                    return;
                }
                arr.splice(index, 1);
            });
        }
        unsubscribe(topic, subscriber) {
            var foundTopic = this.find(topic);
            this.remover(foundTopic, subscriber);
            this.callbacks[topic] = this.callbacks[topic] || [];
            this.remover(this.callbacks[topic], subscriber);
        }
        publish(topic, params = {}) {
            var foundTopic = this.find(topic);
            var runList = [];
            foundTopic.forEach(function (subscriber) {
                runList.push(subscriber);
            });
            util.seq(runList, params, this.runCallbacks(topic));
        }
        runCallbacks(topic) {
            return (err, params) => {
                this.callbacks[topic] = this.callbacks[topic] || [];
                this.callbacks[topic].forEach(c => {
                    c(err, params);
                });
            };
        }
        done(topic, callback = function () {
        }) {
            this.callbacks[topic] = this.callbacks[topic] || [];
            this.callbacks[topic].push(callback);
        }
    };
});