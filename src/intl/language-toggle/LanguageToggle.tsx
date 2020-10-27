import React, { ReactElement } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { NedChevron } from 'nav-frontend-chevron';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

import { setLanguage } from 'store/actions';
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
        case 'languageCode_nn':
            return 'nn';
        default:
            return 'nb';
    }
};

const getLanguageTextFromCode = (intl: IntlShape, code: Language) => {
    switch (code) {
        case 'en':
            return getMessage(intl, 'languageToggle.en');
        case 'nn':
            return getMessage(intl, 'languageToggle.nn');
        default:
            return getMessage(intl, 'languageToggle.nb');
    }
};

function CustomMenuItem({ code, intl }: { code: Language; intl: IntlShape }) {
    return (
        <MenuItem className="LanguageToggle__menu__item">
            <div className="LanguageToggle__button__flag">
                {code === 'en' ? <UKFlagSVG /> : <NorwayFlagSVG />}
            </div>
            <div id={`languageCode_${code}`} className="LanguageToggle__button__language">
                {getLanguageTextFromCode(intl, code)}
            </div>
        </MenuItem>
    );
}

function LanguageToggle() {
    const intl = useIntl();
    const [{ language }, dispatch] = useStore();

    const menuLanguages: Language[] = (['nb', 'nn', 'en'] as Language[]).filter(
        (code) => code !== language
    );

    const handleSelection = (value: ReactElement[]) => {
        const languageCode = getLanguageCodeFromValue(value[1].props.id);
        dispatch(setLanguage(languageCode));
    };

    return (
        <div className="LanguageToggle">
            <Wrapper className="LanguageToggle__wrapper" onSelection={handleSelection}>
                <Button className="LanguageToggle__button">
                    <div className="LanguageToggle__button__flag">
                        {language === 'en' ? <UKFlagSVG /> : <NorwayFlagSVG />}
                    </div>
                    <div className="LanguageToggle__button__language">
                        {getLanguageTextFromCode(intl, language)}
                    </div>
                    <div>
                        <NedChevron />
                    </div>
                </Button>
                <Menu className="LanguageToggle__menu">
                    <ul>
                        {menuLanguages.map((code) => (
                            <li key={code}>
                                <CustomMenuItem code={code} intl={intl} />
                            </li>
                        ))}
                    </ul>
                </Menu>
            </Wrapper>
        </div>
    );
}

export default LanguageToggle;
