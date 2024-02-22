"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getUsers: [User!]
    getLoginToken(email: String!, password: String): String
    # getCurrentLoginUser: User
  `;
