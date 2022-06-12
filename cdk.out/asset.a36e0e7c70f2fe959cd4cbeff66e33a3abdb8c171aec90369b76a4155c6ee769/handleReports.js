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
exports.handleReports = void 0;
exports.handleReports = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    // if (ACTIONS.USER.CREATE_USER === action) {
    //     const {user} = body;
    //     try {
    //         console.log('CREATE CLIENT', user);
    //         if (user.variant.type === 'CLIENT') {
    //             return await createClient(user);
    //         }
    //         return await createMicrolancer(user);
    //     } catch (e) {
    //         return e;
    //     }
    // }
});
exports.handleReports("1");
