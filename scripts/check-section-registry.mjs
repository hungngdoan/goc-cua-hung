import { createServer } from "node:net";
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const siteRoot = resolve(projectRoot, args.get("--site-root") || ".");
const outputPath = args.get("--output");
const screenshotDir = args.get("--screenshots");
if (!outputPath || !screenshotDir) {
  throw new Error(
    "Usage: node scripts/check-section-registry.mjs --output <json> --screenshots <directory> [--site-root <directory>]",
  );
}

const sections = [
  {
    id: "den_dau",
    name: "Đêm Huyền",
    slug: "dem-huyen",
    aliases: [],
    icon: "🌙",
    row: "dark",
    body: { kind: "generic", selector: "h3", text: "Tam Mao · Ba Sợi Tóc Giữa Nhân Gian" },
  },
  {
    id: "hong_tram",
    name: "Về tui",
    slug: "ve-tui",
    aliases: [],
    icon: "🕯",
    row: "dark",
    body: { kind: "bespoke", selector: ".vetui" },
  },
  {
    id: "muc_than",
    name: "36 Kế",
    slug: "36-ke",
    aliases: [],
    icon: "📜",
    row: "dark",
    body: { kind: "bespoke", selector: ".thirty-six-ke-page" },
  },
  {
    id: "hoian",
    name: "Tào Tháo",
    slug: "tao-thao",
    aliases: ["hoi-an"],
    icon: "🏮",
    row: "dark",
    body: { kind: "bespoke", selector: ".taothao-page" },
  },
  {
    id: "sap_bao_dem",
    name: "Nhạc Khuya",
    slug: "nhac-khuya",
    aliases: [],
    icon: "🎶",
    row: "dark",
    body: { kind: "generic", selector: "h3", text: "8 Vạn 6 Ngàn Thương" },
  },
  {
    id: "quan_coc_toi",
    name: "Trò chơi điện tử",
    slug: "tro-choi-dien-tu",
    aliases: [],
    icon: "🎮",
    row: "dark",
    body: { kind: "generic", selector: "h3", text: "Liên Minh Huyền Thoại" },
  },
  {
    id: "hoa_dao",
    name: "Góc Hồng",
    slug: "goc-hong",
    aliases: [],
    icon: "🌸",
    row: "bright",
    body: {
      kind: "generic",
      selector: "h3",
      text: "Đối lập với yêu thương là sự thờ ơ",
    },
  },
  {
    id: "giaydo",
    name: "Mực Lam",
    slug: "muc-lam",
    aliases: ["giay-do"],
    icon: "✒️",
    row: "bright",
    body: { kind: "bespoke", selector: ".muc-lam" },
  },
  {
    id: "dongho",
    name: "Tủ sách",
    slug: "tu-sach",
    aliases: [],
    icon: "📚",
    row: "bright",
    body: { kind: "bespoke", selector: ".tu-sach" },
  },
  {
    id: "sapbao_sang",
    name: "Trà Sáng",
    slug: "tra-sang",
    aliases: [],
    icon: "🍵",
    row: "bright",
    body: { kind: "generic", selector: "h2", text: "Trà Sáng" },
  },
  {
    id: "quancoc_sang",
    name: "Lụa Sen",
    slug: "lua-sen",
    aliases: [],
    icon: "🪷",
    row: "bright",
    body: { kind: "generic", selector: "h2", text: "Lụa Sen" },
  },
  {
    id: "suong_mai",
    name: "Cơn Mưa",
    slug: "con-mua",
    aliases: [],
    icon: "💧",
    row: "bright",
    body: { kind: "bespoke", selector: ".mua-roi" },
  },
];

const bespokeSelectors = sections
  .filter(({ body }) => body.kind === "bespoke")
  .map(({ body }) => body.selector);
const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function availablePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

