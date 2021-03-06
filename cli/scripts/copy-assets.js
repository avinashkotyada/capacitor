const fs = require('fs-extra');
const path = require('path');

const MONOREPO_ROOT = path.join(__dirname, '../..');
const ASSETS_DIST = path.join(__dirname, '../assets');

const ANDROID_TEMPLATE = 'android-template';
const ANDROID_TEMPLATE_SRC = path.join(MONOREPO_ROOT, ANDROID_TEMPLATE);
const ANDROID_TEMPLATE_DST = path.join(ASSETS_DIST, ANDROID_TEMPLATE);

const IOS_TEMPLATE = 'ios-template';
const IOS_TEMPLATE_SRC = path.join(MONOREPO_ROOT, IOS_TEMPLATE);
const IOS_TEMPLATE_DST = path.join(ASSETS_DIST, IOS_TEMPLATE);

const ANDROID_PLUGINS_FOLDER = 'capacitor-cordova-android-plugins';
const ANDROID_PLUGINS_FOLDER_SRC = path.join(
  MONOREPO_ROOT,
  ANDROID_PLUGINS_FOLDER,
);
const ANDROID_PLUGINS_FOLDER_DST = path.join(
  ASSETS_DIST,
  ANDROID_PLUGINS_FOLDER,
);

const IOS_PLUGINS_FOLDER = 'capacitor-cordova-ios-plugins';
const IOS_PLUGINS_FOLDER_SRC = path.join(MONOREPO_ROOT, IOS_PLUGINS_FOLDER);
const IOS_PLUGINS_FOLDER_DST = path.join(ASSETS_DIST, IOS_PLUGINS_FOLDER);

fs.emptyDirSync(ASSETS_DIST);

// Rename our Android .iml file
fs.copySync(ANDROID_TEMPLATE_SRC, ANDROID_TEMPLATE_DST);
replaceAndroidModule();
fs.copySync(IOS_TEMPLATE_SRC, IOS_TEMPLATE_DST);
fs.copySync(ANDROID_PLUGINS_FOLDER_SRC, ANDROID_PLUGINS_FOLDER_DST);
fs.copySync(IOS_PLUGINS_FOLDER_SRC, IOS_PLUGINS_FOLDER_DST);

function replaceAndroidModule() {
  if (fs.existsSync(path.join(ANDROID_TEMPLATE_DST, 'android-template.iml'))) {
    fs.moveSync(
      path.join(ANDROID_TEMPLATE_DST, 'android-template.iml'),
      path.join(ANDROID_TEMPLATE_DST, 'android.iml'),
    );
    let imlContent = fs.readFileSync(
      path.join(ANDROID_TEMPLATE_DST, 'android.iml'),
      'utf8',
    );
    imlContent = imlContent.replace(/android-template/g, 'android');
    fs.writeFileSync(
      path.join(ANDROID_TEMPLATE_DST, 'android.iml'),
      imlContent,
    );
  }
  const modulesXmlPath = path.join(ANDROID_TEMPLATE_DST, '.idea/modules.xml');
  const workspaceXmlPath = path.join(
    ANDROID_TEMPLATE_DST,
    '.idea/workspace.xml',
  );
  if (fs.existsSync(modulesXmlPath)) {
    let modulesXml = fs.readFileSync(modulesXmlPath, 'utf8');
    modulesXml = modulesXml.replace(/android-template/g, 'android');
    fs.writeFileSync(modulesXmlPath, modulesXml);
  }
  if (fs.existsSync(workspaceXmlPath)) {
    let workspaceXml = fs.readFileSync(workspaceXmlPath, 'utf8');
    workspaceXml = workspaceXml.replace(/android-template/g, 'android');
    fs.writeFileSync(workspaceXmlPath, workspaceXml);
  }
}
