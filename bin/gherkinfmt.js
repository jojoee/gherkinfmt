#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@cucumber/gherkin/dist/src/Errors.js
var require_Errors = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/Errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoSuchLanguageException = exports.AstBuilderException = exports.CompositeParserException = exports.ParserException = exports.GherkinException = void 0;
    var GherkinException = class extends Error {
      constructor(message) {
        super(message);
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
      }
      static _create(message, location) {
        const column = location != null ? location.column || 0 : -1;
        const line = location != null ? location.line || 0 : -1;
        const m = `(${line}:${column}): ${message}`;
        const err = new this(m);
        err.location = location;
        return err;
      }
    };
    exports.GherkinException = GherkinException;
    var ParserException = class extends GherkinException {
      static create(message, line, column) {
        const err = new this(`(${line}:${column}): ${message}`);
        err.location = { line, column };
        return err;
      }
    };
    exports.ParserException = ParserException;
    var CompositeParserException = class extends GherkinException {
      static create(errors) {
        const message = "Parser errors:\n" + errors.map((e) => e.message).join("\n");
        const err = new this(message);
        err.errors = errors;
        return err;
      }
    };
    exports.CompositeParserException = CompositeParserException;
    var AstBuilderException = class extends GherkinException {
      static create(message, location) {
        return this._create(message, location);
      }
    };
    exports.AstBuilderException = AstBuilderException;
    var NoSuchLanguageException = class extends GherkinException {
      static create(language, location) {
        const message = "Language not supported: " + language;
        return this._create(message, location);
      }
    };
    exports.NoSuchLanguageException = NoSuchLanguageException;
  }
});

// node_modules/@cucumber/gherkin/dist/src/TokenExceptions.js
var require_TokenExceptions = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/TokenExceptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnexpectedEOFException = exports.UnexpectedTokenException = void 0;
    var Errors_1 = require_Errors();
    var UnexpectedTokenException = class extends Errors_1.GherkinException {
      static create(token, expectedTokenTypes) {
        const message = `expected: ${expectedTokenTypes.join(", ")}, got '${token.getTokenValue().trim()}'`;
        const location = tokenLocation(token);
        return this._create(message, location);
      }
    };
    exports.UnexpectedTokenException = UnexpectedTokenException;
    var UnexpectedEOFException = class extends Errors_1.GherkinException {
      static create(token, expectedTokenTypes) {
        const message = `unexpected end of file, expected: ${expectedTokenTypes.join(", ")}`;
        const location = tokenLocation(token);
        return this._create(message, location);
      }
    };
    exports.UnexpectedEOFException = UnexpectedEOFException;
    function tokenLocation(token) {
      return token.location && token.location.line && token.line && token.line.indent !== void 0 ? {
        line: token.location.line,
        column: token.line.indent + 1
      } : token.location;
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/TokenScanner.js
var require_TokenScanner = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/TokenScanner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TokenScanner = class {
      constructor(source, makeToken) {
        this.makeToken = makeToken;
        this.lineNumber = 0;
        this.lines = source.split(/\r?\n/);
        if (this.lines.length > 0 && this.lines[this.lines.length - 1].trim() === "") {
          this.lines.pop();
        }
      }
      read() {
        const line = this.lines[this.lineNumber++];
        const location = {
          line: this.lineNumber
        };
        return this.makeToken(line, location);
      }
    };
    exports.default = TokenScanner;
  }
});

// node_modules/@cucumber/gherkin/dist/src/countSymbols.js
var require_countSymbols = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/countSymbols.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = countSymbols;
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    function countSymbols(s) {
      return s.replace(regexAstralSymbols, "_").length;
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/GherkinLine.js
var require_GherkinLine = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/GherkinLine.js"(exports, module) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var countSymbols_1 = __importDefault(require_countSymbols());
    var GherkinLine = class {
      constructor(lineText, lineNumber) {
        this.lineText = lineText;
        this.lineNumber = lineNumber;
        this.trimmedLineText = lineText.replace(/^\s+/g, "");
        this.isEmpty = this.trimmedLineText.length === 0;
        this.indent = (0, countSymbols_1.default)(lineText) - (0, countSymbols_1.default)(this.trimmedLineText);
      }
      startsWith(prefix) {
        return this.trimmedLineText.indexOf(prefix) === 0;
      }
      startsWithTitleKeyword(keyword) {
        return this.startsWith(keyword + ":");
      }
      match(regexp) {
        return this.trimmedLineText.match(regexp);
      }
      getLineText(indentToRemove) {
        if (indentToRemove < 0 || indentToRemove > this.indent) {
          return this.trimmedLineText;
        } else {
          return this.lineText.substring(indentToRemove);
        }
      }
      getRestTrimmed(length) {
        return this.trimmedLineText.substring(length).trim();
      }
      getTableCells() {
        const cells = [];
        let col = 0;
        let startCol = col + 1;
        let cell = "";
        let firstCell = true;
        while (col < this.trimmedLineText.length) {
          let chr = this.trimmedLineText[col];
          col++;
          if (chr === "|") {
            if (firstCell) {
              firstCell = false;
            } else {
              const trimmedLeft = cell.replace(/^[ \t\v\f\r\u0085\u00A0]*/g, "");
              const trimmed = trimmedLeft.replace(/[ \t\v\f\r\u0085\u00A0]*$/g, "");
              const cellIndent = cell.length - trimmedLeft.length;
              const span = {
                column: this.indent + startCol + cellIndent,
                text: trimmed
              };
              cells.push(span);
            }
            cell = "";
            startCol = col + 1;
          } else if (chr === "\\") {
            chr = this.trimmedLineText[col];
            col += 1;
            if (chr === "n") {
              cell += "\n";
            } else {
              if (chr !== "|" && chr !== "\\") {
                cell += "\\";
              }
              cell += chr;
            }
          } else {
            cell += chr;
          }
        }
        return cells;
      }
    };
    exports.default = GherkinLine;
    module.exports = GherkinLine;
  }
});

// node_modules/@cucumber/gherkin/dist/src/Parser.js
var require_Parser = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/Parser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RuleType = exports.TokenType = exports.Token = void 0;
    var Errors_1 = require_Errors();
    var TokenExceptions_1 = require_TokenExceptions();
    var TokenScanner_1 = __importDefault(require_TokenScanner());
    var GherkinLine_1 = __importDefault(require_GherkinLine());
    var Token = class {
      constructor(line, location) {
        this.line = line;
        this.location = location;
        this.isEof = !line;
      }
      getTokenValue() {
        return this.isEof ? "EOF" : this.line.getLineText(-1);
      }
      detach() {
      }
    };
    exports.Token = Token;
    var TokenType;
    (function(TokenType2) {
      TokenType2[TokenType2["None"] = 0] = "None";
      TokenType2[TokenType2["EOF"] = 1] = "EOF";
      TokenType2[TokenType2["Empty"] = 2] = "Empty";
      TokenType2[TokenType2["Comment"] = 3] = "Comment";
      TokenType2[TokenType2["TagLine"] = 4] = "TagLine";
      TokenType2[TokenType2["FeatureLine"] = 5] = "FeatureLine";
      TokenType2[TokenType2["RuleLine"] = 6] = "RuleLine";
      TokenType2[TokenType2["BackgroundLine"] = 7] = "BackgroundLine";
      TokenType2[TokenType2["ScenarioLine"] = 8] = "ScenarioLine";
      TokenType2[TokenType2["ExamplesLine"] = 9] = "ExamplesLine";
      TokenType2[TokenType2["StepLine"] = 10] = "StepLine";
      TokenType2[TokenType2["DocStringSeparator"] = 11] = "DocStringSeparator";
      TokenType2[TokenType2["TableRow"] = 12] = "TableRow";
      TokenType2[TokenType2["Language"] = 13] = "Language";
      TokenType2[TokenType2["Other"] = 14] = "Other";
    })(TokenType || (exports.TokenType = TokenType = {}));
    var RuleType;
    (function(RuleType2) {
      RuleType2[RuleType2["None"] = 0] = "None";
      RuleType2[RuleType2["_EOF"] = 1] = "_EOF";
      RuleType2[RuleType2["_Empty"] = 2] = "_Empty";
      RuleType2[RuleType2["_Comment"] = 3] = "_Comment";
      RuleType2[RuleType2["_TagLine"] = 4] = "_TagLine";
      RuleType2[RuleType2["_FeatureLine"] = 5] = "_FeatureLine";
      RuleType2[RuleType2["_RuleLine"] = 6] = "_RuleLine";
      RuleType2[RuleType2["_BackgroundLine"] = 7] = "_BackgroundLine";
      RuleType2[RuleType2["_ScenarioLine"] = 8] = "_ScenarioLine";
      RuleType2[RuleType2["_ExamplesLine"] = 9] = "_ExamplesLine";
      RuleType2[RuleType2["_StepLine"] = 10] = "_StepLine";
      RuleType2[RuleType2["_DocStringSeparator"] = 11] = "_DocStringSeparator";
      RuleType2[RuleType2["_TableRow"] = 12] = "_TableRow";
      RuleType2[RuleType2["_Language"] = 13] = "_Language";
      RuleType2[RuleType2["_Other"] = 14] = "_Other";
      RuleType2[RuleType2["GherkinDocument"] = 15] = "GherkinDocument";
      RuleType2[RuleType2["Feature"] = 16] = "Feature";
      RuleType2[RuleType2["FeatureHeader"] = 17] = "FeatureHeader";
      RuleType2[RuleType2["Rule"] = 18] = "Rule";
      RuleType2[RuleType2["RuleHeader"] = 19] = "RuleHeader";
      RuleType2[RuleType2["Background"] = 20] = "Background";
      RuleType2[RuleType2["ScenarioDefinition"] = 21] = "ScenarioDefinition";
      RuleType2[RuleType2["Scenario"] = 22] = "Scenario";
      RuleType2[RuleType2["ExamplesDefinition"] = 23] = "ExamplesDefinition";
      RuleType2[RuleType2["Examples"] = 24] = "Examples";
      RuleType2[RuleType2["ExamplesTable"] = 25] = "ExamplesTable";
      RuleType2[RuleType2["Step"] = 26] = "Step";
      RuleType2[RuleType2["StepArg"] = 27] = "StepArg";
      RuleType2[RuleType2["DataTable"] = 28] = "DataTable";
      RuleType2[RuleType2["DocString"] = 29] = "DocString";
      RuleType2[RuleType2["Tags"] = 30] = "Tags";
      RuleType2[RuleType2["DescriptionHelper"] = 31] = "DescriptionHelper";
      RuleType2[RuleType2["Description"] = 32] = "Description";
    })(RuleType || (exports.RuleType = RuleType = {}));
    var Parser = class {
      constructor(builder, tokenMatcher) {
        this.builder = builder;
        this.tokenMatcher = tokenMatcher;
        this.stopAtFirstError = false;
      }
      parse(gherkinSource) {
        const tokenScanner = new TokenScanner_1.default(gherkinSource, (line, location) => {
          const gherkinLine = line === null || line === void 0 ? null : new GherkinLine_1.default(line, location.line);
          return new Token(gherkinLine, location);
        });
        this.builder.reset();
        this.tokenMatcher.reset();
        this.context = {
          tokenScanner,
          tokenQueue: [],
          errors: []
        };
        this.startRule(this.context, RuleType.GherkinDocument);
        let state = 0;
        let token = null;
        while (true) {
          token = this.readToken(this.context);
          state = this.matchToken(state, token, this.context);
          if (token.isEof)
            break;
        }
        this.endRule(this.context);
        if (this.context.errors.length > 0) {
          throw Errors_1.CompositeParserException.create(this.context.errors);
        }
        return this.getResult();
      }
      addError(context, error) {
        if (!context.errors.map((e) => {
          return e.message;
        }).includes(error.message)) {
          context.errors.push(error);
          if (context.errors.length > 10)
            throw Errors_1.CompositeParserException.create(context.errors);
        }
      }
      startRule(context, ruleType) {
        this.handleAstError(context, () => this.builder.startRule(ruleType));
      }
      endRule(context) {
        this.handleAstError(context, () => this.builder.endRule());
      }
      build(context, token) {
        this.handleAstError(context, () => this.builder.build(token));
      }
      getResult() {
        return this.builder.getResult();
      }
      handleAstError(context, action) {
        this.handleExternalError(context, true, action);
      }
      handleExternalError(context, defaultValue, action) {
        if (this.stopAtFirstError)
          return action();
        try {
          return action();
        } catch (e) {
          if (e instanceof Errors_1.CompositeParserException) {
            e.errors.forEach((error) => this.addError(context, error));
          } else if (e instanceof Errors_1.ParserException || e instanceof Errors_1.AstBuilderException || e instanceof TokenExceptions_1.UnexpectedTokenException || e instanceof Errors_1.NoSuchLanguageException) {
            this.addError(context, e);
          } else {
            throw e;
          }
        }
        return defaultValue;
      }
      readToken(context) {
        return context.tokenQueue.length > 0 ? context.tokenQueue.shift() : context.tokenScanner.read();
      }
      matchToken(state, token, context) {
        switch (state) {
          case 0:
            return this.matchTokenAt_0(token, context);
          case 1:
            return this.matchTokenAt_1(token, context);
          case 2:
            return this.matchTokenAt_2(token, context);
          case 3:
            return this.matchTokenAt_3(token, context);
          case 4:
            return this.matchTokenAt_4(token, context);
          case 5:
            return this.matchTokenAt_5(token, context);
          case 6:
            return this.matchTokenAt_6(token, context);
          case 7:
            return this.matchTokenAt_7(token, context);
          case 8:
            return this.matchTokenAt_8(token, context);
          case 9:
            return this.matchTokenAt_9(token, context);
          case 10:
            return this.matchTokenAt_10(token, context);
          case 11:
            return this.matchTokenAt_11(token, context);
          case 12:
            return this.matchTokenAt_12(token, context);
          case 13:
            return this.matchTokenAt_13(token, context);
          case 14:
            return this.matchTokenAt_14(token, context);
          case 15:
            return this.matchTokenAt_15(token, context);
          case 16:
            return this.matchTokenAt_16(token, context);
          case 17:
            return this.matchTokenAt_17(token, context);
          case 18:
            return this.matchTokenAt_18(token, context);
          case 19:
            return this.matchTokenAt_19(token, context);
          case 20:
            return this.matchTokenAt_20(token, context);
          case 21:
            return this.matchTokenAt_21(token, context);
          case 22:
            return this.matchTokenAt_22(token, context);
          case 23:
            return this.matchTokenAt_23(token, context);
          case 24:
            return this.matchTokenAt_24(token, context);
          case 25:
            return this.matchTokenAt_25(token, context);
          case 26:
            return this.matchTokenAt_26(token, context);
          case 27:
            return this.matchTokenAt_27(token, context);
          case 28:
            return this.matchTokenAt_28(token, context);
          case 29:
            return this.matchTokenAt_29(token, context);
          case 30:
            return this.matchTokenAt_30(token, context);
          case 31:
            return this.matchTokenAt_31(token, context);
          case 32:
            return this.matchTokenAt_32(token, context);
          case 33:
            return this.matchTokenAt_33(token, context);
          case 35:
            return this.matchTokenAt_35(token, context);
          case 36:
            return this.matchTokenAt_36(token, context);
          case 37:
            return this.matchTokenAt_37(token, context);
          case 38:
            return this.matchTokenAt_38(token, context);
          case 39:
            return this.matchTokenAt_39(token, context);
          case 40:
            return this.matchTokenAt_40(token, context);
          case 41:
            return this.matchTokenAt_41(token, context);
          case 42:
            return this.matchTokenAt_42(token, context);
          default:
            throw new Error("Unknown state: " + state);
        }
      }
      // Start
      matchTokenAt_0(token, context) {
        if (this.match_EOF(context, token)) {
          this.build(context, token);
          return 34;
        }
        if (this.match_Language(context, token)) {
          this.startRule(context, RuleType.Feature);
          this.startRule(context, RuleType.FeatureHeader);
          this.build(context, token);
          return 1;
        }
        if (this.match_TagLine(context, token)) {
          this.startRule(context, RuleType.Feature);
          this.startRule(context, RuleType.FeatureHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 2;
        }
        if (this.match_FeatureLine(context, token)) {
          this.startRule(context, RuleType.Feature);
          this.startRule(context, RuleType.FeatureHeader);
          this.build(context, token);
          return 3;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 0;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 0;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Language", "#TagLine", "#FeatureLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 0;
      }
      // GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0
      matchTokenAt_1(token, context) {
        if (this.match_TagLine(context, token)) {
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 2;
        }
        if (this.match_FeatureLine(context, token)) {
          this.build(context, token);
          return 3;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 1;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 1;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 1;
      }
      // GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0
      matchTokenAt_2(token, context) {
        if (this.match_TagLine(context, token)) {
          this.build(context, token);
          return 2;
        }
        if (this.match_FeatureLine(context, token)) {
          this.endRule(context);
          this.build(context, token);
          return 3;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 2;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 2;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 2;
      }
      // GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0
      matchTokenAt_3(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 3;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 4;
        }
        if (this.match_BackgroundLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Background);
          this.build(context, token);
          return 5;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 4;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 3;
      }
      // GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_4(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 4;
        }
        if (this.match_BackgroundLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Background);
          this.build(context, token);
          return 5;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 4;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 4;
      }
      // GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
      matchTokenAt_5(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 5;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 6;
        }
        if (this.match_StepLine(context, token)) {
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 7;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 6;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 5;
      }
      // GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_6(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 6;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 7;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 6;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 6;
      }
      // GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0
      matchTokenAt_7(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.startRule(context, RuleType.DataTable);
          this.build(context, token);
          return 8;
        }
        if (this.match_DocStringSeparator(context, token)) {
          this.startRule(context, RuleType.DocString);
          this.build(context, token);
          return 41;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 7;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 7;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 7;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 7;
      }
      // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
      matchTokenAt_8(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.build(context, token);
          return 8;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 7;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 8;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 8;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 8;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0
      matchTokenAt_9(token, context) {
        if (this.match_TagLine(context, token)) {
          this.build(context, token);
          return 9;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 9;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 9;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#ScenarioLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 9;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
      matchTokenAt_10(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 10;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 11;
        }
        if (this.match_StepLine(context, token)) {
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 12;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 11;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 10;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_11(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 11;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 12;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 11;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 11;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
      matchTokenAt_12(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.startRule(context, RuleType.DataTable);
          this.build(context, token);
          return 13;
        }
        if (this.match_DocStringSeparator(context, token)) {
          this.startRule(context, RuleType.DocString);
          this.build(context, token);
          return 39;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 12;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 12;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 12;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 12;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
      matchTokenAt_13(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.build(context, token);
          return 13;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 12;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 13;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 13;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 13;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
      matchTokenAt_14(token, context) {
        if (this.match_TagLine(context, token)) {
          this.build(context, token);
          return 14;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 14;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 14;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 14;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
      matchTokenAt_15(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 15;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 16;
        }
        if (this.match_TableRow(context, token)) {
          this.startRule(context, RuleType.ExamplesTable);
          this.build(context, token);
          return 17;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 16;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 15;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_16(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 16;
        }
        if (this.match_TableRow(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesTable);
          this.build(context, token);
          return 17;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 16;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 16;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
      matchTokenAt_17(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.build(context, token);
          return 17;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 17;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 17;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 17;
      }
      // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>Tags:0>#TagLine:0
      matchTokenAt_18(token, context) {
        if (this.match_TagLine(context, token)) {
          this.build(context, token);
          return 18;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 18;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 18;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 18;
      }
      // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>#RuleLine:0
      matchTokenAt_19(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 20;
        }
        if (this.match_BackgroundLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Background);
          this.build(context, token);
          return 21;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 20;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 19;
      }
      // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:2>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_20(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 20;
        }
        if (this.match_BackgroundLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Background);
          this.build(context, token);
          return 21;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 20;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 20;
      }
      // GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0
      matchTokenAt_21(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 21;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 22;
        }
        if (this.match_StepLine(context, token)) {
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 23;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 22;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 21;
      }
      // GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_22(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 22;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 23;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 22;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 22;
      }
      // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0
      matchTokenAt_23(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.startRule(context, RuleType.DataTable);
          this.build(context, token);
          return 24;
        }
        if (this.match_DocStringSeparator(context, token)) {
          this.startRule(context, RuleType.DocString);
          this.build(context, token);
          return 37;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 23;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 23;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 23;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 23;
      }
      // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
      matchTokenAt_24(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.build(context, token);
          return 24;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 23;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 24;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 24;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 24;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0
      matchTokenAt_25(token, context) {
        if (this.match_TagLine(context, token)) {
          this.build(context, token);
          return 25;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 25;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 25;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#ScenarioLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 25;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
      matchTokenAt_26(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 26;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 27;
        }
        if (this.match_StepLine(context, token)) {
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 28;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 27;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 26;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_27(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 27;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 28;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 27;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 27;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
      matchTokenAt_28(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.startRule(context, RuleType.DataTable);
          this.build(context, token);
          return 29;
        }
        if (this.match_DocStringSeparator(context, token)) {
          this.startRule(context, RuleType.DocString);
          this.build(context, token);
          return 35;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 28;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 28;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 28;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 28;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
      matchTokenAt_29(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.build(context, token);
          return 29;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 28;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 29;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 29;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 29;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
      matchTokenAt_30(token, context) {
        if (this.match_TagLine(context, token)) {
          this.build(context, token);
          return 30;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 30;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 30;
        }
        token.detach();
        const expectedTokens = ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 30;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
      matchTokenAt_31(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 31;
        }
        if (this.match_Comment(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 32;
        }
        if (this.match_TableRow(context, token)) {
          this.startRule(context, RuleType.ExamplesTable);
          this.build(context, token);
          return 33;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.startRule(context, RuleType.Description);
          this.build(context, token);
          return 32;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 31;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
      matchTokenAt_32(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 32;
        }
        if (this.match_TableRow(context, token)) {
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesTable);
          this.build(context, token);
          return 33;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 32;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 32;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
      matchTokenAt_33(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_TableRow(context, token)) {
          this.build(context, token);
          return 33;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 33;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 33;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 33;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
      matchTokenAt_35(token, context) {
        if (this.match_DocStringSeparator(context, token)) {
          this.build(context, token);
          return 36;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 35;
        }
        token.detach();
        const expectedTokens = ["#DocStringSeparator", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 35;
      }
      // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
      matchTokenAt_36(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 28;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 30;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 31;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 36;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 36;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 36;
      }
      // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
      matchTokenAt_37(token, context) {
        if (this.match_DocStringSeparator(context, token)) {
          this.build(context, token);
          return 38;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 37;
        }
        token.detach();
        const expectedTokens = ["#DocStringSeparator", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 37;
      }
      // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
      matchTokenAt_38(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 23;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 25;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 26;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 38;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 38;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 38;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
      matchTokenAt_39(token, context) {
        if (this.match_DocStringSeparator(context, token)) {
          this.build(context, token);
          return 40;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 39;
        }
        token.detach();
        const expectedTokens = ["#DocStringSeparator", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 39;
      }
      // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
      matchTokenAt_40(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 12;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_1(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ExamplesDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 14;
          }
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ExamplesLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ExamplesDefinition);
          this.startRule(context, RuleType.Examples);
          this.build(context, token);
          return 15;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 40;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 40;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 40;
      }
      // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
      matchTokenAt_41(token, context) {
        if (this.match_DocStringSeparator(context, token)) {
          this.build(context, token);
          return 42;
        }
        if (this.match_Other(context, token)) {
          this.build(context, token);
          return 41;
        }
        token.detach();
        const expectedTokens = ["#DocStringSeparator", "#Other"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 41;
      }
      // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
      matchTokenAt_42(token, context) {
        if (this.match_EOF(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.build(context, token);
          return 34;
        }
        if (this.match_StepLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Step);
          this.build(context, token);
          return 7;
        }
        if (this.match_TagLine(context, token)) {
          if (this.lookahead_0(context, token)) {
            this.endRule(context);
            this.endRule(context);
            this.endRule(context);
            this.startRule(context, RuleType.ScenarioDefinition);
            this.startRule(context, RuleType.Tags);
            this.build(context, token);
            return 9;
          }
        }
        if (this.match_TagLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.startRule(context, RuleType.Tags);
          this.build(context, token);
          return 18;
        }
        if (this.match_ScenarioLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.ScenarioDefinition);
          this.startRule(context, RuleType.Scenario);
          this.build(context, token);
          return 10;
        }
        if (this.match_RuleLine(context, token)) {
          this.endRule(context);
          this.endRule(context);
          this.endRule(context);
          this.startRule(context, RuleType.Rule);
          this.startRule(context, RuleType.RuleHeader);
          this.build(context, token);
          return 19;
        }
        if (this.match_Comment(context, token)) {
          this.build(context, token);
          return 42;
        }
        if (this.match_Empty(context, token)) {
          this.build(context, token);
          return 42;
        }
        token.detach();
        const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
        const error = token.isEof ? TokenExceptions_1.UnexpectedEOFException.create(token, expectedTokens) : TokenExceptions_1.UnexpectedTokenException.create(token, expectedTokens);
        if (this.stopAtFirstError)
          throw error;
        this.addError(context, error);
        return 42;
      }
      match_EOF(context, token) {
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_EOF(token));
      }
      match_Empty(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_Empty(token));
      }
      match_Comment(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_Comment(token));
      }
      match_TagLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_TagLine(token));
      }
      match_FeatureLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_FeatureLine(token));
      }
      match_RuleLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_RuleLine(token));
      }
      match_BackgroundLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_BackgroundLine(token));
      }
      match_ScenarioLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_ScenarioLine(token));
      }
      match_ExamplesLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_ExamplesLine(token));
      }
      match_StepLine(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_StepLine(token));
      }
      match_DocStringSeparator(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_DocStringSeparator(token));
      }
      match_TableRow(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_TableRow(token));
      }
      match_Language(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_Language(token));
      }
      match_Other(context, token) {
        if (token.isEof)
          return false;
        return this.handleExternalError(context, false, () => this.tokenMatcher.match_Other(token));
      }
      lookahead_0(context, currentToken) {
        currentToken.detach();
        let token;
        const queue = [];
        let match = false;
        do {
          token = this.readToken(this.context);
          token.detach();
          queue.push(token);
          if (this.match_ScenarioLine(context, token)) {
            match = true;
            break;
          }
        } while (this.match_Empty(context, token) || this.match_Comment(context, token) || this.match_TagLine(context, token));
        context.tokenQueue = context.tokenQueue.concat(queue);
        return match;
      }
      lookahead_1(context, currentToken) {
        currentToken.detach();
        let token;
        const queue = [];
        let match = false;
        do {
          token = this.readToken(this.context);
          token.detach();
          queue.push(token);
          if (this.match_ExamplesLine(context, token)) {
            match = true;
            break;
          }
        } while (this.match_Empty(context, token) || this.match_Comment(context, token) || this.match_TagLine(context, token));
        context.tokenQueue = context.tokenQueue.concat(queue);
        return match;
      }
    };
    exports.default = Parser;
  }
});