async function waitFor(url, description, attempts = 100) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    } catch {
      // The process may still be starting.
    }
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${description}`);
}

function chromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const executable = candidates.find((candidate) => existsSync(candidate));
  if (!executable) {
    throw new Error("Chrome was not found. Set CHROME_PATH and rerun the check.");
  }
  return executable;
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.pending = new Map();
    this.id = 0;
    this.socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (!message.id) {
        return;
      }
      const request = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) {
        request.reject(new Error(message.error.message));
      } else {
        request.resolve(message.result);
      }
    });
  }

  async open() {
    await new Promise((resolveOpen, reject) => {
      this.socket.addEventListener("open", resolveOpen, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
  }

  send(method, params = {}) {
    this.id += 1;
    return new Promise((resolveCommand, reject) => {
      this.pending.set(this.id, { resolve: resolveCommand, reject });
      this.socket.send(JSON.stringify({ id: this.id, method, params }));
    });
  }

  async evaluate(expression) {
    const response = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (response.exceptionDetails) {
      throw new Error(response.exceptionDetails.text);
    }
    return response.result.value;
  }

  close() {
    this.socket.close();
  }
}

const previewPort = await availablePort();
const cdpPort = await availablePort();
const previewUrl = `http://127.0.0.1:${previewPort}/goc-cua-hung/`;
const astroCli = join(projectRoot, "node_modules", "astro", "astro.js");
const profileDir = mkdtempSync(join(tmpdir(), "goc-section-check-"));
const resolvedOutput = resolve(projectRoot, outputPath);
const resolvedScreenshots = resolve(projectRoot, screenshotDir);
mkdirSync(dirname(resolvedOutput), { recursive: true });
mkdirSync(resolvedScreenshots, { recursive: true });

