/**
 * litevuex v0.1.442
 * (c) 2018 Jacob Schatz
 * @license MIT
 */
import Vue from 'vue';

var main = {
    install: function install(_vue) {
        _vue.mixin({beforeCreate: function() {
            var options = this.$options;
            if(options.store) {
                this.$store = options.store;
            } else if (options.parent && options.parent.$store) {
                this.$store = options.parent.$store;
            }
        }});
    },

    hug: function hug(store) {
        new Vue({
            data: function data() {
                return store.state;
            }
        });
        this.makeDispatchable(store);
        this.makeCommitable(store);
    },

    makeDispatchable: function makeDispatchable(store) {
        store.dispatch = function(action) {
            store.actions[action]();
        };
    },

    makeCommitable: function makeCommitable(store) {
        store.commit = function(commit) {
            store.mutations[commit]();
        };
    },

    
};

export default main;
