import {Plugin, ItemView, PluginSettingTab, Setting} from 'obsidian'
import Component from './main.svelte'

// Settings
class SettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}
	display(){
		const {containerEl} = this;
		containerEl.empty();
		new Setting(containerEl)
			.setName('ASP.NET_SessionId=')
			.addText(text => text
				.setPlaceholder('Enter your SessionId')
				.setValue(this.plugin.settings.sessionId)
				.onChange(async (value) => {
					this.plugin.settings.sessionId= value;
					await this.plugin.saveSettings();
				}));
    new Setting(containerEl)
    .setName('Compass Domain')
    .addText(text => text
      .setPlaceholder('your-school.compass.education')
      .setValue(this.plugin.settings.domain)
      .onChange(async (value) => {
        this.plugin.settings.domain= value;
        await this.plugin.saveSettings();
      }));
	}
}

// Component View
const CompassView = "CompassView"
class compassView extends ItemView {
  constructor(leaf, sessionId, domain) {
    super(leaf);
    this.sessionId = sessionId
    this.domain = domain
  }

  getViewType() {return CompassView}
  getDisplayText() {return "Compass"}

  async onOpen() {
    this.icon = "compass"
    this.component = new Component({
      target: this.contentEl,
      props: {
        sessionId: this.sessionId,
        domain: this.domain
      }
    });
  }
}

// Plugin Functions
export default class CompassPlugin extends Plugin {
  async loadSettings() {
    this.settings = Object.assign({}, {sessionId: '',domain: ''}, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings()
    this.addSettingTab(new SettingTab(this.app, this))

    this.registerView(
      CompassView,
      (leaf) => new compassView(leaf,this.settings.sessionId,this.settings.domain)
    );

    this.addRibbonIcon("compass", "Compass", () => {
      // Remove existing leaf
      this.app.workspace.detachLeavesOfType(CompassView);
      // Create leaf on right
      this.app.workspace.getRightLeaf(false).setViewState({
        type: CompassView,
        active: true,
      })
      // Reveal created leaf
      this.app.workspace.revealLeaf(
        this.app.workspace.getLeavesOfType(CompassView)[0]
      );
    });
  }

  async onUnload() {
    this.app.workspace.detachLeavesOfType(CompassView);
  }
}