// node_modules/@cucumber/gherkin/dist/src/gherkin-languages.json
var require_gherkin_languages = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/gherkin-languages.json"(exports, module) {
    module.exports = {
      af: {
        and: [
          "* ",
          "En "
        ],
        background: [
          "Agtergrond"
        ],
        but: [
          "* ",
          "Maar "
        ],
        examples: [
          "Voorbeelde"
        ],
        feature: [
          "Funksie",
          "Besigheid Behoefte",
          "Vermo\xEB"
        ],
        given: [
          "* ",
          "Gegewe "
        ],
        name: "Afrikaans",
        native: "Afrikaans",
        rule: [
          "Re\xEBl",
          "Reel"
        ],
        scenario: [
          "Voorbeeld",
          "Situasie"
        ],
        scenarioOutline: [
          "Situasie Uiteensetting"
        ],
        then: [
          "* ",
          "Dan "
        ],
        when: [
          "* ",
          "Wanneer "
        ]
      },
      am: {
        and: [
          "* ",
          "\u0535\u057E "
        ],
        background: [
          "\u053F\u0578\u0576\u057F\u0565\u0584\u057D\u057F"
        ],
        but: [
          "* ",
          "\u0532\u0561\u0575\u0581 "
        ],
        examples: [
          "\u0555\u0580\u056B\u0576\u0561\u056F\u0576\u0565\u0580"
        ],
        feature: [
          "\u0556\u0578\u0582\u0576\u056F\u0581\u056B\u0578\u0576\u0561\u056C\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
          "\u0540\u0561\u057F\u056F\u0578\u0582\u0569\u0575\u0578\u0582\u0576"
        ],
        given: [
          "* ",
          "\u0534\u056B\u0581\u0578\u0582\u0584 "
        ],
        name: "Armenian",
        native: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0555\u0580\u056B\u0576\u0561\u056F",
          "\u054D\u0581\u0565\u0576\u0561\u0580"
        ],
        scenarioOutline: [
          "\u054D\u0581\u0565\u0576\u0561\u0580\u056B \u056F\u0561\u057C\u0578\u0582\u0581\u057E\u0561\u0581\u0584\u0568"
        ],
        then: [
          "* ",
          "\u0531\u057A\u0561 "
        ],
        when: [
          "* ",
          "\u0535\u0569\u0565 ",
          "\u0535\u0580\u0562 "
        ]
      },
      an: {
        and: [
          "* ",
          "Y ",
          "E "
        ],
        background: [
          "Antecedents"
        ],
        but: [
          "* ",
          "Pero "
        ],
        examples: [
          "Eixemplos"
        ],
        feature: [
          "Caracteristica"
        ],
        given: [
          "* ",
          "Dau ",
          "Dada ",
          "Daus ",
          "Dadas "
        ],
        name: "Aragonese",
        native: "Aragon\xE9s",
        rule: [
          "Rule"
        ],
        scenario: [
          "Eixemplo",
          "Caso"
        ],
        scenarioOutline: [
          "Esquema del caso"
        ],
        then: [
          "* ",
          "Alavez ",
          "Allora ",
          "Antonces "
        ],
        when: [
          "* ",
          "Cuan "
        ]
      },
      ar: {
        and: [
          "* ",
          "\u0648 "
        ],
        background: [
          "\u0627\u0644\u062E\u0644\u0641\u064A\u0629"
        ],
        but: [
          "* ",
          "\u0644\u0643\u0646 "
        ],
        examples: [
          "\u0627\u0645\u062B\u0644\u0629"
        ],
        feature: [
          "\u062E\u0627\u0635\u064A\u0629"
        ],
        given: [
          "* ",
          "\u0628\u0641\u0631\u0636 "
        ],
        name: "Arabic",
        native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0645\u062B\u0627\u0644",
          "\u0633\u064A\u0646\u0627\u0631\u064A\u0648"
        ],
        scenarioOutline: [
          "\u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0645\u062E\u0637\u0637"
        ],
        then: [
          "* ",
          "\u0627\u0630\u0627\u064B ",
          "\u062B\u0645 "
        ],
        when: [
          "* ",
          "\u0645\u062A\u0649 ",
          "\u0639\u0646\u062F\u0645\u0627 "
        ]
      },
      ast: {
        and: [
          "* ",
          "Y ",
          "Ya "
        ],
        background: [
          "Antecedentes"
        ],
        but: [
          "* ",
          "Peru "
        ],
        examples: [
          "Exemplos"
        ],
        feature: [
          "Carauter\xEDstica"
        ],
        given: [
          "* ",
          "D\xE1u ",
          "Dada ",
          "Daos ",
          "Daes "
        ],
        name: "Asturian",
        native: "asturianu",
        rule: [
          "Rule"
        ],
        scenario: [
          "Exemplo",
          "Casu"
        ],
        scenarioOutline: [
          "Esbozu del casu"
        ],
        then: [
          "* ",
          "Ent\xF3s "
        ],
        when: [
          "* ",
          "Cuando "
        ]
      },
      az: {
        and: [
          "* ",
          "V\u0259 ",
          "H\u0259m "
        ],
        background: [
          "Ke\xE7mi\u015F",
          "Kontekst"
        ],
        but: [
          "* ",
          "Amma ",
          "Ancaq "
        ],
        examples: [
          "N\xFCmun\u0259l\u0259r"
        ],
        feature: [
          "\xD6z\u0259llik"
        ],
        given: [
          "* ",
          "Tutaq ki ",
          "Verilir "
        ],
        name: "Azerbaijani",
        native: "Az\u0259rbaycanca",
        rule: [
          "Rule"
        ],
        scenario: [
          "N\xFCmun\u0259",
          "Ssenari"
        ],
        scenarioOutline: [
          "Ssenarinin strukturu"
        ],
        then: [
          "* ",
          "O halda "
        ],
        when: [
          "* ",
          "\u018Fg\u0259r ",
          "N\u0259 vaxt ki "
        ]
      },
      be: {
        and: [
          "* ",
          "I ",
          "\u0414\u044B ",
          "\u0422\u0430\u043A\u0441\u0430\u043C\u0430 "
        ],
        background: [
          "\u041A\u0430\u043D\u0442\u044D\u043A\u0441\u0442"
        ],
        but: [
          "* ",
          "\u0410\u043B\u0435 ",
          "\u0406\u043D\u0430\u043A\u0448 "
        ],
        examples: [
          "\u041F\u0440\u044B\u043A\u043B\u0430\u0434\u044B"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u044B\u044F\u043D\u0430\u043B\u044C\u043D\u0430\u0441\u0446\u044C",
          "\u0424\u0456\u0447\u0430"
        ],
        given: [
          "* ",
          "\u041D\u044F\u0445\u0430\u0439 ",
          "\u0414\u0430\u0434\u0437\u0435\u043D\u0430 "
        ],
        name: "Belarusian",
        native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F",
        rule: [
          "\u041F\u0440\u0430\u0432\u0456\u043B\u044B"
        ],
        scenario: [
          "\u0421\u0446\u044D\u043D\u0430\u0440\u044B\u0439",
          "C\u0446\u044D\u043D\u0430\u0440"
        ],
        scenarioOutline: [
          "\u0428\u0430\u0431\u043B\u043E\u043D \u0441\u0446\u044D\u043D\u0430\u0440\u044B\u044F",
          "\u0423\u0437\u043E\u0440 \u0441\u0446\u044D\u043D\u0430\u0440\u0430"
        ],
        then: [
          "* ",
          "\u0422\u0430\u0434\u044B "
        ],
        when: [
          "* ",
          "\u041A\u0430\u043B\u0456 "
        ]
      },
      bg: {
        and: [
          "* ",
          "\u0418 "
        ],
        background: [
          "\u041F\u0440\u0435\u0434\u0438\u0441\u0442\u043E\u0440\u0438\u044F"
        ],
        but: [
          "* ",
          "\u041D\u043E "
        ],
        examples: [
          "\u041F\u0440\u0438\u043C\u0435\u0440\u0438"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u043D\u043E\u0441\u0442"
        ],
        given: [
          "* ",
          "\u0414\u0430\u0434\u0435\u043D\u043E "
        ],
        name: "Bulgarian",
        native: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438",
        rule: [
          "\u041F\u0440\u0430\u0432\u0438\u043B\u043E"
        ],
        scenario: [
          "\u041F\u0440\u0438\u043C\u0435\u0440",
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
        ],
        scenarioOutline: [
          "\u0420\u0430\u043C\u043A\u0430 \u043D\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
        ],
        then: [
          "* ",
          "\u0422\u043E "
        ],
        when: [
          "* ",
          "\u041A\u043E\u0433\u0430\u0442\u043E "
        ]
      },
      bm: {
        and: [
          "* ",
          "Dan "
        ],
        background: [
          "Latar Belakang"
        ],
        but: [
          "* ",
          "Tetapi ",
          "Tapi "
        ],
        examples: [
          "Contoh"
        ],
        feature: [
          "Fungsi"
        ],
        given: [
          "* ",
          "Diberi ",
          "Bagi "
        ],
        name: "Malay",
        native: "Bahasa Melayu",
        rule: [
          "Rule"
        ],
        scenario: [
          "Senario",
          "Situasi",
          "Keadaan"
        ],
        scenarioOutline: [
          "Kerangka Senario",
          "Kerangka Situasi",
          "Kerangka Keadaan",
          "Garis Panduan Senario"
        ],
        then: [
          "* ",
          "Maka ",
          "Kemudian "
        ],
        when: [
          "* ",
          "Apabila "
        ]
      },
      bs: {
        and: [
          "* ",
          "I ",
          "A "
        ],
        background: [
          "Pozadina"
        ],
        but: [
          "* ",
          "Ali "
        ],
        examples: [
          "Primjeri"
        ],
        feature: [
          "Karakteristika"
        ],
        given: [
          "* ",
          "Dato "
        ],
        name: "Bosnian",
        native: "Bosanski",
        rule: [
          "Rule"
        ],
        scenario: [
          "Primjer",
          "Scenariju",
          "Scenario"
        ],
        scenarioOutline: [
          "Scenariju-obris",
          "Scenario-outline"
        ],
        then: [
          "* ",
          "Zatim "
        ],
        when: [
          "* ",
          "Kada "
        ]
      },
      ca: {
        and: [
          "* ",
          "I "
        ],
        background: [
          "Rerefons",
          "Antecedents"
        ],
        but: [
          "* ",
          "Per\xF2 "
        ],
        examples: [
          "Exemples"
        ],
        feature: [
          "Caracter\xEDstica",
          "Funcionalitat"
        ],
        given: [
          "* ",
          "Donat ",
          "Donada ",
          "At\xE8s ",
          "Atesa "
        ],
        name: "Catalan",
        native: "catal\xE0",
        rule: [
          "Rule"
        ],
        scenario: [
          "Exemple",
          "Escenari"
        ],
        scenarioOutline: [
          "Esquema de l'escenari"
        ],
        then: [
          "* ",
          "Aleshores ",
          "Cal "
        ],
        when: [
          "* ",
          "Quan "
        ]
      },
      cs: {
        and: [
          "* ",
          "A tak\xE9 ",
          "A "
        ],
        background: [
          "Pozad\xED",
          "Kontext"
        ],
        but: [
          "* ",
          "Ale "
        ],
        examples: [
          "P\u0159\xEDklady"
        ],
        feature: [
          "Po\u017Eadavek"
        ],
        given: [
          "* ",
          "Pokud ",
          "Za p\u0159edpokladu "
        ],
        name: "Czech",
        native: "\u010Cesky",
        rule: [
          "Pravidlo"
        ],
        scenario: [
          "P\u0159\xEDklad",
          "Sc\xE9n\xE1\u0159"
        ],
        scenarioOutline: [
          "N\xE1\u010Drt Sc\xE9n\xE1\u0159e",
          "Osnova sc\xE9n\xE1\u0159e"
        ],
        then: [
          "* ",
          "Pak "
        ],
        when: [
          "* ",
          "Kdy\u017E "
        ]
      },
      "cy-GB": {
        and: [
          "* ",
          "A "
        ],
        background: [
          "Cefndir"
        ],
        but: [
          "* ",
          "Ond "
        ],
        examples: [
          "Enghreifftiau"
        ],
        feature: [
          "Arwedd"
        ],
        given: [
          "* ",
          "Anrhegedig a "
        ],
        name: "Welsh",
        native: "Cymraeg",
        rule: [
          "Rule"
        ],
        scenario: [
          "Enghraifft",
          "Scenario"
        ],
        scenarioOutline: [
          "Scenario Amlinellol"
        ],
        then: [
          "* ",
          "Yna "
        ],
        when: [
          "* ",
          "Pryd "
        ]
      },
      da: {
        and: [
          "* ",
          "Og "
        ],
        background: [
          "Baggrund"
        ],
        but: [
          "* ",
          "Men "
        ],
        examples: [
          "Eksempler"
        ],
        feature: [
          "Egenskab"
        ],
        given: [
          "* ",
          "Givet "
        ],
        name: "Danish",
        native: "dansk",
        rule: [
          "Regel"
        ],
        scenario: [
          "Eksempel",
          "Scenarie"
        ],
        scenarioOutline: [
          "Abstrakt Scenario"
        ],
        then: [
          "* ",
          "S\xE5 "
        ],
        when: [
          "* ",
          "N\xE5r "
        ]
      },
      de: {
        and: [
          "* ",
          "Und "
        ],
        background: [
          "Grundlage",
          "Hintergrund",
          "Voraussetzungen",
          "Vorbedingungen"
        ],
        but: [
          "* ",
          "Aber "
        ],
        examples: [
          "Beispiele"
        ],
        feature: [
          "Funktionalit\xE4t",
          "Funktion"
        ],
        given: [
          "* ",
          "Angenommen ",
          "Gegeben sei ",
          "Gegeben seien "
        ],
        name: "German",
        native: "Deutsch",
        rule: [
          "Rule",
          "Regel"
        ],
        scenario: [
          "Beispiel",
          "Szenario"
        ],
        scenarioOutline: [
          "Szenariogrundriss",
          "Szenarien"
        ],
        then: [
          "* ",
          "Dann "
        ],
        when: [
          "* ",
          "Wenn "
        ]
      },
      el: {
        and: [
          "* ",
          "\u039A\u03B1\u03B9 "
        ],
        background: [
          "\u03A5\u03C0\u03CC\u03B2\u03B1\u03B8\u03C1\u03BF"
        ],
        but: [
          "* ",
          "\u0391\u03BB\u03BB\u03AC "
        ],
        examples: [
          "\u03A0\u03B1\u03C1\u03B1\u03B4\u03B5\u03AF\u03B3\u03BC\u03B1\u03C4\u03B1",
          "\u03A3\u03B5\u03BD\u03AC\u03C1\u03B9\u03B1"
        ],
        feature: [
          "\u0394\u03C5\u03BD\u03B1\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1",
          "\u039B\u03B5\u03B9\u03C4\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1"
        ],
        given: [
          "* ",
          "\u0394\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 "
        ],
        name: "Greek",
        native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u03A0\u03B1\u03C1\u03AC\u03B4\u03B5\u03B9\u03B3\u03BC\u03B1",
          "\u03A3\u03B5\u03BD\u03AC\u03C1\u03B9\u03BF"
        ],
        scenarioOutline: [
          "\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE \u03A3\u03B5\u03BD\u03B1\u03C1\u03AF\u03BF\u03C5",
          "\u03A0\u03B5\u03C1\u03AF\u03B3\u03C1\u03B1\u03BC\u03BC\u03B1 \u03A3\u03B5\u03BD\u03B1\u03C1\u03AF\u03BF\u03C5"
        ],
        then: [
          "* ",
          "\u03A4\u03CC\u03C4\u03B5 "
        ],
        when: [
          "* ",
          "\u038C\u03C4\u03B1\u03BD "
        ]
      },
      em: {
        and: [
          "* ",
          "\u{1F602}"
        ],
        background: [
          "\u{1F4A4}"
        ],
        but: [
          "* ",
          "\u{1F614}"
        ],
        examples: [
          "\u{1F4D3}"
        ],
        feature: [
          "\u{1F4DA}"
        ],
        given: [
          "* ",
          "\u{1F610}"
        ],
        name: "Emoji",
        native: "\u{1F600}",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u{1F952}",
          "\u{1F4D5}"
        ],
        scenarioOutline: [
          "\u{1F4D6}"
        ],
        then: [
          "* ",
          "\u{1F64F}"
        ],
        when: [
          "* ",
          "\u{1F3AC}"
        ]
      },
      en: {
        and: [
          "* ",
          "And "
        ],
        background: [
          "Background"
        ],
        but: [
          "* ",
          "But "
        ],
        examples: [
          "Examples",
          "Scenarios"
        ],
        feature: [
          "Feature",
          "Business Need",
          "Ability"
        ],
        given: [
          "* ",
          "Given "
        ],
        name: "English",
        native: "English",
        rule: [
          "Rule"
        ],
        scenario: [
          "Example",
          "Scenario"
        ],
        scenarioOutline: [
          "Scenario Outline",
          "Scenario Template"
        ],
        then: [
          "* ",
          "Then "
        ],
        when: [
          "* ",
          "When "
        ]
      },
      "en-Scouse": {
        and: [
          "* ",
          "An "
        ],
        background: [
          "Dis is what went down"
        ],
        but: [
          "* ",
          "Buh "
        ],
        examples: [
          "Examples"
        ],
        feature: [
          "Feature"
        ],
        given: [
          "* ",
          "Givun ",
          "Youse know when youse got "
        ],
        name: "Scouse",
        native: "Scouse",
        rule: [
          "Rule"
        ],
        scenario: [
          "The thing of it is"
        ],
        scenarioOutline: [
          "Wharrimean is"
        ],
        then: [
          "* ",
          "Dun ",
          "Den youse gotta "
        ],
        when: [
          "* ",
          "Wun ",
          "Youse know like when "
        ]
      },
      "en-au": {
        and: [
          "* ",
          "Too right "
        ],
        background: [
          "First off"
        ],
        but: [
          "* ",
          "Yeah nah "
        ],
        examples: [
          "You'll wanna"
        ],
        feature: [
          "Pretty much"
        ],
        given: [
          "* ",
          "Y'know "
        ],
        name: "Australian",
        native: "Australian",
        rule: [
          "Rule"
        ],
        scenario: [
          "Awww, look mate"
        ],
        scenarioOutline: [
          "Reckon it's like"
        ],
        then: [
          "* ",
          "But at the end of the day I reckon "
        ],
        when: [
          "* ",
          "It's just unbelievable "
        ]
      },
      "en-lol": {
        and: [
          "* ",
          "AN "
        ],
        background: [
          "B4"
        ],
        but: [
          "* ",
          "BUT "
        ],
        examples: [
          "EXAMPLZ"
        ],
        feature: [
          "OH HAI"
        ],
        given: [
          "* ",
          "I CAN HAZ "
        ],
        name: "LOLCAT",
        native: "LOLCAT",
        rule: [
          "Rule"
        ],
        scenario: [
          "MISHUN"
        ],
        scenarioOutline: [
          "MISHUN SRSLY"
        ],
        then: [
          "* ",
          "DEN "
        ],
        when: [
          "* ",
          "WEN "
        ]
      },
      "en-old": {
        and: [
          "* ",
          "Ond ",
          "7 "
        ],
        background: [
          "Aer",
          "\xC6r"
        ],
        but: [
          "* ",
          "Ac "
        ],
        examples: [
          "Se the",
          "Se \xFEe",
          "Se \xF0e"
        ],
        feature: [
          "Hwaet",
          "Hw\xE6t"
        ],
        given: [
          "* ",
          "Thurh ",
          "\xDEurh ",
          "\xD0urh "
        ],
        name: "Old English",
        native: "Englisc",
        rule: [
          "Rule"
        ],
        scenario: [
          "Swa"
        ],
        scenarioOutline: [
          "Swa hwaer swa",
          "Swa hw\xE6r swa"
        ],
        then: [
          "* ",
          "Tha ",
          "\xDEa ",
          "\xD0a ",
          "Tha the ",
          "\xDEa \xFEe ",
          "\xD0a \xF0e "
        ],
        when: [
          "* ",
          "B\xE6\xFEsealf ",
          "B\xE6\xFEsealfa ",
          "B\xE6\xFEsealfe ",
          "Ciric\xE6w ",
          "Ciric\xE6we ",
          "Ciric\xE6wa "
        ]
      },
      "en-pirate": {
        and: [
          "* ",
          "Aye "
        ],
        background: [
          "Yo-ho-ho"
        ],
        but: [
          "* ",
          "Avast! "
        ],
        examples: [
          "Dead men tell no tales"
        ],
        feature: [
          "Ahoy matey!"
        ],
        given: [
          "* ",
          "Gangway! "
        ],
        name: "Pirate",
        native: "Pirate",
        rule: [
          "Rule"
        ],
        scenario: [
          "Heave to"
        ],
        scenarioOutline: [
          "Shiver me timbers"
        ],
        then: [
          "* ",
          "Let go and haul "
        ],
        when: [
          "* ",
          "Blimey! "
        ]
      },
      "en-tx": {
        and: [
          "Come hell or high water "
        ],
        background: [
          "Lemme tell y'all a story"
        ],
        but: [
          "Well now hold on, I'll you what "
        ],
        examples: [
          "Now that's a story longer than a cattle drive in July"
        ],
        feature: [
          "This ain\u2019t my first rodeo",
          "All gussied up"
        ],
        given: [
          "Fixin' to ",
          "All git out "
        ],
        name: "Texas",
        native: "Texas",
        rule: [
          "Rule "
        ],
        scenario: [
          "All hat and no cattle"
        ],
        scenarioOutline: [
          "Serious as a snake bite",
          "Busy as a hound in flea season"
        ],
        then: [
          "There\u2019s no tree but bears some fruit "
        ],
        when: [
          "Quick out of the chute "
        ]
      },
      eo: {
        and: [
          "* ",
          "Kaj "
        ],
        background: [
          "Fono"
        ],
        but: [
          "* ",
          "Sed "
        ],
        examples: [
          "Ekzemploj"
        ],
        feature: [
          "Trajto"
        ],
        given: [
          "* ",
          "Donita\u0135o ",
          "Komence "
        ],
        name: "Esperanto",
        native: "Esperanto",
        rule: [
          "Regulo"
        ],
        scenario: [
          "Ekzemplo",
          "Scenaro",
          "Kazo"
        ],
        scenarioOutline: [
          "Konturo de la scenaro",
          "Skizo",
          "Kazo-skizo"
        ],
        then: [
          "* ",
          "Do "
        ],
        when: [
          "* ",
          "Se "
        ]
      },
      es: {
        and: [
          "* ",
          "Y ",
          "E "
        ],
        background: [
          "Antecedentes"
        ],
        but: [
          "* ",
          "Pero "
        ],
        examples: [
          "Ejemplos"
        ],
        feature: [
          "Caracter\xEDstica",
          "Necesidad del negocio",
          "Requisito"
        ],
        given: [
          "* ",
          "Dado ",
          "Dada ",
          "Dados ",
          "Dadas "
        ],
        name: "Spanish",
        native: "espa\xF1ol",
        rule: [
          "Regla",
          "Regla de negocio"
        ],
        scenario: [
          "Ejemplo",
          "Escenario"
        ],
        scenarioOutline: [
          "Esquema del escenario"
        ],
        then: [
          "* ",
          "Entonces "
        ],
        when: [
          "* ",
          "Cuando "
        ]
      },
      et: {
        and: [
          "* ",
          "Ja "
        ],
        background: [
          "Taust"
        ],
        but: [
          "* ",
          "Kuid "
        ],
        examples: [
          "Juhtumid"
        ],
        feature: [
          "Omadus"
        ],
        given: [
          "* ",
          "Eeldades "
        ],
        name: "Estonian",
        native: "eesti keel",
        rule: [
          "Reegel"
        ],
        scenario: [
          "Juhtum",
          "Stsenaarium"
        ],
        scenarioOutline: [
          "Raamjuhtum",
          "Raamstsenaarium"
        ],
        then: [
          "* ",
          "Siis "
        ],
        when: [
          "* ",
          "Kui "
        ]
      },
      fa: {
        and: [
          "* ",
          "\u0648 "
        ],
        background: [
          "\u0632\u0645\u06CC\u0646\u0647"
        ],
        but: [
          "* ",
          "\u0627\u0645\u0627 "
        ],
        examples: [
          "\u0646\u0645\u0648\u0646\u0647 \u0647\u0627"
        ],
        feature: [
          "\u0648\u0650\u06CC\u0698\u06AF\u06CC"
        ],
        given: [
          "* ",
          "\u0628\u0627 \u0641\u0631\u0636 "
        ],
        name: "Persian",
        native: "\u0641\u0627\u0631\u0633\u06CC",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0645\u062B\u0627\u0644",
          "\u0633\u0646\u0627\u0631\u06CC\u0648"
        ],
        scenarioOutline: [
          "\u0627\u0644\u06AF\u0648\u06CC \u0633\u0646\u0627\u0631\u06CC\u0648"
        ],
        then: [
          "* ",
          "\u0622\u0646\u06AF\u0627\u0647 "
        ],
        when: [
          "* ",
          "\u0647\u0646\u06AF\u0627\u0645\u06CC "
        ]
      },
      fi: {
        and: [
          "* ",
          "Ja "
        ],
        background: [
          "Tausta"
        ],
        but: [
          "* ",
          "Mutta "
        ],
        examples: [
          "Tapaukset"
        ],
        feature: [
          "Ominaisuus"
        ],
        given: [
          "* ",
          "Oletetaan "
        ],
        name: "Finnish",
        native: "suomi",
        rule: [
          "Rule"
        ],
        scenario: [
          "Tapaus"
        ],
        scenarioOutline: [
          "Tapausaihio"
        ],
        then: [
          "* ",
          "Niin "
        ],
        when: [
          "* ",
          "Kun "
        ]
      },
      fr: {
        and: [
          "* ",
          "Et que ",
          "Et qu'",
          "Et "
        ],
        background: [
          "Contexte"
        ],
        but: [
          "* ",
          "Mais que ",
          "Mais qu'",
          "Mais "
        ],
        examples: [
          "Exemples"
        ],
        feature: [
          "Fonctionnalit\xE9"
        ],
        given: [
          "* ",
          "Soit ",
          "Sachant que ",
          "Sachant qu'",
          "Sachant ",
          "Etant donn\xE9 que ",
          "Etant donn\xE9 qu'",
          "Etant donn\xE9 ",
          "Etant donn\xE9e ",
          "Etant donn\xE9s ",
          "Etant donn\xE9es ",
          "\xC9tant donn\xE9 que ",
          "\xC9tant donn\xE9 qu'",
          "\xC9tant donn\xE9 ",
          "\xC9tant donn\xE9e ",
          "\xC9tant donn\xE9s ",
          "\xC9tant donn\xE9es "
        ],
        name: "French",
        native: "fran\xE7ais",
        rule: [
          "R\xE8gle"
        ],
        scenario: [
          "Exemple",
          "Sc\xE9nario"
        ],
        scenarioOutline: [
          "Plan du sc\xE9nario",
          "Plan du Sc\xE9nario"
        ],
        then: [
          "* ",
          "Alors ",
          "Donc "
        ],
        when: [
          "* ",
          "Quand ",
          "Lorsque ",
          "Lorsqu'"
        ]
      },
      ga: {
        and: [
          "* ",
          "Agus "
        ],
        background: [
          "C\xFAlra"
        ],
        but: [
          "* ",
          "Ach "
        ],
        examples: [
          "Sampla\xED"
        ],
        feature: [
          "Gn\xE9"
        ],
        given: [
          "* ",
          "Cuir i gc\xE1s go ",
          "Cuir i gc\xE1s nach ",
          "Cuir i gc\xE1s gur ",
          "Cuir i gc\xE1s n\xE1r "
        ],
        name: "Irish",
        native: "Gaeilge",
        rule: [
          "Riail"
        ],
        scenario: [
          "Sampla",
          "C\xE1s"
        ],
        scenarioOutline: [
          "C\xE1s Achomair"
        ],
        then: [
          "* ",
          "Ansin "
        ],
        when: [
          "* ",
          "Nuair a ",
          "Nuair nach ",
          "Nuair ba ",
          "Nuair n\xE1r "
        ]
      },
      gj: {
        and: [
          "* ",
          "\u0A85\u0AA8\u0AC7 "
        ],
        background: [
          "\u0AAC\u0AC7\u0A95\u0A97\u0ACD\u0AB0\u0ABE\u0A89\u0AA8\u0ACD\u0AA1"
        ],
        but: [
          "* ",
          "\u0AAA\u0AA3 "
        ],
        examples: [
          "\u0A89\u0AA6\u0ABE\u0AB9\u0AB0\u0AA3\u0ACB"
        ],
        feature: [
          "\u0AB2\u0A95\u0ACD\u0AB7\u0AA3",
          "\u0AB5\u0ACD\u0AAF\u0ABE\u0AAA\u0ABE\u0AB0 \u0A9C\u0AB0\u0AC2\u0AB0",
          "\u0A95\u0ACD\u0AB7\u0AAE\u0AA4\u0ABE"
        ],
        given: [
          "* ",
          "\u0A86\u0AAA\u0AC7\u0AB2 \u0A9B\u0AC7 "
        ],
        name: "Gujarati",
        native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
        rule: [
          "\u0AA8\u0ABF\u0AAF\u0AAE"
        ],
        scenario: [
          "\u0A89\u0AA6\u0ABE\u0AB9\u0AB0\u0AA3",
          "\u0AB8\u0ACD\u0AA5\u0ABF\u0AA4\u0ABF"
        ],
        scenarioOutline: [
          "\u0AAA\u0AB0\u0ABF\u0AA6\u0ACD\u0AA6\u0AB6\u0ACD\u0AAF \u0AB0\u0AC2\u0AAA\u0AB0\u0AC7\u0A96\u0ABE",
          "\u0AAA\u0AB0\u0ABF\u0AA6\u0ACD\u0AA6\u0AB6\u0ACD\u0AAF \u0AA2\u0ABE\u0A82\u0A9A\u0ACB"
        ],
        then: [
          "* ",
          "\u0AAA\u0A9B\u0AC0 "
        ],
        when: [
          "* ",
          "\u0A95\u0ACD\u0AAF\u0ABE\u0AB0\u0AC7 "
        ]
      },
      gl: {
        and: [
          "* ",
          "E "
        ],
        background: [
          "Contexto"
        ],
        but: [
          "* ",
          "Mais ",
          "Pero "
        ],
        examples: [
          "Exemplos"
        ],
        feature: [
          "Caracter\xEDstica"
        ],
        given: [
          "* ",
          "Dado ",
          "Dada ",
          "Dados ",
          "Dadas "
        ],
        name: "Galician",
        native: "galego",
        rule: [
          "Rule"
        ],
        scenario: [
          "Exemplo",
          "Escenario"
        ],
        scenarioOutline: [
          "Esbozo do escenario"
        ],
        then: [
          "* ",
          "Ent\xF3n ",
          "Logo "
        ],
        when: [
          "* ",
          "Cando "
        ]
      },
      he: {
        and: [
          "* ",
          "\u05D5\u05D2\u05DD "
        ],
        background: [
          "\u05E8\u05E7\u05E2"
        ],
        but: [
          "* ",
          "\u05D0\u05D1\u05DC "
        ],
        examples: [
          "\u05D3\u05D5\u05D2\u05DE\u05D0\u05D5\u05EA"
        ],
        feature: [
          "\u05EA\u05DB\u05D5\u05E0\u05D4"
        ],
        given: [
          "* ",
          "\u05D1\u05D4\u05D9\u05E0\u05EA\u05DF "
        ],
        name: "Hebrew",
        native: "\u05E2\u05D1\u05E8\u05D9\u05EA",
        rule: [
          "\u05DB\u05DC\u05DC"
        ],
        scenario: [
          "\u05D3\u05D5\u05D2\u05DE\u05D0",
          "\u05EA\u05E8\u05D7\u05D9\u05E9"
        ],
        scenarioOutline: [
          "\u05EA\u05D1\u05E0\u05D9\u05EA \u05EA\u05E8\u05D7\u05D9\u05E9"
        ],
        then: [
          "* ",
          "\u05D0\u05D6 ",
          "\u05D0\u05D6\u05D9 "
        ],
        when: [
          "* ",
          "\u05DB\u05D0\u05E9\u05E8 "
        ]
      },
      hi: {
        and: [
          "* ",
          "\u0914\u0930 ",
          "\u0924\u0925\u093E "
        ],
        background: [
          "\u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u093F"
        ],
        but: [
          "* ",
          "\u092A\u0930 ",
          "\u092A\u0930\u0928\u094D\u0924\u0941 ",
          "\u0915\u093F\u0928\u094D\u0924\u0941 "
        ],
        examples: [
          "\u0909\u0926\u093E\u0939\u0930\u0923"
        ],
        feature: [
          "\u0930\u0942\u092A \u0932\u0947\u0916"
        ],
        given: [
          "* ",
          "\u0905\u0917\u0930 ",
          "\u092F\u0926\u093F ",
          "\u091A\u0942\u0902\u0915\u093F "
        ],
        name: "Hindi",
        native: "\u0939\u093F\u0902\u0926\u0940",
        rule: [
          "\u0928\u093F\u092F\u092E"
        ],
        scenario: [
          "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"
        ],
        scenarioOutline: [
          "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F \u0930\u0942\u092A\u0930\u0947\u0916\u093E"
        ],
        then: [
          "* ",
          "\u0924\u092C ",
          "\u0924\u0926\u093E "
        ],
        when: [
          "* ",
          "\u091C\u092C ",
          "\u0915\u0926\u093E "
        ]
      },
      hr: {
        and: [
          "* ",
          "I "
        ],
        background: [
          "Pozadina"
        ],
        but: [
          "* ",
          "Ali "
        ],
        examples: [
          "Primjeri",
          "Scenariji"
        ],
        feature: [
          "Osobina",
          "Mogu\u0107nost",
          "Mogucnost"
        ],
        given: [
          "* ",
          "Zadan ",
          "Zadani ",
          "Zadano ",
          "Ukoliko "
        ],
        name: "Croatian",
        native: "hrvatski",
        rule: [
          "Rule"
        ],
        scenario: [
          "Primjer",
          "Scenarij"
        ],
        scenarioOutline: [
          "Skica",
          "Koncept"
        ],
        then: [
          "* ",
          "Onda "
        ],
        when: [
          "* ",
          "Kada ",
          "Kad "
        ]
      },
      ht: {
        and: [
          "* ",
          "Ak ",
          "Epi ",
          "E "
        ],
        background: [
          "Kont\xE8ks",
          "Istorik"
        ],
        but: [
          "* ",
          "Men "
        ],
        examples: [
          "Egzanp"
        ],
        feature: [
          "Karakteristik",
          "Mak",
          "Fonksyonalite"
        ],
        given: [
          "* ",
          "Sipoze ",
          "Sipoze ke ",
          "Sipoze Ke "
        ],
        name: "Creole",
        native: "krey\xF2l",
        rule: [
          "Rule"
        ],
        scenario: [
          "Senaryo"
        ],
        scenarioOutline: [
          "Plan senaryo",
          "Plan Senaryo",
          "Senaryo deskripsyon",
          "Senaryo Deskripsyon",
          "Dyagram senaryo",
          "Dyagram Senaryo"
        ],
        then: [
          "* ",
          "L\xE8 sa a ",
          "Le sa a "
        ],
        when: [
          "* ",
          "L\xE8 ",
          "Le "
        ]
      },
      hu: {
        and: [
          "* ",
          "\xC9s "
        ],
        background: [
          "H\xE1tt\xE9r"
        ],
        but: [
          "* ",
          "De "
        ],
        examples: [
          "P\xE9ld\xE1k"
        ],
        feature: [
          "Jellemz\u0151"
        ],
        given: [
          "* ",
          "Amennyiben ",
          "Adott "
        ],
        name: "Hungarian",
        native: "magyar",
        rule: [
          "Szab\xE1ly"
        ],
        scenario: [
          "P\xE9lda",
          "Forgat\xF3k\xF6nyv"
        ],
        scenarioOutline: [
          "Forgat\xF3k\xF6nyv v\xE1zlat"
        ],
        then: [
          "* ",
          "Akkor "
        ],
        when: [
          "* ",
          "Majd ",
          "Ha ",
          "Amikor "
        ]
      },
      id: {
        and: [
          "* ",
          "Dan "
        ],
        background: [
          "Dasar",
          "Latar Belakang"
        ],
        but: [
          "* ",
          "Tapi ",
          "Tetapi "
        ],
        examples: [
          "Contoh",
          "Misal"
        ],
        feature: [
          "Fitur"
        ],
        given: [
          "* ",
          "Dengan ",
          "Diketahui ",
          "Diasumsikan ",
          "Bila ",
          "Jika "
        ],
        name: "Indonesian",
        native: "Bahasa Indonesia",
        rule: [
          "Rule",
          "Aturan"
        ],
        scenario: [
          "Skenario"
        ],
        scenarioOutline: [
          "Skenario konsep",
          "Garis-Besar Skenario"
        ],
        then: [
          "* ",
          "Maka ",
          "Kemudian "
        ],
        when: [
          "* ",
          "Ketika "
        ]
      },
      is: {
        and: [
          "* ",
          "Og "
        ],
        background: [
          "Bakgrunnur"
        ],
        but: [
          "* ",
          "En "
        ],
        examples: [
          "D\xE6mi",
          "Atbur\xF0ar\xE1sir"
        ],
        feature: [
          "Eiginleiki"
        ],
        given: [
          "* ",
          "Ef "
        ],
        name: "Icelandic",
        native: "\xCDslenska",
        rule: [
          "Rule"
        ],
        scenario: [
          "Atbur\xF0ar\xE1s"
        ],
        scenarioOutline: [
          "L\xFDsing Atbur\xF0ar\xE1sar",
          "L\xFDsing D\xE6ma"
        ],
        then: [
          "* ",
          "\xDE\xE1 "
        ],
        when: [
          "* ",
          "\xDEegar "
        ]
      },
      it: {
        and: [
          "* ",
          "E ",
          "Ed "
        ],
        background: [
          "Contesto"
        ],
        but: [
          "* ",
          "Ma "
        ],
        examples: [
          "Esempi"
        ],
        feature: [
          "Funzionalit\xE0",
          "Esigenza di Business",
          "Abilit\xE0"
        ],
        given: [
          "* ",
          "Dato ",
          "Data ",
          "Dati ",
          "Date "
        ],
        name: "Italian",
        native: "italiano",
        rule: [
          "Regola"
        ],
        scenario: [
          "Esempio",
          "Scenario"
        ],
        scenarioOutline: [
          "Schema dello scenario"
        ],
        then: [
          "* ",
          "Allora "
        ],
        when: [
          "* ",
          "Quando "
        ]
      },
      ja: {
        and: [
          "* ",
          "\u4E14\u3064",
          "\u304B\u3064"
        ],
        background: [
          "\u80CC\u666F"
        ],
        but: [
          "* ",
          "\u7136\u3057",
          "\u3057\u304B\u3057",
          "\u4F46\u3057",
          "\u305F\u3060\u3057"
        ],
        examples: [
          "\u4F8B",
          "\u30B5\u30F3\u30D7\u30EB"
        ],
        feature: [
          "\u30D5\u30A3\u30FC\u30C1\u30E3",
          "\u6A5F\u80FD"
        ],
        given: [
          "* ",
          "\u524D\u63D0"
        ],
        name: "Japanese",
        native: "\u65E5\u672C\u8A9E",
        rule: [
          "\u30EB\u30FC\u30EB"
        ],
        scenario: [
          "\u30B7\u30CA\u30EA\u30AA"
        ],
        scenarioOutline: [
          "\u30B7\u30CA\u30EA\u30AA\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3",
          "\u30B7\u30CA\u30EA\u30AA\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          "\u30C6\u30F3\u30D7\u30EC",
          "\u30B7\u30CA\u30EA\u30AA\u30C6\u30F3\u30D7\u30EC"
        ],
        then: [
          "* ",
          "\u306A\u3089\u3070"
        ],
        when: [
          "* ",
          "\u3082\u3057"
        ]
      },
      jv: {
        and: [
          "* ",
          "Lan "
        ],
        background: [
          "Dasar"
        ],
        but: [
          "* ",
          "Tapi ",
          "Nanging ",
          "Ananging "
        ],
        examples: [
          "Conto",
          "Contone"
        ],
        feature: [
          "Fitur"
        ],
        given: [
          "* ",
          "Nalika ",
          "Nalikaning "
        ],
        name: "Javanese",
        native: "Basa Jawa",
        rule: [
          "Rule"
        ],
        scenario: [
          "Skenario"
        ],
        scenarioOutline: [
          "Konsep skenario"
        ],
        then: [
          "* ",
          "Njuk ",
          "Banjur "
        ],
        when: [
          "* ",
          "Manawa ",
          "Menawa "
        ]
      },
      ka: {
        and: [
          "* ",
          "\u10D3\u10D0 ",
          "\u10D0\u10E1\u10D4\u10D5\u10D4 "
        ],
        background: [
          "\u10D9\u10DD\u10DC\u10E2\u10D4\u10E5\u10E1\u10E2\u10D8"
        ],
        but: [
          "* ",
          "\u10DB\u10D0\u10D2\u10E0\u10D0\u10DB ",
          "\u10D7\u10E3\u10DB\u10EA\u10D0 "
        ],
        examples: [
          "\u10DB\u10D0\u10D2\u10D0\u10DA\u10D8\u10D7\u10D4\u10D1\u10D8"
        ],
        feature: [
          "\u10D7\u10D5\u10D8\u10E1\u10D4\u10D1\u10D0",
          "\u10DB\u10DD\u10D7\u10EE\u10DD\u10D5\u10DC\u10D0"
        ],
        given: [
          "* ",
          "\u10DB\u10DD\u10EA\u10D4\u10DB\u10E3\u10DA\u10D8 ",
          "\u10DB\u10DD\u10EA\u10D4\u10DB\u10E3\u10DA\u10D8\u10D0 ",
          "\u10D5\u10D7\u10E5\u10D5\u10D0\u10D7 "
        ],
        name: "Georgian",
        native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8",
        rule: [
          "\u10EC\u10D4\u10E1\u10D8"
        ],
        scenario: [
          "\u10DB\u10D0\u10D2\u10D0\u10DA\u10D8\u10D7\u10D0\u10D3",
          "\u10DB\u10D0\u10D2\u10D0\u10DA\u10D8\u10D7\u10D8",
          "\u10DB\u10D0\u10D2",
          "\u10E1\u10EA\u10D4\u10DC\u10D0\u10E0\u10D8"
        ],
        scenarioOutline: [
          "\u10E1\u10EA\u10D4\u10DC\u10D0\u10E0\u10D8\u10E1 \u10DC\u10D8\u10DB\u10E3\u10E8\u10D8",
          "\u10E1\u10EA\u10D4\u10DC\u10D0\u10E0\u10D8\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10D8",
          "\u10DC\u10D8\u10DB\u10E3\u10E8\u10D8",
          "\u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10D8"
        ],
        then: [
          "* ",
          "\u10DB\u10D0\u10E8\u10D8\u10DC "
        ],
        when: [
          "* ",
          "\u10E0\u10DD\u10D3\u10D4\u10E1\u10D0\u10EA ",
          "\u10E0\u10DD\u10EA\u10D0 ",
          "\u10E0\u10DD\u10D2\u10DD\u10E0\u10EA \u10D9\u10D8 ",
          "\u10D7\u10E3 "
        ]
      },
      kn: {
        and: [
          "* ",
          "\u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 "
        ],
        background: [
          "\u0CB9\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6\u0CB2\u0CC6"
        ],
        but: [
          "* ",
          "\u0C86\u0CA6\u0CB0\u0CC6 "
        ],
        examples: [
          "\u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6\u0C97\u0CB3\u0CC1"
        ],
        feature: [
          "\u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CB3"
        ],
        given: [
          "* ",
          "\u0CA8\u0CBF\u0CD5\u0CA1\u0CBF\u0CA6 "
        ],
        name: "Kannada",
        native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6",
          "\u0C95\u0CA5\u0CBE\u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6"
        ],
        scenarioOutline: [
          "\u0CB5\u0CBF\u0CB5\u0CB0\u0CA3\u0CC6"
        ],
        then: [
          "* ",
          "\u0CA8\u0C82\u0CA4\u0CB0 "
        ],
        when: [
          "* ",
          "\u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 "
        ]
      },
      ko: {
        and: [
          "* ",
          "\uADF8\uB9AC\uACE0 "
        ],
        background: [
          "\uBC30\uACBD"
        ],
        but: [
          "* ",
          "\uD558\uC9C0\uB9CC ",
          "\uB2E8 "
        ],
        examples: [
          "\uC608"
        ],
        feature: [
          "\uAE30\uB2A5"
        ],
        given: [
          "* ",
          "\uC870\uAC74 ",
          "\uBA3C\uC800 "
        ],
        name: "Korean",
        native: "\uD55C\uAD6D\uC5B4",
        rule: [
          "Rule"
        ],
        scenario: [
          "\uC2DC\uB098\uB9AC\uC624"
        ],
        scenarioOutline: [
          "\uC2DC\uB098\uB9AC\uC624 \uAC1C\uC694"
        ],
        then: [
          "* ",
          "\uADF8\uB7EC\uBA74 "
        ],
        when: [
          "* ",
          "\uB9CC\uC77C ",
          "\uB9CC\uC57D "
        ]
      },
      lt: {
        and: [
          "* ",
          "Ir "
        ],
        background: [
          "Kontekstas"
        ],
        but: [
          "* ",
          "Bet "
        ],
        examples: [
          "Pavyzd\u017Eiai",
          "Scenarijai",
          "Variantai"
        ],
        feature: [
          "Savyb\u0117"
        ],
        given: [
          "* ",
          "Duota "
        ],
        name: "Lithuanian",
        native: "lietuvi\u0173 kalba",
        rule: [
          "Rule"
        ],
        scenario: [
          "Pavyzdys",
          "Scenarijus"
        ],
        scenarioOutline: [
          "Scenarijaus \u0161ablonas"
        ],
        then: [
          "* ",
          "Tada "
        ],
        when: [
          "* ",
          "Kai "
        ]
      },
      lu: {
        and: [
          "* ",
          "an ",
          "a "
        ],
        background: [
          "Hannergrond"
        ],
        but: [
          "* ",
          "awer ",
          "m\xE4 "
        ],
        examples: [
          "Beispiller"
        ],
        feature: [
          "Funktionalit\xE9it"
        ],
        given: [
          "* ",
          "ugeholl "
        ],
        name: "Luxemburgish",
        native: "L\xEBtzebuergesch",
        rule: [
          "Rule"
        ],
        scenario: [
          "Beispill",
          "Szenario"
        ],
        scenarioOutline: [
          "Plang vum Szenario"
        ],
        then: [
          "* ",
          "dann "
        ],
        when: [
          "* ",
          "wann "
        ]
      },
      lv: {
        and: [
          "* ",
          "Un "
        ],
        background: [
          "Konteksts",
          "Situ\u0101cija"
        ],
        but: [
          "* ",
          "Bet "
        ],
        examples: [
          "Piem\u0113ri",
          "Paraugs"
        ],
        feature: [
          "Funkcionalit\u0101te",
          "F\u012B\u010Da"
        ],
        given: [
          "* ",
          "Kad "
        ],
        name: "Latvian",
        native: "latvie\u0161u",
        rule: [
          "Rule"
        ],
        scenario: [
          "Piem\u0113rs",
          "Scen\u0101rijs"
        ],
        scenarioOutline: [
          "Scen\u0101rijs p\u0113c parauga"
        ],
        then: [
          "* ",
          "Tad "
        ],
        when: [
          "* ",
          "Ja "
        ]
      },
      "mk-Cyrl": {
        and: [
          "* ",
          "\u0418 "
        ],
        background: [
          "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
          "\u0421\u043E\u0434\u0440\u0436\u0438\u043D\u0430"
        ],
        but: [
          "* ",
          "\u041D\u043E "
        ],
        examples: [
          "\u041F\u0440\u0438\u043C\u0435\u0440\u0438",
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0430"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u043D\u043E\u0441\u0442",
          "\u0411\u0438\u0437\u043D\u0438\u0441 \u043F\u043E\u0442\u0440\u0435\u0431\u0430",
          "\u041C\u043E\u0436\u043D\u043E\u0441\u0442"
        ],
        given: [
          "* ",
          "\u0414\u0430\u0434\u0435\u043D\u043E ",
          "\u0414\u0430\u0434\u0435\u043D\u0430 "
        ],
        name: "Macedonian",
        native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u041F\u0440\u0438\u043C\u0435\u0440",
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u043E",
          "\u041D\u0430 \u043F\u0440\u0438\u043C\u0435\u0440"
        ],
        scenarioOutline: [
          "\u041F\u0440\u0435\u0433\u043B\u0435\u0434 \u043D\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0430",
          "\u0421\u043A\u0438\u0446\u0430",
          "\u041A\u043E\u043D\u0446\u0435\u043F\u0442"
        ],
        then: [
          "* ",
          "\u0422\u043E\u0433\u0430\u0448 "
        ],
        when: [
          "* ",
          "\u041A\u043E\u0433\u0430 "
        ]
      },
      "mk-Latn": {
        and: [
          "* ",
          "I "
        ],
        background: [
          "Kontekst",
          "Sodrzhina"
        ],
        but: [
          "* ",
          "No "
        ],
        examples: [
          "Primeri",
          "Scenaria"
        ],
        feature: [
          "Funkcionalnost",
          "Biznis potreba",
          "Mozhnost"
        ],
        given: [
          "* ",
          "Dadeno ",
          "Dadena "
        ],
        name: "Macedonian (Latin)",
        native: "Makedonski (Latinica)",
        rule: [
          "Rule"
        ],
        scenario: [
          "Scenario",
          "Na primer"
        ],
        scenarioOutline: [
          "Pregled na scenarija",
          "Skica",
          "Koncept"
        ],
        then: [
          "* ",
          "Togash "
        ],
        when: [
          "* ",
          "Koga "
        ]
      },
      mn: {
        and: [
          "* ",
          "\u041C\u04E9\u043D ",
          "\u0422\u044D\u0433\u044D\u044D\u0434 "
        ],
        background: [
          "\u0410\u0433\u0443\u0443\u043B\u0433\u0430"
        ],
        but: [
          "* ",
          "\u0413\u044D\u0445\u0434\u044D\u044D ",
          "\u0425\u0430\u0440\u0438\u043D "
        ],
        examples: [
          "\u0422\u0443\u0445\u0430\u0439\u043B\u0431\u0430\u043B"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446",
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B"
        ],
        given: [
          "* ",
          "\u04E8\u0433\u04E9\u0433\u0434\u0441\u04E9\u043D \u043D\u044C ",
          "\u0410\u043D\u0445 "
        ],
        name: "Mongolian",
        native: "\u043C\u043E\u043D\u0433\u043E\u043B",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0421\u0446\u0435\u043D\u0430\u0440"
        ],
        scenarioOutline: [
          "\u0421\u0446\u0435\u043D\u0430\u0440\u044B\u043D \u0442\u04E9\u043B\u04E9\u0432\u043B\u04E9\u0433\u04E9\u04E9"
        ],
        then: [
          "* ",
          "\u0422\u044D\u0433\u044D\u0445\u044D\u0434 ",
          "\u04AE\u04AF\u043D\u0438\u0439 \u0434\u0430\u0440\u0430\u0430 "
        ],
        when: [
          "* ",
          "\u0425\u044D\u0440\u044D\u0432 "
        ]
      },
      ne: {
        and: [
          "* ",
          "\u0930 ",
          "\u0905\u0928\u093F "
        ],
        background: [
          "\u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u0940"
        ],
        but: [
          "* ",
          "\u0924\u0930 "
        ],
        examples: [
          "\u0909\u0926\u093E\u0939\u0930\u0923",
          "\u0909\u0926\u093E\u0939\u0930\u0923\u0939\u0930\u0941"
        ],
        feature: [
          "\u0938\u0941\u0935\u093F\u0927\u093E",
          "\u0935\u093F\u0936\u0947\u0937\u0924\u093E"
        ],
        given: [
          "* ",
          "\u0926\u093F\u0907\u090F\u0915\u094B ",
          "\u0926\u093F\u090F\u0915\u094B ",
          "\u092F\u0926\u093F "
        ],
        name: "Nepali",
        native: "\u0928\u0947\u092A\u093E\u0932\u0940",
        rule: [
          "\u0928\u093F\u092F\u092E"
        ],
        scenario: [
          "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"
        ],
        scenarioOutline: [
          "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F \u0930\u0942\u092A\u0930\u0947\u0916\u093E"
        ],
        then: [
          "* ",
          "\u0924\u094D\u092F\u0938\u092A\u091B\u093F ",
          "\u0905\u0928\u0940 "
        ],
        when: [
          "* ",
          "\u091C\u092C "
        ]
      },
      nl: {
        and: [
          "* ",
          "En "
        ],
        background: [
          "Achtergrond"
        ],
        but: [
          "* ",
          "Maar "
        ],
        examples: [
          "Voorbeelden"
        ],
        feature: [
          "Functionaliteit"
        ],
        given: [
          "* ",
          "Gegeven ",
          "Stel "
        ],
        name: "Dutch",
        native: "Nederlands",
        rule: [
          "Regel"
        ],
        scenario: [
          "Voorbeeld",
          "Scenario"
        ],
        scenarioOutline: [
          "Abstract Scenario"
        ],
        then: [
          "* ",
          "Dan "
        ],
        when: [
          "* ",
          "Als ",
          "Wanneer "
        ]
      },
      no: {
        and: [
          "* ",
          "Og "
        ],
        background: [
          "Bakgrunn"
        ],
        but: [
          "* ",
          "Men "
        ],
        examples: [
          "Eksempler"
        ],
        feature: [
          "Egenskap"
        ],
        given: [
          "* ",
          "Gitt "
        ],
        name: "Norwegian",
        native: "norsk",
        rule: [
          "Regel"
        ],
        scenario: [
          "Eksempel",
          "Scenario"
        ],
        scenarioOutline: [
          "Scenariomal",
          "Abstrakt Scenario"
        ],
        then: [
          "* ",
          "S\xE5 "
        ],
        when: [
          "* ",
          "N\xE5r "
        ]
      },
      pa: {
        and: [
          "* ",
          "\u0A05\u0A24\u0A47 "
        ],
        background: [
          "\u0A2A\u0A3F\u0A1B\u0A4B\u0A15\u0A5C"
        ],
        but: [
          "* ",
          "\u0A2A\u0A30 "
        ],
        examples: [
          "\u0A09\u0A26\u0A3E\u0A39\u0A30\u0A28\u0A3E\u0A02"
        ],
        feature: [
          "\u0A16\u0A3E\u0A38\u0A40\u0A05\u0A24",
          "\u0A2E\u0A41\u0A39\u0A3E\u0A02\u0A26\u0A30\u0A3E",
          "\u0A28\u0A15\u0A36 \u0A28\u0A41\u0A39\u0A3E\u0A30"
        ],
        given: [
          "* ",
          "\u0A1C\u0A47\u0A15\u0A30 ",
          "\u0A1C\u0A3F\u0A35\u0A47\u0A02 \u0A15\u0A3F "
        ],
        name: "Panjabi",
        native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0A09\u0A26\u0A3E\u0A39\u0A30\u0A28",
          "\u0A2A\u0A1F\u0A15\u0A25\u0A3E"
        ],
        scenarioOutline: [
          "\u0A2A\u0A1F\u0A15\u0A25\u0A3E \u0A22\u0A3E\u0A02\u0A1A\u0A3E",
          "\u0A2A\u0A1F\u0A15\u0A25\u0A3E \u0A30\u0A42\u0A2A \u0A30\u0A47\u0A16\u0A3E"
        ],
        then: [
          "* ",
          "\u0A24\u0A26 "
        ],
        when: [
          "* ",
          "\u0A1C\u0A26\u0A4B\u0A02 "
        ]
      },
      pl: {
        and: [
          "* ",
          "Oraz ",
          "I "
        ],
        background: [
          "Za\u0142o\u017Cenia"
        ],
        but: [
          "* ",
          "Ale "
        ],
        examples: [
          "Przyk\u0142ady"
        ],
        feature: [
          "W\u0142a\u015Bciwo\u015B\u0107",
          "Funkcja",
          "Aspekt",
          "Potrzeba biznesowa"
        ],
        given: [
          "* ",
          "Zak\u0142adaj\u0105c ",
          "Maj\u0105c ",
          "Zak\u0142adaj\u0105c, \u017Ce "
        ],
        name: "Polish",
        native: "polski",
        rule: [
          "Zasada",
          "Regu\u0142a"
        ],
        scenario: [
          "Przyk\u0142ad",
          "Scenariusz"
        ],
        scenarioOutline: [
          "Szablon scenariusza"
        ],
        then: [
          "* ",
          "Wtedy "
        ],
        when: [
          "* ",
          "Je\u017Celi ",
          "Je\u015Bli ",
          "Gdy ",
          "Kiedy "
        ]
      },
      pt: {
        and: [
          "* ",
          "E "
        ],
        background: [
          "Contexto",
          "Cen\xE1rio de Fundo",
          "Cenario de Fundo",
          "Fundo"
        ],
        but: [
          "* ",
          "Mas "
        ],
        examples: [
          "Exemplos",
          "Cen\xE1rios",
          "Cenarios"
        ],
        feature: [
          "Funcionalidade",
          "Caracter\xEDstica",
          "Caracteristica"
        ],
        given: [
          "* ",
          "Dado ",
          "Dada ",
          "Dados ",
          "Dadas "
        ],
        name: "Portuguese",
        native: "portugu\xEAs",
        rule: [
          "Regra"
        ],
        scenario: [
          "Exemplo",
          "Cen\xE1rio",
          "Cenario"
        ],
        scenarioOutline: [
          "Esquema do Cen\xE1rio",
          "Esquema do Cenario",
          "Delinea\xE7\xE3o do Cen\xE1rio",
          "Delineacao do Cenario"
        ],
        then: [
          "* ",
          "Ent\xE3o ",
          "Entao "
        ],
        when: [
          "* ",
          "Quando "
        ]
      },
      ro: {
        and: [
          "* ",
          "Si ",
          "\u0218i ",
          "\u015Ei "
        ],
        background: [
          "Context"
        ],
        but: [
          "* ",
          "Dar "
        ],
        examples: [
          "Exemple"
        ],
        feature: [
          "Functionalitate",
          "Func\u021Bionalitate",
          "Func\u0163ionalitate"
        ],
        given: [
          "* ",
          "Date fiind ",
          "Dat fiind ",
          "Dat\u0103 fiind",
          "Dati fiind ",
          "Da\u021Bi fiind ",
          "Da\u0163i fiind "
        ],
        name: "Romanian",
        native: "rom\xE2n\u0103",
        rule: [
          "Rule"
        ],
        scenario: [
          "Exemplu",
          "Scenariu"
        ],
        scenarioOutline: [
          "Structura scenariu",
          "Structur\u0103 scenariu"
        ],
        then: [
          "* ",
          "Atunci "
        ],
        when: [
          "* ",
          "Cand ",
          "C\xE2nd "
        ]
      },
      ru: {
        and: [
          "* ",
          "\u0418 ",
          "\u041A \u0442\u043E\u043C\u0443 \u0436\u0435 ",
          "\u0422\u0430\u043A\u0436\u0435 "
        ],
        background: [
          "\u041F\u0440\u0435\u0434\u044B\u0441\u0442\u043E\u0440\u0438\u044F",
          "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442"
        ],
        but: [
          "* ",
          "\u041D\u043E ",
          "\u0410 ",
          "\u0418\u043D\u0430\u0447\u0435 "
        ],
        examples: [
          "\u041F\u0440\u0438\u043C\u0435\u0440\u044B",
          "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u0438\u044F",
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B",
          "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E",
          "\u0424\u0438\u0447\u0430"
        ],
        given: [
          "* ",
          "\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C ",
          "\u0414\u0430\u043D\u043E ",
          "\u041F\u0443\u0441\u0442\u044C "
        ],
        name: "Russian",
        native: "\u0440\u0443\u0441\u0441\u043A\u0438\u0439",
        rule: [
          "\u041F\u0440\u0430\u0432\u0438\u043B\u043E"
        ],
        scenario: [
          "\u041F\u0440\u0438\u043C\u0435\u0440",
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
        ],
        scenarioOutline: [
          "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F",
          "\u0428\u0430\u0431\u043B\u043E\u043D \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F"
        ],
        then: [
          "* ",
          "\u0422\u043E ",
          "\u0417\u0430\u0442\u0435\u043C ",
          "\u0422\u043E\u0433\u0434\u0430 "
        ],
        when: [
          "* ",
          "\u041A\u043E\u0433\u0434\u0430 ",
          "\u0415\u0441\u043B\u0438 "
        ]
      },
      sk: {
        and: [
          "* ",
          "A ",
          "A tie\u017E ",
          "A taktie\u017E ",
          "A z\xE1rove\u0148 "
        ],
        background: [
          "Pozadie"
        ],
        but: [
          "* ",
          "Ale "
        ],
        examples: [
          "Pr\xEDklady"
        ],
        feature: [
          "Po\u017Eiadavka",
          "Funkcia",
          "Vlastnos\u0165"
        ],
        given: [
          "* ",
          "Pokia\u013E ",
          "Za predpokladu "
        ],
        name: "Slovak",
        native: "Slovensky",
        rule: [
          "Rule"
        ],
        scenario: [
          "Pr\xEDklad",
          "Scen\xE1r"
        ],
        scenarioOutline: [
          "N\xE1\u010Drt Scen\xE1ru",
          "N\xE1\u010Drt Scen\xE1ra",
          "Osnova Scen\xE1ra"
        ],
        then: [
          "* ",
          "Tak ",
          "Potom "
        ],
        when: [
          "* ",
          "Ke\u010F ",
          "Ak "
        ]
      },
      sl: {
        and: [
          "In ",
          "Ter "
        ],
        background: [
          "Kontekst",
          "Osnova",
          "Ozadje"
        ],
        but: [
          "Toda ",
          "Ampak ",
          "Vendar "
        ],
        examples: [
          "Primeri",
          "Scenariji"
        ],
        feature: [
          "Funkcionalnost",
          "Funkcija",
          "Mo\u017Enosti",
          "Moznosti",
          "Lastnost",
          "Zna\u010Dilnost"
        ],
        given: [
          "Dano ",
          "Podano ",
          "Zaradi ",
          "Privzeto "
        ],
        name: "Slovenian",
        native: "Slovenski",
        rule: [
          "Rule"
        ],
        scenario: [
          "Primer",
          "Scenarij"
        ],
        scenarioOutline: [
          "Struktura scenarija",
          "Skica",
          "Koncept",
          "Oris scenarija",
          "Osnutek"
        ],
        then: [
          "Nato ",
          "Potem ",
          "Takrat "
        ],
        when: [
          "Ko ",
          "Ce ",
          "\u010Ce ",
          "Kadar "
        ]
      },
      "sr-Cyrl": {
        and: [
          "* ",
          "\u0418 "
        ],
        background: [
          "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
          "\u041E\u0441\u043D\u043E\u0432\u0430",
          "\u041F\u043E\u0437\u0430\u0434\u0438\u043D\u0430"
        ],
        but: [
          "* ",
          "\u0410\u043B\u0438 "
        ],
        examples: [
          "\u041F\u0440\u0438\u043C\u0435\u0440\u0438",
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0438"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u043D\u043E\u0441\u0442",
          "\u041C\u043E\u0433\u0443\u045B\u043D\u043E\u0441\u0442",
          "\u041E\u0441\u043E\u0431\u0438\u043D\u0430"
        ],
        given: [
          "* ",
          "\u0417\u0430 \u0434\u0430\u0442\u043E ",
          "\u0417\u0430 \u0434\u0430\u0442\u0435 ",
          "\u0417\u0430 \u0434\u0430\u0442\u0438 "
        ],
        name: "Serbian",
        native: "\u0421\u0440\u043F\u0441\u043A\u0438",
        rule: [
          "\u041F\u0440\u0430\u0432\u0438\u043B\u043E"
        ],
        scenario: [
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u043E",
          "\u041F\u0440\u0438\u043C\u0435\u0440"
        ],
        scenarioOutline: [
          "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0430",
          "\u0421\u043A\u0438\u0446\u0430",
          "\u041A\u043E\u043D\u0446\u0435\u043F\u0442"
        ],
        then: [
          "* ",
          "\u041E\u043D\u0434\u0430 "
        ],
        when: [
          "* ",
          "\u041A\u0430\u0434\u0430 ",
          "\u041A\u0430\u0434 "
        ]
      },
      "sr-Latn": {
        and: [
          "* ",
          "I "
        ],
        background: [
          "Kontekst",
          "Osnova",
          "Pozadina"
        ],
        but: [
          "* ",
          "Ali "
        ],
        examples: [
          "Primeri",
          "Scenariji"
        ],
        feature: [
          "Funkcionalnost",
          "Mogu\u0107nost",
          "Mogucnost",
          "Osobina"
        ],
        given: [
          "* ",
          "Za dato ",
          "Za date ",
          "Za dati "
        ],
        name: "Serbian (Latin)",
        native: "Srpski (Latinica)",
        rule: [
          "Pravilo"
        ],
        scenario: [
          "Scenario",
          "Primer"
        ],
        scenarioOutline: [
          "Struktura scenarija",
          "Skica",
          "Koncept"
        ],
        then: [
          "* ",
          "Onda "
        ],
        when: [
          "* ",
          "Kada ",
          "Kad "
        ]
      },
      sv: {
        and: [
          "* ",
          "Och "
        ],
        background: [
          "Bakgrund"
        ],
        but: [
          "* ",
          "Men "
        ],
        examples: [
          "Exempel"
        ],
        feature: [
          "Egenskap"
        ],
        given: [
          "* ",
          "Givet "
        ],
        name: "Swedish",
        native: "Svenska",
        rule: [
          "Regel"
        ],
        scenario: [
          "Scenario"
        ],
        scenarioOutline: [
          "Abstrakt Scenario",
          "Scenariomall"
        ],
        then: [
          "* ",
          "S\xE5 "
        ],
        when: [
          "* ",
          "N\xE4r "
        ]
      },
      ta: {
        and: [
          "* ",
          "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD ",
          "\u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD "
        ],
        background: [
          "\u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BA3\u0BBF"
        ],
        but: [
          "* ",
          "\u0B86\u0BA9\u0BBE\u0BB2\u0BCD "
        ],
        examples: [
          "\u0B8E\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD",
          "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BCD",
          "\u0BA8\u0BBF\u0BB2\u0BC8\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD"
        ],
        feature: [
          "\u0B85\u0BAE\u0BCD\u0B9A\u0BAE\u0BCD",
          "\u0BB5\u0BA3\u0BBF\u0B95 \u0BA4\u0BC7\u0BB5\u0BC8",
          "\u0BA4\u0BBF\u0BB1\u0BA9\u0BCD"
        ],
        given: [
          "* ",
          "\u0B95\u0BC6\u0BBE\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F "
        ],
        name: "Tamil",
        native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0B89\u0BA4\u0BBE\u0BB0\u0BA3\u0BAE\u0BBE\u0B95",
          "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF"
        ],
        scenarioOutline: [
          "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF \u0B9A\u0BC1\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
          "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF \u0BB5\u0BBE\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1\u0BB0\u0BC1"
        ],
        then: [
          "* ",
          "\u0B85\u0BAA\u0BCD\u0BAA\u0BC6\u0BBE\u0BB4\u0BC1\u0BA4\u0BC1 "
        ],
        when: [
          "* ",
          "\u0B8E\u0BAA\u0BCD\u0BAA\u0BC7\u0BBE\u0BA4\u0BC1 "
        ]
      },
      th: {
        and: [
          "* ",
          "\u0E41\u0E25\u0E30 "
        ],
        background: [
          "\u0E41\u0E19\u0E27\u0E04\u0E34\u0E14"
        ],
        but: [
          "* ",
          "\u0E41\u0E15\u0E48 "
        ],
        examples: [
          "\u0E0A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07",
          "\u0E0A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C"
        ],
        feature: [
          "\u0E42\u0E04\u0E23\u0E07\u0E2B\u0E25\u0E31\u0E01",
          "\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E17\u0E32\u0E07\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08",
          "\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16"
        ],
        given: [
          "* ",
          "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E43\u0E2B\u0E49 "
        ],
        name: "Thai",
        native: "\u0E44\u0E17\u0E22",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C"
        ],
        scenarioOutline: [
          "\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C",
          "\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C"
        ],
        then: [
          "* ",
          "\u0E14\u0E31\u0E07\u0E19\u0E31\u0E49\u0E19 "
        ],
        when: [
          "* ",
          "\u0E40\u0E21\u0E37\u0E48\u0E2D "
        ]
      },
      te: {
        and: [
          "* ",
          "\u0C2E\u0C30\u0C3F\u0C2F\u0C41 "
        ],
        background: [
          "\u0C28\u0C47\u0C2A\u0C25\u0C4D\u0C2F\u0C02"
        ],
        but: [
          "* ",
          "\u0C15\u0C3E\u0C28\u0C3F "
        ],
        examples: [
          "\u0C09\u0C26\u0C3E\u0C39\u0C30\u0C23\u0C32\u0C41"
        ],
        feature: [
          "\u0C17\u0C41\u0C23\u0C2E\u0C41"
        ],
        given: [
          "* ",
          "\u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C2C\u0C21\u0C3F\u0C28\u0C26\u0C3F "
        ],
        name: "Telugu",
        native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0C09\u0C26\u0C3E\u0C39\u0C30\u0C23",
          "\u0C38\u0C28\u0C4D\u0C28\u0C3F\u0C35\u0C47\u0C36\u0C02"
        ],
        scenarioOutline: [
          "\u0C15\u0C25\u0C28\u0C02"
        ],
        then: [
          "* ",
          "\u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 "
        ],
        when: [
          "* ",
          "\u0C08 \u0C2A\u0C30\u0C3F\u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B "
        ]
      },
      tlh: {
        and: [
          "* ",
          "'ej ",
          "latlh "
        ],
        background: [
          "mo'"
        ],
        but: [
          "* ",
          "'ach ",
          "'a "
        ],
        examples: [
          "ghantoH",
          "lutmey"
        ],
        feature: [
          "Qap",
          "Qu'meH 'ut",
          "perbogh",
          "poQbogh malja'",
          "laH"
        ],
        given: [
          "* ",
          "ghu' noblu' ",
          "DaH ghu' bejlu' "
        ],
        name: "Klingon",
        native: "tlhIngan",
        rule: [
          "Rule"
        ],
        scenario: [
          "lut"
        ],
        scenarioOutline: [
          "lut chovnatlh"
        ],
        then: [
          "* ",
          "vaj "
        ],
        when: [
          "* ",
          "qaSDI' "
        ]
      },
      tr: {
        and: [
          "* ",
          "Ve "
        ],
        background: [
          "Ge\xE7mi\u015F"
        ],
        but: [
          "* ",
          "Fakat ",
          "Ama "
        ],
        examples: [
          "\xD6rnekler"
        ],
        feature: [
          "\xD6zellik"
        ],
        given: [
          "* ",
          "Diyelim ki "
        ],
        name: "Turkish",
        native: "T\xFCrk\xE7e",
        rule: [
          "Kural"
        ],
        scenario: [
          "\xD6rnek",
          "Senaryo"
        ],
        scenarioOutline: [
          "Senaryo tasla\u011F\u0131"
        ],
        then: [
          "* ",
          "O zaman "
        ],
        when: [
          "* ",
          "E\u011Fer ki "
        ]
      },
      tt: {
        and: [
          "* ",
          "\u04BA\u04D9\u043C ",
          "\u0412\u04D9 "
        ],
        background: [
          "\u041A\u0435\u0440\u0435\u0448"
        ],
        but: [
          "* ",
          "\u041B\u04D9\u043A\u0438\u043D ",
          "\u04D8\u043C\u043C\u0430 "
        ],
        examples: [
          "\u04AE\u0440\u043D\u04D9\u043A\u043B\u04D9\u0440",
          "\u041C\u0438\u0441\u0430\u043B\u043B\u0430\u0440"
        ],
        feature: [
          "\u041C\u04E9\u043C\u043A\u0438\u043D\u043B\u0435\u043A",
          "\u04AE\u0437\u0435\u043D\u0447\u04D9\u043B\u0435\u043A\u043B\u0435\u043B\u0435\u043A"
        ],
        given: [
          "* ",
          "\u04D8\u0439\u0442\u0438\u043A "
        ],
        name: "Tatar",
        native: "\u0422\u0430\u0442\u0430\u0440\u0447\u0430",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
        ],
        scenarioOutline: [
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439\u043D\u044B\u04A3 \u0442\u04E9\u0437\u0435\u043B\u0435\u0448\u0435"
        ],
        then: [
          "* ",
          "\u041D\u04D9\u0442\u0438\u0497\u04D9\u0434\u04D9 "
        ],
        when: [
          "* ",
          "\u04D8\u0433\u04D9\u0440 "
        ]
      },
      uk: {
        and: [
          "* ",
          "\u0406 ",
          "\u0410 \u0442\u0430\u043A\u043E\u0436 ",
          "\u0422\u0430 "
        ],
        background: [
          "\u041F\u0435\u0440\u0435\u0434\u0443\u043C\u043E\u0432\u0430"
        ],
        but: [
          "* ",
          "\u0410\u043B\u0435 "
        ],
        examples: [
          "\u041F\u0440\u0438\u043A\u043B\u0430\u0434\u0438"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B"
        ],
        given: [
          "* ",
          "\u041F\u0440\u0438\u043F\u0443\u0441\u0442\u0438\u043C\u043E ",
          "\u041F\u0440\u0438\u043F\u0443\u0441\u0442\u0438\u043C\u043E, \u0449\u043E ",
          "\u041D\u0435\u0445\u0430\u0439 ",
          "\u0414\u0430\u043D\u043E "
        ],
        name: "Ukrainian",
        native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u041F\u0440\u0438\u043A\u043B\u0430\u0434",
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0456\u0439"
        ],
        scenarioOutline: [
          "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0456\u044E"
        ],
        then: [
          "* ",
          "\u0422\u043E ",
          "\u0422\u043E\u0434\u0456 "
        ],
        when: [
          "* ",
          "\u042F\u043A\u0449\u043E ",
          "\u041A\u043E\u043B\u0438 "
        ]
      },
      ur: {
        and: [
          "* ",
          "\u0627\u0648\u0631 "
        ],
        background: [
          "\u067E\u0633 \u0645\u0646\u0638\u0631"
        ],
        but: [
          "* ",
          "\u0644\u06CC\u06A9\u0646 "
        ],
        examples: [
          "\u0645\u062B\u0627\u0644\u06CC\u06BA"
        ],
        feature: [
          "\u0635\u0644\u0627\u062D\u06CC\u062A",
          "\u06A9\u0627\u0631\u0648\u0628\u0627\u0631 \u06A9\u06CC \u0636\u0631\u0648\u0631\u062A",
          "\u062E\u0635\u0648\u0635\u06CC\u062A"
        ],
        given: [
          "* ",
          "\u0627\u06AF\u0631 ",
          "\u0628\u0627\u0644\u0641\u0631\u0636 ",
          "\u0641\u0631\u0636 \u06A9\u06CC\u0627 "
        ],
        name: "Urdu",
        native: "\u0627\u0631\u062F\u0648",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0645\u0646\u0638\u0631\u0646\u0627\u0645\u06C1"
        ],
        scenarioOutline: [
          "\u0645\u0646\u0638\u0631 \u0646\u0627\u0645\u06D2 \u06A9\u0627 \u062E\u0627\u06A9\u06C1"
        ],
        then: [
          "* ",
          "\u067E\u06BE\u0631 ",
          "\u062A\u0628 "
        ],
        when: [
          "* ",
          "\u062C\u0628 "
        ]
      },
      uz: {
        and: [
          "* ",
          "\u0412\u0430 "
        ],
        background: [
          "\u0422\u0430\u0440\u0438\u0445"
        ],
        but: [
          "* ",
          "\u041B\u0435\u043A\u0438\u043D ",
          "\u0411\u0438\u0440\u043E\u043A ",
          "\u0410\u043C\u043C\u043E "
        ],
        examples: [
          "\u041C\u0438\u0441\u043E\u043B\u043B\u0430\u0440"
        ],
        feature: [
          "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B"
        ],
        given: [
          "* ",
          "Belgilangan "
        ],
        name: "Uzbek",
        native: "\u0423\u0437\u0431\u0435\u043A\u0447\u0430",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
        ],
        scenarioOutline: [
          "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430\u0441\u0438"
        ],
        then: [
          "* ",
          "\u0423\u043D\u0434\u0430 "
        ],
        when: [
          "* ",
          "\u0410\u0433\u0430\u0440 "
        ]
      },
      vi: {
        and: [
          "* ",
          "V\xE0 "
        ],
        background: [
          "B\u1ED1i c\u1EA3nh"
        ],
        but: [
          "* ",
          "Nh\u01B0ng "
        ],
        examples: [
          "D\u1EEF li\u1EC7u"
        ],
        feature: [
          "T\xEDnh n\u0103ng"
        ],
        given: [
          "* ",
          "Bi\u1EBFt ",
          "Cho "
        ],
        name: "Vietnamese",
        native: "Ti\u1EBFng Vi\u1EC7t",
        rule: [
          "Quy t\u1EAFc"
        ],
        scenario: [
          "T\xECnh hu\u1ED1ng",
          "K\u1ECBch b\u1EA3n"
        ],
        scenarioOutline: [
          "Khung t\xECnh hu\u1ED1ng",
          "Khung k\u1ECBch b\u1EA3n"
        ],
        then: [
          "* ",
          "Th\xEC "
        ],
        when: [
          "* ",
          "Khi "
        ]
      },
      "zh-CN": {
        and: [
          "* ",
          "\u800C\u4E14",
          "\u5E76\u4E14",
          "\u540C\u65F6"
        ],
        background: [
          "\u80CC\u666F"
        ],
        but: [
          "* ",
          "\u4F46\u662F"
        ],
        examples: [
          "\u4F8B\u5B50"
        ],
        feature: [
          "\u529F\u80FD"
        ],
        given: [
          "* ",
          "\u5047\u5982",
          "\u5047\u8BBE",
          "\u5047\u5B9A"
        ],
        name: "Chinese simplified",
        native: "\u7B80\u4F53\u4E2D\u6587",
        rule: [
          "Rule",
          "\u89C4\u5219"
        ],
        scenario: [
          "\u573A\u666F",
          "\u5267\u672C"
        ],
        scenarioOutline: [
          "\u573A\u666F\u5927\u7EB2",
          "\u5267\u672C\u5927\u7EB2"
        ],
        then: [
          "* ",
          "\u90A3\u4E48"
        ],
        when: [
          "* ",
          "\u5F53"
        ]
      },
      ml: {
        and: [
          "* ",
          "\u0D12\u0D2A\u0D4D\u0D2A\u0D02"
        ],
        background: [
          "\u0D2A\u0D36\u0D4D\u0D1A\u0D3E\u0D24\u0D4D\u0D24\u0D32\u0D02"
        ],
        but: [
          "* ",
          "\u0D2A\u0D15\u0D4D\u0D37\u0D47"
        ],
        examples: [
          "\u0D09\u0D26\u0D3E\u0D39\u0D30\u0D23\u0D19\u0D4D\u0D19\u0D7E"
        ],
        feature: [
          "\u0D38\u0D35\u0D3F\u0D36\u0D47\u0D37\u0D24"
        ],
        given: [
          "* ",
          "\u0D28\u0D7D\u0D15\u0D3F\u0D2F\u0D24\u0D4D"
        ],
        name: "Malayalam",
        native: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",
        rule: [
          "\u0D28\u0D3F\u0D2F\u0D2E\u0D02"
        ],
        scenario: [
          "\u0D30\u0D02\u0D17\u0D02"
        ],
        scenarioOutline: [
          "\u0D38\u0D3E\u0D39\u0D1A\u0D30\u0D4D\u0D2F\u0D24\u0D4D\u0D24\u0D3F\u0D28\u0D4D\u0D31\u0D46 \u0D30\u0D42\u0D2A\u0D30\u0D47\u0D16"
        ],
        then: [
          "* ",
          "\u0D2A\u0D3F\u0D28\u0D4D\u0D28\u0D46"
        ],
        when: [
          "\u0D0E\u0D2A\u0D4D\u0D2A\u0D47\u0D3E\u0D7E"
        ]
      },
      "zh-TW": {
        and: [
          "* ",
          "\u800C\u4E14",
          "\u4E26\u4E14",
          "\u540C\u6642"
        ],
        background: [
          "\u80CC\u666F"
        ],
        but: [
          "* ",
          "\u4F46\u662F"
        ],
        examples: [
          "\u4F8B\u5B50"
        ],
        feature: [
          "\u529F\u80FD"
        ],
        given: [
          "* ",
          "\u5047\u5982",
          "\u5047\u8A2D",
          "\u5047\u5B9A"
        ],
        name: "Chinese traditional",
        native: "\u7E41\u9AD4\u4E2D\u6587",
        rule: [
          "Rule"
        ],
        scenario: [
          "\u5834\u666F",
          "\u5287\u672C"
        ],
        scenarioOutline: [
          "\u5834\u666F\u5927\u7DB1",
          "\u5287\u672C\u5927\u7DB1"
        ],
        then: [
          "* ",
          "\u90A3\u9EBC"
        ],
        when: [
          "* ",
          "\u7576"
        ]
      },
      mr: {
        and: [
          "* ",
          "\u0906\u0923\u093F ",
          "\u0924\u0938\u0947\u091A "
        ],
        background: [
          "\u092A\u093E\u0930\u094D\u0936\u094D\u0935\u092D\u0942\u092E\u0940"
        ],
        but: [
          "* ",
          "\u092A\u0923 ",
          "\u092A\u0930\u0902\u0924\u0941 "
        ],
        examples: [
          "\u0909\u0926\u093E\u0939\u0930\u0923"
        ],
        feature: [
          "\u0935\u0948\u0936\u093F\u0937\u094D\u091F\u094D\u092F",
          "\u0938\u0941\u0935\u093F\u0927\u093E"
        ],
        given: [
          "* ",
          "\u091C\u0930",
          "\u0926\u093F\u0932\u0947\u0932\u094D\u092F\u093E \u092A\u094D\u0930\u092E\u093E\u0923\u0947 "
        ],
        name: "Marathi",
        native: "\u092E\u0930\u093E\u0920\u0940",
        rule: [
          "\u0928\u093F\u092F\u092E"
        ],
        scenario: [
          "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"
        ],
        scenarioOutline: [
          "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F \u0930\u0942\u092A\u0930\u0947\u0916\u093E"
        ],
        then: [
          "* ",
          "\u092E\u0917 ",
          "\u0924\u0947\u0935\u094D\u0939\u093E "
        ],
        when: [
          "* ",
          "\u091C\u0947\u0935\u094D\u0939\u093E "
        ]
      },
      amh: {
        and: [
          "* ",
          "\u12A5\u1293 "
        ],
        background: [
          "\u1245\u12F5\u1218 \u1201\u1294\u1273",
          "\u1218\u1290\u123B",
          "\u1218\u1290\u123B \u1200\u1233\u1265"
        ],
        but: [
          "* ",
          "\u130D\u1295 "
        ],
        examples: [
          "\u121D\u1233\u120C\u12CE\u127D",
          "\u1201\u1293\u1274\u12CE\u127D"
        ],
        feature: [
          "\u1235\u122B",
          "\u12E8\u1270\u1348\u1208\u1308\u12CD \u1235\u122B",
          "\u12E8\u121A\u1348\u1208\u1308\u12CD \u12F5\u122D\u130A\u1275"
        ],
        given: [
          "* ",
          "\u12E8\u1270\u1230\u1320 "
        ],
        name: "Amharic",
        native: "\u12A0\u121B\u122D\u129B",
        rule: [
          "\u1205\u130D"
        ],
        scenario: [
          "\u121D\u1233\u120C",
          "\u1201\u1293\u1274"
        ],
        scenarioOutline: [
          "\u1201\u1293\u1274 \u12DD\u122D\u12DD\u122D",
          "\u1201\u1293\u1274 \u12A0\u1265\u1290\u1275"
        ],
        then: [
          "* ",
          "\u12A8\u12DA\u12EB "
        ],
        when: [
          "* ",
          "\u1218\u127C "
        ]
      }
    };
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/TimeConversion.js
var require_TimeConversion = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/TimeConversion.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.millisecondsSinceEpochToTimestamp = millisecondsSinceEpochToTimestamp;
    exports.millisecondsToDuration = millisecondsToDuration2;
    exports.timestampToMillisecondsSinceEpoch = timestampToMillisecondsSinceEpoch;
    exports.durationToMilliseconds = durationToMilliseconds;
    exports.addDurations = addDurations;
    var MILLISECONDS_PER_SECOND = 1e3;
    var NANOSECONDS_PER_MILLISECOND = 1e6;
    var NANOSECONDS_PER_SECOND = 1e9;
    function millisecondsSinceEpochToTimestamp(millisecondsSinceEpoch) {
      return toSecondsAndNanos(millisecondsSinceEpoch);
    }
    function millisecondsToDuration2(durationInMilliseconds) {
      return toSecondsAndNanos(durationInMilliseconds);
    }
    function timestampToMillisecondsSinceEpoch(timestamp) {
      var seconds = timestamp.seconds, nanos = timestamp.nanos;
      return toMillis(seconds, nanos);
    }
    function durationToMilliseconds(duration) {
      var seconds = duration.seconds, nanos = duration.nanos;
      return toMillis(seconds, nanos);
    }
    function addDurations(durationA, durationB) {
      var seconds = +durationA.seconds + +durationB.seconds;
      var nanos = durationA.nanos + durationB.nanos;
      if (nanos >= NANOSECONDS_PER_SECOND) {
        seconds += 1;
        nanos -= NANOSECONDS_PER_SECOND;
      }
      return { seconds, nanos };
    }
    function toSecondsAndNanos(milliseconds) {
      var seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND);
      var nanos = Math.floor(milliseconds % MILLISECONDS_PER_SECOND * NANOSECONDS_PER_MILLISECOND);
      return { seconds, nanos };
    }
    function toMillis(seconds, nanos) {
      var secondMillis = +seconds * MILLISECONDS_PER_SECOND;
      var nanoMillis = nanos / NANOSECONDS_PER_MILLISECOND;
      return secondMillis + nanoMillis;
    }
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/IdGenerator.js
var require_IdGenerator = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/IdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uuid = uuid2;
    exports.incrementing = incrementing2;
    function uuid2() {
      return function() {
        return crypto.randomUUID();
      };
    }
    function incrementing2() {
      var next = 0;
      return function() {
        return (next++).toString();
      };
    }
  }
});

