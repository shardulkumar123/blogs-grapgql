"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class PostService {
    constructor() {
        this.createPost = (payload) => __awaiter(this, void 0, void 0, function* () {
            const { slug, title, body, author, authorId } = payload;
            return yield db_1.prismaClient.post.create({
                data: {
                    slug,
                    title,
                    body,
                    author,
                    authorId,
                },
            });
        });
    }
}
exports.default = PostService;
