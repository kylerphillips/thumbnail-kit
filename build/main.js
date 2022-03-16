(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // node_modules/@create-figma-plugin/utilities/lib/events.js
  function on(name, handler) {
    const id = `${currentId}`;
    currentId += 1;
    eventHandlers[id] = { handler, name };
    return function() {
      delete eventHandlers[id];
    };
  }
  function once(name, handler) {
    let done = false;
    return on(name, function(...args) {
      if (done === true) {
        return;
      }
      done = true;
      handler(...args);
    });
  }
  function invokeEventHandler(name, args) {
    for (const id in eventHandlers) {
      if (eventHandlers[id].name === name) {
        eventHandlers[id].handler.apply(null, args);
      }
    }
  }
  var eventHandlers, currentId;
  var init_events = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
      eventHandlers = {};
      currentId = 0;
      if (typeof window === "undefined") {
        figma.ui.onmessage = function([name, ...args]) {
          invokeEventHandler(name, args);
        };
      } else {
        window.onmessage = function(event) {
          const [name, ...args] = event.data.pluginMessage;
          invokeEventHandler(name, args);
        };
      }
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/ui.js
  function showUI(options, data) {
    if (typeof __html__ === "undefined") {
      throw new Error("No UI defined");
    }
    const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}<\/script>`;
    figma.showUI(html, options);
  }
  var init_ui = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/index.js
  var init_lib = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
      init_events();
      init_ui();
    }
  });

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });
  function main_default() {
    once("CLOSE", function() {
      figma.closePlugin();
    });
    once("CREATE_THUMBNAIL", async function(project) {
      const thumbnailFrame = figma.createFrame();
      thumbnailFrame.name = project;
      thumbnailFrame.resize(960, 480);
      thumbnailFrame.fills = [{ type: "SOLID", color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 } }];
      const safeZone = figma.createFrame();
      safeZone.name = "Safe Zone Container";
      thumbnailFrame.appendChild(safeZone);
      safeZone.fills = [{ type: "SOLID", color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 } }];
      safeZone.resize(610, 360);
      safeZone.x = 175;
      safeZone.y = 60;
      let metaTitle = figma.createText();
      let blackFont = { family: "Inter", style: "Black" };
      await figma.loadFontAsync(blackFont);
      metaTitle.fontName = blackFont;
      thumbnailFrame.appendChild(metaTitle);
      metaTitle.characters = project;
      metaTitle.fontSize = 50;
      metaTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      metaTitle.x = 400;
      metaTitle.y = 209;
      const titleContainer = figma.createFrame();
      titleContainer.name = "Title Container";
      titleContainer.layoutMode = "VERTICAL";
      titleContainer.fills = [{ type: "SOLID", color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 } }];
      titleContainer.appendChild(metaTitle);
      titleContainer.clipsContent = false;
      const contentContainer = figma.createFrame();
      contentContainer.name = "Content Container";
      contentContainer.layoutMode = "VERTICAL";
      safeZone.appendChild(contentContainer);
      contentContainer.appendChild(titleContainer);
      contentContainer.clipsContent = false;
      contentContainer.resize(contentContainer.width, 360);
      contentContainer.fills = [{ type: "SOLID", color: { r: 0.1098039216, g: 0.1098039216, b: 0.1176470588 } }];
      contentContainer.primaryAxisAlignItems = "CENTER";
      let description = figma.createText();
      let regularFont = { family: "Inter", style: "Regular" };
      await figma.loadFontAsync(regularFont);
      description.fontName = regularFont;
      description.characters = "This is a long test description";
      description.fontSize = 24;
      description.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      titleContainer.appendChild(description);
      figma.setFileThumbnailNodeAsync(thumbnailFrame);
      figma.closePlugin();
    });
    showUI({
      width: 450,
      height: 500
    });
  }
  var init_main = __esm({
    "src/main.ts"() {
      init_lib();
    }
  });

  // <stdin>
  var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
  var commandId = true ? "src/main.ts--default" : figma.command;
  modules[commandId]();
})();
