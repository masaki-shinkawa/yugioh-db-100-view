type AndOrRadio = {
  and: HTMLInputElement | null;
  or: HTMLInputElement | null;
};

type FromToInput = {
  from: HTMLInputElement | null;
  to: HTMLInputElement | null;
};

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

/** 選択状態をオブジェクトで取得 */
const getInputData = () => {
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

/** JSON形式で保存 */
export const saveLocalStorage = (presetName: string) => {
  const data = getInputData();
  const json = JSON.stringify(data);
  localStorage.setItem(presetName, json);
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
