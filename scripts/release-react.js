const execa = require('execa');
const inquirer = require('inquirer');

const release = async () => {
  const curVersion = process.env.npm_package_version;
  console.log(`Current version: ${curVersion}`);

  const result = await execa('code-push', ['app', 'ls', '--format', 'json']);
  const apps =
    (result &&
      result.exitCode === 0 &&
      result.stdout &&
      JSON.parse(result.stdout).map(item => item.name)) ||
    [];
  console.log(apps);

  if (!apps) {
    console.error('[release-react] error: not found apps');
    return;
  }

  const {platform} = await inquirer.prompt([
    {
      name: 'platform',
      message: '请选择打包平台:',
      type: 'list',
      choices: [
        {name: 'ios', value: 'ios'},
        {name: 'android', value: 'android'},
      ],
    },
  ]);

  const {
    appName,
    description,
    deploymentName,
    mandatory,
    development,
  } = await inquirer.prompt([
    {
      name: 'appName',
      message: '请选择Code Push中应用名称:',
      type: 'list',
      choices: apps,
    },
    {
      name: 'description',
      message: '更新描述:',
      type: 'input',
    },
    {
      name: 'deploymentName',
      message: '请选择发布更新的环境(默认: Staging):',
      type: 'list',
      choices: [
        {name: 'Staging', value: 'Staging'},
        {name: 'Production', value: 'Production'},
      ],
    },
    {
      name: 'mandatory',
      message: '是否开启强制更新(默认: false):',
      type: 'confirm',
      default: false,
    },
    {
      name: 'development',
      message: '是否开启JS的开发者模式(默认: true):',
      type: 'confirm',
      default: true,
    },
  ]);

  const {yes} = await inquirer.prompt([
    {
      name: 'yes',
      message: `确认发布 ${curVersion}吗?(默认: true)`,
      type: 'confirm',
      default: true,
    },
  ]);

  if (!yes) {
    console.warn('[release-react] cancelled.');
    return;
  }

  const releaseReactArguments = [
    'release-react',
    appName,
    platform,
    '-t',
    curVersion,
    '--dev',
    development,
    '--des',
    description,
    '-d',
    deploymentName,
    '-m',
    mandatory,
  ];

  console.log(`code-push ${releaseReactArguments.join(' ')}`);

  // code-push release-react ReactNativeDemo-Android android --t 1.0.0  --dev false -d Production
  await execa('code-push', releaseReactArguments, {stdio: 'inherit'});

  console.log('[release-react] succeed.');
};

release().catch(err => {
  console.error(err);
  process.exit(1);
});
