"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// asset-input/code/build/reports/querys/listFights.js
var require_listFights = __commonJS({
  "asset-input/code/build/reports/querys/listFights.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var graphql_request_12 = require("graphql-request");
    var LIST_FIGHTS = (0, graphql_request_12.gql)`
  query LIST_FIGHTS
{
    reportData {
        report (code: "13D8TJHa24KAwRXj"){
            endTime
            startTime 
            guild {
                name
                id
            }
            fights {
                # encounterID !== 0 > boss. Encounter ID fetchen
                    startTime
                    endTime
                    encounterID  
                    id
                    bossPercentage
                    encounterID
                    name
                    difficulty
                    size
                    fightPercentage
                    lastPhase
                    lastPhaseIsIntermission
                    kill
                    averageItemLevel
                    completeRaid
                }
        }
    }
}`;
    exports2.default = LIST_FIGHTS;
  }
});

// asset-input/code/build/reports/index.js
var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = exports && exports.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var listFights_1 = __importDefault(require_listFights());
var graphql_request_1 = require("graphql-request");
var GRAPHQL_ENDPOINT = process.env.WLOG_URL || "";
var GRAPHQL_BEARER = process.env.WLOG_BEARER || "";
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const graphQLClient = new graphql_request_1.GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${GRAPHQL_BEARER}`
    }
  });
  console.log("BEARER: ", GRAPHQL_BEARER);
  console.log("ENDPOINT: ", GRAPHQL_ENDPOINT);
  let response;
  let statusCode = 200;
  let body = {};
  try {
    response = yield graphQLClient.request(listFights_1.default);
    console.log("RESPONSE", response);
    body = yield response.json();
    console.log("BODY", body);
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }
  return {
    statusCode,
    body: JSON.stringify(body)
  };
});
