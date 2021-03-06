'use strict';

const GithubApi = require('github');
const config = require('config');

const githubConfig = config.get('providers.github');

module.exports = {
    _githubProvider: new GithubApi({
        debug: githubConfig.debug,
        protocol: githubConfig.protocol,
        host: githubConfig.host,
        pathPrefix: githubConfig.pathPrefix,
        headers: githubConfig.headers,
        followRedirects: githubConfig.followRedirects,
        timeout: githubConfig.timeout,
        promise: require('vow').Promise
    }),

    /**
     * Возвращает пользователя GitHub
     *
     * @param {String} username имя пользователя
     * @returns {Promise}
     */
    getUser(username) {
        return this._githubProvider.users.getForUser({
            user: username
        });
    },

    /**
     * Возвращает публичные репозитории пользователя на GitHub
     * 
     * @param {String} username имя пользователя
     * @returns {Promise}
     */
    getUserRepos(username) {
        return this._githubProvider.repos.getForUser({
            user: username
        });
    },

    /**
     * Возвращает контрибутеров репозитория
     * 
     * @param {String} username имя пользователя
     * @param {String} repo имя репозитория
     * @returns {Promise}
     */
    getRepoContributes(username, repo) {
        return this._githubProvider.repos.getContributors({
            user: username,
            repo: repo
        });
    }
};