// node_modules/class-transformer/cjs/enums/transformation-type.enum.js
var require_transformation_type_enum = __commonJS({
  "node_modules/class-transformer/cjs/enums/transformation-type.enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformationType = void 0;
    var TransformationType;
    (function(TransformationType2) {
      TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
      TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
      TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
    })(TransformationType = exports.TransformationType || (exports.TransformationType = {}));
  }
});

// node_modules/class-transformer/cjs/enums/index.js
var require_enums = __commonJS({
  "node_modules/class-transformer/cjs/enums/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_transformation_type_enum(), exports);
  }
});

// node_modules/class-transformer/cjs/MetadataStorage.js
var require_MetadataStorage = __commonJS({
  "node_modules/class-transformer/cjs/MetadataStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetadataStorage = void 0;
    var enums_1 = require_enums();
    var MetadataStorage = class {
      constructor() {
        this._typeMetadatas = /* @__PURE__ */ new Map();
        this._transformMetadatas = /* @__PURE__ */ new Map();
        this._exposeMetadatas = /* @__PURE__ */ new Map();
        this._excludeMetadatas = /* @__PURE__ */ new Map();
        this._ancestorsMap = /* @__PURE__ */ new Map();
      }
      // -------------------------------------------------------------------------
      // Adder Methods
      // -------------------------------------------------------------------------
      addTypeMetadata(metadata) {
        if (!this._typeMetadatas.has(metadata.target)) {
          this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      }
      addTransformMetadata(metadata) {
        if (!this._transformMetadatas.has(metadata.target)) {
          this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
          this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
        }
        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
      }
      addExposeMetadata(metadata) {
        if (!this._exposeMetadatas.has(metadata.target)) {
          this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      }
      addExcludeMetadata(metadata) {
        if (!this._excludeMetadatas.has(metadata.target)) {
          this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      }
      // -------------------------------------------------------------------------
      // Public Methods
      // -------------------------------------------------------------------------
      findTransformMetadatas(target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter((metadata) => {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_CLASS || transformationType === enums_1.TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        });
      }
      findExcludeMetadata(target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
      }
      findExposeMetadata(target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
      }
      findExposeMetadataByCustomName(target, name) {
        return this.getExposedMetadatas(target).find((metadata) => {
          return metadata.options && metadata.options.name === name;
        });
      }
      findTypeMetadata(target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
      }
      getStrategy(target) {
        const excludeMap = this._excludeMetadatas.get(target);
        const exclude = excludeMap && excludeMap.get(void 0);
        const exposeMap = this._exposeMetadatas.get(target);
        const expose = exposeMap && exposeMap.get(void 0);
        if (exclude && expose || !exclude && !expose)
          return "none";
        return exclude ? "excludeAll" : "exposeAll";
      }
      getExposedMetadatas(target) {
        return this.getMetadata(this._exposeMetadatas, target);
      }
      getExcludedMetadatas(target) {
        return this.getMetadata(this._excludeMetadatas, target);
      }
      getExposedProperties(target, transformationType) {
        return this.getExposedMetadatas(target).filter((metadata) => {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_CLASS || transformationType === enums_1.TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map((metadata) => metadata.propertyName);
      }
      getExcludedProperties(target, transformationType) {
        return this.getExcludedMetadatas(target).filter((metadata) => {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_CLASS || transformationType === enums_1.TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map((metadata) => metadata.propertyName);
      }
      clear() {
        this._typeMetadatas.clear();
        this._exposeMetadatas.clear();
        this._excludeMetadatas.clear();
        this._ancestorsMap.clear();
      }
      // -------------------------------------------------------------------------
      // Private Methods
      // -------------------------------------------------------------------------
      getMetadata(metadatas, target) {
        const metadataFromTargetMap = metadatas.get(target);
        let metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter((meta) => meta.propertyName !== void 0);
        }
        const metadataFromAncestors = [];
        for (const ancestor of this.getAncestors(target)) {
          const ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            const metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter((meta) => meta.propertyName !== void 0);
            metadataFromAncestors.push(...metadataFromAncestor);
          }
        }
        return metadataFromAncestors.concat(metadataFromTarget || []);
      }
      findMetadata(metadatas, target, propertyName) {
        const metadataFromTargetMap = metadatas.get(target);
        if (metadataFromTargetMap) {
          const metadataFromTarget = metadataFromTargetMap.get(propertyName);
          if (metadataFromTarget) {
            return metadataFromTarget;
          }
        }
        for (const ancestor of this.getAncestors(target)) {
          const ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            const ancestorResult = ancestorMetadataMap.get(propertyName);
            if (ancestorResult) {
              return ancestorResult;
            }
          }
        }
        return void 0;
      }
      findMetadatas(metadatas, target, propertyName) {
        const metadataFromTargetMap = metadatas.get(target);
        let metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = metadataFromTargetMap.get(propertyName);
        }
        const metadataFromAncestorsTarget = [];
        for (const ancestor of this.getAncestors(target)) {
          const ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            if (ancestorMetadataMap.has(propertyName)) {
              metadataFromAncestorsTarget.push(...ancestorMetadataMap.get(propertyName));
            }
          }
        }
        return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
      }
      getAncestors(target) {
        if (!target)
          return [];
        if (!this._ancestorsMap.has(target)) {
          const ancestors = [];
          for (let baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
            ancestors.push(baseClass);
          }
          this._ancestorsMap.set(target, ancestors);
        }
        return this._ancestorsMap.get(target);
      }
    };
    exports.MetadataStorage = MetadataStorage;
  }
});

// node_modules/class-transformer/cjs/storage.js
var require_storage = __commonJS({
  "node_modules/class-transformer/cjs/storage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultMetadataStorage = void 0;
    var MetadataStorage_1 = require_MetadataStorage();
    exports.defaultMetadataStorage = new MetadataStorage_1.MetadataStorage();
  }
});

