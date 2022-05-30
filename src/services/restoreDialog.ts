import { createButton } from "./createButton";
import {
  loadLocalStorage,
  LocalStorageData,
  removeLocalStorage,
  restoreUserSelectedData,
  saveLocalStorage,
} from "./searchFilter";

export const createLi = (
  name: string,
  dialog: HTMLDialogElement,
  ul: HTMLUListElement,
  presets: LocalStorageData
) => {
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.gap = "8px";
  const span = document.createElement("span");
  span.innerHTML = name;
  span.style.flex = "1";
  span.style.whiteSpace = "nowrap";
  span.style.textOverflow = "ellipsis";
  span.style.overflowX = "hidden";
  const restore = createButton("復元", "orn");
  restore.addEventListener("click", () => {
    const data = presets[name];
    restoreUserSelectedData(data);
    dialog.close();
  });
  const remove = createButton("削除", "");
  remove.addEventListener("click", () => {
    presets = removeLocalStorage(name);
    resetUl(ul);
    const li = createLiList(dialog, ul, presets);
    ul.append(...li);
  });
  li.append(span, restore, remove);
  return li;
};

export const resetUl = (ul: HTMLUListElement) => {
  // ul以下を初期化
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};

export const createLiList = (
  dialog: HTMLDialogElement,
  ul: HTMLUListElement,
  presets: LocalStorageData
) => {
  return Object.keys(presets).map((name) =>
    createLi(name, dialog, ul, presets)
  );
};

export const restoreDialog = (presets: LocalStorageData) => {
  const dialog = document.createElement("dialog");
  dialog.id = "restoreDialog";
  // <p>
  const p = document.createElement("p");
  p.innerText = "プリセットを選択してください";
  // <ul><li>
  const ul = document.createElement("ul");
  ul.style.maxHeight = "70vh";
  ul.style.maxWidth = "70vw";
  ul.style.overflowY = "scroll";
  resetUl(ul);
  const li = createLiList(dialog, ul, presets);
  ul.append(...li);

  // <div><span>閉じる</span></div>
  const cancelButton = createButton("閉じる", "");
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
  // container
  const menu = document.createElement("div");
  menu.style.display = "flex";
  menu.style.justifyContent = "space-evenly";
  menu.style.marginTop = "8px";
  menu.append(cancelButton);
  // <dialog></dialog>
  dialog.append(p, ul, menu);
  document.querySelector("body")?.appendChild(dialog);
};
