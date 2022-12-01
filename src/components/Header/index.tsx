import React from 'react'
import LanguageDropdown from '../LanguageDropdown'
import ThemeDropdown from '../ThemeDropdown'
import { Button } from 'antd'
import Language from '../../models/Language'

const Header = ({ changeLanguage, changeTheme, language, theme, run, processing }: { changeLanguage: any, changeTheme: any, language: Language | undefined, theme: string, run: any, processing: boolean }) => {
  return (
    <div id="header" style={{ width: "50%" }}>
        <div id="header-container">
            <LanguageDropdown language={language} changeLanguage={changeLanguage} />
            <ThemeDropdown theme={theme} changeTheme={changeTheme} />
            <div id="run-btn-container">
                <Button type="primary" id="run-btn" onClick={run} loading={processing}>Run</Button>
            </div>
        </div>
    </div>
  )
}

export default Header