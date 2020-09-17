import React, { ReactElement } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { NedChevron } from 'nav-frontend-chevron';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

import { useStore } from 'store/Context';
import { Language } from 'types/intl';
import { getMessage } from 'utils/intl';
import NorwayFlagSVG from './NorwayFlagSVG';
import UKFlagSVG from './UKFlagSVG';

import './LanguageToggle.less';

const getLanguageCodeFromValue = (value: string) => {
    switch (value) {
        case 'languageCode_en':
            return 'en';
        default:
            return 'nb';
    }
};

const getLanguageTextFromCode = (intl: IntlShape, code: Language) => {
    switch (code) {
        case 'en':
            return getMessage(intl, 'languageToggle.en');
        default:
            return getMessage(intl, 'languageToggle.nb');
    }
};

const renderMenuItem = (code: Language, intl: IntlShape) => {
    return (
        <li key={code}>
            <MenuItem className="LanguageToggle__menu__item">
                <div className="LanguageToggle__button__flag">{code === 'en' ? <UKFlagSVG /> : <NorwayFlagSVG />}</div>
                <div id={`languageCode_${code}`} className="LanguageToggle__button__language">
                    {getLanguageTextFromCode(intl, code)}
                </div>
            </MenuItem>
        </li>
    );
};

function LanguageToggle() {
    const intl = useIntl();
    const [{ locale }, dispatch] = useStore();

    const menuLanguages: Language[] = (['nb', 'en'] as Language[]).filter((code) => code !== locale);

    const handleSelection = (value: ReactElement[]) => {
        const localeCode = getLanguageCodeFromValue(value[1].props.id);
        dispatch({ type: 'SET_LOCALE', payload: localeCode });
    };

    return (
        <div className="LanguageToggle">
            <Wrapper className="LanguageToggle__wrapper" onSelection={handleSelection}>
                <Button className="LanguageToggle__button">
                    <div className="LanguageToggle__button__flag">
                        {locale === 'en' ? <UKFlagSVG /> : <NorwayFlagSVG />}
                    </div>
                    <div className="LanguageToggle__button__language">{getLanguageTextFromCode(intl, locale)}</div>
                    <div>
                        <NedChevron />
                    </div>
                </Button>
                <Menu className="LanguageToggle__menu">
                    <ul>{menuLanguages.map((code) => renderMenuItem(code, intl))}</ul>
                </Menu>
            </Wrapper>
        </div>
    );
}

export default LanguageToggle;