// node_modules/class-transformer/cjs/utils/get-global.util.js
var require_get_global_util = __commonJS({
  "node_modules/class-transformer/cjs/utils/get-global.util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGlobal = void 0;
    function getGlobal() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof self !== "undefined") {
        return self;
      }
    }
    exports.getGlobal = getGlobal;
  }
});

// node_modules/class-transformer/cjs/utils/is-promise.util.js
var require_is_promise_util = __commonJS({
  "node_modules/class-transformer/cjs/utils/is-promise.util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPromise = void 0;
    function isPromise(p) {
      return p !== null && typeof p === "object" && typeof p.then === "function";
    }
    exports.isPromise = isPromise;
  }
});

// node_modules/class-transformer/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/class-transformer/cjs/utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_get_global_util(), exports);
    __exportStar(require_is_promise_util(), exports);
  }
});

// node_modules/class-transformer/cjs/TransformOperationExecutor.js
var require_TransformOperationExecutor = __commonJS({
  "node_modules/class-transformer/cjs/TransformOperationExecutor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformOperationExecutor = void 0;
    var storage_1 = require_storage();
    var enums_1 = require_enums();
    var utils_1 = require_utils();
    function instantiateArrayType(arrayType) {
      const array = new arrayType();
      if (!(array instanceof Set) && !("push" in array)) {
        return [];
      }
      return array;
    }
    var TransformOperationExecutor = class {
      // -------------------------------------------------------------------------
      // Constructor
      // -------------------------------------------------------------------------
      constructor(transformationType, options) {
        this.transformationType = transformationType;
        this.options = options;
        this.recursionStack = /* @__PURE__ */ new Set();
      }
      // -------------------------------------------------------------------------
      // Public Methods
      // -------------------------------------------------------------------------
      transform(source, value, targetType, arrayType, isMap, level = 0) {
        if (Array.isArray(value) || value instanceof Set) {
          const newValue = arrayType && this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
          value.forEach((subValue, index) => {
            const subSource = source ? source[index] : void 0;
            if (!this.options.enableCircularCheck || !this.isCircular(subValue)) {
              let realTargetType;
              if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
                if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                  realTargetType = targetType.options.discriminator.subTypes.find((subType) => subType.name === subValue[targetType.options.discriminator.property]);
                  const options = { newObject: newValue, object: subValue, property: void 0 };
                  const newType = targetType.typeFunction(options);
                  realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                  if (!targetType.options.keepDiscriminatorProperty)
                    delete subValue[targetType.options.discriminator.property];
                }
                if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
                  realTargetType = subValue.constructor;
                }
                if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN) {
                  subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find((subType) => subType.value === subValue.constructor).name;
                }
              } else {
                realTargetType = targetType;
              }
              const value2 = this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
              if (newValue instanceof Set) {
                newValue.add(value2);
              } else {
                newValue.push(value2);
              }
            } else if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
              if (newValue instanceof Set) {
                newValue.add(subValue);
              } else {
                newValue.push(subValue);
              }
            }
          });
          return newValue;
        } else if (targetType === String && !isMap) {
          if (value === null || value === void 0)
            return value;
          return String(value);
        } else if (targetType === Number && !isMap) {
          if (value === null || value === void 0)
            return value;
          return Number(value);
        } else if (targetType === Boolean && !isMap) {
          if (value === null || value === void 0)
            return value;
          return Boolean(value);
        } else if ((targetType === Date || value instanceof Date) && !isMap) {
          if (value instanceof Date) {
            return new Date(value.valueOf());
          }
          if (value === null || value === void 0)
            return value;
          return new Date(value);
        } else if (!!(0, utils_1.getGlobal)().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
          if (value === null || value === void 0)
            return value;
          return Buffer.from(value);
        } else if ((0, utils_1.isPromise)(value) && !isMap) {
          return new Promise((resolve2, reject) => {
            value.then((data) => resolve2(this.transform(void 0, data, targetType, void 0, void 0, level + 1)), reject);
          });
        } else if (!isMap && value !== null && typeof value === "object" && typeof value.then === "function") {
          return value;
        } else if (typeof value === "object" && value !== null) {
          if (!targetType && value.constructor !== Object)
            if (!Array.isArray(value) && value.constructor === Array) {
            } else {
              targetType = value.constructor;
            }
          if (!targetType && source)
            targetType = source.constructor;
          if (this.options.enableCircularCheck) {
            this.recursionStack.add(value);
          }
          const keys = this.getKeys(targetType, value, isMap);
          let newValue = source ? source : {};
          if (!source && (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS || this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS)) {
            if (isMap) {
              newValue = /* @__PURE__ */ new Map();
            } else if (targetType) {
              newValue = new targetType();
            } else {
              newValue = {};
            }
          }
          for (const key of keys) {
            if (key === "__proto__" || key === "constructor") {
              continue;
            }
            const valueKey = key;
            let newValueKey = key, propertyName = key;
            if (!this.options.ignoreDecorators && targetType) {
              if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
                if (exposeMetadata) {
                  propertyName = exposeMetadata.propertyName;
                  newValueKey = exposeMetadata.propertyName;
                }
              } else if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN || this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
                const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(targetType, key);
                if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                  newValueKey = exposeMetadata.options.name;
                }
              }
            }
            let subValue = void 0;
            if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
              subValue = value[valueKey];
            } else {
              if (value instanceof Map) {
                subValue = value.get(valueKey);
              } else if (value[valueKey] instanceof Function) {
                subValue = value[valueKey]();
              } else {
                subValue = value[valueKey];
              }
            }
            let type = void 0, isSubValueMap = subValue instanceof Map;
            if (targetType && isMap) {
              type = targetType;
            } else if (targetType) {
              const metadata = storage_1.defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
              if (metadata) {
                const options = { newObject: newValue, object: value, property: propertyName };
                const newType = metadata.typeFunction ? metadata.typeFunction(options) : metadata.reflectedType;
                if (metadata.options && metadata.options.discriminator && metadata.options.discriminator.property && metadata.options.discriminator.subTypes) {
                  if (!(value[valueKey] instanceof Array)) {
                    if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                      type = metadata.options.discriminator.subTypes.find((subType) => {
                        if (subValue && subValue instanceof Object && metadata.options.discriminator.property in subValue) {
                          return subType.name === subValue[metadata.options.discriminator.property];
                        }
                      });
                      type === void 0 ? type = newType : type = type.value;
                      if (!metadata.options.keepDiscriminatorProperty) {
                        if (subValue && subValue instanceof Object && metadata.options.discriminator.property in subValue) {
                          delete subValue[metadata.options.discriminator.property];
                        }
                      }
                    }
                    if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
                      type = subValue.constructor;
                    }
                    if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN) {
                      if (subValue) {
                        subValue[metadata.options.discriminator.property] = metadata.options.discriminator.subTypes.find((subType) => subType.value === subValue.constructor).name;
                      }
                    }
                  } else {
                    type = metadata;
                  }
                } else {
                  type = newType;
                }
                isSubValueMap = isSubValueMap || metadata.reflectedType === Map;
              } else if (this.options.targetMaps) {
                this.options.targetMaps.filter((map) => map.target === targetType && !!map.properties[propertyName]).forEach((map) => type = map.properties[propertyName]);
              } else if (this.options.enableImplicitConversion && this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                const reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
                if (reflectedType) {
                  type = reflectedType;
                }
              }
            }
            const arrayType2 = Array.isArray(value[valueKey]) ? this.getReflectedType(targetType, propertyName) : void 0;
            const subSource = source ? source[valueKey] : void 0;
            if (newValue.constructor.prototype) {
              const descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
              if ((this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS || this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
              (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
                continue;
            }
            if (!this.options.enableCircularCheck || !this.isCircular(subValue)) {
              const transformKey = this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
              let finalValue;
              if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN) {
                finalValue = value[transformKey];
                finalValue = this.applyCustomTransformations(finalValue, targetType, transformKey, value, this.transformationType);
                finalValue = value[transformKey] === finalValue ? subValue : finalValue;
                finalValue = this.transform(subSource, finalValue, type, arrayType2, isSubValueMap, level + 1);
              } else {
                if (subValue === void 0 && this.options.exposeDefaultValues) {
                  finalValue = newValue[newValueKey];
                } else {
                  finalValue = this.transform(subSource, subValue, type, arrayType2, isSubValueMap, level + 1);
                  finalValue = this.applyCustomTransformations(finalValue, targetType, transformKey, value, this.transformationType);
                }
              }
              if (finalValue !== void 0 || this.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            } else if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
              let finalValue = subValue;
              finalValue = this.applyCustomTransformations(finalValue, targetType, key, value, this.transformationType);
              if (finalValue !== void 0 || this.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            }
          }
          if (this.options.enableCircularCheck) {
            this.recursionStack.delete(value);
          }
          return newValue;
        } else {
          return value;
        }
      }
      applyCustomTransformations(value, target, key, obj, transformationType) {
        let metadatas = storage_1.defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
        if (this.options.version !== void 0) {
          metadatas = metadatas.filter((metadata) => {
            if (!metadata.options)
              return true;
            return this.checkVersion(metadata.options.since, metadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          metadatas = metadatas.filter((metadata) => {
            if (!metadata.options)
              return true;
            return this.checkGroups(metadata.options.groups);
          });
        } else {
          metadatas = metadatas.filter((metadata) => {
            return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
          });
        }
        metadatas.forEach((metadata) => {
          value = metadata.transformFn({ value, key, obj, type: transformationType, options: this.options });
        });
        return value;
      }
      // preventing circular references
      isCircular(object) {
        return this.recursionStack.has(object);
      }
      getReflectedType(target, propertyName) {
        if (!target)
          return void 0;
        const meta = storage_1.defaultMetadataStorage.findTypeMetadata(target, propertyName);
        return meta ? meta.reflectedType : void 0;
      }
      getKeys(target, object, isMap) {
        let strategy = storage_1.defaultMetadataStorage.getStrategy(target);
        if (strategy === "none")
          strategy = this.options.strategy || "exposeAll";
        let keys = [];
        if (strategy === "exposeAll" || isMap) {
          if (object instanceof Map) {
            keys = Array.from(object.keys());
          } else {
            keys = Object.keys(object);
          }
        }
        if (isMap) {
          return keys;
        }
        if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
          const exposedProperties = storage_1.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          const excludedProperties = storage_1.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          keys = [...exposedProperties, ...excludedProperties];
        }
        if (!this.options.ignoreDecorators && target) {
          let exposedProperties = storage_1.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
            exposedProperties = exposedProperties.map((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                return exposeMetadata.options.name;
              }
              return key;
            });
          }
          if (this.options.excludeExtraneousValues) {
            keys = exposedProperties;
          } else {
            keys = keys.concat(exposedProperties);
          }
          const excludedProperties = storage_1.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          if (excludedProperties.length > 0) {
            keys = keys.filter((key) => {
              return !excludedProperties.includes(key);
            });
          }
          if (this.options.version !== void 0) {
            keys = keys.filter((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
            });
          }
          if (this.options.groups && this.options.groups.length) {
            keys = keys.filter((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return this.checkGroups(exposeMetadata.options.groups);
            });
          } else {
            keys = keys.filter((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
            });
          }
        }
        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
          keys = keys.filter((key) => this.options.excludePrefixes.every((prefix) => {
            return key.substr(0, prefix.length) !== prefix;
          }));
        }
        keys = keys.filter((key, index, self2) => {
          return self2.indexOf(key) === index;
        });
        return keys;
      }
      checkVersion(since, until) {
        let decision = true;
        if (decision && since)
          decision = this.options.version >= since;
        if (decision && until)
          decision = this.options.version < until;
        return decision;
      }
      checkGroups(groups) {
        if (!groups)
          return true;
        return this.options.groups.some((optionGroup) => groups.includes(optionGroup));
      }
    };
    exports.TransformOperationExecutor = TransformOperationExecutor;
  }
});

