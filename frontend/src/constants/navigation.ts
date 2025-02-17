/**
 * ベースPATH
 */
export const BASE_PATH = "";

/**
 * リンク先一覧
 * 遷移先定義の際に使用
 */
export const NAVIGATION_LIST = {
  TOP: `${BASE_PATH}/`,
  DETAIL: `${BASE_PATH}/todo/:id`,
  CREATE: `${BASE_PATH}/todo/create`,
  EDIT: `${BASE_PATH}/todo/edit/:id`,
};

/**
 * パス一覧
 * 画面遷移時の使用
 */
export const NAVIGATION_PATH = {
  TOP: `${BASE_PATH}/`,
  DETAIL: `${BASE_PATH}/todo/`,
  CREATE: `${BASE_PATH}/todo/create`,
  EDIT: `${BASE_PATH}/todo/edit/`,
};
