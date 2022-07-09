import {IntlProvider} from 'react-intl'
import {addLocaleData} from 'react-intl'

import reactIntlLocale_en from 'react-intl/locale-data/en'
import reactIntlLocale_fr from 'react-intl/locale-data/fr'
import { connect } from "react-redux";

class ConnectedIntlProvider extends IntlProvider{
    constructor(props){
     super(props)
     addLocaleData([...reactIntlLocale_en, ...reactIntlLocale_fr])
    }
}

export default connect(state=>{
    const lang = state.locale.lang;
    const message = state.locale.messages[lang];
    return{
        key:lang,
        locale:lang + "-US",
        messages:message
    };
}, null)(ConnectedIntlProvider)