import React from 'react'
import { Select } from 'antd';
import { defineTheme } from '../../static/themes';
import themeList from "monaco-themes/themes/themelist.json"

const ThemeDropdown = ({ theme, changeTheme }: { theme: string, changeTheme: any }) => {

  const handleChange = (value: string) => {
    changeTheme(value)
  };

  return (
    <div style={{ marginLeft: "15px" }}>
      <Select
        placeholder={`Select Theme`}
        style={{ width: "auto", minWidth: "150px" }}
        options={Object.entries(themeList).map(([themeId, themeName]) => ({
          label: themeName,
          value: themeId,
          key: themeId
        }))}
        value={theme}
        onChange={handleChange}
      />
    </div>
  )
}

export default ThemeDropdown