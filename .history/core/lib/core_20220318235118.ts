'use strict';

module.exports = core;
const commander = require('commander');
const program = new commander.Command();

const log = require('@jim-cli/log');
const pkg = require('../package.json');

async function core() {
    try {
        await prepare();
        registerCommand();
    } catch (error) {
        // log.error(e.message);
        if (program.debug) {
          console.log(error);
        }
    }
}

async function exec() {
    let targetPath = process.env.CLI_TARGET_PATH;
    // console.log(process.env)
    const homePath = process.env.CLI_HOME_PATH;
    let storeDir = '';
    let pkg;
    log.verbose('targetPath', targetPath);
    log.verbose('homePath', homePath);
  
    const cmdObj = arguments[arguments.length - 1];
    console.log('cmdObj',cmdObj)
    const cmdName = cmdObj.name();
    // const packageName = SETTINGS[cmdName];
    // const packageVersion = 'latest';
  
    // if (!targetPath) {
    //   targetPath = path.resolve(homePath, CACHE_DIR); // 生成缓存路径
    //   storeDir = path.resolve(targetPath, 'node_modules');
    //   log.verbose('targetPath', targetPath);
    //   log.verbose('storeDir', storeDir);
    //   pkg = new Package({
    //     targetPath,
    //     storeDir,
    //     packageName,
    //     packageVersion,
    //   });
    //   if (await pkg.exists()) {
    //     // 更新package
    //     await pkg.update();
    //   } else {
    //     // 安装package
    //     await pkg.install();
    //   }
    // } else {
    //   pkg = new Package({
    //     targetPath,
    //     packageName,
    //     packageVersion,
    //   });
    // }
    // const rootFile = pkg.getRootFilePath();
    // if (rootFile) {
    //   try {
    //     // 在当前进程中调用
    //     // require(rootFile).call(null, Array.from(arguments));
    //     // 在node子进程中调用
    //     const args = Array.from(arguments);
    //     const cmd = args[args.length - 1];
    //     const o = Object.create(null);
    //     Object.keys(cmd).forEach(key => {
    //       if (cmd.hasOwnProperty(key) &&
    //         !key.startsWith('_') &&
    //         key !== 'parent') {
    //         o[key] = cmd[key];
    //       }
    //     });
    //     args[args.length - 1] = o;
    //     const code = `require('${rootFile}').call(null, ${JSON.stringify(args)})`;
    //     const child = spawn('node', ['-e', code], {
    //       cwd: process.cwd(),
    //       stdio: 'inherit',
    //     });
    //     child.on('error', e => {
    //       log.error(e.message);
    //       process.exit(1);
    //     });
    //     child.on('exit', e => {
    //       log.verbose('命令执行成功:' + e);
    //       process.exit(e);
    //     });
    //   } catch (e) {
    //     log.error(e.message);
    //   }
    // }
  }

function registerCommand() {
    program
      .name(Object.keys(pkg.bin)[0])
      .usage('<command> [options]')
      .version(pkg.version)
      .option('-d, --debug', '是否开启调试模式', false)
      .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');
  
    program
      .command('init [projectName]')
      .option('-f, --force', '是否强制初始化项目')
      .action(exec);
  
    // // 开启debug模式
    program.on('option:debug', function() {
      const options = program.opts();
      // console.log('options',options)
      if (options.debug) {
        process.env.LOG_LEVEL = 'verbose';
      } else {
        process.env.LOG_LEVEL = 'info';
      }
      log.level = process.env.LOG_LEVEL;
      console.log(process.env.LOG_LEVEL)
    });
  
    // // 指定targetPath
    program.on('option:targetPath', function() {
      const options = program.opts();
      // console.log('targetPath',options.targetPath)
      process.env.CLI_TARGET_PATH = options.targetPath;
    });
  
    // // 对未知命令监听
    program.on('command:*', function(obj) {
      // console.log('command',obj)
      const availableCommands = program.commands.map(cmd => cmd.name());
      console.log(colors.red('未知的命令：' + obj[0]));
      if (availableCommands.length > 0) {
        console.log(colors.red('可用命令：' + availableCommands.join(',')));
      }
    });
    program.parse(process.argv);
  
    // if (program.args && program.args.length < 1) {
    //   program.outputHelp();
    //   console.log();
    // }
  }

async function prepare() {
}

function registerCommand() {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)
        // .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');

    // program
    //     .command('init [projectName]')
    //     .option('-f, --force', '是否强制初始化项目')
    //     .action(exec);

    // // 开启debug模式
    program.on('option:debug', function() {
        console.log(program.debug)
        if (program.debug) {
        process.env.LOG_LEVEL = 'verbose';
        } else {
        process.env.LOG_LEVEL = 'info';
        }
        console.log(process.env.LOG_LEVEL)
        // log.level = process.env.LOG_LEVEL;
    });

    // // 指定targetPath
    program.on('option:targetPath', function() {
        process.env.CLI_TARGET_PATH = program.targetPath;
    });

    // // 对未知命令监听
    program.on('command:*', function(obj) {
        // const availableCommands = program.commands.map(cmd => cmd.name());
        // console.log(colors.red('未知的命令：' + obj[0]));
        // if (availableCommands.length > 0) {
        //   console.log(colors.red('可用命令：' + availableCommands.join(',')));
        // }
    });

    program.parse(process.argv);

    // if (program.args && program.args.length < 1) {
    //     program.outputHelp();
    //     console.log();
    // }
}

