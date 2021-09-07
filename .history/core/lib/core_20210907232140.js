'use strict';

module.exports = core;
const commander = require('commander');
const program = new commander.Command();

async function core() {
    try {
        await prepare();
        registerCommand();
    } catch (error) {
        // log.error(e.message);
        if (program.debug) {
          console.log(e);
        }
    }
}

async function prepare() {
  console.log('12222')
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

    // 开启debug模式
    program.on('option:debug', function() {
        if (program.debug) {
        process.env.LOG_LEVEL = 'verbose';
        } else {
        process.env.LOG_LEVEL = 'info';
        }
        log.level = process.env.LOG_LEVEL;
    });

    // 指定targetPath
    program.on('option:targetPath', function() {
        process.env.CLI_TARGET_PATH = program.targetPath;
    });

    // 对未知命令监听
    program.on('command:*', function(obj) {
        const availableCommands = program.commands.map(cmd => cmd.name());
        console.log(colors.red('未知的命令：' + obj[0]));
        if (availableCommands.length > 0) {
        console.log(colors.red('可用命令：' + availableCommands.join(',')));
        }
    });

    program.parse(process.argv);

    if (program.args && program.args.length < 1) {
        program.outputHelp();
        console.log();
    }
}