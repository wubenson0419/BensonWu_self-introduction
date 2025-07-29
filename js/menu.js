/*
    --- menu.js ---
    此檔案包含控制導覽列和子選單互動功能的 JavaScript 程式碼。
    - 當漢堡選單按鈕被點擊或透過鍵盤啟用時，會開啟/關閉側邊導覽列。
    - 當有子選單的項目被點擊或透過鍵盤啟用時，會展開/收合子選單。
*/

// 等待整個 HTML 文件和所有資源（如圖片）都載入完成後再執行程式碼。
// 這樣可以確保所有 DOM 元素都已經存在，避免找不到元素導致錯誤。
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. 主選單開關邏輯 (Main Menu Toggle Logic) --- */

    // 取得所有需要的 DOM 元素，讓程式碼更簡潔。
    // 1. menuToggle：漢堡選單按鈕，點擊或按下 Enter/Space 可開啟/關閉主選單。
    // 2. menuIcon：FontAwesome 圖示，根據選單狀態切換「清單」與「X」圖示。
    // 3. overlay：選單開啟時出現的半透明遮罩，點擊可關閉選單。
    // 4. body：用來加上/移除 menu-active class，觸發 CSS 動畫。
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const overlay = document.getElementById('menu-overlay');
    const body = document.body;

    /**
     * 開啟主選單。
     * - 將 'menu-active' class 加入到 body，觸發 CSS 樣式讓菜單滑入。
     * - 將選單圖示從「清單」圖示換成「X」關閉圖示。
     */
    /**
     * 開啟主選單的動作：
     * 1. 在 <body> 加上 menu-active class，讓側邊選單滑入畫面（由 CSS 控制動畫）。
     * 2. 將漢堡圖示換成 X（fa-xmark），提示使用者可關閉。
     * 3. 顯示遮罩層（由 CSS 控制 menu-active 狀態下 overlay 顯示）。
     */
    const openMenu = () => {
        body.classList.add('menu-active');
        menuIcon.className = 'fa-solid fa-xmark';
    };

    /**
     * 關閉主選單。
     * - 從 body 移除 'menu-active' class，觸發 CSS 樣式讓菜單滑出。
     * - 將選單圖示從「X」關閉圖示換回「清單」圖示。
     */
    /**
     * 關閉主選單的動作：
     * 1. 從 <body> 移除 menu-active class，讓側邊選單滑出畫面。
     * 2. 將 X 圖示換回漢堡清單（fa-list-ul）。
     * 3. 隱藏遮罩層（由 CSS 控制 menu-active 狀態下 overlay 顯示）。
     */
    const closeMenu = () => {
        body.classList.remove('menu-active');
        menuIcon.className = 'fa-solid fa-list-ul';
    };

    // 如果漢堡選單按鈕存在，則監聽點擊事件。
    // 監聽漢堡選單按鈕的點擊與鍵盤事件：
    // 1. 點擊時，根據目前狀態開啟或關閉選單。
    // 2. 鍵盤操作（Enter/Space）也能開關選單，提升無障礙體驗。
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // 若 body 已有 menu-active，則關閉，否則開啟
            body.classList.contains('menu-active') ? closeMenu() : openMenu();
        });

        menuToggle.addEventListener('keydown', (event) => {
            // 只處理 Enter 或 Space 鍵
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // 防止 Space 捲動頁面
                body.classList.contains('menu-active') ? closeMenu() : openMenu();
            }
        });
    }

    // 如果遮罩層存在，則監聽點擊事件。
    // 點擊遮罩層時，關閉菜單。
    // 監聽遮罩層點擊事件，點擊時關閉選單。
    // 這樣使用者點擊畫面空白處也能收起選單，提升 UX。
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    /* --- 2. 層級式子菜單邏輯 (Tiered Submenu Logic) --- */

    // 取得所有帶有 'menu-item-has-children' class 的列表項目，這些是擁有子選單的父項目。
    // 取得所有有子選單的父項目（.menu-item-has-children）
    // 這些通常是有下拉箭頭的主選單項目
    const parentMenuItems = document.querySelectorAll('.menu-item-has-children');

    // 針對每個父項目，監職點擊與鍵盤事件，讓子選單可展開/收合
    parentMenuItems.forEach(item => {
        /**
         * 切換子選單展開/收合的邏輯：
         * 1. 只處理點擊在該項目的 <a> 連結（或其內部）的事件。
         * 2. 若是鍵盤事件（Enter/Space），阻止預設行為並切換 is-open class。
         * 3. 若是滑鼠點擊，也阻止預設行為並切換 is-open class。
         * 4. 切換 is-open class 會觸發 CSS，讓子選單展開或收合。
         * 5. event.stopPropagation() 防止事件冒泡到更外層。
         */
        const toggleSubmenu = (event) => {
            // 只處理直接子連結 <a> 的事件
            const directLink = item.querySelector(':scope > a');
            if (directLink && (event.target === directLink || directLink.contains(event.target))) {
                if (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    item.classList.toggle('is-open');
                    event.stopPropagation();
                } else if (event.type === 'click') {
                    event.preventDefault();
                    item.classList.toggle('is-open');
                    event.stopPropagation();
                }
            }
        };
        // 點擊父項目時可展開/收合子選單
        item.addEventListener('click', toggleSubmenu);
        // 鍵盤操作（Enter/Space）也可展開/收合子選單
        item.addEventListener('keydown', toggleSubmenu);
    });
    /*
    === 總結 ===
    1. 點擊漢堡選單或按下 Enter/Space，可開啟/關閉主選單，並切換圖示。
    2. 點擊遮罩層可關閉主選單。
    3. 有子選單的主選單項目，點擊或鍵盤操作可展開/收合子選單。
    4. 所有互動皆有無障礙考量，支援鍵盤操作。
    5. 所有狀態切換都靠 class 控制，CSS 負責動畫與顯示。
    */
});