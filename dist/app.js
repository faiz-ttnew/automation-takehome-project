"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const search_term_1 = require("./search-term");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs = __importStar(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
let searchSource;
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { search_term, source } = req.body;
    source = source.toLowerCase();
    let productData = [];
    let sourceUrl = "";
    if (source === "amazon") {
        sourceUrl = `https://www.amazon.com/s?k=${search_term}&s=price-asc-rank`;
        searchSource = search_term_1.searchTerm.amazon;
    }
    else if (source === "flipkart") {
        sourceUrl = `https://www.flipkart.com/search?q=${search_term}&sort=price_asc`;
        searchSource = search_term_1.searchTerm.flipkart;
    }
    else {
        return res.status(200).send({
            message: "Invalid source",
            search_term,
            source,
            data: productData,
        });
    }
    yield fetchData(search_term, source, sourceUrl)
        .then((res) => {
        const fileName = search_term.split(" ").join("-");
        productData = res;
        let csvContent = res
            .map((element) => {
            return Object.values(element)
                .map((item) => `"${item}"`)
                .join(",");
        })
            .join("\n");
        fs.writeFile(`${'product'}.csv`, "product, price, link, search_term" + "\n" + csvContent, "utf8", function (err) {
            if (err) {
                console.log("Some error occurred - file either not saved or corrupted.", err);
            }
            else {
                console.log("File has been saved!");
            }
        });
    })
        .catch((error) => console.log(error));
    return res.status(200).send({
        search_term,
        source,
        data: productData,
    });
}));
const fetchData = (search_term, source, sourceUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(sourceUrl, {
            headers: {
                Accept: "application/json",
                "User-Agent": "axios 0.21.1",
            },
        });
        const html = response.data;
        const $ = cheerio_1.default.load(html);
        const productData = [];
        $(`${searchSource === null || searchSource === void 0 ? void 0 : searchSource.parent_ele}`).each((_idx, el) => {
            const shelf = $(el);
            if (productData.length < 3) {
                const price = shelf.find(`${searchSource === null || searchSource === void 0 ? void 0 : searchSource.price}`).text();
                if (price) {
                    const link = shelf.find(`${searchSource === null || searchSource === void 0 ? void 0 : searchSource.link}`).attr("href");
                    const title = shelf.find(`${searchSource === null || searchSource === void 0 ? void 0 : searchSource.title}`).text();
                    let element = {
                        product: title,
                        price,
                        link: `${searchSource === null || searchSource === void 0 ? void 0 : searchSource.baseURL}${link}`,
                        search_term,
                    };
                    productData.push(element);
                }
            }
        });
        return productData;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
