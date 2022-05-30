type AndOrRadio = {
  and: HTMLInputElement | null;
  or: HTMLInputElement | null;
};

type FromToInput = {
  from: HTMLInputElement | null;
  to: HTMLInputElement | null;
};

export type UserSelectedData = ReturnType<typeof getUserSelectedData>;
export type LocalStorageData = { [key: string]: UserSelectedData };

export const clearAllFilterSearch = () => {
  searchFilterByCategory()[0].click();
  allClearForCheckboxNodeList(searchFilterByAttr());
  allClearForCheckboxNodeList(searchFilterByEffe());
  allClearForCheckboxNodeList(searchFilterBySpecies());
  allClearForCheckboxNodeList(searchFilterByOther());
  allClearForCheckboxNodeList(searchFilterByJogai());
  allClearForCheckboxNodeList(searchFilterByLevel());
  allClearForCheckboxNodeList(searchFilterByPscale());
  allClearForCheckboxNodeList(searchFilterByLinkNumber());
  allClearForCheckboxNodeList(searchFilterByLinkArrow());
  allClearForFromTo(searchFilterByAttack());
  allClearForFromTo(searchFilterByDefense());
};

/** 選択状態をオブジェクトで取得 */
const getUserSelectedData = () => {
  return {
    // Category
    category: getNowIndex(searchFilterByCategory()),
    // Value
    attr: getSelectedValue(searchFilterByAttr()),
    effe: getSelectedValue(searchFilterByEffe()),
    species: getSelectedValue(searchFilterBySpecies()),
    other: getSelectedValue(searchFilterByOther()),
    jogai: getSelectedValue(searchFilterByJogai()),
    linkArrow: getSelectedValue(searchFilterByLinkArrow()),
    // Index
    level: getSelectedIndex(searchFilterByLevel()),
    pscale: getSelectedIndex(searchFilterByPscale()),
    linkNumber: getSelectedIndex(searchFilterByLinkNumber()),
    // FromTo
    attack: getFromToValue(searchFilterByAttack()),
    defense: getFromToValue(searchFilterByDefense()),
    // AndOr
    otherAndOr: getAndOrValue(searchFilterByOtherAndOr()),
    linkArrowAndOr: getAndOrValue(searchFilterByLinkArrowAndOr()),
  };
};

/** 選択状態を復元 */
export const restoreUserSelectedData = (data: UserSelectedData) => {
  clearAllFilterSearch();
  searchFilterByCategory()[data.category]?.click();
  // value
  clickByValue(searchFilterByAttr(), data.attr);
  clickByValue(searchFilterByEffe(), data.effe);
  clickByValue(searchFilterBySpecies(), data.species);
  clickByValue(searchFilterByOther(), data.other);
  clickByValue(searchFilterByJogai(), data.jogai);
  clickByValue(searchFilterByLinkArrow(), data.linkArrow);
  // Index
  clickById(searchFilterByLevel(), data.level, "level_");
  clickById(searchFilterByPscale(), data.pscale, "Pscale_");
  clickById(searchFilterByLinkNumber(), data.linkNumber, "Link_");
  // FromTo
  clickFromToValue(searchFilterByAttack(), data.attack);
  clickFromToValue(searchFilterByDefense(), data.defense);
  // AndOr
  clickAndOrRadio(searchFilterByOtherAndOr(), data.otherAndOr);
  clickAndOrRadio(searchFilterByLinkArrowAndOr(), data.linkArrowAndOr);
};

/** valueが一致するものをクリックする */
const clickByValue = (
  elements: NodeListOf<HTMLInputElement>,
  values: string[]
) => {
  elements.forEach((element) => {
    if (values.includes(element.value)) element.click();
  });
};

/** IDが一致するものをクリックする */
const clickById = (
  elements: NodeListOf<HTMLInputElement>,
  idList: string[],
  prefix: string = ""
) => {
  const idKeys = idList.map((id) => `${prefix}${id}`);
  elements.forEach((element) => {
    if (idKeys.includes(element.id)) element.click();
  });
};

/** FromToの値をクリックする */
const clickFromToValue = (
  element: FromToInput,
  input: { from: string; to: string }
) => {
  if (element.from) {
    element.from.value = input.from;
  }
  if (element.to) {
    element.to.value = input.to;
  }
};

/** AndOrの値をクリックする */
const clickAndOrRadio = (
  element: AndOrRadio,
  radio: { and: boolean; or: boolean }
) => {
  if (radio.and) element.and?.click();
  if (radio.or) element.or?.click();
};

/** classにnowが存在するindexの取得 */
const getNowIndex = (nodeList: NodeListOf<HTMLLIElement>) => {
  let index = 0;
  nodeList.forEach((node, i) => {
    if (/now/.test(node.className)) {
      index = i;
    }
  });
  return index;
};

/** 選択済みの要素のvalueを取得する */
const getSelectedValue = (nodeList: NodeListOf<HTMLInputElement>) => {
  const values: string[] = [];
  nodeList.forEach((node) => {
    if (node.checked) values.push(node.value);
  });
  return values;
};

