import React from 'react'
import { Select } from 'antd';
import { languageOptions } from '../../static/languages';
import Language from '../../models/Language';

const LanguageDropdown = ({ language, changeLanguage }: { language: Language | undefined, changeLanguage: any }) => {

  const handleChange = (value: string) => {
    changeLanguage(languageOptions.find((l) => l.value === value))
  };

    return (
        <div>
          <Select
            defaultValue={languageOptions[0].value}
            style={{ width: "auto", minWidth: "150px" }}
            value={language?.value}
            onChange={handleChange}
            options={languageOptions}
          />
        </div>
      )
}

export default LanguageDropdown