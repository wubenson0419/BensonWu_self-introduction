


# 吳秉乾的小小網站

本專案是一個純前端、無需後端的個人攝影作品集網站，採用 [HTML](./index.html)、[CSS](./css/style.css)、[JavaScript](./js/) 製作，支援響應式設計、動態圖片載入、Lightbox 燈箱、SEO、OG/Twitter Card、無障礙設計與社群分享預覽。可直接部署於 GitHub Pages 或任一靜態主機。

---

## 📁 目錄結構

```
├── index.html                      首頁，動態載入精選照片縮圖
├── highlight.html                  精選作品頁，支援燈箱
├── callme.html                     聯絡資訊與社群連結
├── nav.html                        主選單（JS動態載入）
├── css/
│   ├── style.css                   全站樣式
│   ├── nav.css                     導覽列樣式
│   └── lightbox.css                燈箱樣式
├── js/
│   ├── components.js               組件載入
│   
│   ├── lightbox.js                 燈箱功能
│   └── menu.js                     導覽列互動
├── images/                         所有圖片素材（頭像、作品、預設圖等，含多層資料夾）
│   ├── headportrait/               個人頭像
│   ├── Canon7d2/                   相機作品資料夾
│   └── CanonEOS100QD/              相機作品資料夾
│       └── KodakProimage100/       底片作品資料夾
│           └── ...                 多張作品圖
```

---


## 🌟 主要功能與細節

### 響應式設計
- 採用 CSS Grid、Flexbox、Media Queries，支援桌機、平板、手機瀏覽。
- 圖片網格（`.gallery-grid`）自動調整欄數與間距。
- Footer、主體等皆有響應式排版，手機下自動調整。

### 動態圖片載入
- 首頁精選區塊由 JS 動態 fetch [`highlight.html`](./highlight.html) 的前 6 張圖片，產生 `<a><img></a>` 結構。
- 精選作品頁支援多張圖片，若無資料則顯示預設圖與說明。

### Lightbox 燈箱
- 點擊圖片彈出燈箱，顯示大圖、標題、描述。
- 標題/描述支援 `[文字](連結)` 語法自動轉連結，並顯示 Google Font 圖標（link icon 以 sub 下標貼齊文字）。
- 描述過長自動顯示「查看更多」展開/收合按鈕。
- 支援鍵盤 Esc 關閉，背景鎖定不滾動。

### SEO 與社群分享
- 所有主要頁面皆補全 meta description、Open Graph、Twitter Card 標籤。
- 預設社群分享圖、標題、描述皆可自訂，網址欄位可依實際部署調整。
- 支援社群分享預覽卡片（FB、LINE、X、IG、Discord 等皆可正確顯示）。

### 圖片 lazy loading
- 所有圖片皆加上 `loading="lazy"` 屬性，提升載入效能與初次渲染速度。
- 圖片皆有 alt 屬性，提升 SEO 與無障礙。

### 無障礙設計
- 主選單支援鍵盤 Tab 導覽，Tab 到有子選單的主目錄連結時自動展開，Tab 到子選單最後一個可聚焦元素後自動收合。
- 圖片、按鈕、連結皆有適當的 aria-label、alt 屬性，footer 連結可用鍵盤操作。
- 所有互動元件皆有 focus 樣式，提升可見性。

### Footer 與 icon 細節
- Footer 連結與 Material Symbols Outlined 圖標齊平排列，send 圖標支援反轉、無底線、可調整。
- Instagram、聯絡資訊等皆有品牌色動畫，hover 時有漸層或色彩變化。
- Footer 文字與 icon 皆可無障礙存取，tab 可聚焦。

### Google Fonts 與 FontAwesome 圖標
- 全站統一載入 Google Fonts（Source Code Pro、Material Symbols Outlined），確保 icon 樣式一致。
- FontAwesome 用於社群 icon，Material Symbols 用於功能 icon（如 send、link、close）。
- [`style.css`](./css/style.css) 針對 `.material-symbols-outlined`、`.footerig` 等多次優化，確保 icon 與文字齊平、無底線、可反轉。

### 組件化與維護性
- [`nav.html`](./nav.html)、footer 與 nav 由 [`components.js`](./js/components.js) 動態載入，nav 載入後自動初始化 [`menu.js`](./js/menu.js)，方便多頁共用與維護。
- 所有 JS、CSS 結構清晰，註解完整，易於擴充。

---

## 🗂️ 主要檔案與路徑

- [`index.html`](./index.html)：首頁，動態載入精選圖片，gallery-grid 響應式排版。
- [`highlight.html`](./highlight.html)：精選攝影作品集，支援燈箱、`[文字](連結)` 語法、無資料預設圖。
- [`callme.html`](./callme.html)：聯絡資訊、社群連結按鈕，品牌色動畫，Material Symbols 圖標。
- [`nav.html`](./nav.html)：主選單，JS 動態載入。
- [`css/style.css`](./css/style.css)：全站樣式、gallery-grid、footer、icon 對齊、響應式設計。
- [`css/nav.css`](./css/nav.css)：導覽列樣式。
- [`css/lightbox.css`](./css/lightbox.css)：燈箱彈窗樣式，動畫、內容自動縮放。
- [`js/components.js`](./js/components.js)：動態載入 nav.html、footer.html，nav 載入後自動初始化 menu。

- [`js/lightbox.js`](./js/lightbox.js)：燈箱彈窗，支援自動縮放、`[文字](連結)` 語法、查看更多展開。
- [`js/menu.js`](./js/menu.js)：主選單與子選單展開/收合，Tab 鍵無障礙導覽。

---

## 🧩 進階 CSS/JS class 與結構說明