// node_modules/class-transformer/cjs/constants/default-options.constant.js
var require_default_options_constant = __commonJS({
  "node_modules/class-transformer/cjs/constants/default-options.constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultOptions = void 0;
    exports.defaultOptions = {
      enableCircularCheck: false,
      enableImplicitConversion: false,
      excludeExtraneousValues: false,
      excludePrefixes: void 0,
      exposeDefaultValues: false,
      exposeUnsetFields: true,
      groups: void 0,
      ignoreDecorators: false,
      strategy: void 0,
      targetMaps: void 0,
      version: void 0
    };
  }
});

// node_modules/class-transformer/cjs/ClassTransformer.js
var require_ClassTransformer = __commonJS({
  "node_modules/class-transformer/cjs/ClassTransformer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassTransformer = void 0;
    var TransformOperationExecutor_1 = require_TransformOperationExecutor();
    var enums_1 = require_enums();
    var default_options_constant_1 = require_default_options_constant();
    var ClassTransformer = class {
      instanceToPlain(object, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_PLAIN, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      }
      classToPlainFromExist(object, plainObject, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_PLAIN, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
      }
      plainToInstance(cls, plain, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.PLAIN_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
      }
      plainToClassFromExist(clsObject, plain, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.PLAIN_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
      }
      instanceToInstance(object, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      }
      classToClassFromExist(object, fromObject, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
      }
      serialize(object, options) {
        return JSON.stringify(this.instanceToPlain(object, options));
      }
      /**
       * Deserializes given JSON string to a object of the given class.
       */
      deserialize(cls, json, options) {
        const jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      }
      /**
       * Deserializes given JSON string to an array of objects of the given class.
       */
      deserializeArray(cls, json, options) {
        const jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      }
    };
    exports.ClassTransformer = ClassTransformer;
  }
});

// node_modules/class-transformer/cjs/decorators/exclude.decorator.js
var require_exclude_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/exclude.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Exclude = void 0;
    var storage_1 = require_storage();
    function Exclude(options = {}) {
      return function(object, propertyName) {
        storage_1.defaultMetadataStorage.addExcludeMetadata({
          target: object instanceof Function ? object : object.constructor,
          propertyName,
          options
        });
      };
    }
    exports.Exclude = Exclude;
  }
});

// node_modules/class-transformer/cjs/decorators/expose.decorator.js
var require_expose_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/expose.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Expose = void 0;
    var storage_1 = require_storage();
    function Expose(options = {}) {
      return function(object, propertyName) {
        storage_1.defaultMetadataStorage.addExposeMetadata({
          target: object instanceof Function ? object : object.constructor,
          propertyName,
          options
        });
      };
    }
    exports.Expose = Expose;
  }
});

// node_modules/class-transformer/cjs/decorators/transform-instance-to-instance.decorator.js
var require_transform_instance_to_instance_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform-instance-to-instance.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformInstanceToInstance = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    function TransformInstanceToInstance(params) {
      return function(target, propertyKey, descriptor) {
        const classTransformer = new ClassTransformer_1.ClassTransformer();
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          const result = originalMethod.apply(this, args);
          const isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
          return isPromise ? result.then((data) => classTransformer.instanceToInstance(data, params)) : classTransformer.instanceToInstance(result, params);
        };
      };
    }
    exports.TransformInstanceToInstance = TransformInstanceToInstance;
  }
});

// node_modules/class-transformer/cjs/decorators/transform-instance-to-plain.decorator.js
var require_transform_instance_to_plain_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform-instance-to-plain.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformInstanceToPlain = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    function TransformInstanceToPlain(params) {
      return function(target, propertyKey, descriptor) {
        const classTransformer = new ClassTransformer_1.ClassTransformer();
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          const result = originalMethod.apply(this, args);
          const isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
          return isPromise ? result.then((data) => classTransformer.instanceToPlain(data, params)) : classTransformer.instanceToPlain(result, params);
        };
      };
    }
    exports.TransformInstanceToPlain = TransformInstanceToPlain;
  }
});

// node_modules/class-transformer/cjs/decorators/transform-plain-to-instance.decorator.js
var require_transform_plain_to_instance_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform-plain-to-instance.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformPlainToInstance = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    function TransformPlainToInstance(classType, params) {
      return function(target, propertyKey, descriptor) {
        const classTransformer = new ClassTransformer_1.ClassTransformer();
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          const result = originalMethod.apply(this, args);
          const isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
          return isPromise ? result.then((data) => classTransformer.plainToInstance(classType, data, params)) : classTransformer.plainToInstance(classType, result, params);
        };
      };
    }
    exports.TransformPlainToInstance = TransformPlainToInstance;
  }
});

// node_modules/class-transformer/cjs/decorators/transform.decorator.js
var require_transform_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Transform = void 0;
    var storage_1 = require_storage();
    function Transform(transformFn, options = {}) {
      return function(target, propertyName) {
        storage_1.defaultMetadataStorage.addTransformMetadata({
          target: target.constructor,
          propertyName,
          transformFn,
          options
        });
      };
    }
    exports.Transform = Transform;
  }
});

// node_modules/class-transformer/cjs/decorators/type.decorator.js
var require_type_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/type.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Type = void 0;
    var storage_1 = require_storage();
    function Type2(typeFunction, options = {}) {
      return function(target, propertyName) {
        const reflectedType = Reflect.getMetadata("design:type", target, propertyName);
        storage_1.defaultMetadataStorage.addTypeMetadata({
          target: target.constructor,
          propertyName,
          reflectedType,
          typeFunction,
          options
        });
      };
    }
    exports.Type = Type2;
  }
});

// node_modules/class-transformer/cjs/decorators/index.js
var require_decorators = __commonJS({
  "node_modules/class-transformer/cjs/decorators/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_exclude_decorator(), exports);
    __exportStar(require_expose_decorator(), exports);
    __exportStar(require_transform_instance_to_instance_decorator(), exports);
    __exportStar(require_transform_instance_to_plain_decorator(), exports);
    __exportStar(require_transform_plain_to_instance_decorator(), exports);
    __exportStar(require_transform_decorator(), exports);
    __exportStar(require_type_decorator(), exports);
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/expose-options.interface.js
var require_expose_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/expose-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/exclude-options.interface.js
var require_exclude_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/exclude-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/transform-options.interface.js
var require_transform_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/transform-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/type-discriminator-descriptor.interface.js
var require_type_discriminator_descriptor_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/type-discriminator-descriptor.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/type-options.interface.js
var require_type_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/type-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/exclude-metadata.interface.js
var require_exclude_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/exclude-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/expose-metadata.interface.js
var require_expose_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/expose-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/transform-metadata.interface.js
var require_transform_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/transform-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/transform-fn-params.interface.js
var require_transform_fn_params_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/transform-fn-params.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/type-metadata.interface.js
var require_type_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/type-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/class-constructor.type.js
var require_class_constructor_type = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/class-constructor.type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/class-transformer-options.interface.js
var require_class_transformer_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/class-transformer-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/target-map.interface.js
var require_target_map_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/target-map.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/type-help-options.interface.js
var require_type_help_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/type-help-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/index.js
var require_interfaces = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_expose_options_interface(), exports);
    __exportStar(require_exclude_options_interface(), exports);
    __exportStar(require_transform_options_interface(), exports);
    __exportStar(require_type_discriminator_descriptor_interface(), exports);
    __exportStar(require_type_options_interface(), exports);
    __exportStar(require_exclude_metadata_interface(), exports);
    __exportStar(require_expose_metadata_interface(), exports);
    __exportStar(require_transform_metadata_interface(), exports);
    __exportStar(require_transform_fn_params_interface(), exports);
    __exportStar(require_type_metadata_interface(), exports);
    __exportStar(require_class_constructor_type(), exports);
    __exportStar(require_class_transformer_options_interface(), exports);
    __exportStar(require_target_map_interface(), exports);
    __exportStar(require_type_help_options_interface(), exports);
  }
});

// node_modules/class-transformer/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/class-transformer/cjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deserializeArray = exports.deserialize = exports.serialize = exports.classToClassFromExist = exports.instanceToInstance = exports.plainToClassFromExist = exports.plainToInstance = exports.plainToClass = exports.classToPlainFromExist = exports.instanceToPlain = exports.classToPlain = exports.ClassTransformer = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    var ClassTransformer_2 = require_ClassTransformer();
    Object.defineProperty(exports, "ClassTransformer", { enumerable: true, get: function() {
      return ClassTransformer_2.ClassTransformer;
    } });
    __exportStar(require_decorators(), exports);
    __exportStar(require_interfaces(), exports);
    __exportStar(require_enums(), exports);
    var classTransformer = new ClassTransformer_1.ClassTransformer();
    function classToPlain(object, options) {
      return classTransformer.instanceToPlain(object, options);
    }
    exports.classToPlain = classToPlain;
    function instanceToPlain(object, options) {
      return classTransformer.instanceToPlain(object, options);
    }
    exports.instanceToPlain = instanceToPlain;
    function classToPlainFromExist(object, plainObject, options) {
      return classTransformer.classToPlainFromExist(object, plainObject, options);
    }
    exports.classToPlainFromExist = classToPlainFromExist;
    function plainToClass(cls, plain, options) {
      return classTransformer.plainToInstance(cls, plain, options);
    }
    exports.plainToClass = plainToClass;
    function plainToInstance(cls, plain, options) {
      return classTransformer.plainToInstance(cls, plain, options);
    }
    exports.plainToInstance = plainToInstance;
    function plainToClassFromExist(clsObject, plain, options) {
      return classTransformer.plainToClassFromExist(clsObject, plain, options);
    }
    exports.plainToClassFromExist = plainToClassFromExist;
    function instanceToInstance(object, options) {
      return classTransformer.instanceToInstance(object, options);
    }
    exports.instanceToInstance = instanceToInstance;
    function classToClassFromExist(object, fromObject, options) {
      return classTransformer.classToClassFromExist(object, fromObject, options);
    }
    exports.classToClassFromExist = classToClassFromExist;
    function serialize(object, options) {
      return classTransformer.serialize(object, options);
    }
    exports.serialize = serialize;
    function deserialize(cls, json, options) {
      return classTransformer.deserialize(cls, json, options);
    }
    exports.deserialize = deserialize;
    function deserializeArray(cls, json, options) {
      return classTransformer.deserializeArray(cls, json, options);
    }
    exports.deserializeArray = deserializeArray;
  }
});

