/** ボタンのElementを生成 */
export const createButton = (text: string, type: "my" | "orn" | "") => {
  // 保存ボタン
  const textElement = document.createElement("span");
  textElement.innerHTML = text;
  const buttonElement = document.createElement("div");
  buttonElement.className = `btn hex ${type}`;
  buttonElement.appendChild(textElement);
  return buttonElement;
};