- `.gallery-grid`：圖片網格容器，自動排版，支援多欄與響應式。
- `.lightbox-trigger`：可觸發燈箱的圖片元素。
- `.material-symbols-outlined`：Google Fonts 圖標，footer、連結、燈箱皆有應用。
- `.footerig`：footer 主要連結樣式，icon 與文字齊平。
- `.menu-item-has-children`、`.is-open`：主選單有子選單時展開/收合的 class。
- `.read-more-btn`：燈箱描述「查看更多」按鈕。
- `#gallery-container`：首頁精選圖片區塊的容器。
- `#nav-placeholder`、`#footer-placeholder`：動態組件插入點。

---

<!-- ## 🚀 部署與維護建議

- 請將所有檔案與資料夾維持原有結構，直接推送至 GitHub Pages 或任一靜態主機即可運作。
- 若需自訂社群分享圖、網址，請修改各頁 meta 標籤。
- 若有新功能或頁面，請同步補全 meta 標籤與本 README。
- 若 Material Symbols 圖標顯示異常，請檢查 Google Fonts 載入與 CSS 樣式。
- 若需新增作品集、相機、底片分類頁面，可直接複製現有 HTML 檔案並修改內容。

--- -->

<!-- ## 📬 聯絡方式

- Email: [wub0419666work@gmail.com](mailto:wub0419666work@gmail.com)
- Instagram: [@bhwu0419.studio](https://www.instagram.com/bhwu0419.studio)
- 其他社群請見 [`callme.html`](./callme.html)

--- -->

<!-- © 2025 吳秉乾的小小網站 | 由 Benson Wu 製作 -->

<!-- --- -->

## 目錄結構

- `index.html`：首頁，動態載入精選照片縮圖，支援 JS 動態產生圖片網格。
- `highlight.html`：精選作品頁，展示攝影集，支援燈箱瀏覽。
- `callme.html`：聯絡資訊與社群連結頁。
- `nav.html`：主選單導覽列（由 JS 動態載入）。
- `css/`：樣式檔案（含 style.css、nav.css、lightbox.css）。
- `js/`：JavaScript 功能（components.js、gallery.js、lightbox.js、menu.js 等）。
- `images/`：所有圖片素材。

---

## 主要功能

### 1. 響應式設計
- 支援桌機、平板、手機等多裝置瀏覽。
- 圖片網格（gallery-grid）自動調整欄數與間距。

### 2. 動態圖片載入
- 首頁「各種照片」區塊由 JS 動態 fetch `highlight.html` 的精選圖片，產生 `<a><img></a>` 結構。
- 精選作品頁（highlight.html）支援動態圖片與「無資料」預設圖示。

### 3. 燈箱（Lightbox）功能
- 點擊圖片可彈出燈箱，顯示大圖、標題、描述。
- 支援 `[文字](連結)` 語法自動轉連結，並於標題/描述顯示 Google Font 圖標。
- 描述過長時自動顯示「查看更多」展開/收合按鈕。
- 燈箱內容自動縮放，padding 統一，支援鍵盤關閉。

### 4. SEO 與社群分享
- 所有主要頁面皆補全 meta description、Open Graph、Twitter Card 標籤。
- 預設社群分享圖、標題、描述皆可自訂。

### 5. 圖片 lazy loading
- 所有圖片皆加上 `loading="lazy"` 屬性，提升載入效能。

### 6. 無障礙設計
- 主選單支援鍵盤 Tab 導覽，子選單自動展開/收合。
- 圖片、按鈕、連結皆有適當的 aria-label、alt 屬性。

### 7. Footer 與 icon 細節
- Footer 連結與 Material Symbols 圖標齊平、可反轉、無底線。
- Instagram、聯絡資訊等皆有品牌色動畫與可存取性。

### 8. 其他
- Google Fonts 與 FontAwesome 圖標載入優化。
- 組件（nav, footer）由 JS 動態載入，方便維護。
- CSS/JS 結構清晰，易於擴充。

---

## 主要檔案說明

- `index.html`：
  - 首頁，動態載入 highlight.html 精選圖片，gallery-grid 響應式排版。
  - Footer 以 send 圖標與文字齊平，點擊可前往聯絡頁。
- `highlight.html`：
  - 精選攝影作品集，支援燈箱瀏覽、`[文字](連結)` 語法、無資料預設圖。
  - Footer Instagram 連結 icon、link icon、文字齊平。
- `callme.html`：
  - 聯絡資訊、社群連結按鈕，品牌色動畫，Material Symbols 圖標。
- `js/components.js`：
  - 動態載入 nav.html、footer.html，nav 載入後自動初始化 menu。
- `js/gallery.js`：
  - 動態產生圖片網格，支援無資料顯示。
- `js/lightbox.js`：
  - 燈箱彈窗，支援自動縮放、`[文字](連結)` 語法、查看更多展開。
- `js/menu.js`：
  - 主選單與子選單展開/收合，Tab 鍵無障礙導覽。
- `css/style.css`：
  - 全站樣式、gallery-grid、footer、icon 對齊、響應式設計。
- `css/lightbox.css`：
  - 燈箱彈窗樣式，動畫、內容自動縮放。

---

<!-- ## 部署與注意事項

- 請將所有檔案與資料夾維持原有結構。
- 若需自訂社群分享圖、網址，請修改各頁 meta 標籤。
- 若有新功能或頁面，請同步補全 meta 標籤與 README。
- 若 Material Symbols 圖標顯示異常，請檢查 Google Fonts 載入與 CSS 樣式。

--- -->

## 聯絡方式

- Email: wub0419666work@gmail.com
- Instagram: [@bhwu0419.studio](https://www.instagram.com/bhwu0419.studio)
- 其他社群請見[`關於我`]()頁面
<!-- 上面的callme要換真實連結 -->

---

© 2025 吳秉乾的小小網站 | 由 Benson Wu 製作