import {createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`

    body {
        background: ${({theme}) => theme.background} !important;
        color: ${({theme}) => theme.color} !important;
        transition: all 0.50s linear;
    }  
    
    .lightIcon {
        color: ${({theme}) => theme.color};
    } 
    .moonIcon {
        color: ${({theme}) => theme.color};
    }
    .mainIcon {
        color: ${({theme}) => theme.color};
    }
    
    .lightBackgroundSecondary {
      background: ${({theme}) => theme.backgroundSecondary};
    }
    .moonBackgroundSecondary {
      background: ${({theme}) => theme.backgroundSecondary};
    }
    .mainBackgroundSecondary {
      background: ${({theme}) => theme.backgroundSecondary};
    }
    
    .lightButtonBackground {
      background: ${({theme}) => theme.backgroundInput};
      color: ${({theme}) => theme.colorInput};
    }
    .moonButtonBackground {
        background: ${({theme}) => theme.backgroundInput};
        color: ${({theme}) => theme.colorInput};
    }
    .mainButtonButtonBackground {
        background: ${({theme}) => theme.backgroundInput};
        color: ${({theme}) => theme.colorInput};
    }
    
    .lightSecondaryBackgroundButton {
        background: ${({theme}) => theme.backgroundInputSecondary};
    }
    .moonSecondaryBackgroundButton {
        background: ${({theme}) => theme.backgroundInputSecondary};
    }
    .mainSecondaryBackgroundButton {
        background: ${({theme}) => theme.backgroundInputSecondary};
    }
    
    .lightBackgroundHoverButton:hover {
      @media (any-hover) {
        background: ${({theme}) => theme.backgroundButton};
        transition: all 0.3s ease 0s;
      }
    }
    .moonBackgroundHoverButton:hover {
      @media (any-hover) {
        background: ${({theme}) => theme.backgroundButton};
        transition: all 0.3s ease 0s;
      }
    }
    .mainBackgroundHoverButton:hover {
      @media (any-hover) {
        background: ${({theme}) => theme.backgroundButton};
        transition: all 0.3s ease 0s;
      }
    }
    
    .lightBackground {
      background: ${({theme}) => theme.background};
    }
    .moonBackground {
      background: ${({theme}) => theme.background};
    }
    .mainBackground {
      background: ${({theme}) => theme.background};
    }
    
    .lightBorderBottom {
      border-bottom: ${({theme}) => theme.border};
    }
    .moonBorderBottom {
      border-bottom: ${({theme}) => theme.border};
    }
    .mainBorderBottom {
      border-bottom: ${({theme}) => theme.border};
    }

    .lightBorder {
      border: ${({theme}) => theme.border};
    }
    .moonBorder {
      border: ${({theme}) => theme.border};
    }
    .mainBorder {
      border: ${({theme}) => theme.border};
    }
    
    .lightBackgroundInput {
      background: ${({theme}) => theme.backgroundButton};
    }
    .moonBackgroundInput {
      background: ${({theme}) => theme.backgroundButton};
    }
    .mainBackgroundInput {
      background: ${({theme}) => theme.backgroundButton};
    }
    
`