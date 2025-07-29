/*
    --- lightbox.js ---
    此檔案包含控制圖片燈箱 (Lightbox) 功能的 JavaScript 程式碼。
    - 當使用者點擊帶有特定 class 的圖片時，會彈出燈箱並顯示對應的圖片和說明。
    - 支援點擊關閉按鈕或遮罩層來關閉燈箱。
    - 增加「查看更多」功能，當描述內容過長時，顯示按鈕來展開/收起內容。
*/

// 等待整個 HTML 文件和所有資源（如圖片）都載入完成後再執行程式碼。
document.addEventListener('DOMContentLoaded', () => {

    // 取得燈箱容器和所有觸發燈箱的圖片元素。
    const lightbox = document.getElementById('lightbox'); // 燈箱的遮罩層容器
    const imageTriggers = document.querySelectorAll('.lightbox-trigger'); // 所有觸發燈箱的圖片

    // 檢查燈箱容器是否存在，並且至少有一張圖片可以觸發燈箱。
    if (lightbox && imageTriggers.length > 0) {
        
        /* --- 1. 取得燈箱內部元素 --- */

        // 取得燈箱內部的圖片、標題、說明、關閉按鈕，以及新的「查看更多」按鈕。
        const lightboxImage = document.getElementById('lightbox-image');         // 顯示大圖的 <img>
        const lightboxTitle = document.getElementById('lightbox-title');         // 圖片標題的 <h3>
        const lightboxDescription = document.getElementById('lightbox-description'); // 圖片說明的 <p>
        const lightboxCloseBtn = document.getElementById('lightbox-close');      // 關閉按鈕

        // 獲取或創建「查看更多」按鈕的引用
        let readMoreBtn = document.getElementById('read-more-btn');

        /* --- 2. 開啟與關閉燈箱的函式 --- */

        /**
         * 開啟燈箱。
         * @param {string} imgSrc - 高解析度圖片的路徑。
         * @param {string} title - 圖片的標題。
         * @param {string} description - 圖片的說明。
         */
        const openLightbox = (imgSrc, title, description) => {

            // 設定圖片來源。
            lightboxImage.src = imgSrc;

            // 標題支援 [文字](連結) 轉連結+Google Font 圖標（下標貼近文字）
            const linkMatch = title.match(/^\[(.*)\]\((.*)\)$/);
            if (linkMatch) {
                const linkText = linkMatch[1];
                const linkUrl = linkMatch[2];
                lightboxTitle.innerHTML = `<a href="${linkUrl}" target="_blank" style="text-decoration:none; color:inherit; display:inline;">${linkText}<sub style='display:inline-block;vertical-align:sub;margin-left:0.05em;line-height:1;'><span class='material-symbols-outlined' style='font-size:0.85em;opacity:0.7;position:relative;top:0.15em;'>link</span></sub></a>`;
            } else {
                lightboxTitle.textContent = title;
            }

            // 說明支援 [文字](連結) 轉連結+Google Font 小圖標（下標貼近文字，可多組，連結樣式與一般文字一致）
            function parseDescriptionLinks(text) {
                // 取代所有 [文字](連結) 為 <a>...<sub><span></span></sub></a>，a 樣式與一般文字一致
                return text.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, (match, linkText, linkUrl) => {
                    return `<a href="${linkUrl}" target="_blank" style="text-decoration:inherit; color:inherit; display:inline;">${linkText}<sub style='display:inline-block;vertical-align:sub;margin-left:0.03em;line-height:1;'><span class='material-symbols-outlined' style='font-size:0.78em;opacity:0.7;position:relative;top:0.18em;'>link</span></sub></a>`;
                });
            }
            lightboxDescription.innerHTML = parseDescriptionLinks(description); // 支援自動連結

            // --- 新增：「查看更多」功能邏輯 ---

            // 每次打開時，先移除 expanded class，確保從收起狀態開始
            lightboxDescription.classList.remove('expanded');

            // 如果按鈕不存在，則創建它
            if (!readMoreBtn) {
                readMoreBtn = document.createElement('button');
                readMoreBtn.id = 'read-more-btn';
                readMoreBtn.className = 'read-more-btn';
                // 將按鈕添加到描述的父級容器中 (lightbox-text-container)
                lightboxDescription.parentNode.appendChild(readMoreBtn);
            }
            readMoreBtn.textContent = '查看更多';
            readMoreBtn.style.display = 'none'; // 預設隱藏按鈕

            // 在 DOM 渲染完成後（需要一個微小的延遲）再檢查內容是否溢出
            // 這是因為 `scrollHeight` 和 `clientHeight` 需要在元素內容正確佈局後才能準確計算
            setTimeout(() => {
                // `scrollHeight` 是元素內容的實際高度（包括溢出部分）
                // `clientHeight` 是元素可見區域的高度（由 CSS 的 max-height 決定）
                if (lightboxDescription.scrollHeight > lightboxDescription.clientHeight) {
                    readMoreBtn.style.display = 'block'; // 顯示「查看更多」按鈕
                } else {
                    readMoreBtn.style.display = 'none'; // 內容未溢出，隱藏按鈕
                }
            }, 50); // 給予 50ms 延遲，確保渲染完成

            // 如果按鈕已存在，添加/重新綁定點擊事件
            // 避免重複綁定，每次開燈箱都只會綁定一次 (如果按鈕是動態創建的話)
            if (!readMoreBtn._hasClickListener) { // 使用一個內部標記來避免重複綁定
                 readMoreBtn.addEventListener('click', () => {
                    if (lightboxDescription.classList.contains('expanded')) {
                        lightboxDescription.classList.remove('expanded');
                        readMoreBtn.textContent = '查看更多';
                    } else {
                        lightboxDescription.classList.add('expanded');
                        readMoreBtn.textContent = '收起';
                    }
                });
                readMoreBtn._hasClickListener = true;
            }
           
            // 將 'active' class 加入到燈箱容器，觸發 CSS 樣式讓燈箱顯示。
            lightbox.classList.add('active');
            // 將 'lightbox-active' class 加入到 <body>，觸發 CSS 讓背景鎖定不滾動。
            document.body.classList.add('lightbox-active');
        };

        /**
         * 關閉燈箱。
         */
        const closeLightbox = () => {
            // 從燈箱容器移除 'active' class，觸發 CSS 樣式讓燈箱隱藏。
            lightbox.classList.remove('active');
            // 從 <body> 移除 'lightbox-active' class，讓背景恢復滾動。
            document.body.classList.remove('lightbox-active');

            // --- 新增：關閉時重置描述和按鈕狀態 ---
            lightboxDescription.classList.remove('expanded'); // 確保下次打開時是收起狀態
            if (readMoreBtn) {
                readMoreBtn.textContent = '查看更多'; // 重置按鈕文本
                readMoreBtn.style.display = 'none'; // 隱藏按鈕
            }
        };

        /* --- 3. 設定事件監聽器 --- */

        // 遍歷所有觸發圖片，並為它們設定點擊事件。
        imageTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                // 從點擊的圖片元素中取得資料屬性 (data attributes)。
                // 這些屬性在 HTML 中以 data-img-src、data-title 等形式存在。
                const { imgSrc, title, description } = trigger.dataset;
                
                // 呼叫 openLightbox 函式，並傳入從資料屬性中取得的資訊。
                openLightbox(imgSrc, title, description);
            });
        });

        // 如果關閉按鈕存在，則為它設定點擊事件，點擊後關閉燈箱。
        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', closeLightbox);
        }

        // 監聽燈箱遮罩層的點擊事件。
        lightbox.addEventListener('click', (event) => {
            // 檢查點擊的目標是否就是燈箱遮罩層本身 (而不是裡面的圖片或文字)。
            // 這樣可以避免點擊圖片時燈箱被關閉。
            // 同時也避免點擊到「查看更多」按鈕時關閉燈箱。
            if (event.target === lightbox || event.target === lightboxCloseBtn || event.target.closest('.lightbox-close-btn')) {
                closeLightbox();
            }
        });

        // 防止點擊燈箱內容區域時關閉燈箱
        const lightboxContainer = lightbox.querySelector('.lightbox-container');
        if (lightboxContainer) {
            lightboxContainer.addEventListener('click', (event) => {
                event.stopPropagation(); // 阻止事件冒泡到 lightbox-overlay
            });
        }
    }
});