/** 選択済みの要素のindexを取得する */
const getSelectedIndex = (nodeList: NodeListOf<HTMLInputElement>) => {
  const indexList: string[] = [];
  const regex = /^[^\d]+(\d+)$/;
  nodeList.forEach((node) => {
    if (!node.checked) return;
    const matcher = node.name.match(regex);
    if (!matcher) return;
    const [, index] = matcher;
    indexList.push(index);
  });
  return indexList;
};

/** FromToの入力値を取得する */
const getFromToValue = (fromTo: FromToInput) => {
  return {
    from: fromTo.from?.value ?? "",
    to: fromTo.to?.value ?? "",
  };
};

/** AndOrの入力値を取得する */
const getAndOrValue = (andOr: AndOrRadio) => {
  return {
    and: andOr.and?.checked ?? false,
    or: andOr.or?.checked ?? false,
  };
};

/** JSON形式で保存 */
export const saveLocalStorage = (presetName: string) => {
  const storageData = loadLocalStorage();
  const data = getUserSelectedData();
  const newData = { ...storageData, [presetName]: data };
  const json = JSON.stringify(newData);
  localStorage.setItem("preset", json);
  return newData;
};

/** JSON形式で保存 */
export const updateLocalStorage = (data: LocalStorageData) => {
  const json = JSON.stringify(data);
  localStorage.setItem("preset", json);
};

/** JSON形式で読込 */
export const loadLocalStorage = (): LocalStorageData => {
  const data = localStorage.getItem("preset");
  if (!data) return {};
  return JSON.parse(data) as LocalStorageData;
};

/** 特定のpresetを削除 */
export const removeLocalStorage = (presetName: string): LocalStorageData => {
  const data = localStorage.getItem("preset");
  if (!data) return {};
  const json = JSON.parse(data) as LocalStorageData;
  delete json[presetName];
  updateLocalStorage(json);
  return json;
};

/** すべての要素を初期化する */
const allClearForCheckboxNodeList = (
  nodeList: NodeListOf<HTMLInputElement>
) => {
  nodeList.forEach((node) => {
    if (!node.checked) return;
    node.click();
  });
};

/** すべての要素を初期化する */
const allClearForFromTo = (fromTo: FromToInput) => {
  if (!fromTo.from || !fromTo.to) return;
  fromTo.from.value = "";
  fromTo.to.value = "";
};

/** nameでElementを取得 */
const searchFilterByName = (name: string, like: boolean = false) => {
  const query = like ? `input[name*='${name}']` : `input[name='${name}']`;
  return document.querySelectorAll<HTMLInputElement>(query);
};

/** カテゴリの取得 */
const searchFilterByCategory = () => {
  return document.querySelectorAll<HTMLLIElement>("#ctype_set > ul > li");
};

/** 属性の要素を取得 */
const searchFilterByAttr = () => {
  return searchFilterByName("attr");
};

/** 効果の要素を取得 */
const searchFilterByEffe = () => {
  return searchFilterByName("effe");
};

/** 種族の要素を取得 */
const searchFilterBySpecies = () => {
  return searchFilterByName("species");
};

/** その他項目の要素を取得 */
const searchFilterByOther = () => {
  return searchFilterByName("other");
};

/** その他項目の検索条件(and,or)の要素を取得 */
const searchFilterByOtherAndOr = (): AndOrRadio => {
  return {
    and: document.querySelector<HTMLInputElement>("#othercon_and"),
    or: document.querySelector<HTMLInputElement>("#othercon_or"),
  };
};

/** 除外の要素を取得 */
const searchFilterByJogai = () => {
  return searchFilterByName("jogai");
};

/** レベルの要素を取得 */
const searchFilterByLevel = () => {
  return searchFilterByName("level", true);
};

/** ペンデュラムスケールの要素を取得 */
const searchFilterByPscale = () => {
  return searchFilterByName("Pscale", true);
};

/** リンク(数字)の要素を取得 */
const searchFilterByLinkNumber = () => {
  return searchFilterByName("Link", true);
};

/** リンク(方向)の要素を取得 */
const searchFilterByLinkArrow = () => {
  return searchFilterByName("linkbtn", true);
};

/** リンク(方向)検索条件(and,or)の要素を取得 */
const searchFilterByLinkArrowAndOr = (): AndOrRadio => {
  return {
    and: document.querySelector<HTMLInputElement>("#link_and"),
    or: document.querySelector<HTMLInputElement>("#link_or"),
  };
};

/** 攻撃力の要素を取得 */
const searchFilterByAttack = (): FromToInput => {
  return {
    from: document.querySelector<HTMLInputElement>("#atkfr"),
    to: document.querySelector<HTMLInputElement>("#atkto"),
  };
};

/** 守備力の要素を取得 */
const searchFilterByDefense = (): FromToInput => {
  return {
    from: document.querySelector<HTMLInputElement>("#deffr"),
    to: document.querySelector<HTMLInputElement>("#defto"),
  };
};