// node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_) {
          }
        }
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_) {
          }
        }
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
          return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
          return void 0;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
        }
        function OrdinaryMetadataKeys(O, P) {
          var ownKeys = OrdinaryOwnMetadataKeys(O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        function OrdinaryOwnMetadataKeys(O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        function Type2(x) {
          if (x === null)
            return 1;
          switch (typeof x) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x === null ? 1 : 6;
            default:
              return 6;
          }
        }
        function IsUndefined(x) {
          return x === void 0;
        }
        function IsNull(x) {
          return x === null;
        }
        function IsSymbol(x) {
          return typeof x === "symbol";
        }
        function IsObject(x) {
          return typeof x === "object" ? x !== null : typeof x === "function";
        }
        function ToPrimitive(input, PreferredType) {
          switch (Type2(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        function OrdinaryToPrimitive(O, hint) {
          if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
          } else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
              var result = toString_2.call(O);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        function ToBoolean(argument) {
          return !!argument;
        }
        function ToString(argument) {
          return "" + argument;
        }
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument,
            3
            /* String */
          );
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
          switch (Type2(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        function SameValueZero(x, y) {
          return x === y || x !== x && y !== y;
        }
        function GetMethod(V, P) {
          var func = V[P];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        function IteratorClose(iterator) {
          var f = iterator["return"];
          if (f)
            f.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O) {
          var proto = Object.getPrototypeOf(O);
          if (typeof O !== "function" || O === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O)
            return proto;
          return constructor;
        }
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          function getProviderNoCache(O, P) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O, P))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O, P)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
              return fallback;
            }
            return void 0;
          }
          function getProvider(O, P) {
            var providerMap = targetProviderMap.get(O);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O, P);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return provider;
          }
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          function setProvider(O, P, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O, P);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return true;
          }
        }
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var targetMetadata = metadata2.get(O);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P);
            },
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = metadata2.get(O);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P, metadataMap);
              if (!registry.setProvider(O, P, provider)) {
                targetMetadata.delete(P);
                if (createdTargetMetadata) {
                  metadata2.delete(O);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey));
          }
          function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey);
          }
          function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey, MetadataValue);
          }
          function OrdinaryOwnMetadataKeys2(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k] = nextValue;
              } catch (e) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e;
                }
              }
              k++;
            }
          }
          function OrdinaryDeleteMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
        }
        function CreateFallbackProvider(reflect) {
          var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var metadataPropertySet = metadataOwner.get(O);
              if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                return true;
              }
              if (getOwnMetadataKeys2(O, P).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O, metadataPropertySet);
                }
                metadataPropertySet.add(P);
                return true;
              }
              return false;
            },
            OrdinaryDefineOwnMetadata: defineMetadata2,
            OrdinaryHasOwnMetadata: hasOwnMetadata2,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        function GetMetadataProvider(O, P, Create) {
          var registeredProvider = metadataRegistry.getProvider(O, P);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O, P, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            }()
          );
          var Map2 = (
            /** @class */
            function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              Object.defineProperty(Map3.prototype, "size", {
                get: function() {
                  return this._keys.length;
                },
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            }()
          );
          return Map2;
          function getKey(key, _) {
            return key;
          }
          function getValue(_, value) {
            return value;
          }
          function getEntry(key, value) {
            return [key, value];
          }
        }
        function CreateSetPolyfill() {
          var Set2 = (
            /** @class */
            function() {
              function Set3() {
                this._map = new _Map();
              }
              Object.defineProperty(Set3.prototype, "size", {
                get: function() {
                  return this._map.size;
                },
                enumerable: true,
                configurable: true
              });
              Set3.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set3.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set3.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set3.prototype.clear = function() {
                this._map.clear();
              };
              Set3.prototype.keys = function() {
                return this._map.keys();
              };
              Set3.prototype.values = function() {
                return this._map.keys();
              };
              Set3.prototype.entries = function() {
                return this._map.entries();
              };
              Set3.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set3.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set3;
            }()
          );
          return Set2;
        }
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            }()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              var array = new Uint8Array(size);
              if (typeof crypto !== "undefined") {
                crypto.getRandomValues(array);
              } else if (typeof msCrypto !== "undefined") {
                msCrypto.getRandomValues(array);
              } else {
                FillRandomBytes(array, size);
              }
              return array;
            }
            return FillRandomBytes(new Array(size), size);
          }
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
        }
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/messages.js
var require_messages = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/messages.js"(exports) {
    "use strict";
    var __decorate2 = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestCaseStarted = exports.TestCaseFinished = exports.TestStep = exports.StepMatchArgumentsList = exports.StepMatchArgument = exports.Group = exports.TestCase = exports.Snippet = exports.Suggestion = exports.StepDefinitionPattern = exports.StepDefinition = exports.JavaStackTraceElement = exports.JavaMethod = exports.SourceReference = exports.Source = exports.PickleTag = exports.PickleTableRow = exports.PickleTableCell = exports.PickleTable = exports.PickleStepArgument = exports.PickleStep = exports.PickleDocString = exports.Pickle = exports.ParseError = exports.ParameterType = exports.Product = exports.Git = exports.Ci = exports.Meta = exports.Location = exports.Hook = exports.Tag = exports.TableRow = exports.TableCell = exports.Step = exports.Scenario = exports.RuleChild = exports.Rule = exports.FeatureChild = exports.Feature = exports.Examples = exports.DocString = exports.DataTable = exports.Comment = exports.Background = exports.GherkinDocument = exports.Exception = exports.Envelope = exports.Duration = exports.Attachment = void 0;
    exports.TestStepResultStatus = exports.StepKeywordType = exports.StepDefinitionPatternType = exports.SourceMediaType = exports.PickleStepType = exports.HookType = exports.AttachmentContentEncoding = exports.UndefinedParameterType = exports.Timestamp = exports.TestStepStarted = exports.TestStepResult = exports.TestStepFinished = exports.TestRunStarted = exports.TestRunHookStarted = exports.TestRunHookFinished = exports.TestRunFinished = void 0;
    var class_transformer_1 = require_cjs();
    require_Reflect();
    var Attachment2 = (
      /** @class */
      function() {
        function Attachment3() {
          this.body = "";
          this.contentEncoding = AttachmentContentEncoding2.IDENTITY;
          this.mediaType = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Source2;
          })
        ], Attachment3.prototype, "source", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], Attachment3.prototype, "timestamp", void 0);
        return Attachment3;
      }()
    );
    exports.Attachment = Attachment2;
    var Duration2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Duration3() {
          this.seconds = 0;
          this.nanos = 0;
        }
        return Duration3;
      }()
    );
    exports.Duration = Duration2;
    var Envelope2 = (
      /** @class */
      function() {
        function Envelope3() {
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Attachment2;
          })
        ], Envelope3.prototype, "attachment", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return GherkinDocument3;
          })
        ], Envelope3.prototype, "gherkinDocument", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Hook2;
          })
        ], Envelope3.prototype, "hook", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Meta2;
          })
        ], Envelope3.prototype, "meta", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return ParameterType2;
          })
        ], Envelope3.prototype, "parameterType", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return ParseError2;
          })
        ], Envelope3.prototype, "parseError", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Pickle2;
          })
        ], Envelope3.prototype, "pickle", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Suggestion2;
          })
        ], Envelope3.prototype, "suggestion", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Source2;
          })
        ], Envelope3.prototype, "source", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return StepDefinition2;
          })
        ], Envelope3.prototype, "stepDefinition", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestCase2;
          })
        ], Envelope3.prototype, "testCase", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestCaseFinished2;
          })
        ], Envelope3.prototype, "testCaseFinished", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestCaseStarted2;
          })
        ], Envelope3.prototype, "testCaseStarted", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestRunFinished2;
          })
        ], Envelope3.prototype, "testRunFinished", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestRunStarted2;
          })
        ], Envelope3.prototype, "testRunStarted", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestStepFinished2;
          })
        ], Envelope3.prototype, "testStepFinished", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestStepStarted2;
          })
        ], Envelope3.prototype, "testStepStarted", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestRunHookStarted2;
          })
        ], Envelope3.prototype, "testRunHookStarted", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestRunHookFinished2;
          })
        ], Envelope3.prototype, "testRunHookFinished", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return UndefinedParameterType2;
          })
        ], Envelope3.prototype, "undefinedParameterType", void 0);
        return Envelope3;
      }()
    );
    exports.Envelope = Envelope2;
    var Exception2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Exception3() {
          this.type = "";
        }
        return Exception3;
      }()
    );
    exports.Exception = Exception2;
    var GherkinDocument3 = (
      /** @class */
      function() {
        function GherkinDocument4() {
          this.comments = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Feature3;
          })
        ], GherkinDocument4.prototype, "feature", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Comment3;
          })
        ], GherkinDocument4.prototype, "comments", void 0);
        return GherkinDocument4;
      }()
    );
    exports.GherkinDocument = GherkinDocument3;
    var Background3 = (
      /** @class */
      function() {
        function Background4() {
          this.location = new Location2();
          this.keyword = "";
          this.name = "";
          this.description = "";
          this.steps = [];
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Background4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Step3;
          })
        ], Background4.prototype, "steps", void 0);
        return Background4;
      }()
    );
    exports.Background = Background3;
    var Comment3 = (
      /** @class */
      function() {
        function Comment4() {
          this.location = new Location2();
          this.text = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Comment4.prototype, "location", void 0);
        return Comment4;
      }()
    );
    exports.Comment = Comment3;
    var DataTable3 = (
      /** @class */
      function() {
        function DataTable4() {
          this.location = new Location2();
          this.rows = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], DataTable4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TableRow3;
          })
        ], DataTable4.prototype, "rows", void 0);
        return DataTable4;
      }()
    );
    exports.DataTable = DataTable3;
    var DocString3 = (
      /** @class */
      function() {
        function DocString4() {
          this.location = new Location2();
          this.content = "";
          this.delimiter = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], DocString4.prototype, "location", void 0);
        return DocString4;
      }()
    );
    exports.DocString = DocString3;
    var Examples3 = (
      /** @class */
      function() {
        function Examples4() {
          this.location = new Location2();
          this.tags = [];
          this.keyword = "";
          this.name = "";
          this.description = "";
          this.tableBody = [];
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Examples4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Tag3;
          })
        ], Examples4.prototype, "tags", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TableRow3;
          })
        ], Examples4.prototype, "tableHeader", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TableRow3;
          })
        ], Examples4.prototype, "tableBody", void 0);
        return Examples4;
      }()
    );
    exports.Examples = Examples3;
    var Feature3 = (
      /** @class */
      function() {
        function Feature4() {
          this.location = new Location2();
          this.tags = [];
          this.language = "";
          this.keyword = "";
          this.name = "";
          this.description = "";
          this.children = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Feature4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Tag3;
          })
        ], Feature4.prototype, "tags", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return FeatureChild3;
          })
        ], Feature4.prototype, "children", void 0);
        return Feature4;
      }()
    );
    exports.Feature = Feature3;
    var FeatureChild3 = (
      /** @class */
      function() {
        function FeatureChild4() {
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Rule3;
          })
        ], FeatureChild4.prototype, "rule", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Background3;
          })
        ], FeatureChild4.prototype, "background", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Scenario3;
          })
        ], FeatureChild4.prototype, "scenario", void 0);
        return FeatureChild4;
      }()
    );
    exports.FeatureChild = FeatureChild3;
    var Rule3 = (
      /** @class */
      function() {
        function Rule4() {
          this.location = new Location2();
          this.tags = [];
          this.keyword = "";
          this.name = "";
          this.description = "";
          this.children = [];
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Rule4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Tag3;
          })
        ], Rule4.prototype, "tags", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return RuleChild3;
          })
        ], Rule4.prototype, "children", void 0);
        return Rule4;
      }()
    );
    exports.Rule = Rule3;
    var RuleChild3 = (
      /** @class */
      function() {
        function RuleChild4() {
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Background3;
          })
        ], RuleChild4.prototype, "background", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Scenario3;
          })
        ], RuleChild4.prototype, "scenario", void 0);
        return RuleChild4;
      }()
    );
    exports.RuleChild = RuleChild3;
    var Scenario3 = (
      /** @class */
      function() {
        function Scenario4() {
          this.location = new Location2();
          this.tags = [];
          this.keyword = "";
          this.name = "";
          this.description = "";
          this.steps = [];
          this.examples = [];
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Scenario4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Tag3;
          })
        ], Scenario4.prototype, "tags", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Step3;
          })
        ], Scenario4.prototype, "steps", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Examples3;
          })
        ], Scenario4.prototype, "examples", void 0);
        return Scenario4;
      }()
    );
    exports.Scenario = Scenario3;
    var Step3 = (
      /** @class */
      function() {
        function Step4() {
          this.location = new Location2();
          this.keyword = "";
          this.text = "";
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Step4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return DocString3;
          })
        ], Step4.prototype, "docString", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return DataTable3;
          })
        ], Step4.prototype, "dataTable", void 0);
        return Step4;
      }()
    );
    exports.Step = Step3;
    var TableCell2 = (
      /** @class */
      function() {
        function TableCell3() {
          this.location = new Location2();
          this.value = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], TableCell3.prototype, "location", void 0);
        return TableCell3;
      }()
    );
    exports.TableCell = TableCell2;
    var TableRow3 = (
      /** @class */
      function() {
        function TableRow4() {
          this.location = new Location2();
          this.cells = [];
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], TableRow4.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TableCell2;
          })
        ], TableRow4.prototype, "cells", void 0);
        return TableRow4;
      }()
    );
    exports.TableRow = TableRow3;
    var Tag3 = (
      /** @class */
      function() {
        function Tag4() {
          this.location = new Location2();
          this.name = "";
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Tag4.prototype, "location", void 0);
        return Tag4;
      }()
    );
    exports.Tag = Tag3;
    var Hook2 = (
      /** @class */
      function() {
        function Hook3() {
          this.id = "";
          this.sourceReference = new SourceReference2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return SourceReference2;
          })
        ], Hook3.prototype, "sourceReference", void 0);
        return Hook3;
      }()
    );
    exports.Hook = Hook2;
    var Location2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Location3() {
          this.line = 0;
        }
        return Location3;
      }()
    );
    exports.Location = Location2;
    var Meta2 = (
      /** @class */
      function() {
        function Meta3() {
          this.protocolVersion = "";
          this.implementation = new Product2();
          this.runtime = new Product2();
          this.os = new Product2();
          this.cpu = new Product2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Product2;
          })
        ], Meta3.prototype, "implementation", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Product2;
          })
        ], Meta3.prototype, "runtime", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Product2;
          })
        ], Meta3.prototype, "os", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Product2;
          })
        ], Meta3.prototype, "cpu", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Ci2;
          })
        ], Meta3.prototype, "ci", void 0);
        return Meta3;
      }()
    );
    exports.Meta = Meta2;
    var Ci2 = (
      /** @class */
      function() {
        function Ci3() {
          this.name = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Git2;
          })
        ], Ci3.prototype, "git", void 0);
        return Ci3;
      }()
    );
    exports.Ci = Ci2;
    var Git2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Git3() {
          this.remote = "";
          this.revision = "";
        }
        return Git3;
      }()
    );
    exports.Git = Git2;
    var Product2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Product3() {
          this.name = "";
        }
        return Product3;
      }()
    );
    exports.Product = Product2;
    var ParameterType2 = (
      /** @class */
      function() {
        function ParameterType3() {
          this.name = "";
          this.regularExpressions = [];
          this.preferForRegularExpressionMatch = false;
          this.useForSnippets = false;
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return SourceReference2;
          })
        ], ParameterType3.prototype, "sourceReference", void 0);
        return ParameterType3;
      }()
    );
    exports.ParameterType = ParameterType2;
    var ParseError2 = (
      /** @class */
      function() {
        function ParseError3() {
          this.source = new SourceReference2();
          this.message = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return SourceReference2;
          })
        ], ParseError3.prototype, "source", void 0);
        return ParseError3;
      }()
    );
    exports.ParseError = ParseError2;
    var Pickle2 = (
      /** @class */
      function() {
        function Pickle3() {
          this.id = "";
          this.uri = "";
          this.name = "";
          this.language = "";
          this.steps = [];
          this.tags = [];
          this.astNodeIds = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], Pickle3.prototype, "location", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleStep2;
          })
        ], Pickle3.prototype, "steps", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleTag2;
          })
        ], Pickle3.prototype, "tags", void 0);
        return Pickle3;
      }()
    );
    exports.Pickle = Pickle2;
    var PickleDocString2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function PickleDocString3() {
          this.content = "";
        }
        return PickleDocString3;
      }()
    );
    exports.PickleDocString = PickleDocString2;
    var PickleStep2 = (
      /** @class */
      function() {
        function PickleStep3() {
          this.astNodeIds = [];
          this.id = "";
          this.text = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleStepArgument2;
          })
        ], PickleStep3.prototype, "argument", void 0);
        return PickleStep3;
      }()
    );
    exports.PickleStep = PickleStep2;
    var PickleStepArgument2 = (
      /** @class */
      function() {
        function PickleStepArgument3() {
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleDocString2;
          })
        ], PickleStepArgument3.prototype, "docString", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleTable2;
          })
        ], PickleStepArgument3.prototype, "dataTable", void 0);
        return PickleStepArgument3;
      }()
    );
    exports.PickleStepArgument = PickleStepArgument2;
    var PickleTable2 = (
      /** @class */
      function() {
        function PickleTable3() {
          this.rows = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleTableRow2;
          })
        ], PickleTable3.prototype, "rows", void 0);
        return PickleTable3;
      }()
    );
    exports.PickleTable = PickleTable2;
    var PickleTableCell2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function PickleTableCell3() {
          this.value = "";
        }
        return PickleTableCell3;
      }()
    );
    exports.PickleTableCell = PickleTableCell2;
    var PickleTableRow2 = (
      /** @class */
      function() {
        function PickleTableRow3() {
          this.cells = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return PickleTableCell2;
          })
        ], PickleTableRow3.prototype, "cells", void 0);
        return PickleTableRow3;
      }()
    );
    exports.PickleTableRow = PickleTableRow2;
    var PickleTag2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function PickleTag3() {
          this.name = "";
          this.astNodeId = "";
        }
        return PickleTag3;
      }()
    );
    exports.PickleTag = PickleTag2;
    var Source2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Source3() {
          this.uri = "";
          this.data = "";
          this.mediaType = SourceMediaType2.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
        }
        return Source3;
      }()
    );
    exports.Source = Source2;
    var SourceReference2 = (
      /** @class */
      function() {
        function SourceReference3() {
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return JavaMethod2;
          })
        ], SourceReference3.prototype, "javaMethod", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return JavaStackTraceElement2;
          })
        ], SourceReference3.prototype, "javaStackTraceElement", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Location2;
          })
        ], SourceReference3.prototype, "location", void 0);
        return SourceReference3;
      }()
    );
    exports.SourceReference = SourceReference2;
    var JavaMethod2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function JavaMethod3() {
          this.className = "";
          this.methodName = "";
          this.methodParameterTypes = [];
        }
        return JavaMethod3;
      }()
    );
    exports.JavaMethod = JavaMethod2;
    var JavaStackTraceElement2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function JavaStackTraceElement3() {
          this.className = "";
          this.fileName = "";
          this.methodName = "";
        }
        return JavaStackTraceElement3;
      }()
    );
    exports.JavaStackTraceElement = JavaStackTraceElement2;
    var StepDefinition2 = (
      /** @class */
      function() {
        function StepDefinition3() {
          this.id = "";
          this.pattern = new StepDefinitionPattern2();
          this.sourceReference = new SourceReference2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return StepDefinitionPattern2;
          })
        ], StepDefinition3.prototype, "pattern", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return SourceReference2;
          })
        ], StepDefinition3.prototype, "sourceReference", void 0);
        return StepDefinition3;
      }()
    );
    exports.StepDefinition = StepDefinition2;
    var StepDefinitionPattern2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function StepDefinitionPattern3() {
          this.source = "";
          this.type = StepDefinitionPatternType2.CUCUMBER_EXPRESSION;
        }
        return StepDefinitionPattern3;
      }()
    );
    exports.StepDefinitionPattern = StepDefinitionPattern2;
    var Suggestion2 = (
      /** @class */
      function() {
        function Suggestion3() {
          this.id = "";
          this.pickleStepId = "";
          this.snippets = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Snippet2;
          })
        ], Suggestion3.prototype, "snippets", void 0);
        return Suggestion3;
      }()
    );
    exports.Suggestion = Suggestion2;
    var Snippet2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Snippet3() {
          this.language = "";
          this.code = "";
        }
        return Snippet3;
      }()
    );
    exports.Snippet = Snippet2;
    var TestCase2 = (
      /** @class */
      function() {
        function TestCase3() {
          this.id = "";
          this.pickleId = "";
          this.testSteps = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestStep2;
          })
        ], TestCase3.prototype, "testSteps", void 0);
        return TestCase3;
      }()
    );
    exports.TestCase = TestCase2;
    var Group2 = (
      /** @class */
      function() {
        function Group3() {
          this.children = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Group3;
          })
        ], Group3.prototype, "children", void 0);
        return Group3;
      }()
    );
    exports.Group = Group2;
    var StepMatchArgument2 = (
      /** @class */
      function() {
        function StepMatchArgument3() {
          this.group = new Group2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Group2;
          })
        ], StepMatchArgument3.prototype, "group", void 0);
        return StepMatchArgument3;
      }()
    );
    exports.StepMatchArgument = StepMatchArgument2;
    var StepMatchArgumentsList2 = (
      /** @class */
      function() {
        function StepMatchArgumentsList3() {
          this.stepMatchArguments = [];
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return StepMatchArgument2;
          })
        ], StepMatchArgumentsList3.prototype, "stepMatchArguments", void 0);
        return StepMatchArgumentsList3;
      }()
    );
    exports.StepMatchArgumentsList = StepMatchArgumentsList2;
    var TestStep2 = (
      /** @class */
      function() {
        function TestStep3() {
          this.id = "";
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return StepMatchArgumentsList2;
          })
        ], TestStep3.prototype, "stepMatchArgumentsLists", void 0);
        return TestStep3;
      }()
    );
    exports.TestStep = TestStep2;
    var TestCaseFinished2 = (
      /** @class */
      function() {
        function TestCaseFinished3() {
          this.testCaseStartedId = "";
          this.timestamp = new Timestamp2();
          this.willBeRetried = false;
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestCaseFinished3.prototype, "timestamp", void 0);
        return TestCaseFinished3;
      }()
    );
    exports.TestCaseFinished = TestCaseFinished2;
    var TestCaseStarted2 = (
      /** @class */
      function() {
        function TestCaseStarted3() {
          this.attempt = 0;
          this.id = "";
          this.testCaseId = "";
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestCaseStarted3.prototype, "timestamp", void 0);
        return TestCaseStarted3;
      }()
    );
    exports.TestCaseStarted = TestCaseStarted2;
    var TestRunFinished2 = (
      /** @class */
      function() {
        function TestRunFinished3() {
          this.success = false;
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestRunFinished3.prototype, "timestamp", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Exception2;
          })
        ], TestRunFinished3.prototype, "exception", void 0);
        return TestRunFinished3;
      }()
    );
    exports.TestRunFinished = TestRunFinished2;
    var TestRunHookFinished2 = (
      /** @class */
      function() {
        function TestRunHookFinished3() {
          this.testRunHookStartedId = "";
          this.result = new TestStepResult2();
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestStepResult2;
          })
        ], TestRunHookFinished3.prototype, "result", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestRunHookFinished3.prototype, "timestamp", void 0);
        return TestRunHookFinished3;
      }()
    );
    exports.TestRunHookFinished = TestRunHookFinished2;
    var TestRunHookStarted2 = (
      /** @class */
      function() {
        function TestRunHookStarted3() {
          this.id = "";
          this.testRunStartedId = "";
          this.hookId = "";
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestRunHookStarted3.prototype, "timestamp", void 0);
        return TestRunHookStarted3;
      }()
    );
    exports.TestRunHookStarted = TestRunHookStarted2;
    var TestRunStarted2 = (
      /** @class */
      function() {
        function TestRunStarted3() {
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestRunStarted3.prototype, "timestamp", void 0);
        return TestRunStarted3;
      }()
    );
    exports.TestRunStarted = TestRunStarted2;
    var TestStepFinished2 = (
      /** @class */
      function() {
        function TestStepFinished3() {
          this.testCaseStartedId = "";
          this.testStepId = "";
          this.testStepResult = new TestStepResult2();
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return TestStepResult2;
          })
        ], TestStepFinished3.prototype, "testStepResult", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestStepFinished3.prototype, "timestamp", void 0);
        return TestStepFinished3;
      }()
    );
    exports.TestStepFinished = TestStepFinished2;
    var TestStepResult2 = (
      /** @class */
      function() {
        function TestStepResult3() {
          this.duration = new Duration2();
          this.status = TestStepResultStatus2.UNKNOWN;
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Duration2;
          })
        ], TestStepResult3.prototype, "duration", void 0);
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Exception2;
          })
        ], TestStepResult3.prototype, "exception", void 0);
        return TestStepResult3;
      }()
    );
    exports.TestStepResult = TestStepResult2;
    var TestStepStarted2 = (
      /** @class */
      function() {
        function TestStepStarted3() {
          this.testCaseStartedId = "";
          this.testStepId = "";
          this.timestamp = new Timestamp2();
        }
        __decorate2([
          (0, class_transformer_1.Type)(function() {
            return Timestamp2;
          })
        ], TestStepStarted3.prototype, "timestamp", void 0);
        return TestStepStarted3;
      }()
    );
    exports.TestStepStarted = TestStepStarted2;
    var Timestamp2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function Timestamp3() {
          this.seconds = 0;
          this.nanos = 0;
        }
        return Timestamp3;
      }()
    );
    exports.Timestamp = Timestamp2;
    var UndefinedParameterType2 = (
      /** @class */
      /* @__PURE__ */ function() {
        function UndefinedParameterType3() {
          this.expression = "";
          this.name = "";
        }
        return UndefinedParameterType3;
      }()
    );
    exports.UndefinedParameterType = UndefinedParameterType2;
    var AttachmentContentEncoding2;
    (function(AttachmentContentEncoding3) {
      AttachmentContentEncoding3["IDENTITY"] = "IDENTITY";
      AttachmentContentEncoding3["BASE64"] = "BASE64";
    })(AttachmentContentEncoding2 || (exports.AttachmentContentEncoding = AttachmentContentEncoding2 = {}));
    var HookType2;
    (function(HookType3) {
      HookType3["BEFORE_TEST_RUN"] = "BEFORE_TEST_RUN";
      HookType3["AFTER_TEST_RUN"] = "AFTER_TEST_RUN";
      HookType3["BEFORE_TEST_CASE"] = "BEFORE_TEST_CASE";
      HookType3["AFTER_TEST_CASE"] = "AFTER_TEST_CASE";
      HookType3["BEFORE_TEST_STEP"] = "BEFORE_TEST_STEP";
      HookType3["AFTER_TEST_STEP"] = "AFTER_TEST_STEP";
    })(HookType2 || (exports.HookType = HookType2 = {}));
    var PickleStepType2;
    (function(PickleStepType3) {
      PickleStepType3["UNKNOWN"] = "Unknown";
      PickleStepType3["CONTEXT"] = "Context";
      PickleStepType3["ACTION"] = "Action";
      PickleStepType3["OUTCOME"] = "Outcome";
    })(PickleStepType2 || (exports.PickleStepType = PickleStepType2 = {}));
    var SourceMediaType2;
    (function(SourceMediaType3) {
      SourceMediaType3["TEXT_X_CUCUMBER_GHERKIN_PLAIN"] = "text/x.cucumber.gherkin+plain";
      SourceMediaType3["TEXT_X_CUCUMBER_GHERKIN_MARKDOWN"] = "text/x.cucumber.gherkin+markdown";
    })(SourceMediaType2 || (exports.SourceMediaType = SourceMediaType2 = {}));
    var StepDefinitionPatternType2;
    (function(StepDefinitionPatternType3) {
      StepDefinitionPatternType3["CUCUMBER_EXPRESSION"] = "CUCUMBER_EXPRESSION";
      StepDefinitionPatternType3["REGULAR_EXPRESSION"] = "REGULAR_EXPRESSION";
    })(StepDefinitionPatternType2 || (exports.StepDefinitionPatternType = StepDefinitionPatternType2 = {}));
    var StepKeywordType2;
    (function(StepKeywordType3) {
      StepKeywordType3["UNKNOWN"] = "Unknown";
      StepKeywordType3["CONTEXT"] = "Context";
      StepKeywordType3["ACTION"] = "Action";
      StepKeywordType3["OUTCOME"] = "Outcome";
      StepKeywordType3["CONJUNCTION"] = "Conjunction";
    })(StepKeywordType2 || (exports.StepKeywordType = StepKeywordType2 = {}));
    var TestStepResultStatus2;
    (function(TestStepResultStatus3) {
      TestStepResultStatus3["UNKNOWN"] = "UNKNOWN";
      TestStepResultStatus3["PASSED"] = "PASSED";
      TestStepResultStatus3["SKIPPED"] = "SKIPPED";
      TestStepResultStatus3["PENDING"] = "PENDING";
      TestStepResultStatus3["UNDEFINED"] = "UNDEFINED";
      TestStepResultStatus3["AMBIGUOUS"] = "AMBIGUOUS";
      TestStepResultStatus3["FAILED"] = "FAILED";
    })(TestStepResultStatus2 || (exports.TestStepResultStatus = TestStepResultStatus2 = {}));
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/parseEnvelope.js
var require_parseEnvelope = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/parseEnvelope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseEnvelope = parseEnvelope2;
    var messages_js_1 = require_messages();
    var class_transformer_1 = require_cjs();
    function parseEnvelope2(json) {
      var plain = JSON.parse(json);
      return (0, class_transformer_1.plainToClass)(messages_js_1.Envelope, plain);
    }
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/getWorstTestStepResult.js
var require_getWorstTestStepResult = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/getWorstTestStepResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWorstTestStepResult = getWorstTestStepResult2;
    var messages_js_1 = require_messages();
    var TimeConversion_js_1 = require_TimeConversion();
    function getWorstTestStepResult2(testStepResults) {
      return testStepResults.slice().sort(function(r1, r2) {
        return ordinal(r2.status) - ordinal(r1.status);
      })[0] || {
        status: messages_js_1.TestStepResultStatus.UNKNOWN,
        duration: (0, TimeConversion_js_1.millisecondsToDuration)(0)
      };
    }
    function ordinal(status) {
      return [
        messages_js_1.TestStepResultStatus.UNKNOWN,
        messages_js_1.TestStepResultStatus.PASSED,
        messages_js_1.TestStepResultStatus.SKIPPED,
        messages_js_1.TestStepResultStatus.PENDING,
        messages_js_1.TestStepResultStatus.UNDEFINED,
        messages_js_1.TestStepResultStatus.AMBIGUOUS,
        messages_js_1.TestStepResultStatus.FAILED
      ].indexOf(status);
    }
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/version.js
var require_version = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = void 0;
    exports.version = "31.1.0";
  }
});

// node_modules/@cucumber/messages/dist/cjs/src/index.js
var require_src = __commonJS({
  "node_modules/@cucumber/messages/dist/cjs/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWorstTestStepResult = exports.parseEnvelope = exports.version = exports.IdGenerator = exports.TimeConversion = void 0;
    var TimeConversion = __importStar(require_TimeConversion());
    exports.TimeConversion = TimeConversion;
    var IdGenerator = __importStar(require_IdGenerator());
    exports.IdGenerator = IdGenerator;
    var parseEnvelope_js_1 = require_parseEnvelope();
    Object.defineProperty(exports, "parseEnvelope", { enumerable: true, get: function() {
      return parseEnvelope_js_1.parseEnvelope;
    } });
    var getWorstTestStepResult_js_1 = require_getWorstTestStepResult();
    Object.defineProperty(exports, "getWorstTestStepResult", { enumerable: true, get: function() {
      return getWorstTestStepResult_js_1.getWorstTestStepResult;
    } });
    var version_js_1 = require_version();
    Object.defineProperty(exports, "version", { enumerable: true, get: function() {
      return version_js_1.version;
    } });
    __exportStar(require_messages(), exports);
  }
});

// node_modules/@cucumber/gherkin/dist/src/compareStepKeywords.js
var require_compareStepKeywords = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/compareStepKeywords.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compareStepKeywords = compareStepKeywords;
    function compareStepKeywords(a, b) {
      return b.length - a.length;
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/GherkinClassicTokenMatcher.js
var require_GherkinClassicTokenMatcher = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/GherkinClassicTokenMatcher.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var gherkin_languages_json_1 = __importDefault(require_gherkin_languages());
    var Errors_1 = require_Errors();
    var messages = __importStar(require_src());
    var Parser_1 = require_Parser();
    var countSymbols_1 = __importDefault(require_countSymbols());
    var compareStepKeywords_1 = require_compareStepKeywords();
    var DIALECT_DICT = gherkin_languages_json_1.default;
    var LANGUAGE_PATTERN2 = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/;
    function addKeywordTypeMappings(h, keywords, keywordType) {
      for (const k of keywords) {
        if (!(k in h)) {
          h[k] = [];
        }
        h[k].push(keywordType);
      }
    }
    var GherkinClassicTokenMatcher2 = class {
      constructor(defaultDialectName = "en") {
        this.defaultDialectName = defaultDialectName;
        this.reset();
      }
      changeDialect(newDialectName, location) {
        const newDialect = DIALECT_DICT[newDialectName];
        if (!newDialect) {
          throw Errors_1.NoSuchLanguageException.create(newDialectName, location);
        }
        this.dialectName = newDialectName;
        this.dialect = newDialect;
        this.initializeKeywordTypes();
        this.initializeSortedStepKeywords();
      }
      reset() {
        if (this.dialectName !== this.defaultDialectName) {
          this.changeDialect(this.defaultDialectName);
        }
        this.activeDocStringSeparator = null;
        this.indentToRemove = 0;
      }
      initializeKeywordTypes() {
        this.keywordTypesMap = {};
        addKeywordTypeMappings(this.keywordTypesMap, this.dialect.given, messages.StepKeywordType.CONTEXT);
        addKeywordTypeMappings(this.keywordTypesMap, this.dialect.when, messages.StepKeywordType.ACTION);
        addKeywordTypeMappings(this.keywordTypesMap, this.dialect.then, messages.StepKeywordType.OUTCOME);
        addKeywordTypeMappings(this.keywordTypesMap, [].concat(this.dialect.and).concat(this.dialect.but), messages.StepKeywordType.CONJUNCTION);
      }
      initializeSortedStepKeywords() {
        this.sortedStepKeywords = [].concat(this.dialect.given).concat(this.dialect.when).concat(this.dialect.then).concat(this.dialect.and).concat(this.dialect.but).sort(compareStepKeywords_1.compareStepKeywords);
      }
      match_TagLine(token) {
        if (token.line.startsWith("@")) {
          this.setTokenMatched(token, Parser_1.TokenType.TagLine, null, null, null, null, this.getTags(token.line));
          return true;
        }
        return false;
      }
      match_FeatureLine(token) {
        return this.matchTitleLine(token, Parser_1.TokenType.FeatureLine, this.dialect.feature);
      }
      match_ScenarioLine(token) {
        return this.matchTitleLine(token, Parser_1.TokenType.ScenarioLine, this.dialect.scenario) || this.matchTitleLine(token, Parser_1.TokenType.ScenarioLine, this.dialect.scenarioOutline);
      }
      match_BackgroundLine(token) {
        return this.matchTitleLine(token, Parser_1.TokenType.BackgroundLine, this.dialect.background);
      }
      match_ExamplesLine(token) {
        return this.matchTitleLine(token, Parser_1.TokenType.ExamplesLine, this.dialect.examples);
      }
      match_RuleLine(token) {
        return this.matchTitleLine(token, Parser_1.TokenType.RuleLine, this.dialect.rule);
      }
      match_TableRow(token) {
        if (token.line.startsWith("|")) {
          this.setTokenMatched(token, Parser_1.TokenType.TableRow, null, null, null, null, token.line.getTableCells());
          return true;
        }
        return false;
      }
      match_Empty(token) {
        if (token.line.isEmpty) {
          this.setTokenMatched(token, Parser_1.TokenType.Empty, null, null, 0);
          return true;
        }
        return false;
      }
      match_Comment(token) {
        if (token.line.startsWith("#")) {
          const text = token.line.getLineText(0);
          this.setTokenMatched(token, Parser_1.TokenType.Comment, text, null, 0);
          return true;
        }
        return false;
      }
      match_Language(token) {
        const match = token.line.trimmedLineText.match(LANGUAGE_PATTERN2);
        if (match) {
          const newDialectName = match[1];
          this.setTokenMatched(token, Parser_1.TokenType.Language, newDialectName);
          this.changeDialect(newDialectName, token.location);
          return true;
        }
        return false;
      }
      match_DocStringSeparator(token) {
        return this.activeDocStringSeparator == null ? (
          // open
          this._match_DocStringSeparator(token, '"""', true) || this._match_DocStringSeparator(token, "```", true)
        ) : (
          // close
          this._match_DocStringSeparator(token, this.activeDocStringSeparator, false)
        );
      }
      _match_DocStringSeparator(token, separator, isOpen) {
        if (token.line.startsWith(separator)) {
          let mediaType = null;
          if (isOpen) {
            mediaType = token.line.getRestTrimmed(separator.length);
            this.activeDocStringSeparator = separator;
            this.indentToRemove = token.line.indent;
          } else {
            this.activeDocStringSeparator = null;
            this.indentToRemove = 0;
          }
          this.setTokenMatched(token, Parser_1.TokenType.DocStringSeparator, mediaType, separator);
          return true;
        }
        return false;
      }
      match_EOF(token) {
        if (token.isEof) {
          this.setTokenMatched(token, Parser_1.TokenType.EOF);
          return true;
        }
        return false;
      }
      match_StepLine(token) {
        for (const keyword of this.sortedStepKeywords) {
          if (token.line.startsWith(keyword)) {
            const title = token.line.getRestTrimmed(keyword.length);
            const keywordTypes = this.keywordTypesMap[keyword];
            let keywordType = keywordTypes[0];
            if (keywordTypes.length > 1) {
              keywordType = messages.StepKeywordType.UNKNOWN;
            }
            this.setTokenMatched(token, Parser_1.TokenType.StepLine, title, keyword, null, keywordType);
            return true;
          }
        }
        return false;
      }
      match_Other(token) {
        const text = token.line.getLineText(this.indentToRemove);
        this.setTokenMatched(token, Parser_1.TokenType.Other, this.unescapeDocString(text), null, 0);
        return true;
      }
      getTags(line) {
        const uncommentedLine = line.trimmedLineText.split(/\s#/g, 2)[0];
        let column = line.indent + 1;
        const items = uncommentedLine.split("@");
        const tags = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i].trimRight();
          if (item.length == 0) {
            continue;
          }
          if (!item.match(/^\S+$/)) {
            throw Errors_1.ParserException.create("A tag may not contain whitespace", line.lineNumber, column);
          }
          const span = { column, text: "@" + item };
          tags.push(span);
          column += (0, countSymbols_1.default)(items[i]) + 1;
        }
        return tags;
      }
      matchTitleLine(token, tokenType, keywords) {
        for (const keyword of keywords) {
          if (token.line.startsWithTitleKeyword(keyword)) {
            const title = token.line.getRestTrimmed(keyword.length + ":".length);
            this.setTokenMatched(token, tokenType, title, keyword);
            return true;
          }
        }
        return false;
      }
      setTokenMatched(token, matchedType, text, keyword, indent, keywordType, items) {
        token.matchedType = matchedType;
        token.matchedText = text;
        token.matchedKeyword = keyword;
        token.matchedKeywordType = keywordType;
        token.matchedIndent = typeof indent === "number" ? indent : token.line == null ? 0 : token.line.indent;
        token.matchedItems = items || [];
        token.location.column = token.matchedIndent + 1;
        token.matchedGherkinDialect = this.dialectName;
      }
      unescapeDocString(text) {
        if (this.activeDocStringSeparator === '"""') {
          return text.replace('\\"\\"\\"', '"""');
        }
        if (this.activeDocStringSeparator === "```") {
          return text.replace("\\`\\`\\`", "```");
        }
        return text;
      }
    };
    exports.default = GherkinClassicTokenMatcher2;
  }
});

