/**
 * litevuex v0.1.447
 * (c) 2018 Jacob Schatz
 * @license MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global.Vuex = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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
            store.dispatch = function(action, val) {
                store.actions[action](store, val);
            };
        },

        makeCommitable: function makeCommitable(store) {
            store.commit = function(commit, val) {
                store.mutations[commit](store, val);
            };
        },

        
    };

    return main;

})));
