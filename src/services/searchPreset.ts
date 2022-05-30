import { createLiList, resetUl, restoreDialog } from "./restoreDialog";
import { saveDialog } from "./saveDialog";
import { createButton } from "./createButton";
import { loadLocalStorage, LocalStorageData } from "./searchFilter";

let presets: LocalStorageData = {};

/** 保存ボタンの生成 */
const createSaveButton = (search: Element | null) => {
  const saveButton = createButton("保存", "my");
  const dialog = document.querySelector<HTMLDialogElement>("#saveDialog");
  saveButton.addEventListener("click", () => dialog?.showModal());
  search?.appendChild(saveButton);
};

/** 復元セレクトの生成 */
const createRestoreButton = (search: Element | null) => {
  const restoreButton = createButton("復元", "orn");
  const dialog = document.querySelector<HTMLDialogElement>("#restoreDialog");
  const ul = document.querySelector<HTMLUListElement>("#restoreDialog > ul");
  restoreButton.addEventListener("click", () => {
    presets = loadLocalStorage();
    if (ul && dialog) {
      resetUl(ul);
      const li = createLiList(dialog, ul, presets);
      ul.append(...li);
      dialog.showModal();
    }
  });
  search?.appendChild(restoreButton);
};

/** 初期化 */
const initialize = () => {
  // 検索欄取得
  const search = document.querySelector(
    "#search > div.search_btn_set > div.search"
  );
  search?.setAttribute("style", "column-gap: 8px");
  const keywordInput = document.querySelector("#first_search");
  keywordInput?.setAttribute("style", "margin-right: 0px");
  presets = loadLocalStorage();
  // 保存ダイアログの生成
  saveDialog(presets);
  // 復元ダイアログの生成
  restoreDialog(presets);
  // 復元セレクトの生成
  createRestoreButton(search);
  // 保存ボタンの生成
  createSaveButton(search);
};

/** 検索にプリセット機能を追加する */
export const searchPreset = (url: URL) => {
  initialize();
};
