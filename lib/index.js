/**
 * Created by songdonghong on 2016/10/9.
 */
'use strict';

/**
 * CORS middleware
 *
 * @param {Object} [options]
 * @return {GeneratorFunction}
 * @api public
 */



(function () {
    function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
            for (var i = 0; i < allowedOrigin.length; ++i) {
                if (isOriginAllowed(origin, allowedOrigin[i])) {
                    return true;
                }
            }
            return false;
        } else if (isString(allowedOrigin)) {
            return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
            return allowedOrigin.test(origin);
        } else {
            return !!allowedOrigin;
        }
    }

    module.exports = function getMiddleware(options) {

        options = options || {};

        var defaults = {
            origin: true,
            methods: 'GET,HEAD,PUT,POST,DELETE'
        };

        // Set defaults
        for (var key in defaults) {
            if (!options.hasOwnProperty(key)) {
                options[key] = defaults[key];
            }
        }

        // Set expose
        if (Array.isArray(options.expose)) {
            options.expose = options.expose.join(',');
        }

        // Set maxAge
        if (typeof options.maxAge === 'number') {
            options.maxAge = options.maxAge.toString();
        } else {
            options.maxAge = null;
        }

        // Set methods
        if (Array.isArray(options.methods)) {
            options.methods = options.methods.join(',');
        }

        // Set headers
        if (Array.isArray(options.headers)) {
            options.headers = options.headers.join(',');
        }

        return function* cors(next) {

            /**
             * Access Control Allow Origin
             */
            var origin;

            if (typeof options.origin === 'string') {
                origin = options.origin;
            } else if (options.origin === true) {
                origin = this.get('origin') || '*';
            } else if (options.origin === false) {
                origin = options.origin;
            } else if (typeof options.origin === 'function') {
                origin = options.origin(this.request);
            }else if (Array.isArray(options.origin)) {
                var requestOrigin=this.origin;
               var isAllowed = isOriginAllowed(requestOrigin, options.origin);
                    origin =isAllowed?requestOrigin:false;
            }

            if (origin === false) return;

            this.set('Access-Control-Allow-Origin', origin);

            /**
             * Access Control Expose Headers
             */
            if (options.expose) {
                this.set('Access-Control-Expose-Headers', options.expose);
            }

            /**
             * Access Control Max Age
             */
            if (options.maxAge) {
                this.set('Access-Control-Max-Age', options.maxAge);
            }

            /**
             * Access Control Allow Credentials
             */
            if (options.credentials === true) {
                this.set('Access-Control-Allow-Credentials', 'true');
            }

            /**
             * Access Control Allow Methods
             */
            this.set('Access-Control-Allow-Methods', options.methods);

            /**
             * Access Control Allow Headers
             */
            var headers;

            if (options.headers) {
                headers = options.headers;
            } else {
                headers = this.get('access-control-request-headers');
            }

            if (headers) {
                this.set('Access-Control-Allow-Headers', headers);
            }

            /**
             * Returns
             */
            if (this.method === 'OPTIONS') {
                this.status = 204;
            } else {
                yield next;
            }
        };
    };


}());



