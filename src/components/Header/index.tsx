import React from 'react'
import LanguageDropdown from '../LanguageDropdown'
import ThemeDropdown from '../ThemeDropdown'
import { Button } from 'antd'
import Language from '../../models/Language'
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const Header = ({ changeLanguage, changeTheme, language, theme, run, processing, showCode, setShowCode }: { changeLanguage: any, changeTheme: any, language: Language | undefined, theme: string, run: any, processing: boolean, showCode: boolean, setShowCode: any }) => {
  
  return (
    <div id="header" style={{ width: "50%" }}>
        <div id="header-container">
            <LanguageDropdown language={language} changeLanguage={changeLanguage} />
            <ThemeDropdown theme={theme} changeTheme={changeTheme} />
            <div id="display-switch-btn-container">
              <Radio.Group
                    id='display-btn'
                    options={[{ label: 'Code', value: 'Code' }, { label: 'Input', value: 'Input' }]}
                    onChange={(e) => setShowCode(e.target.value === 'Code')}
                    value={showCode ? 'Code' : 'Input'}
                    optionType="button"
                    buttonStyle="solid"
              />
            </div>
            <div id="run-btn-container">
                <Button type="primary" id="run-btn" onClick={run} loading={processing}>Run</Button>
            </div>
        </div>
    </div>
  )
}

export default Header