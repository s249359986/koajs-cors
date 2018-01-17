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
    function isString(s) {
        return typeof s === 'string' || s instanceof String;
    }
    function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
            for (let i = 0; i < allowedOrigin.length; ++i) {
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

    module.exports = (options = {}) => {
        let defaults = {
            erroDomain: null,
            origin: true,
            methods: 'GET,HEAD,PUT,POST,DELETE'
        };

        // Set defaults
        for (let key in defaults) {
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

        return async (ctx, next) => {

            /**
             * Access Control Allow Origin
             */
            let origin;

            if (typeof options.origin === 'string') {
                origin = options.origin;
            } else if (options.origin === true) {
                origin = ctx.get('origin') || '*';
            } else if (options.origin === false) {
                origin = options.origin;
            } else if (typeof options.origin === 'function') {
                origin = options.origin(ctx.request);
            }else if (Array.isArray(options.origin)) {
                let requestOrigin=ctx.headers.origin;
                let isAllowed=false;
                if(requestOrigin)
                {
                    isAllowed = isOriginAllowed(requestOrigin, options.origin);
                }
                else
                {
                    requestOrigin="*";
                    isAllowed=true;
                }
                origin =isAllowed?requestOrigin:false;
            }

            if (origin === false)
            {
                if (typeof options.erroDomain === 'function') {
                    options.erroDomain(ctx, next);
                    return;
                } else {
                    ctx.body = {code:1,msg:"illegal domain"};
                    return;
                }
            }

            ctx.set('Access-Control-Allow-Origin', origin);

            /**
             * Access Control Expose Headers
             */
            if (options.expose) {
                ctx.set('Access-Control-Expose-Headers', options.expose);
            }

            /**
             * Access Control Max Age
             */
            if (options.maxAge) {
                ctx.set('Access-Control-Max-Age', options.maxAge);
            }

            /**
             * Access Control Allow Credentials
             */
            if (options.credentials === true) {
                ctx.set('Access-Control-Allow-Credentials', 'true');
            }

            /**
             * Access Control Allow Methods
             */
            ctx.set('Access-Control-Allow-Methods', options.methods);

            /**
             * Access Control Allow Headers
             */
            let headers;

            if (options.headers) {
                headers = options.headers;
            } else {
                headers = ctx.get('access-control-request-headers');
            }

            if (headers) {
                ctx.set('Access-Control-Allow-Headers', headers);
            }

            /**
             * Returns
             */
            if (ctx.method === 'OPTIONS') {
                ctx.status = 204;
            } else {
                await next();
            }
        };
    };


}());



