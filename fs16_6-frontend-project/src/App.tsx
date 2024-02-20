import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'

import router from './ruotes/Routes'
import theme from './custom-components/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      < RouterProvider router={router} />
    </ThemeProvider>

  )
}

export default App