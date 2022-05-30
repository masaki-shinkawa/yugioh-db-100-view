import { LocalStorageData, saveLocalStorage } from "./searchFilter";
import { createButton } from "./createButton";

export const saveDialog = (presets: LocalStorageData) => {
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
    presets = saveLocalStorage(name);
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
