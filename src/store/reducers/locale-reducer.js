import { CHANGE_LANGUAGE, DEFAULT_ACTION } from "../action-type-constant";
import locale_en from "../../locale/en.json";
import locale_fr from "../../locale/fr.json";
import locale_mr from "../../locale/mr.json";
import locale_hn from "../../locale/hn.json";

const messages_en = {
  ...locale_en,
};
const messages_fr = {
  ...locale_fr,
};
const messages_mr = {
  ...locale_mr,
};
const messages_hn = {
  ...locale_hn,
};

const defaultState = {
  lang: "en",
  messages: {
    EN: messages_en,
    FR: messages_fr,
    MR: messages_mr,
    HN: messages_hn,
  },
};

export const changeLanguageReducer = (
  state = defaultState,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload.language,
      }
     break;
    default:
      return state;
  }
};