// node_modules/@cucumber/gherkin/dist/src/pickles/compile.js
var require_compile = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/pickles/compile.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = compile;
    var messages = __importStar(require_src());
    var pickleStepTypeFromKeyword = {
      [messages.StepKeywordType.UNKNOWN]: messages.PickleStepType.UNKNOWN,
      [messages.StepKeywordType.CONTEXT]: messages.PickleStepType.CONTEXT,
      [messages.StepKeywordType.ACTION]: messages.PickleStepType.ACTION,
      [messages.StepKeywordType.OUTCOME]: messages.PickleStepType.OUTCOME,
      [messages.StepKeywordType.CONJUNCTION]: null
    };
    function compile(gherkinDocument, uri, newId) {
      const pickles = [];
      if (gherkinDocument.feature == null) {
        return pickles;
      }
      const feature = gherkinDocument.feature;
      const language = feature.language;
      const featureTags = feature.tags;
      let featureBackgroundSteps = [];
      feature.children.forEach((stepsContainer) => {
        if (stepsContainer.background) {
          featureBackgroundSteps = [].concat(stepsContainer.background.steps);
        } else if (stepsContainer.rule) {
          compileRule(featureTags, featureBackgroundSteps, stepsContainer.rule, language, pickles, uri, newId);
        } else if (stepsContainer.scenario.examples.length === 0) {
          compileScenario(featureTags, featureBackgroundSteps, stepsContainer.scenario, language, pickles, uri, newId);
        } else {
          compileScenarioOutline(featureTags, featureBackgroundSteps, stepsContainer.scenario, language, pickles, uri, newId);
        }
      });
      return pickles;
    }
    function compileRule(featureTags, featureBackgroundSteps, rule, language, pickles, uri, newId) {
      let ruleBackgroundSteps = [].concat(featureBackgroundSteps);
      const tags = [].concat(featureTags).concat(rule.tags);
      rule.children.forEach((stepsContainer) => {
        if (stepsContainer.background) {
          ruleBackgroundSteps = ruleBackgroundSteps.concat(stepsContainer.background.steps);
        } else if (stepsContainer.scenario.examples.length === 0) {
          compileScenario(tags, ruleBackgroundSteps, stepsContainer.scenario, language, pickles, uri, newId);
        } else {
          compileScenarioOutline(tags, ruleBackgroundSteps, stepsContainer.scenario, language, pickles, uri, newId);
        }
      });
    }
    function compileScenario(inheritedTags, backgroundSteps, scenario, language, pickles, uri, newId) {
      let lastKeywordType = messages.StepKeywordType.UNKNOWN;
      const steps = [];
      if (scenario.steps.length !== 0) {
        backgroundSteps.forEach((step) => {
          lastKeywordType = step.keywordType === messages.StepKeywordType.CONJUNCTION ? lastKeywordType : step.keywordType;
          steps.push(pickleStep(step, [], null, newId, lastKeywordType));
        });
      }
      const tags = [].concat(inheritedTags).concat(scenario.tags);
      scenario.steps.forEach((step) => {
        lastKeywordType = step.keywordType === messages.StepKeywordType.CONJUNCTION ? lastKeywordType : step.keywordType;
        steps.push(pickleStep(step, [], null, newId, lastKeywordType));
      });
      const pickle = {
        id: newId(),
        uri,
        location: scenario.location,
        astNodeIds: [scenario.id],
        tags: pickleTags(tags),
        name: scenario.name,
        language,
        steps
      };
      pickles.push(pickle);
    }
    function compileScenarioOutline(inheritedTags, backgroundSteps, scenario, language, pickles, uri, newId) {
      scenario.examples.filter((e) => e.tableHeader).forEach((examples) => {
        const variableCells = examples.tableHeader.cells;
        examples.tableBody.forEach((valuesRow) => {
          let lastKeywordType = messages.StepKeywordType.UNKNOWN;
          const steps = [];
          if (scenario.steps.length !== 0) {
            backgroundSteps.forEach((step) => {
              lastKeywordType = step.keywordType === messages.StepKeywordType.CONJUNCTION ? lastKeywordType : step.keywordType;
              steps.push(pickleStep(step, [], null, newId, lastKeywordType));
            });
          }
          scenario.steps.forEach((scenarioOutlineStep) => {
            lastKeywordType = scenarioOutlineStep.keywordType === messages.StepKeywordType.CONJUNCTION ? lastKeywordType : scenarioOutlineStep.keywordType;
            const step = pickleStep(scenarioOutlineStep, variableCells, valuesRow, newId, lastKeywordType);
            steps.push(step);
          });
          const id = newId();
          const tags = pickleTags([].concat(inheritedTags).concat(scenario.tags).concat(examples.tags));
          pickles.push({
            id,
            uri,
            location: valuesRow.location,
            astNodeIds: [scenario.id, valuesRow.id],
            name: interpolate(scenario.name, variableCells, valuesRow.cells),
            language,
            steps,
            tags
          });
        });
      });
    }
    function createPickleArguments(step, variableCells, valueCells) {
      if (step.dataTable) {
        const argument = step.dataTable;
        const table = {
          rows: argument.rows.map((row) => {
            return {
              cells: row.cells.map((cell) => {
                return {
                  value: interpolate(cell.value, variableCells, valueCells)
                };
              })
            };
          })
        };
        return { dataTable: table };
      } else if (step.docString) {
        const argument = step.docString;
        const docString = {
          content: interpolate(argument.content, variableCells, valueCells)
        };
        if (argument.mediaType) {
          docString.mediaType = interpolate(argument.mediaType, variableCells, valueCells);
        }
        return { docString };
      }
    }
    function interpolate(name, variableCells, valueCells) {
      variableCells.forEach((variableCell, n) => {
        const valueCell = valueCells[n];
        const valuePattern = "<" + variableCell.value + ">";
        const escapedPattern = valuePattern.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
        const regexp = new RegExp(escapedPattern, "g");
        const replacement = valueCell.value.replace(new RegExp("\\$", "g"), "$$$$");
        name = name.replace(regexp, replacement);
      });
      return name;
    }
    function pickleStep(step, variableCells, valuesRow, newId, keywordType) {
      const astNodeIds = [step.id];
      if (valuesRow) {
        astNodeIds.push(valuesRow.id);
      }
      const valueCells = valuesRow ? valuesRow.cells : [];
      return {
        id: newId(),
        text: interpolate(step.text, variableCells, valueCells),
        type: pickleStepTypeFromKeyword[keywordType],
        argument: createPickleArguments(step, variableCells, valueCells),
        astNodeIds
      };
    }
    function pickleTags(tags) {
      return tags.map(pickleTag);
    }
    function pickleTag(tag) {
      return {
        name: tag.name,
        astNodeId: tag.id
      };
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/AstNode.js
var require_AstNode = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/AstNode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AstNode = class {
      constructor(ruleType) {
        this.ruleType = ruleType;
        this.subItems = /* @__PURE__ */ new Map();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      add(type, obj) {
        let items = this.subItems.get(type);
        if (items === void 0) {
          items = [];
          this.subItems.set(type, items);
        }
        items.push(obj);
      }
      getSingle(ruleType) {
        return (this.subItems.get(ruleType) || [])[0];
      }
      getItems(ruleType) {
        return this.subItems.get(ruleType) || [];
      }
      getToken(tokenType) {
        return (this.subItems.get(tokenType) || [])[0];
      }
      getTokens(tokenType) {
        return this.subItems.get(tokenType) || [];
      }
    };
    exports.default = AstNode;
  }
});

// node_modules/@cucumber/gherkin/dist/src/AstBuilder.js
var require_AstBuilder = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/AstBuilder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AstNode_1 = __importDefault(require_AstNode());
    var Parser_1 = require_Parser();
    var Errors_1 = require_Errors();
    var AstBuilder2 = class {
      constructor(newId) {
        this.newId = newId;
        if (!newId) {
          throw new Error("No newId");
        }
        this.reset();
      }
      reset() {
        this.stack = [new AstNode_1.default(Parser_1.RuleType.None)];
        this.comments = [];
      }
      startRule(ruleType) {
        this.stack.push(new AstNode_1.default(ruleType));
      }
      endRule() {
        const node = this.stack.pop();
        const transformedNode = this.transformNode(node);
        this.currentNode().add(node.ruleType, transformedNode);
      }
      build(token) {
        if (token.matchedType === Parser_1.TokenType.Comment) {
          this.comments.push({
            location: this.getLocation(token),
            text: token.matchedText
          });
        } else {
          this.currentNode().add(token.matchedType, token);
        }
      }
      getResult() {
        return this.currentNode().getSingle(Parser_1.RuleType.GherkinDocument);
      }
      currentNode() {
        return this.stack[this.stack.length - 1];
      }
      getLocation(token, column) {
        return !column ? token.location : { line: token.location.line, column };
      }
      getTags(node) {
        const tags = [];
        const tagsNode = node.getSingle(Parser_1.RuleType.Tags);
        if (!tagsNode) {
          return tags;
        }
        const tokens = tagsNode.getTokens(Parser_1.TokenType.TagLine);
        for (const token of tokens) {
          for (const tagItem of token.matchedItems) {
            tags.push({
              location: this.getLocation(token, tagItem.column),
              name: tagItem.text,
              id: this.newId()
            });
          }
        }
        return tags;
      }
      getCells(tableRowToken) {
        return tableRowToken.matchedItems.map((cellItem) => ({
          location: this.getLocation(tableRowToken, cellItem.column),
          value: cellItem.text
        }));
      }
      getDescription(node) {
        return node.getSingle(Parser_1.RuleType.Description) || "";
      }
      getSteps(node) {
        return node.getItems(Parser_1.RuleType.Step);
      }
      getTableRows(node) {
        const rows = node.getTokens(Parser_1.TokenType.TableRow).map((token) => ({
          id: this.newId(),
          location: this.getLocation(token),
          cells: this.getCells(token)
        }));
        this.ensureCellCount(rows);
        return rows.length === 0 ? [] : rows;
      }
      ensureCellCount(rows) {
        if (rows.length === 0) {
          return;
        }
        const cellCount = rows[0].cells.length;
        rows.forEach((row) => {
          if (row.cells.length !== cellCount) {
            throw Errors_1.AstBuilderException.create("inconsistent cell count within the table", row.location);
          }
        });
      }
      transformNode(node) {
        switch (node.ruleType) {
          case Parser_1.RuleType.Step: {
            const stepLine = node.getToken(Parser_1.TokenType.StepLine);
            const dataTable = node.getSingle(Parser_1.RuleType.DataTable);
            const docString = node.getSingle(Parser_1.RuleType.DocString);
            const location = this.getLocation(stepLine);
            const step = {
              id: this.newId(),
              location,
              keyword: stepLine.matchedKeyword,
              keywordType: stepLine.matchedKeywordType,
              text: stepLine.matchedText,
              dataTable,
              docString
            };
            return step;
          }
          case Parser_1.RuleType.DocString: {
            const separatorToken = node.getTokens(Parser_1.TokenType.DocStringSeparator)[0];
            const mediaType = separatorToken.matchedText.length > 0 ? separatorToken.matchedText : void 0;
            const lineTokens = node.getTokens(Parser_1.TokenType.Other);
            const content = lineTokens.map((t) => t.matchedText).join("\n");
            const result = {
              location: this.getLocation(separatorToken),
              content,
              delimiter: separatorToken.matchedKeyword
            };
            if (mediaType) {
              result.mediaType = mediaType;
            }
            return result;
          }
          case Parser_1.RuleType.DataTable: {
            const rows = this.getTableRows(node);
            const dataTable = {
              location: rows[0].location,
              rows
            };
            return dataTable;
          }
          case Parser_1.RuleType.Background: {
            const backgroundLine = node.getToken(Parser_1.TokenType.BackgroundLine);
            const description = this.getDescription(node);
            const steps = this.getSteps(node);
            const background = {
              id: this.newId(),
              location: this.getLocation(backgroundLine),
              keyword: backgroundLine.matchedKeyword,
              name: backgroundLine.matchedText,
              description,
              steps
            };
            return background;
          }
          case Parser_1.RuleType.ScenarioDefinition: {
            const tags = this.getTags(node);
            const scenarioNode = node.getSingle(Parser_1.RuleType.Scenario);
            const scenarioLine = scenarioNode.getToken(Parser_1.TokenType.ScenarioLine);
            const description = this.getDescription(scenarioNode);
            const steps = this.getSteps(scenarioNode);
            const examples = scenarioNode.getItems(Parser_1.RuleType.ExamplesDefinition);
            const scenario = {
              id: this.newId(),
              tags,
              location: this.getLocation(scenarioLine),
              keyword: scenarioLine.matchedKeyword,
              name: scenarioLine.matchedText,
              description,
              steps,
              examples
            };
            return scenario;
          }
          case Parser_1.RuleType.ExamplesDefinition: {
            const tags = this.getTags(node);
            const examplesNode = node.getSingle(Parser_1.RuleType.Examples);
            const examplesLine = examplesNode.getToken(Parser_1.TokenType.ExamplesLine);
            const description = this.getDescription(examplesNode);
            const examplesTable = examplesNode.getSingle(Parser_1.RuleType.ExamplesTable);
            const examples = {
              id: this.newId(),
              tags,
              location: this.getLocation(examplesLine),
              keyword: examplesLine.matchedKeyword,
              name: examplesLine.matchedText,
              description,
              tableHeader: examplesTable ? examplesTable[0] : void 0,
              tableBody: examplesTable ? examplesTable.slice(1) : []
            };
            return examples;
          }
          case Parser_1.RuleType.ExamplesTable: {
            return this.getTableRows(node);
          }
          case Parser_1.RuleType.Description: {
            let lineTokens = node.getTokens(Parser_1.TokenType.Other);
            let end = lineTokens.length;
            while (end > 0 && lineTokens[end - 1].line.trimmedLineText === "") {
              end--;
            }
            lineTokens = lineTokens.slice(0, end);
            return lineTokens.map((token) => token.matchedText).join("\n");
          }
          case Parser_1.RuleType.Feature: {
            const header = node.getSingle(Parser_1.RuleType.FeatureHeader);
            if (!header) {
              return null;
            }
            const tags = this.getTags(header);
            const featureLine = header.getToken(Parser_1.TokenType.FeatureLine);
            if (!featureLine) {
              return null;
            }
            const children = [];
            const background = node.getSingle(Parser_1.RuleType.Background);
            if (background) {
              children.push({
                background
              });
            }
            for (const scenario of node.getItems(Parser_1.RuleType.ScenarioDefinition)) {
              children.push({
                scenario
              });
            }
            for (const rule of node.getItems(Parser_1.RuleType.Rule)) {
              children.push({
                rule
              });
            }
            const description = this.getDescription(header);
            const language = featureLine.matchedGherkinDialect;
            const feature = {
              tags,
              location: this.getLocation(featureLine),
              language,
              keyword: featureLine.matchedKeyword,
              name: featureLine.matchedText,
              description,
              children
            };
            return feature;
          }
          case Parser_1.RuleType.Rule: {
            const header = node.getSingle(Parser_1.RuleType.RuleHeader);
            if (!header) {
              return null;
            }
            const ruleLine = header.getToken(Parser_1.TokenType.RuleLine);
            if (!ruleLine) {
              return null;
            }
            const tags = this.getTags(header);
            const children = [];
            const background = node.getSingle(Parser_1.RuleType.Background);
            if (background) {
              children.push({
                background
              });
            }
            for (const scenario of node.getItems(Parser_1.RuleType.ScenarioDefinition)) {
              children.push({
                scenario
              });
            }
            const description = this.getDescription(header);
            const rule = {
              id: this.newId(),
              location: this.getLocation(ruleLine),
              keyword: ruleLine.matchedKeyword,
              name: ruleLine.matchedText,
              description,
              children,
              tags
            };
            return rule;
          }
          case Parser_1.RuleType.GherkinDocument: {
            const feature = node.getSingle(Parser_1.RuleType.Feature);
            const gherkinDocument = {
              feature,
              comments: this.comments
            };
            return gherkinDocument;
          }
          default:
            return node;
        }
      }
    };
    exports.default = AstBuilder2;
  }
});

