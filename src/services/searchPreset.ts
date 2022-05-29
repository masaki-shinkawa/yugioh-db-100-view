import { clearAllFilterSearch, saveLocalStorage } from "./searchFilter";

const saveDialog = () => {
  const dialog = document.createElement("dialog");
  dialog.id = "saveDialog";
  // <p>
  const p = document.createElement("p");
  p.innerText = "プリセット名を入力してください";
  // <input>
  const input = document.createElement("input");
  input.id = "presetName";
  // <p> エラーメッセージ
  const errorMessage = document.createElement("p");
  errorMessage.innerText = "プリセット名が入力されていません";
  errorMessage.style.color = "red";
  errorMessage.hidden = true;

  // <div><span>閉じる</span></div>
  const cancelButton = createButton("閉じる", "");
  cancelButton.addEventListener("click", () => {
    errorMessage.hidden = true;
    dialog.close();
  });

  // <div><span>保存</span></div>
  const saveButton = createButton("保存", "my");
  saveButton.addEventListener("click", () => {
    const name = document.querySelector<HTMLInputElement>("#presetName")?.value;
    if (!name) {
      errorMessage.hidden = false;
      return;
    }
    errorMessage.hidden = true;
    saveLocalStorage(`preset:${name}`);
    dialog.close();
  });
  // container
  const menu = document.createElement("div");
  menu.style.display = "flex";
  menu.style.justifyContent = "space-evenly";
  menu.style.marginTop = "8px";
  menu.append(cancelButton, saveButton);
  // <dialog></dialog>
  dialog.append(p, input, errorMessage, menu);
  document.querySelector("body")?.appendChild(dialog);
};

/** ボタンのElementを生成 */
const createButton = (text: string, type: "my" | "orn" | "") => {
  // 保存ボタン
  const textElement = document.createElement("span");
  textElement.innerHTML = text;
  const buttonElement = document.createElement("div");
  buttonElement.className = `btn hex ${type}`;
  buttonElement.appendChild(textElement);
  return buttonElement;
};

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
  // 保存ダイアログの生成
  saveDialog();
  // 復元セレクトの生成
  createRestoreButton(search);
  // 保存ボタンの生成
  createSaveButton(search);
};

/** 検索にプリセット機能を追加する */
export const searchPreset = (url: URL) => {
  initialize();
};
