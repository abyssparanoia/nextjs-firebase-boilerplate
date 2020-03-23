import { App, app, BrowserWindow, ipcMain, globalShortcut, Menu } from 'electron'
import loadDevtool from 'electron-load-devtool'
import { name, version } from '../../package.json'

class Main {
  private mainWindow: BrowserWindow | null = null
  private app: App

  private mainURL = `file://${__dirname}/index.html`

  public constructor(app: App) {
    this.app = app
    this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
    this.app.on('ready', this.create.bind(this))
    this.app.on('activate', this.onActivated.bind(this))
    this.app.setAboutPanelOptions({
      applicationName: `${name}`,
      applicationVersion: `App Version: ${version}`
    })
  }

  private onWindowAllClosed() {
    this.app.quit()
  }

  private create() {
    globalShortcut.register('CommandOrControl+R', () => false)

    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
      frame: true,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.mainWindow.loadURL(this.mainURL)

    ipcMain.on('app-close', () => {
      this.app.quit()
    })

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })

    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development' || process.env.WITH_DEV_TOOL) {
      loadDevtool(loadDevtool.REDUX_DEVTOOLS)
      loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS)
    }

    // Create the Application's main menu
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'Application',
        submenu: [
          {
            label: 'About Application',
            role: 'about'
          },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: () => {
              app.quit()
            },
            role: 'quit'
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
          {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
          },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            accelerator: 'CmdOrCtrl+Alt+I',
            label: 'Open DevTools',
            role: 'toggleDevTools'
          }
        ]
      }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }

  private onReady() {
    this.create()
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create()
    }
  }
}

export const electronApp: Main = new Main(app)