// node_modules/@cucumber/gherkin/dist/src/makeSourceEnvelope.js
var require_makeSourceEnvelope = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/makeSourceEnvelope.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = makeSourceEnvelope;
    var messages = __importStar(require_src());
    function makeSourceEnvelope(data, uri) {
      let mediaType;
      if (uri.endsWith(".feature")) {
        mediaType = messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
      } else if (uri.endsWith(".md")) {
        mediaType = messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_MARKDOWN;
      }
      if (!mediaType)
        throw new Error(`The uri (${uri}) must end with .feature or .md`);
      return {
        source: {
          data,
          uri,
          mediaType
        }
      };
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/GherkinInMarkdownTokenMatcher.js
var require_GherkinInMarkdownTokenMatcher = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/GherkinInMarkdownTokenMatcher.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Parser_1 = require_Parser();
    var gherkin_languages_json_1 = __importDefault(require_gherkin_languages());
    var messages = __importStar(require_src());
    var Errors_1 = require_Errors();
    var compareStepKeywords_1 = require_compareStepKeywords();
    var DIALECT_DICT = gherkin_languages_json_1.default;
    var DEFAULT_DOC_STRING_SEPARATOR = /^(```[`]*)(.*)/;
    function addKeywordTypeMappings(h, keywords, keywordType) {
      for (const k of keywords) {
        if (!(k in h)) {
          h[k] = [];
        }
        h[k].push(keywordType);
      }
    }
    var GherkinInMarkdownTokenMatcher = class {
      constructor(defaultDialectName = "en") {
        this.defaultDialectName = defaultDialectName;
        this.dialect = DIALECT_DICT[defaultDialectName];
        this.nonStarStepKeywords = [].concat(this.dialect.given).concat(this.dialect.when).concat(this.dialect.then).concat(this.dialect.and).concat(this.dialect.but).filter((value, index, self2) => value !== "* " && self2.indexOf(value) === index).sort(compareStepKeywords_1.compareStepKeywords);
        this.initializeKeywordTypes();
        this.stepRegexp = new RegExp(`${KeywordPrefix.BULLET}(${this.nonStarStepKeywords.map(escapeRegExp).join("|")})`);
        const headerKeywords = [].concat(this.dialect.feature).concat(this.dialect.background).concat(this.dialect.rule).concat(this.dialect.scenarioOutline).concat(this.dialect.scenario).concat(this.dialect.examples).filter((value, index, self2) => self2.indexOf(value) === index);
        this.headerRegexp = new RegExp(`${KeywordPrefix.HEADER}(${headerKeywords.map(escapeRegExp).join("|")})`);
        this.reset();
      }
      changeDialect(newDialectName, location) {
        const newDialect = DIALECT_DICT[newDialectName];
        if (!newDialect) {
          throw Errors_1.NoSuchLanguageException.create(newDialectName, location);
        }
        this.dialectName = newDialectName;
        this.dialect = newDialect;
        this.initializeKeywordTypes();
      }
      initializeKeywordTypes() {
        this.keywordTypesMap = {};
        addKeywordTypeMappings(this.keywordTypesMap, this.dialect.given, messages.StepKeywordType.CONTEXT);
        addKeywordTypeMappings(this.keywordTypesMap, this.dialect.when, messages.StepKeywordType.ACTION);
        addKeywordTypeMappings(this.keywordTypesMap, this.dialect.then, messages.StepKeywordType.OUTCOME);
        addKeywordTypeMappings(this.keywordTypesMap, [].concat(this.dialect.and).concat(this.dialect.but), messages.StepKeywordType.CONJUNCTION);
      }
      // We've made a deliberate choice not to support `# language: [ISO 639-1]` headers or similar
      // in Markdown. Users should specify a language globally. This can be done in
      // cucumber-js using the --language [ISO 639-1] option.
      match_Language(token) {
        if (!token)
          throw new Error("no token");
        return false;
      }
      match_Empty(token) {
        let result = false;
        if (token.line.isEmpty) {
          result = true;
        }
        if (!this.match_TagLine(token) && !this.match_FeatureLine(token) && !this.match_ScenarioLine(token) && !this.match_BackgroundLine(token) && !this.match_ExamplesLine(token) && !this.match_RuleLine(token) && !this.match_TableRow(token) && !this.match_Comment(token) && !this.match_Language(token) && !this.match_DocStringSeparator(token) && !this.match_EOF(token) && !this.match_StepLine(token)) {
          result = true;
        }
        if (result) {
          token.matchedType = Parser_1.TokenType.Empty;
        }
        return this.setTokenMatched(token, null, result);
      }
      match_Other(token) {
        const text = token.line.getLineText(this.indentToRemove);
        token.matchedType = Parser_1.TokenType.Other;
        token.matchedText = text;
        token.matchedIndent = 0;
        return this.setTokenMatched(token, null, true);
      }
      match_Comment(token) {
        let result = false;
        if (token.line.startsWith("|")) {
          const tableCells = token.line.getTableCells();
          if (this.isGfmTableSeparator(tableCells))
            result = true;
        }
        return this.setTokenMatched(token, null, result);
      }
      match_DocStringSeparator(token) {
        const match = token.line.trimmedLineText.match(this.activeDocStringSeparator);
        const [, newSeparator, mediaType] = match || [];
        let result = false;
        if (newSeparator) {
          if (this.activeDocStringSeparator === DEFAULT_DOC_STRING_SEPARATOR) {
            this.activeDocStringSeparator = new RegExp(`^(${newSeparator})$`);
            this.indentToRemove = token.line.indent;
          } else {
            this.activeDocStringSeparator = DEFAULT_DOC_STRING_SEPARATOR;
          }
          token.matchedKeyword = newSeparator;
          token.matchedType = Parser_1.TokenType.DocStringSeparator;
          token.matchedText = mediaType || "";
          result = true;
        }
        return this.setTokenMatched(token, null, result);
      }
      match_EOF(token) {
        let result = false;
        if (token.isEof) {
          token.matchedType = Parser_1.TokenType.EOF;
          result = true;
        }
        return this.setTokenMatched(token, null, result);
      }
      match_FeatureLine(token) {
        if (this.matchedFeatureLine) {
          return this.setTokenMatched(token, null, false);
        }
        let result = this.matchTitleLine(KeywordPrefix.HEADER, this.dialect.feature, ":", token, Parser_1.TokenType.FeatureLine);
        if (!result) {
          token.matchedType = Parser_1.TokenType.FeatureLine;
          token.matchedText = token.line.trimmedLineText;
          result = this.setTokenMatched(token, null, true);
        }
        this.matchedFeatureLine = result;
        return result;
      }
      match_BackgroundLine(token) {
        return this.matchTitleLine(KeywordPrefix.HEADER, this.dialect.background, ":", token, Parser_1.TokenType.BackgroundLine);
      }
      match_RuleLine(token) {
        return this.matchTitleLine(KeywordPrefix.HEADER, this.dialect.rule, ":", token, Parser_1.TokenType.RuleLine);
      }
      match_ScenarioLine(token) {
        return this.matchTitleLine(KeywordPrefix.HEADER, this.dialect.scenario, ":", token, Parser_1.TokenType.ScenarioLine) || this.matchTitleLine(KeywordPrefix.HEADER, this.dialect.scenarioOutline, ":", token, Parser_1.TokenType.ScenarioLine);
      }
      match_ExamplesLine(token) {
        return this.matchTitleLine(KeywordPrefix.HEADER, this.dialect.examples, ":", token, Parser_1.TokenType.ExamplesLine);
      }
      match_StepLine(token) {
        return this.matchTitleLine(KeywordPrefix.BULLET, this.nonStarStepKeywords, "", token, Parser_1.TokenType.StepLine);
      }
      matchTitleLine(prefix, keywords, keywordSuffix, token, matchedType) {
        const regexp = new RegExp(`${prefix}(${keywords.map(escapeRegExp).join("|")})${keywordSuffix}(.*)`);
        const match = token.line.match(regexp);
        let indent = token.line.indent;
        let result = false;
        if (match) {
          token.matchedType = matchedType;
          token.matchedKeyword = match[2];
          if (match[2] in this.keywordTypesMap) {
            if (this.keywordTypesMap[match[2]].length > 1) {
              token.matchedKeywordType = messages.StepKeywordType.UNKNOWN;
            } else {
              token.matchedKeywordType = this.keywordTypesMap[match[2]][0];
            }
          }
          token.matchedText = match[3].trim();
          indent += match[1].length;
          result = true;
        }
        return this.setTokenMatched(token, indent, result);
      }
      setTokenMatched(token, indent, matched) {
        token.matchedGherkinDialect = this.dialectName;
        token.matchedIndent = indent !== null ? indent : token.line == null ? 0 : token.line.indent;
        token.location.column = token.matchedIndent + 1;
        return matched;
      }
      match_TableRow(token) {
        if (token.line.lineText.match(/^\s\s\s?\s?\s?\|/)) {
          const tableCells = token.line.getTableCells();
          if (this.isGfmTableSeparator(tableCells))
            return false;
          token.matchedKeyword = "|";
          token.matchedType = Parser_1.TokenType.TableRow;
          token.matchedItems = tableCells;
          return true;
        }
        return false;
      }
      isGfmTableSeparator(tableCells) {
        const separatorValues = tableCells.map((item) => item.text).filter((value) => value.match(/^:?-+:?$/));
        return separatorValues.length > 0;
      }
      match_TagLine(token) {
        const tags = [];
        let m;
        const re = /`(@[^`]+)`/g;
        do {
          m = re.exec(token.line.trimmedLineText);
          if (m) {
            tags.push({
              column: token.line.indent + m.index + 2,
              text: m[1]
            });
          }
        } while (m);
        if (tags.length === 0)
          return false;
        token.matchedType = Parser_1.TokenType.TagLine;
        token.matchedItems = tags;
        return true;
      }
      reset() {
        if (this.dialectName !== this.defaultDialectName) {
          this.changeDialect(this.defaultDialectName);
        }
        this.activeDocStringSeparator = DEFAULT_DOC_STRING_SEPARATOR;
      }
    };
    exports.default = GherkinInMarkdownTokenMatcher;
    var KeywordPrefix;
    (function(KeywordPrefix2) {
      KeywordPrefix2["BULLET"] = "^(\\s*[*+-]\\s*)";
      KeywordPrefix2["HEADER"] = "^(#{1,6}\\s)";
    })(KeywordPrefix || (KeywordPrefix = {}));
    function escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/generateMessages.js
var require_generateMessages = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/generateMessages.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = generateMessages;
    var Parser_1 = __importDefault(require_Parser());
    var GherkinClassicTokenMatcher_1 = __importDefault(require_GherkinClassicTokenMatcher());
    var messages = __importStar(require_src());
    var compile_1 = __importDefault(require_compile());
    var AstBuilder_1 = __importDefault(require_AstBuilder());
    var makeSourceEnvelope_1 = __importDefault(require_makeSourceEnvelope());
    var GherkinInMarkdownTokenMatcher_1 = __importDefault(require_GherkinInMarkdownTokenMatcher());
    function generateMessages(data, uri, mediaType, options) {
      let tokenMatcher;
      switch (mediaType) {
        case messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN:
          tokenMatcher = new GherkinClassicTokenMatcher_1.default(options.defaultDialect);
          break;
        case messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_MARKDOWN:
          tokenMatcher = new GherkinInMarkdownTokenMatcher_1.default(options.defaultDialect);
          break;
        default:
          throw new Error(`Unsupported media type: ${mediaType}`);
      }
      const result = [];
      try {
        if (options.includeSource) {
          result.push((0, makeSourceEnvelope_1.default)(data, uri));
        }
        if (!options.includeGherkinDocument && !options.includePickles) {
          return result;
        }
        const parser = new Parser_1.default(new AstBuilder_1.default(options.newId), tokenMatcher);
        parser.stopAtFirstError = false;
        const gherkinDocument = parser.parse(data);
        if (options.includeGherkinDocument) {
          result.push({
            gherkinDocument: { ...gherkinDocument, uri }
          });
        }
        if (options.includePickles) {
          const pickles = (0, compile_1.default)(gherkinDocument, uri, options.newId);
          for (const pickle of pickles) {
            result.push({
              pickle
            });
          }
        }
      } catch (err) {
        const errors = err.errors || [err];
        for (const error of errors) {
          if (!error.location) {
            throw error;
          }
          result.push({
            parseError: {
              source: {
                uri,
                location: {
                  line: error.location.line,
                  column: error.location.column
                }
              },
              message: error.message
            }
          });
        }
      }
      return result;
    }
  }
});

// node_modules/@cucumber/gherkin/dist/src/index.js
var require_src2 = __commonJS({
  "node_modules/@cucumber/gherkin/dist/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2)
            if (Object.prototype.hasOwnProperty.call(o2, k))
              ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++)
            if (k[i] !== "default")
              __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compile = exports.GherkinInMarkdownTokenMatcher = exports.GherkinClassicTokenMatcher = exports.Errors = exports.TokenScanner = exports.AstBuilder = exports.Parser = exports.dialects = exports.makeSourceEnvelope = exports.generateMessages = void 0;
    var generateMessages_1 = __importDefault(require_generateMessages());
    exports.generateMessages = generateMessages_1.default;
    var makeSourceEnvelope_1 = __importDefault(require_makeSourceEnvelope());
    exports.makeSourceEnvelope = makeSourceEnvelope_1.default;
    var Parser_1 = __importDefault(require_Parser());
    exports.Parser = Parser_1.default;
    var AstBuilder_1 = __importDefault(require_AstBuilder());
    exports.AstBuilder = AstBuilder_1.default;
    var TokenScanner_1 = __importDefault(require_TokenScanner());
    exports.TokenScanner = TokenScanner_1.default;
    var Errors = __importStar(require_Errors());
    exports.Errors = Errors;
    var compile_1 = __importDefault(require_compile());
    exports.compile = compile_1.default;
    var gherkin_languages_json_1 = __importDefault(require_gherkin_languages());
    var GherkinClassicTokenMatcher_1 = __importDefault(require_GherkinClassicTokenMatcher());
    exports.GherkinClassicTokenMatcher = GherkinClassicTokenMatcher_1.default;
    var GherkinInMarkdownTokenMatcher_1 = __importDefault(require_GherkinInMarkdownTokenMatcher());
    exports.GherkinInMarkdownTokenMatcher = GherkinInMarkdownTokenMatcher_1.default;
    var dialects = gherkin_languages_json_1.default;
    exports.dialects = dialects;
  }
});

// src/cli.ts
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { globSync } from "glob";

// src/index.ts
var import_gherkin = __toESM(require_src2(), 1);

// node_modules/@cucumber/messages/dist/esm/src/IdGenerator.js
var IdGenerator_exports = {};
__export(IdGenerator_exports, {
  incrementing: () => incrementing,
  uuid: () => uuid
});
function uuid() {
  return () => crypto.randomUUID();
}
function incrementing() {
  let next = 0;
  return () => (next++).toString();
}

// node_modules/@cucumber/messages/dist/esm/src/messages.js
var import_class_transformer = __toESM(require_cjs(), 1);
var import_reflect_metadata = __toESM(require_Reflect(), 1);
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Attachment = class {
  constructor() {
    this.body = "";
    this.contentEncoding = AttachmentContentEncoding.IDENTITY;
    this.mediaType = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Source)
], Attachment.prototype, "source", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], Attachment.prototype, "timestamp", void 0);
var Duration = class {
  constructor() {
    this.seconds = 0;
    this.nanos = 0;
  }
};
var Envelope = class {
};
__decorate([
  (0, import_class_transformer.Type)(() => Attachment)
], Envelope.prototype, "attachment", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => GherkinDocument)
], Envelope.prototype, "gherkinDocument", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Hook)
], Envelope.prototype, "hook", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Meta)
], Envelope.prototype, "meta", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => ParameterType)
], Envelope.prototype, "parameterType", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => ParseError)
], Envelope.prototype, "parseError", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Pickle)
], Envelope.prototype, "pickle", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Suggestion)
], Envelope.prototype, "suggestion", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Source)
], Envelope.prototype, "source", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => StepDefinition)
], Envelope.prototype, "stepDefinition", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestCase)
], Envelope.prototype, "testCase", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestCaseFinished)
], Envelope.prototype, "testCaseFinished", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestCaseStarted)
], Envelope.prototype, "testCaseStarted", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestRunFinished)
], Envelope.prototype, "testRunFinished", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestRunStarted)
], Envelope.prototype, "testRunStarted", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestStepFinished)
], Envelope.prototype, "testStepFinished", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestStepStarted)
], Envelope.prototype, "testStepStarted", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestRunHookStarted)
], Envelope.prototype, "testRunHookStarted", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TestRunHookFinished)
], Envelope.prototype, "testRunHookFinished", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => UndefinedParameterType)
], Envelope.prototype, "undefinedParameterType", void 0);
var Exception = class {
  constructor() {
    this.type = "";
  }
};
var GherkinDocument = class {
  constructor() {
    this.comments = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Feature)
], GherkinDocument.prototype, "feature", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Comment)
], GherkinDocument.prototype, "comments", void 0);
var Background = class {
  constructor() {
    this.location = new Location();
    this.keyword = "";
    this.name = "";
    this.description = "";
    this.steps = [];
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Background.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Step)
], Background.prototype, "steps", void 0);
var Comment = class {
  constructor() {
    this.location = new Location();
    this.text = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Comment.prototype, "location", void 0);
var DataTable = class {
  constructor() {
    this.location = new Location();
    this.rows = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], DataTable.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TableRow)
], DataTable.prototype, "rows", void 0);
var DocString = class {
  constructor() {
    this.location = new Location();
    this.content = "";
    this.delimiter = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], DocString.prototype, "location", void 0);
var Examples = class {
  constructor() {
    this.location = new Location();
    this.tags = [];
    this.keyword = "";
    this.name = "";
    this.description = "";
    this.tableBody = [];
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Examples.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Tag)
], Examples.prototype, "tags", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TableRow)
], Examples.prototype, "tableHeader", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TableRow)
], Examples.prototype, "tableBody", void 0);
var Feature = class {
  constructor() {
    this.location = new Location();
    this.tags = [];
    this.language = "";
    this.keyword = "";
    this.name = "";
    this.description = "";
    this.children = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Feature.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Tag)
], Feature.prototype, "tags", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => FeatureChild)
], Feature.prototype, "children", void 0);
var FeatureChild = class {
};
__decorate([
  (0, import_class_transformer.Type)(() => Rule)
], FeatureChild.prototype, "rule", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Background)
], FeatureChild.prototype, "background", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Scenario)
], FeatureChild.prototype, "scenario", void 0);
var Rule = class {
  constructor() {
    this.location = new Location();
    this.tags = [];
    this.keyword = "";
    this.name = "";
    this.description = "";
    this.children = [];
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Rule.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Tag)
], Rule.prototype, "tags", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => RuleChild)
], Rule.prototype, "children", void 0);
var RuleChild = class {
};
__decorate([
  (0, import_class_transformer.Type)(() => Background)
], RuleChild.prototype, "background", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Scenario)
], RuleChild.prototype, "scenario", void 0);
var Scenario = class {
  constructor() {
    this.location = new Location();
    this.tags = [];
    this.keyword = "";
    this.name = "";
    this.description = "";
    this.steps = [];
    this.examples = [];
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Scenario.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Tag)
], Scenario.prototype, "tags", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Step)
], Scenario.prototype, "steps", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Examples)
], Scenario.prototype, "examples", void 0);
var Step = class {
  constructor() {
    this.location = new Location();
    this.keyword = "";
    this.text = "";
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Step.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => DocString)
], Step.prototype, "docString", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => DataTable)
], Step.prototype, "dataTable", void 0);
var TableCell = class {
  constructor() {
    this.location = new Location();
    this.value = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], TableCell.prototype, "location", void 0);
var TableRow = class {
  constructor() {
    this.location = new Location();
    this.cells = [];
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], TableRow.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => TableCell)
], TableRow.prototype, "cells", void 0);
var Tag = class {
  constructor() {
    this.location = new Location();
    this.name = "";
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Tag.prototype, "location", void 0);
var Hook = class {
  constructor() {
    this.id = "";
    this.sourceReference = new SourceReference();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => SourceReference)
], Hook.prototype, "sourceReference", void 0);
var Location = class {
  constructor() {
    this.line = 0;
  }
};
var Meta = class {
  constructor() {
    this.protocolVersion = "";
    this.implementation = new Product();
    this.runtime = new Product();
    this.os = new Product();
    this.cpu = new Product();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Product)
], Meta.prototype, "implementation", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Product)
], Meta.prototype, "runtime", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Product)
], Meta.prototype, "os", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Product)
], Meta.prototype, "cpu", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Ci)
], Meta.prototype, "ci", void 0);
var Ci = class {
  constructor() {
    this.name = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Git)
], Ci.prototype, "git", void 0);
var Git = class {
  constructor() {
    this.remote = "";
    this.revision = "";
  }
};
var Product = class {
  constructor() {
    this.name = "";
  }
};
var ParameterType = class {
  constructor() {
    this.name = "";
    this.regularExpressions = [];
    this.preferForRegularExpressionMatch = false;
    this.useForSnippets = false;
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => SourceReference)
], ParameterType.prototype, "sourceReference", void 0);
var ParseError = class {
  constructor() {
    this.source = new SourceReference();
    this.message = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => SourceReference)
], ParseError.prototype, "source", void 0);
var Pickle = class {
  constructor() {
    this.id = "";
    this.uri = "";
    this.name = "";
    this.language = "";
    this.steps = [];
    this.tags = [];
    this.astNodeIds = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], Pickle.prototype, "location", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => PickleStep)
], Pickle.prototype, "steps", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => PickleTag)
], Pickle.prototype, "tags", void 0);
var PickleDocString = class {
  constructor() {
    this.content = "";
  }
};
var PickleStep = class {
  constructor() {
    this.astNodeIds = [];
    this.id = "";
    this.text = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => PickleStepArgument)
], PickleStep.prototype, "argument", void 0);
var PickleStepArgument = class {
};
__decorate([
  (0, import_class_transformer.Type)(() => PickleDocString)
], PickleStepArgument.prototype, "docString", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => PickleTable)
], PickleStepArgument.prototype, "dataTable", void 0);
var PickleTable = class {
  constructor() {
    this.rows = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => PickleTableRow)
], PickleTable.prototype, "rows", void 0);
var PickleTableCell = class {
  constructor() {
    this.value = "";
  }
};
var PickleTableRow = class {
  constructor() {
    this.cells = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => PickleTableCell)
], PickleTableRow.prototype, "cells", void 0);
var PickleTag = class {
  constructor() {
    this.name = "";
    this.astNodeId = "";
  }
};
var Source = class {
  constructor() {
    this.uri = "";
    this.data = "";
    this.mediaType = SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
  }
};
var SourceReference = class {
};
__decorate([
  (0, import_class_transformer.Type)(() => JavaMethod)
], SourceReference.prototype, "javaMethod", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => JavaStackTraceElement)
], SourceReference.prototype, "javaStackTraceElement", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Location)
], SourceReference.prototype, "location", void 0);
var JavaMethod = class {
  constructor() {
    this.className = "";
    this.methodName = "";
    this.methodParameterTypes = [];
  }
};
var JavaStackTraceElement = class {
  constructor() {
    this.className = "";
    this.fileName = "";
    this.methodName = "";
  }
};
var StepDefinition = class {
  constructor() {
    this.id = "";
    this.pattern = new StepDefinitionPattern();
    this.sourceReference = new SourceReference();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => StepDefinitionPattern)
], StepDefinition.prototype, "pattern", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => SourceReference)
], StepDefinition.prototype, "sourceReference", void 0);
var StepDefinitionPattern = class {
  constructor() {
    this.source = "";
    this.type = StepDefinitionPatternType.CUCUMBER_EXPRESSION;
  }
};
var Suggestion = class {
  constructor() {
    this.id = "";
    this.pickleStepId = "";
    this.snippets = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Snippet)
], Suggestion.prototype, "snippets", void 0);
var Snippet = class {
  constructor() {
    this.language = "";
    this.code = "";
  }
};
var TestCase = class {
  constructor() {
    this.id = "";
    this.pickleId = "";
    this.testSteps = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => TestStep)
], TestCase.prototype, "testSteps", void 0);
var Group = class {
  constructor() {
    this.children = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Group)
], Group.prototype, "children", void 0);
var StepMatchArgument = class {
  constructor() {
    this.group = new Group();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Group)
], StepMatchArgument.prototype, "group", void 0);
var StepMatchArgumentsList = class {
  constructor() {
    this.stepMatchArguments = [];
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => StepMatchArgument)
], StepMatchArgumentsList.prototype, "stepMatchArguments", void 0);
var TestStep = class {
  constructor() {
    this.id = "";
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => StepMatchArgumentsList)
], TestStep.prototype, "stepMatchArgumentsLists", void 0);
var TestCaseFinished = class {
  constructor() {
    this.testCaseStartedId = "";
    this.timestamp = new Timestamp();
    this.willBeRetried = false;
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestCaseFinished.prototype, "timestamp", void 0);
var TestCaseStarted = class {
  constructor() {
    this.attempt = 0;
    this.id = "";
    this.testCaseId = "";
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestCaseStarted.prototype, "timestamp", void 0);
var TestRunFinished = class {
  constructor() {
    this.success = false;
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestRunFinished.prototype, "timestamp", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Exception)
], TestRunFinished.prototype, "exception", void 0);
var TestRunHookFinished = class {
  constructor() {
    this.testRunHookStartedId = "";
    this.result = new TestStepResult();
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => TestStepResult)
], TestRunHookFinished.prototype, "result", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestRunHookFinished.prototype, "timestamp", void 0);
var TestRunHookStarted = class {
  constructor() {
    this.id = "";
    this.testRunStartedId = "";
    this.hookId = "";
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestRunHookStarted.prototype, "timestamp", void 0);
var TestRunStarted = class {
  constructor() {
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestRunStarted.prototype, "timestamp", void 0);
var TestStepFinished = class {
  constructor() {
    this.testCaseStartedId = "";
    this.testStepId = "";
    this.testStepResult = new TestStepResult();
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => TestStepResult)
], TestStepFinished.prototype, "testStepResult", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestStepFinished.prototype, "timestamp", void 0);
var TestStepResult = class {
  constructor() {
    this.duration = new Duration();
    this.status = TestStepResultStatus.UNKNOWN;
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Duration)
], TestStepResult.prototype, "duration", void 0);
__decorate([
  (0, import_class_transformer.Type)(() => Exception)
], TestStepResult.prototype, "exception", void 0);
var TestStepStarted = class {
  constructor() {
    this.testCaseStartedId = "";
    this.testStepId = "";
    this.timestamp = new Timestamp();
  }
};
__decorate([
  (0, import_class_transformer.Type)(() => Timestamp)
], TestStepStarted.prototype, "timestamp", void 0);
var Timestamp = class {
  constructor() {
    this.seconds = 0;
    this.nanos = 0;
  }
};
var UndefinedParameterType = class {
  constructor() {
    this.expression = "";
    this.name = "";
  }
};
var AttachmentContentEncoding;
(function(AttachmentContentEncoding2) {
  AttachmentContentEncoding2["IDENTITY"] = "IDENTITY";
  AttachmentContentEncoding2["BASE64"] = "BASE64";
})(AttachmentContentEncoding || (AttachmentContentEncoding = {}));
var HookType;
(function(HookType2) {
  HookType2["BEFORE_TEST_RUN"] = "BEFORE_TEST_RUN";
  HookType2["AFTER_TEST_RUN"] = "AFTER_TEST_RUN";
  HookType2["BEFORE_TEST_CASE"] = "BEFORE_TEST_CASE";
  HookType2["AFTER_TEST_CASE"] = "AFTER_TEST_CASE";
  HookType2["BEFORE_TEST_STEP"] = "BEFORE_TEST_STEP";
  HookType2["AFTER_TEST_STEP"] = "AFTER_TEST_STEP";
})(HookType || (HookType = {}));
var PickleStepType;
(function(PickleStepType2) {
  PickleStepType2["UNKNOWN"] = "Unknown";
  PickleStepType2["CONTEXT"] = "Context";
  PickleStepType2["ACTION"] = "Action";
  PickleStepType2["OUTCOME"] = "Outcome";
})(PickleStepType || (PickleStepType = {}));
var SourceMediaType;
(function(SourceMediaType2) {
  SourceMediaType2["TEXT_X_CUCUMBER_GHERKIN_PLAIN"] = "text/x.cucumber.gherkin+plain";
  SourceMediaType2["TEXT_X_CUCUMBER_GHERKIN_MARKDOWN"] = "text/x.cucumber.gherkin+markdown";
})(SourceMediaType || (SourceMediaType = {}));
var StepDefinitionPatternType;
(function(StepDefinitionPatternType2) {
  StepDefinitionPatternType2["CUCUMBER_EXPRESSION"] = "CUCUMBER_EXPRESSION";
  StepDefinitionPatternType2["REGULAR_EXPRESSION"] = "REGULAR_EXPRESSION";
})(StepDefinitionPatternType || (StepDefinitionPatternType = {}));
var StepKeywordType;
(function(StepKeywordType2) {
  StepKeywordType2["UNKNOWN"] = "Unknown";
  StepKeywordType2["CONTEXT"] = "Context";
  StepKeywordType2["ACTION"] = "Action";
  StepKeywordType2["OUTCOME"] = "Outcome";
  StepKeywordType2["CONJUNCTION"] = "Conjunction";
})(StepKeywordType || (StepKeywordType = {}));
var TestStepResultStatus;
(function(TestStepResultStatus2) {
  TestStepResultStatus2["UNKNOWN"] = "UNKNOWN";
  TestStepResultStatus2["PASSED"] = "PASSED";
  TestStepResultStatus2["SKIPPED"] = "SKIPPED";
  TestStepResultStatus2["PENDING"] = "PENDING";
  TestStepResultStatus2["UNDEFINED"] = "UNDEFINED";
  TestStepResultStatus2["AMBIGUOUS"] = "AMBIGUOUS";
  TestStepResultStatus2["FAILED"] = "FAILED";
})(TestStepResultStatus || (TestStepResultStatus = {}));

// src/index.ts
var INDENT = "  ";
var LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/;
function parse(input) {
  const uuidFn = IdGenerator_exports.uuid();
  const builder = new import_gherkin.AstBuilder(uuidFn);
  const matcher = new import_gherkin.GherkinClassicTokenMatcher();
  const parser = new import_gherkin.Parser(builder, matcher);
  return parser.parse(input);
}
function getCommentsBefore(targetLine, ctx, afterLine = 0) {
  const result = [];
  for (const comment of ctx.comments) {
    if (ctx.usedComments.has(comment))
      continue;
    const commentLine = comment.location.line;
    if (commentLine > afterLine && commentLine < targetLine) {
      result.push(comment);
      ctx.usedComments.add(comment);
    }
  }
  return result.sort((a, b) => a.location.line - b.location.line);
}
function getCommentsInRange(startLine, endLine, ctx) {
  const result = /* @__PURE__ */ new Map();
  for (const comment of ctx.comments) {
    if (ctx.usedComments.has(comment))
      continue;
    const commentLine = comment.location.line;
    if (commentLine >= startLine && commentLine <= endLine) {
      const existing = result.get(commentLine) ?? [];
      existing.push(comment);
      result.set(commentLine, existing);
      ctx.usedComments.add(comment);
    }
  }
  return result;
}
function getRemainingComments(ctx) {
  const result = [];
  for (const comment of ctx.comments) {
    if (!ctx.usedComments.has(comment)) {
      result.push(comment);
      ctx.usedComments.add(comment);
    }
  }
  return result.sort((a, b) => a.location.line - b.location.line);
}
function calculateColumnWidths(rows) {
  const widths = [];
  for (const row of rows) {
    row.cells.forEach((cell, index) => {
      const cellValue = escapeTableCell(cell.value);
      if (widths[index] === void 0 || cellValue.length > widths[index]) {
        widths[index] = cellValue.length;
      }
    });
  }
  return widths;
}
function escapeTableCell(value) {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\n/g, "\\n");
}
function formatTableRow(row, columnWidths) {
  const cells = row.cells.map((cell, index) => {
    const value = escapeTableCell(cell.value);
    const width = columnWidths[index] ?? value.length;
    return value.padEnd(width);
  });
  return `| ${cells.join(" | ")} |`;
}
function formatDataTable(dataTable, baseIndent, ctx) {
  const lines = [];
  const columnWidths = calculateColumnWidths(dataTable.rows);
  const firstRow = dataTable.rows[0];
  const lastRow = dataTable.rows[dataTable.rows.length - 1];
  if (firstRow == null)
    return lines;
  const startLine = firstRow.location.line;
  const endLine = lastRow?.location.line ?? startLine;
  const commentsInTable = getCommentsInRange(startLine, endLine, ctx);
  for (const row of dataTable.rows) {
    const rowLine = row.location.line;
    for (const [commentLine, comments] of commentsInTable) {
      if (commentLine < rowLine) {
        for (const comment of comments) {
          lines.push(baseIndent + comment.text.trim());
        }
        commentsInTable.delete(commentLine);
      }
    }
    lines.push(baseIndent + formatTableRow(row, columnWidths));
  }
  return lines;
}
function escapeDocStringContent(content, delimiter) {
  const escapedDelimiter = delimiter.split("").map((c) => `\\${c}`).join("");
  return content.replace(new RegExp(delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), escapedDelimiter);
}
function formatDocString(docString, baseIndent) {
  const lines = [];
  const delimiter = docString.delimiter;
  const mediaType = docString.mediaType ?? "";
  lines.push(baseIndent + delimiter + mediaType);
  const escapedContent = escapeDocStringContent(docString.content, delimiter);
  const contentLines = escapedContent.split("\n");
  for (const line of contentLines) {
    lines.push(baseIndent + line);
  }
  lines.push(baseIndent + delimiter);
  return lines;
}
function formatTags(tags, indent) {
  return tags.map((tag) => indent + tag.name);
}
function getStepLastLine(step) {
  let lastLine = step.location.line;
  if (step.dataTable != null) {
    const rows = step.dataTable.rows;
    const lastRow = rows[rows.length - 1];
    if (lastRow != null) {
      lastLine = lastRow.location.line;
    }
  }
  if (step.docString != null) {
    const docStringLines = step.docString.content.split("\n").length;
    lastLine = step.docString.location.line + docStringLines + 1;
  }
  return lastLine;
}
function formatStep(step, baseIndent, ctx, prevStepEndLine) {
  const lines = [];
  const commentsBefore = getCommentsBefore(step.location.line, ctx, prevStepEndLine);
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim());
  }
  lines.push(baseIndent + step.keyword + step.text.trim());
  if (step.dataTable != null) {
    lines.push(...formatDataTable(step.dataTable, baseIndent + INDENT, ctx));
  }
  if (step.docString != null) {
    lines.push(...formatDocString(step.docString, baseIndent + INDENT));
  }
  return lines;
}
function formatExamples(examples, baseIndent, ctx, prevEndLine) {
  const lines = [];
  const commentsBefore = getCommentsBefore(examples.location.line, ctx, prevEndLine);
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim());
  }
  if (examples.tags.length > 0) {
    lines.push(...formatTags(examples.tags, baseIndent));
  }
  const name = examples.name !== "" ? ` ${examples.name}` : "";
  lines.push(baseIndent + examples.keyword + ":" + name);
  if (examples.description !== "") {
    const descLines = examples.description.split("\n");
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim());
    }
  }
  const tableIndent = baseIndent + INDENT;
  const allRows = [examples.tableHeader, ...examples.tableBody].filter((r) => r != null);
  const columnWidths = calculateColumnWidths(allRows);
  if (examples.tableHeader != null) {
    lines.push(tableIndent + formatTableRow(examples.tableHeader, columnWidths));
  }
  for (const row of examples.tableBody) {
    lines.push(tableIndent + formatTableRow(row, columnWidths));
  }
  return lines;
}
function formatScenario(scenario, baseIndent, ctx, prevEndLine) {
  const lines = [];
  const firstTag = scenario.tags[0];
  const scenarioStartLine = firstTag != null ? firstTag.location.line : scenario.location.line;
  const commentsBefore = getCommentsBefore(scenarioStartLine, ctx, prevEndLine);
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim());
  }
  if (scenario.tags.length > 0) {
    lines.push(...formatTags(scenario.tags, baseIndent));
  }
  lines.push(baseIndent + scenario.keyword + ": " + scenario.name);
  if (scenario.description !== "") {
    const descLines = scenario.description.split("\n");
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim());
    }
    lines.push("");
  }
  const stepIndent = baseIndent + INDENT;
  let lastStepEndLine = scenario.location.line;
  for (const step of scenario.steps) {
    lines.push(...formatStep(step, stepIndent, ctx, lastStepEndLine));
    lastStepEndLine = getStepLastLine(step);
  }
  if (scenario.examples.length > 0) {
    lines.push("");
    let prevExampleEndLine = lastStepEndLine;
    for (let i = 0; i < scenario.examples.length; i++) {
      const example = scenario.examples[i];
      if (example == null)
        continue;
      if (i > 0) {
        lines.push("");
      }
      lines.push(...formatExamples(example, stepIndent, ctx, prevExampleEndLine));
      const lastRow = example.tableBody[example.tableBody.length - 1];
      prevExampleEndLine = lastRow?.location.line ?? example.location.line;
    }
  }
  return lines;
}
function formatBackground(background, baseIndent, ctx, prevEndLine) {
  const lines = [];
  const commentsBefore = getCommentsBefore(background.location.line, ctx, prevEndLine);
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim());
  }
  const name = background.name !== "" ? ` ${background.name}` : "";
  lines.push(baseIndent + background.keyword + ":" + name);
  if (background.description !== "") {
    const descLines = background.description.split("\n");
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim());
    }
  }
  const stepIndent = baseIndent + INDENT;
  let lastStepEndLine = background.location.line;
  for (const step of background.steps) {
    lines.push(...formatStep(step, stepIndent, ctx, lastStepEndLine));
    lastStepEndLine = getStepLastLine(step);
  }
  return lines;
}
function getFeatureChildLastLine(child) {
  if (child.background != null) {
    const steps = child.background.steps;
    const lastStep = steps[steps.length - 1];
    return lastStep != null ? getStepLastLine(lastStep) : child.background.location.line;
  }
  if (child.scenario != null) {
    const scenario = child.scenario;
    if (scenario.examples.length > 0) {
      const lastExample = scenario.examples[scenario.examples.length - 1];
      if (lastExample != null) {
        const lastRow = lastExample.tableBody[lastExample.tableBody.length - 1];
        return lastRow?.location.line ?? lastExample.location.line;
      }
    }
    const steps = scenario.steps;
    const lastStep = steps[steps.length - 1];
    return lastStep != null ? getStepLastLine(lastStep) : scenario.location.line;
  }
  if (child.rule != null) {
    const children = child.rule.children;
    const lastChild = children[children.length - 1];
    if (lastChild?.scenario != null) {
      const lastStep = lastChild.scenario.steps[lastChild.scenario.steps.length - 1];
      return lastStep != null ? getStepLastLine(lastStep) : lastChild.scenario.location.line;
    }
    return child.rule.location.line;
  }
  return 0;
}
function formatRuleChild(child, baseIndent, ctx, prevEndLine) {
  if (child.background != null) {
    return formatBackground(child.background, baseIndent, ctx, prevEndLine);
  }
  if (child.scenario != null) {
    return formatScenario(child.scenario, baseIndent, ctx, prevEndLine);
  }
  return [];
}
function formatRule(rule, baseIndent, ctx, prevEndLine) {
  const lines = [];
  const firstRuleTag = rule.tags[0];
  const ruleStartLine = firstRuleTag != null ? firstRuleTag.location.line : rule.location.line;
  const commentsBefore = getCommentsBefore(ruleStartLine, ctx, prevEndLine);
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim());
  }
  if (rule.tags.length > 0) {
    lines.push(...formatTags(rule.tags, baseIndent));
  }
  lines.push(baseIndent + rule.keyword + ": " + rule.name);
  if (rule.description !== "") {
    const descLines = rule.description.split("\n");
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim());
    }
  }
  const childIndent = baseIndent + INDENT;
  let lastChildEndLine = rule.location.line;
  const childLines = [];
  for (const child of rule.children) {
    if (childLines.length > 0) {
      childLines.push("");
    }
    childLines.push(...formatRuleChild(child, childIndent, ctx, lastChildEndLine));
    if (child.scenario != null) {
      const steps = child.scenario.steps;
      const lastStep = steps[steps.length - 1];
      lastChildEndLine = lastStep != null ? getStepLastLine(lastStep) : child.scenario.location.line;
    } else if (child.background != null) {
      const steps = child.background.steps;
      const lastStep = steps[steps.length - 1];
      lastChildEndLine = lastStep != null ? getStepLastLine(lastStep) : child.background.location.line;
    }
  }
  if (childLines.length > 0) {
    lines.push("");
    lines.push(...childLines);
  }
  return lines;
}
function formatFeatureChild(child, baseIndent, ctx, prevEndLine) {
  if (child.background != null) {
    return formatBackground(child.background, baseIndent, ctx, prevEndLine);
  }
  if (child.scenario != null) {
    return formatScenario(child.scenario, baseIndent, ctx, prevEndLine);
  }
  if (child.rule != null) {
    return formatRule(child.rule, baseIndent, ctx, prevEndLine);
  }
  return [];
}
function formatFeature(feature, originalText, ctx) {
  const lines = [];
  const firstFeatureTag = feature.tags[0];
  const featureStartLine = firstFeatureTag != null ? firstFeatureTag.location.line : feature.location.line;
  const hasLanguage = LANGUAGE_PATTERN.test(originalText);
  if (hasLanguage && feature.language !== "en") {
    lines.push(`# language: ${feature.language}`);
  }
  const commentsBefore = getCommentsBefore(featureStartLine, ctx, 0);
  for (const comment of commentsBefore) {
    lines.push(comment.text.trim());
  }
  if (feature.tags.length > 0) {
    lines.push(...formatTags(feature.tags, ""));
  }
  lines.push(feature.keyword + ": " + feature.name);
  if (feature.description !== "") {
    const descLines = feature.description.split("\n");
    for (const line of descLines) {
      lines.push(INDENT + line.trim());
    }
  }
  let lastChildEndLine = feature.location.line;
  const childLines = [];
  for (const child of feature.children) {
    if (childLines.length > 0) {
      childLines.push("");
    }
    childLines.push(...formatFeatureChild(child, INDENT, ctx, lastChildEndLine));
    lastChildEndLine = getFeatureChildLastLine(child);
  }
  if (childLines.length > 0) {
    lines.push("");
    lines.push(...childLines);
  }
  const trailingComments = getRemainingComments(ctx);
  if (trailingComments.length > 0) {
    lines.push("");
    for (const comment of trailingComments) {
      lines.push(comment.text.trim());
    }
  }
  return lines;
}
function check(input) {
  try {
    const formatted = format(input);
    return input === formatted;
  } catch {
    return false;
  }
}
function format(input) {
  if (input.trim() === "") {
    return "";
  }
  const document = parse(input);
  const ctx = {
    comments: document.comments,
    usedComments: /* @__PURE__ */ new Set()
  };
  if (document.feature == null) {
    if (document.comments.length > 0) {
      const commentLines = document.comments.map((c) => c.text.trim());
      return commentLines.join("\n") + "\n";
    }
    return "";
  }
  const lines = formatFeature(document.feature, input, ctx);
  let result = lines.join("\n");
  result = result.split("\n").map((line) => line.trimEnd()).join("\n");
  return result + "\n";
}

// src/cli.ts
var VERSION = "0.0.0-development";
var HELP_TEXT = `
gherkinfmt - Opinionated Gherkin Formatter

Usage:
  gherkinfmt <--check|--write> [files...]

Options:
  --check    Check if files are formatted (exit 0 if ok, 1 if not)
  --write    Format files in-place (overwrite)
  --version  Show version number
  --help     Show help

Examples:
  gherkinfmt --check file.feature      Check single file
  gherkinfmt --check "src/**/*.feature" Check files matching glob
  gherkinfmt --write file.feature      Format and overwrite single file
  gherkinfmt --write src/              Format all .feature files in directory recursively

`;
function parseArgs(args) {
  const options = {
    checkOnly: false,
    write: false,
    showVersion: false,
    showHelp: false,
    files: []
  };
  for (const arg of args) {
    if (arg === "--check") {
      options.checkOnly = true;
      options.write = false;
    } else if (arg === "--write") {
      options.write = true;
      options.checkOnly = false;
    } else if (arg === "--version") {
      options.showVersion = true;
    } else if (arg === "--help") {
      options.showHelp = true;
    } else if (!arg.startsWith("-")) {
      options.files.push(arg);
    }
  }
  return options;
}
function findFeatureFiles(dir) {
  const files = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      try {
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          if (!entry.startsWith(".") && entry !== "node_modules") {
            files.push(...findFeatureFiles(fullPath));
          }
        } else if (stat.isFile() && extname(entry) === ".feature") {
          files.push(fullPath);
        }
      } catch {
      }
    }
  } catch {
  }
  return files;
}
function expandGlob(pattern) {
  const resolved = resolve(pattern);
  try {
    const stat = statSync(resolved);
    if (stat.isDirectory()) {
      return findFeatureFiles(resolved);
    } else if (stat.isFile()) {
      return [resolved];
    }
  } catch {
    try {
      const matches = globSync(pattern, {
        nodir: true,
        absolute: true
      });
      return matches.filter((f) => f.endsWith(".feature"));
    } catch {
      return [];
    }
  }
  return [];
}
function expandFiles(patterns) {
  const files = [];
  for (const pattern of patterns) {
    files.push(...expandGlob(pattern));
  }
  return [...new Set(files)];
}
function checkFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const isFormatted = check(content);
    if (!isFormatted) {
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }
}
function formatFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const formatted = format(content);
    if (content === formatted) {
      return { ok: true, changed: false };
    }
    writeFileSync(filePath, formatted, "utf-8");
    return { ok: true, changed: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, changed: false, error: message };
  }
}
function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);
  if (options.showHelp) {
    console.log(HELP_TEXT);
    process.exit(0);
  }
  if (options.showVersion) {
    console.log(`gherkinfmt v${VERSION}`);
    process.exit(0);
  }
  if (options.files.length === 0) {
    console.error("Error: No files specified");
    console.error('Run "gherkinfmt --help" for usage');
    process.exit(1);
  }
  const files = expandFiles(options.files);
  if (files.length === 0) {
    console.error("Error: No .feature files found");
    process.exit(1);
  }
  if (!options.checkOnly && !options.write) {
    console.error("Error: No mode specified");
    process.exit(1);
  }
  if (options.write) {
    let processedCount = 0;
    let changedCount = 0;
    let errorCount = 0;
    for (const file of files) {
      const result = formatFile(file);
      processedCount++;
      if (!result.ok) {
        errorCount++;
        console.error(`\u2717 ${file}`);
        console.error(`  Error: ${result.error ?? "Unknown error"}`);
      } else if (result.changed) {
        changedCount++;
        console.log(`\u2713 ${file} (formatted)`);
      } else {
        console.log(`\u2713 ${file} (unchanged)`);
      }
    }
    console.log("");
    console.log(`Processed ${processedCount} file(s)`);
    if (changedCount > 0) {
      console.log(`${changedCount} file(s) formatted`);
    }
    if (errorCount > 0) {
      console.log(`${errorCount} file(s) failed`);
      process.exit(1);
    }
    process.exit(0);
  } else {
    let hasErrors = false;
    let checkedCount = 0;
    let errorCount = 0;
    for (const file of files) {
      const result = checkFile(file);
      checkedCount++;
      if (!result.ok) {
        hasErrors = true;
        errorCount++;
        if (result.error !== void 0 && result.error !== "") {
          console.error(`\u2717 ${file}`);
          console.error(`  Error: ${result.error}`);
        } else {
          console.error(`\u2717 ${file}`);
          console.error("  File is not formatted correctly");
          try {
            const content = readFileSync(file, "utf-8");
            const formatted = format(content);
            const lines = content.split("\n");
            const formattedLines = formatted.split("\n");
            for (let i = 0; i < Math.max(lines.length, formattedLines.length); i++) {
              if (lines[i] !== formattedLines[i]) {
                console.error(`  Line ${i + 1}:`);
                console.error(`    - ${lines[i] ?? "(missing)"}`);
                console.error(`    + ${formattedLines[i] ?? "(missing)"}`);
                break;
              }
            }
          } catch {
          }
        }
      } else {
        console.log(`\u2713 ${file}`);
      }
    }
    console.log("");
    console.log(`Checked ${checkedCount} file(s)`);
    if (hasErrors) {
      console.log(`${errorCount} file(s) need formatting`);
      process.exit(1);
    } else {
      console.log("All files are formatted correctly");
      process.exit(0);
    }
  }
}
main();
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