const preview = spawn(
  process.execPath,
  [astroCli, "preview", "--host", "127.0.0.1", "--port", String(previewPort)],
  {
    cwd: siteRoot,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);
const chrome = spawn(
  chromeExecutable(),
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--mute-audio",
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  {
    cwd: siteRoot,
    stdio: "ignore",
    windowsHide: true,
  },
);

let client;
try {
  await waitFor(previewUrl, "Astro preview");
  const targets = await waitFor(
    `http://127.0.0.1:${cdpPort}/json/list`,
    "Chrome DevTools",
  ).then((response) => response.json());
  const page = targets.find((target) => target.type === "page");
  assert(page, "Chrome exposed no page target");

  client = new CdpClient(page.webSocketDebuggerUrl);
  await client.open();
  await Promise.all([
    client.send("Page.enable"),
    client.send("Runtime.enable"),
    client.send("Network.enable"),
    client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    }),
    client.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    }),
  ]);

  let routeCounter = 0;
  async function evaluateState(section, hash) {
    routeCounter += 1;
    const url = `${previewUrl}?registry-check=${routeCounter}${hash ? `#${hash}` : ""}`;
    await client.send("Page.navigate", { url });

    const deadline = Date.now() + 15000;
    let state;
    while (Date.now() < deadline) {
      state = await client.evaluate(`(() => {
        const expectedName = ${JSON.stringify(section.name)};
        const bodySelector = ${JSON.stringify(section.body.selector)};
        const bodyText = ${JSON.stringify(section.body.text || "")};
        const active = document.querySelector(".style-tab.is-active");
        const bodyMatches = [...document.querySelectorAll(bodySelector)]
          .some((element) => !bodyText || element.textContent.includes(bodyText));
        return {
          ready: document.readyState === "complete",
          activeName: active?.textContent.includes(expectedName) || false,
          bodyMatches,
        };
      })()`);
      if (state.ready && state.activeName && state.bodyMatches) {
        break;
      }
      await sleep(100);
    }
    assert(
      state?.ready && state.activeName && state.bodyMatches,
      `${section.id} did not render for hash ${hash || "(none)"}`,
    );

    await client.evaluate(`(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolveImage) => {
          image.addEventListener("load", resolveImage, { once: true });
          image.addEventListener("error", resolveImage, { once: true });
        });
      }));
      await new Promise((resolveFrame) => setTimeout(resolveFrame, 2000));
      const style = document.createElement("style");
      style.id = "registry-check-freeze";
      style.textContent = "*{animation:none!important;transition:none!important;caret-color:transparent!important}";
      document.head.append(style);
      document.querySelectorAll("video").forEach((video) => video.pause());
      scrollTo(0, 0);
      await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
    })()`);

    return client.evaluate(`(() => {
      const bodySelector = ${JSON.stringify(section.body.selector)};
      const bodyText = ${JSON.stringify(section.body.text || "")};
      const active = document.querySelector(".style-tab.is-active");
      const navRows = [...document.querySelectorAll("nav")]
        .filter((nav) => nav.querySelector(".style-tab"));
      const rowIndex = navRows.findIndex((nav) => nav.contains(active));
      const visibleBespoke = ${JSON.stringify(bespokeSelectors)}
        .filter((selector) => document.querySelector(selector));
      const bodyMatches = [...document.querySelectorAll(bodySelector)]
        .some((element) => !bodyText || element.textContent.includes(bodyText));
      return {
        hash: location.hash.slice(1),
        label: active?.textContent.replace(active.querySelector(".tab-icon")?.textContent || "", "").trim(),
        icon: active?.querySelector(".tab-icon")?.textContent || "",
        row: rowIndex === 0 ? "dark" : rowIndex === 1 ? "bright" : "missing",
        bodyMatches,
        visibleBespoke,
      };
    })()`);
  }

  const defaultState = await evaluateState(sections[0], "");
  assert(defaultState.label === "Đêm Huyền", "No-hash default is not den_dau");
  assert(defaultState.hash === "", "No-hash default unexpectedly changed the URL");

  const navRows = await client.evaluate(`(() => [...document.querySelectorAll("nav")]
    .filter((nav) => nav.querySelector(".style-tab"))
    .map((nav) => [...nav.querySelectorAll(".style-tab")].map((button) => ({
      label: button.textContent.replace(button.querySelector(".tab-icon")?.textContent || "", "").trim(),
      icon: button.querySelector(".tab-icon")?.textContent || "",
    }))))()`);
  assert(navRows.length === 2, `Expected two nav rows, found ${navRows.length}`);

  const expectedRows = ["dark", "bright"].map((row) =>
    sections
      .filter((section) => section.row === row)
      .map(({ name: label, icon }) => ({ label, icon })),
  );
  assert(
    JSON.stringify(navRows) === JSON.stringify(expectedRows),
    "Nav row membership, order, labels, or icons changed",
  );

  const results = [];
  for (const section of sections) {
    const resolutions = {};
    for (const [kind, hashes] of Object.entries({
      slug: [section.slug],
      rawId: [section.id],
      aliases: section.aliases,
    })) {
      resolutions[kind] = [];
      for (const hash of hashes) {
        const state = await evaluateState(section, hash);
        assert(state.hash === hash, `${section.id}: hash ${hash} was rewritten`);
        assert(state.label === section.name, `${section.id}: nav label changed`);
        assert(state.icon === section.icon, `${section.id}: icon changed`);
        assert(state.row === section.row, `${section.id}: row changed`);
        assert(state.bodyMatches, `${section.id}: expected body is missing`);
        if (section.body.kind === "generic") {
          assert(
            state.visibleBespoke.length === 0,
            `${section.id}: generic fallback rendered a bespoke section`,
          );
        } else {
          assert(
            state.visibleBespoke.length === 1 &&
              state.visibleBespoke[0] === section.body.selector,
            `${section.id}: wrong bespoke section rendered`,
          );
        }
        resolutions[kind].push({ hash, resolved: true });
      }
    }

    await evaluateState(section, section.slug);
    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
    });
    const screenshotBytes = Buffer.from(screenshot.data, "base64");
    const screenshotPath = join(resolvedScreenshots, `${section.id}.png`);
    writeFileSync(screenshotPath, screenshotBytes);

    results.push({
      id: section.id,
      name: section.name,
      row: section.row,
      icon: section.icon,
      body: section.body,
      resolutions,
      screenshot: {
        bytes: screenshotBytes.length,
        sha256: createHash("sha256").update(screenshotBytes).digest("hex"),
      },
    });
  }

  const output = {
    defaultId: "den_dau",
    navRows,
    sections: results,
  };
  writeFileSync(resolvedOutput, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify(output, null, 2));
} finally {
  if (client) {
    try {
      await client.send("Browser.close");
    } catch {
      // Chrome may already have exited.
    }
    client.close();
  }
  preview.kill();
  chrome.kill();
  await sleep(250);
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
