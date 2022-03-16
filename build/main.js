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
  var eventHandlers, currentId, emit;
  var init_events = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
      eventHandlers = {};
      currentId = 0;
      emit = typeof window === "undefined" ? function(name, ...args) {
        figma.ui.postMessage([name, ...args]);
      } : function(name, ...args) {
        window.parent.postMessage({
          pluginMessage: [name, ...args]
        }, "*");
      };
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

  // node_modules/@create-figma-plugin/utilities/lib/node/get-nodes/get-parent-node.js
  function getParentNode(node) {
    const parentNode = node.parent;
    if (parentNode === null) {
      throw new Error(`\`node.parent\` is \`null\``);
    }
    return parentNode;
  }
  var init_get_parent_node = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/node/get-nodes/get-parent-node.js"() {
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/node/create-image-paint.js
  function createImagePaint(bytes) {
    const image = figma.createImage(bytes);
    return {
      imageHash: image.hash,
      scaleMode: "FILL",
      scalingFactor: 0.5,
      type: "IMAGE"
    };
  }
  var init_create_image_paint = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/node/create-image-paint.js"() {
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/node/sibling-nodes/are-sibling-nodes.js
  function areSiblingNodes(nodes) {
    if (nodes.length < 2) {
      return true;
    }
    const [firstNode, ...rest] = nodes;
    const firstParentNode = getParentNode(firstNode);
    for (const node of rest) {
      if (node.parent === null || node.parent.id !== firstParentNode.id) {
        return false;
      }
    }
    return true;
  }
  var init_are_sibling_nodes = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/node/sibling-nodes/are-sibling-nodes.js"() {
      init_get_parent_node();
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/object/compare-string-arrays.js
  function compareStringArrays(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    for (const index in a) {
      if (a[index] !== b[index]) {
        return false;
      }
    }
    return true;
  }
  var init_compare_string_arrays = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/object/compare-string-arrays.js"() {
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/node/sort-nodes/update-nodes-sort-order.js
  function updateNodesSortOrder(siblingNodes) {
    const parentNode = getParentNode(siblingNodes[0]);
    if (areSiblingNodes(siblingNodes) === false) {
      throw new Error("Nodes in `siblingNodes` do not have the same parent");
    }
    const siblingNodesCopy = siblingNodes.slice();
    const ids = parentNode.children.map(function({ id }) {
      return id;
    });
    const insertIndex = computeInsertIndex(siblingNodesCopy, ids);
    for (const node of siblingNodesCopy) {
      parentNode.insertChild(insertIndex, node);
    }
    const idsAfter = parentNode.children.map(function({ id }) {
      return id;
    });
    return compareStringArrays(ids, idsAfter) === false;
  }
  function computeInsertIndex(nodes, ids) {
    let insertIndex = -1;
    for (const node of nodes) {
      const index = ids.indexOf(node.id);
      if (index > insertIndex) {
        insertIndex = index;
      }
    }
    return insertIndex + 1;
  }
  var init_update_nodes_sort_order = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/node/sort-nodes/update-nodes-sort-order.js"() {
      init_compare_string_arrays();
      init_get_parent_node();
      init_are_sibling_nodes();
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/settings.js
  async function loadSettingsAsync(defaultSettings2, settingsKey2 = DEFAULT_SETTINGS_KEY) {
    const settings = await figma.clientStorage.getAsync(settingsKey2);
    if (typeof settings === "undefined") {
      return defaultSettings2;
    }
    return Object.assign({}, defaultSettings2, settings);
  }
  var DEFAULT_SETTINGS_KEY;
  var init_settings = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/settings.js"() {
      DEFAULT_SETTINGS_KEY = "settings";
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/string/format-message.js
  function formatSuccessMessage(message) {
    return `${CHECK} ${SPACE} ${message}`;
  }
  var CHECK, SPACE;
  var init_format_message = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/string/format-message.js"() {
      CHECK = "\u2714";
      SPACE = "\xA0";
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/string/pluralize.js
  function pluralize(number, singular, plural) {
    if (number === 1) {
      return singular;
    }
    return typeof plural === "undefined" ? `${singular}s` : plural;
  }
  var init_pluralize = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/string/pluralize.js"() {
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
      init_create_image_paint();
      init_update_nodes_sort_order();
      init_settings();
      init_format_message();
      init_pluralize();
      init_ui();
    }
  });

  // src/utilities/settings.ts
  var settingsKey, defaultSettings;
  var init_settings2 = __esm({
    "src/utilities/settings.ts"() {
      settingsKey = "2021-05-01";
      defaultSettings = {
        insertAs2x: false
      };
    }
  });

  // src/utilities/create-image-node.ts
  function createImageNode(imageNodePlainObject, options) {
    const { bytes, x, y, width, height } = imageNodePlainObject;
    const { resolution, xOffset, yOffset } = options;
    const rectangle = figma.createRectangle();
    rectangle.name = "Image";
    rectangle.x = x / resolution + xOffset;
    rectangle.y = y / resolution + yOffset;
    rectangle.resize(56, 56);
    rectangle.fills = [createImagePaint(bytes)];
    return rectangle;
  }
  var init_create_image_node = __esm({
    "src/utilities/create-image-node.ts"() {
      init_lib();
    }
  });

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });
  async function main_default() {
    let xOffset = Math.round(figma.viewport.center.x);
    let yOffset = Math.round(figma.viewport.center.y);
    const result = [];
    const settings = await loadSettingsAsync(defaultSettings, settingsKey);
    figma.on("drop", function(event) {
      xOffset = event.absoluteX;
      yOffset = event.absoluteY;
      const promises = [];
      for (const file of event.files) {
        if (file.type === "image/png" || file.type === "image/jpeg") {
          promises.push(file.getBytesAsync());
        }
      }
      if (promises.length === 0) {
        return true;
      }
      Promise.all(promises).then(function(result2) {
        const droppedImages = result2.map(function(bytes, index) {
          const file = event.files[index];
          return { bytes, name: file.name, type: file.type };
        });
        emit("DROP_IMAGES", droppedImages);
      });
      return false;
    });
    once("CLOSE", function() {
      figma.closePlugin();
    });
    once("CREATE_THUMBNAIL", async function(project, imageNodePlainObjects, options) {
      {
        const { name, done } = options;
        const { insertAs2x } = await loadSettingsAsync(defaultSettings, settingsKey);
        const imageNodes = [];
        for (const imageNodePlainObject of imageNodePlainObjects) {
          const imageNode = createImageNode(imageNodePlainObject, {
            resolution: insertAs2x === true ? 2 : 1,
            xOffset,
            yOffset
          });
          imageNodes.push(imageNode);
        }
        if (imageNodes.length === 1) {
          imageNodes[0].name = name;
          result.push(imageNodes[0]);
          xOffset += imageNodes[0].width;
        } else {
          updateNodesSortOrder(imageNodes);
          const group = figma.group(imageNodes, figma.currentPage);
          group.name = name;
          result.push(group);
          xOffset += group.width;
        }
        if (done === false) {
          return;
        }
        updateNodesSortOrder(result);
        figma.currentPage.selection = result;
        figma.viewport.scrollAndZoomIntoView(result);
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
        figma.closePlugin(formatSuccessMessage(`Inserted ${result.length} ${pluralize(result.length, "image")}`));
      }
    });
    showUI({
      width: 450,
      height: 500
    }, settings);
  }
  var init_main = __esm({
    "src/main.ts"() {
      init_lib();
      init_settings2();
      init_create_image_node();
    }
  });

  // <stdin>
  var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
  var commandId = true ? "src/main.ts--default" : figma.command;
  modules[commandId]();
})();
